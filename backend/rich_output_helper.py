from __future__ import annotations

import base64
import builtins
import io
import json
import os
import sys
import traceback
from pathlib import Path


os.environ.setdefault("MPLBACKEND", "Agg")


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: rich_output_helper.py <code_path> <output_path>", file=sys.stderr)
        return 2

    code_path = Path(sys.argv[1]).resolve()
    output_path = Path(sys.argv[2]).resolve()
    rich_outputs: list[dict[str, str]] = []
    captured_figure_ids: set[int] = set()

    def display(*objects) -> None:
        for obj in objects:
            _capture_object(obj, rich_outputs, captured_figure_ids)

    builtins.display = display
    _patch_ipython_display(display)
    _prepare_sys_path(code_path)

    original_argv = sys.argv[:]
    sys.argv = [str(code_path)]
    exit_code = 0

    try:
        source = code_path.read_text(encoding="utf-8")
        globals_dict = {
            "__name__": "__main__",
            "__file__": str(code_path),
            "display": display,
        }
        exec(compile(source, str(code_path), "exec"), globals_dict)
    except SystemExit as exc:
        exit_code = _normalize_exit_code(exc.code)
        if isinstance(exc.code, str):
            print(exc.code, file=sys.stderr)
    except BaseException:
        exit_code = 1
        traceback.print_exc()
    finally:
        sys.argv = original_argv
        _capture_open_matplotlib_figures(rich_outputs, captured_figure_ids)
        _write_outputs(output_path, rich_outputs)

    return exit_code


def _patch_ipython_display(display) -> None:
    try:
        import IPython.display as ipython_display
    except Exception:
        return

    ipython_display.display = display


def _prepare_sys_path(code_path: Path) -> None:
    code_directory = str(code_path.parent)
    if sys.path:
        sys.path[0] = code_directory
    else:
        sys.path.append(code_directory)


def _capture_object(obj, rich_outputs: list[dict[str, str]], captured_figure_ids: set[int]) -> None:
    if obj is None:
        return

    if _capture_matplotlib_figure(obj, rich_outputs, captured_figure_ids):
        return

    if _capture_pil_image(obj, rich_outputs):
        return

    png_output = _call_repr_method(obj, "_repr_png_")
    if png_output:
        _append_binary_output(rich_outputs, png_output, "image", "image/png", _object_title(obj))
        return

    svg_output = _call_repr_method(obj, "_repr_svg_")
    if svg_output:
        rich_outputs.append(
            {
                "type": "html",
                "content": str(svg_output),
                "mime_type": "image/svg+xml",
                "title": _object_title(obj),
            }
        )
        return

    html_output = _call_repr_method(obj, "_repr_html_")
    if html_output:
        rich_outputs.append(
            {
                "type": "html",
                "content": str(html_output),
                "mime_type": "text/html",
                "title": _object_title(obj),
            }
        )
        return

    html_method = getattr(obj, "to_html", None)
    if callable(html_method):
        try:
            html_output = html_method()
        except Exception:
            html_output = None
        if html_output:
            rich_outputs.append(
                {
                    "type": "html",
                    "content": str(html_output),
                    "mime_type": "text/html",
                    "title": _object_title(obj),
                }
            )
            return

    rich_outputs.append(
        {
            "type": "text",
            "content": str(obj),
            "mime_type": "text/plain",
            "title": _object_title(obj),
        }
    )


def _capture_matplotlib_figure(obj, rich_outputs: list[dict[str, str]], captured_figure_ids: set[int]) -> bool:
    figure = _extract_matplotlib_figure(obj)
    if figure is None or id(figure) in captured_figure_ids:
        return figure is not None

    buffer = io.BytesIO()
    figure.savefig(buffer, format="png", bbox_inches="tight")
    buffer.seek(0)
    rich_outputs.append(
        {
            "type": "image",
            "content": base64.b64encode(buffer.read()).decode("ascii"),
            "mime_type": "image/png",
            "title": "Matplotlib Figure",
        }
    )
    captured_figure_ids.add(id(figure))
    return True


def _capture_pil_image(obj, rich_outputs: list[dict[str, str]]) -> bool:
    try:
        from PIL.Image import Image as PILImage
    except Exception:
        return False

    if not isinstance(obj, PILImage):
        return False

    buffer = io.BytesIO()
    obj.save(buffer, format="PNG")
    buffer.seek(0)
    rich_outputs.append(
        {
            "type": "image",
            "content": base64.b64encode(buffer.read()).decode("ascii"),
            "mime_type": "image/png",
            "title": "Image",
        }
    )
    return True


def _capture_open_matplotlib_figures(
    rich_outputs: list[dict[str, str]], captured_figure_ids: set[int]
) -> None:
    try:
        import matplotlib.pyplot as plt
    except Exception:
        return

    for figure_number in plt.get_fignums():
        try:
            figure = plt.figure(figure_number)
        except Exception:
            continue
        _capture_matplotlib_figure(figure, rich_outputs, captured_figure_ids)

    plt.close("all")


def _extract_matplotlib_figure(obj):
    try:
        from matplotlib.figure import Figure
    except Exception:
        return None

    if isinstance(obj, Figure):
        return obj

    figure = getattr(obj, "figure", None)
    if isinstance(figure, Figure):
        return figure

    return None


def _call_repr_method(obj, method_name: str):
    method = getattr(obj, method_name, None)
    if not callable(method):
        return None

    try:
        result = method()
    except Exception:
        return None

    if isinstance(result, tuple):
        return result[0]
    return result


def _append_binary_output(
    rich_outputs: list[dict[str, str]], payload, output_type: str, mime_type: str, title: str
) -> None:
    if isinstance(payload, str):
        payload_bytes = payload.encode("utf-8")
    else:
        payload_bytes = bytes(payload)

    rich_outputs.append(
        {
            "type": output_type,
            "content": base64.b64encode(payload_bytes).decode("ascii"),
            "mime_type": mime_type,
            "title": title,
        }
    )


def _object_title(obj) -> str:
    return obj.__class__.__name__


def _write_outputs(output_path: Path, rich_outputs: list[dict[str, str]]) -> None:
    try:
        output_path.write_text(json.dumps({"rich_outputs": rich_outputs}), encoding="utf-8")
    except Exception as exc:
        print(f"Failed to write rich outputs: {exc}", file=sys.stderr)


def _normalize_exit_code(code) -> int:
    if code is None:
        return 0
    if isinstance(code, bool):
        return int(code)
    if isinstance(code, int):
        return code
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
