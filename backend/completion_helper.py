from __future__ import annotations

import ast
import builtins
import importlib
import inspect
import json
import keyword
import sys
from dataclasses import dataclass


IDENTIFIER_CHARS = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.")


@dataclass
class CompletionContext:
    base_expression: str | None
    partial: str


def main() -> None:
    payload = json.load(sys.stdin)
    code = payload.get("code", "")
    line_number = int(payload.get("line_number", 1))
    column = int(payload.get("column", 1))
    max_items = int(payload.get("max_items", 50))

    items: list[dict[str, str]] = []
    source = "fallback"
    error = None

    try:
        items = _jedi_completions(code, line_number, column, max_items)
        if items:
            source = "jedi"
    except Exception as exc:
        error = f"Jedi completion failed: {exc}"

    if not items:
        try:
            items = _fallback_completions(code, line_number, column, max_items)
            if items:
                source = "fallback"
        except Exception as exc:
            error = f"Fallback completion failed: {exc}"
            items = []

    json.dump({"items": items, "source": source, "error": error}, sys.stdout)


def _jedi_completions(code: str, line_number: int, column: int, max_items: int) -> list[dict[str, str]]:
    try:
        import jedi  # type: ignore
    except Exception:
        return []

    script = jedi.Script(code=code, path="__main__.py")
    completions = script.complete(line=line_number, column=max(column - 1, 0))

    items: list[dict[str, str]] = []
    for completion in completions[:max_items]:
        items.append(
            {
                "label": completion.name,
                "kind": _map_jedi_kind(getattr(completion, "type", "value")),
                "detail": getattr(completion, "description", "") or getattr(completion, "full_name", "") or "",
                "insert_text": completion.name,
            }
        )

    return _dedupe_items(items, max_items)


def _fallback_completions(code: str, line_number: int, column: int, max_items: int) -> list[dict[str, str]]:
    context = _extract_completion_context(code, line_number, column)
    aliases, local_names = _collect_names(code)

    if context.base_expression:
        resolved_path = _resolve_alias_path(context.base_expression, aliases)
        target = _resolve_object(resolved_path)
        names = [name for name in dir(target) if not name.startswith("_")]
        items = []
        for name in sorted(names):
            if context.partial and not name.lower().startswith(context.partial.lower()):
                continue

            detail = resolved_path
            kind = "value"
            try:
                member = getattr(target, name)
                detail = getattr(member, "__module__", "") or detail
                kind = _infer_kind(member)
            except Exception:
                pass

            items.append(
                {
                    "label": name,
                    "kind": kind,
                    "detail": detail,
                    "insert_text": name,
                }
            )
        return _dedupe_items(items, max_items)

    top_level_items = []
    top_level_names = set(keyword.kwlist)
    top_level_names.update(dir(builtins))
    top_level_names.update(aliases.keys())
    top_level_names.update(local_names)

    partial = context.partial.lower()
    for name in sorted(top_level_names):
        if partial and not name.lower().startswith(partial):
            continue

        kind = "keyword" if keyword.iskeyword(name) else "value"
        detail = ""

        if name in aliases:
            detail = aliases[name]
            try:
                kind = _infer_kind(_resolve_object(aliases[name]))
            except Exception:
                kind = "module"
        elif hasattr(builtins, name):
            kind = _infer_kind(getattr(builtins, name))
            detail = "builtins"

        top_level_items.append(
            {
                "label": name,
                "kind": kind,
                "detail": detail,
                "insert_text": name,
            }
        )

    return _dedupe_items(top_level_items, max_items)


def _extract_completion_context(code: str, line_number: int, column: int) -> CompletionContext:
    lines = code.splitlines()
    if not lines:
        return CompletionContext(base_expression=None, partial="")

    line_index = min(max(line_number - 1, 0), len(lines) - 1)
    line_text = lines[line_index]
    safe_column = min(max(column - 1, 0), len(line_text))
    prefix = line_text[:safe_column]

    chain = _extract_chain(prefix)
    if not chain:
        return CompletionContext(base_expression=None, partial="")

    if chain.endswith("."):
        return CompletionContext(base_expression=chain[:-1], partial="")

    if "." in chain:
        base_expression, partial = chain.rsplit(".", 1)
        return CompletionContext(base_expression=base_expression, partial=partial)

    return CompletionContext(base_expression=None, partial=chain)


