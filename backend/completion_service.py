from __future__ import annotations

import json
import subprocess
from pathlib import Path

from backend.models import CompletionItem, CompletionRequest, CompletionResponse
from backend.runner import RunnerValidationError, resolve_python_executable, resolve_working_directory


HELPER_SCRIPT_PATH = Path(__file__).resolve().parent / "completion_helper.py"


class CompletionService:
    def complete(self, request: CompletionRequest) -> CompletionResponse:
        interpreter = resolve_python_executable(request.python_executable)
        working_directory = resolve_working_directory(request.working_directory)

        process = subprocess.run(
            [interpreter, str(HELPER_SCRIPT_PATH)],
            input=json.dumps(
                {
                    "code": request.code,
                    "line_number": request.line_number,
                    "column": request.column,
                    "max_items": request.max_items,
                }
            ),
            cwd=working_directory,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=5,
        )

        if process.returncode != 0:
            stderr = process.stderr.strip() or "Completion helper failed."
            raise RunnerValidationError(stderr)

        try:
            payload = json.loads(process.stdout or "{}")
        except json.JSONDecodeError as exc:
            raise RunnerValidationError("Completion helper returned invalid JSON.") from exc

        items = [CompletionItem(**item) for item in payload.get("items", [])]
        return CompletionResponse(
            items=items,
            source=payload.get("source", "interpreter"),
            error=payload.get("error"),
        )