def _extract_chain(prefix: str) -> str:
    collected = []
    for char in reversed(prefix):
        if char in IDENTIFIER_CHARS:
            collected.append(char)
        else:
            break
    return "".join(reversed(collected))


def _collect_names(code: str) -> tuple[dict[str, str], set[str]]:
    tree = _parse_best_effort(code)
    if tree is None:
        return {}, set()

    aliases: dict[str, str] = {}
    local_names: set[str] = set()

    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                local_name = alias.asname or alias.name.split(".")[0]
                aliases[local_name] = alias.name
                local_names.add(local_name)
        elif isinstance(node, ast.ImportFrom) and node.module:
            for alias in node.names:
                if alias.name == "*":
                    continue
                local_name = alias.asname or alias.name
                aliases[local_name] = f"{node.module}.{alias.name}"
                local_names.add(local_name)
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            local_names.add(node.name)
        elif isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name):
                    local_names.add(target.id)
        elif isinstance(node, ast.AnnAssign) and isinstance(node.target, ast.Name):
            local_names.add(node.target.id)

    return aliases, local_names


def _parse_best_effort(code: str):
    candidates = [code]
    lines = code.splitlines()

    if lines:
        trimmed_last_line = "\n".join(lines[:-1] + [""])
        candidates.append(trimmed_last_line)

    for candidate in candidates:
        try:
            return ast.parse(candidate)
        except SyntaxError:
            continue

    if not lines:
        return None

    # Drop trailing lines until the remaining code parses. This keeps imports and
    # top-level definitions available for autocomplete while the current line is unfinished.
    for end in range(len(lines) - 1, 0, -1):
        candidate = "\n".join(lines[:end])
        try:
            return ast.parse(candidate)
        except SyntaxError:
            continue

    return None


def _resolve_alias_path(expression: str, aliases: dict[str, str]) -> str:
    parts = expression.split(".")
    if not parts:
        return expression

    first = parts[0]
    if first not in aliases:
        return expression

    expanded = aliases[first].split(".")
    return ".".join(expanded + parts[1:])


def _resolve_object(path: str):
    parts = [part for part in path.split(".") if part]
    if not parts:
        raise LookupError("Empty completion path.")

    module = None
    consumed = 0
    for index in range(len(parts), 0, -1):
        module_name = ".".join(parts[:index])
        try:
            module = importlib.import_module(module_name)
            consumed = index
            break
        except Exception:
            continue

    if module is None:
        first = parts[0]
        if hasattr(builtins, first):
            module = getattr(builtins, first)
            consumed = 1
        else:
            raise LookupError(f"Unable to resolve completion target: {path}")

    obj = module
    for part in parts[consumed:]:
        obj = getattr(obj, part)

    return obj


def _map_jedi_kind(kind: str) -> str:
    mapping = {
        "module": "module",
        "class": "class",
        "instance": "value",
        "function": "function",
        "param": "variable",
        "path": "file",
        "keyword": "keyword",
        "property": "property",
        "statement": "variable",
    }
    return mapping.get(kind, "value")


def _infer_kind(value) -> str:
    if inspect.ismodule(value):
        return "module"
    if inspect.isclass(value):
        return "class"
    if isinstance(value, property):
        return "property"
    if inspect.isfunction(value) or inspect.ismethod(value) or inspect.isbuiltin(value):
        return "function"
    if callable(value):
        return "function"
    return "value"


def _dedupe_items(items: list[dict[str, str]], max_items: int) -> list[dict[str, str]]:
    deduped: list[dict[str, str]] = []
    seen: set[str] = set()

    for item in items:
        label = item.get("label", "")
        if not label or label in seen:
            continue
        seen.add(label)
        deduped.append(item)
        if len(deduped) >= max_items:
            break

    return deduped


if __name__ == "__main__":
    main()
