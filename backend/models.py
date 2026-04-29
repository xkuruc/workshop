from __future__ import annotations

import sys
from pathlib import Path

from pydantic import BaseModel, ConfigDict, Field


PROJECT_ROOT = Path(__file__).resolve().parent.parent

DEFAULT_QUESTION = """You can use this editor to solve Python tasks with your own local interpreter.

Try the sample below, then point the app at a Python executable where your packages are installed.

Suggested checks:
1. Print the Python executable that actually runs the script.
2. Try importing qiskit from the selected interpreter.
3. Change the working directory to a project folder if your code depends on local files.
"""

DEFAULT_CODE = """import sys

try:
    import qiskit
    print("Qiskit version:", qiskit.__version__)
except Exception as e:
    print("Qiskit import failed:", e)

print("Hello from local Python")
print("Interpreter:", sys.executable)
"""


class AppConfig(BaseModel):
    model_config = ConfigDict(extra="ignore")

    python_executable: str = Field(default_factory=lambda: sys.executable, min_length=1)
    working_directory: str = Field(default_factory=lambda: str(PROJECT_ROOT), min_length=1)
    default_question: str = Field(default=DEFAULT_QUESTION)
    timeout_seconds: int = Field(default=20, ge=1, le=600)


class RunRequest(BaseModel):
    code: str = Field(min_length=1)
    python_executable: str = Field(min_length=1)
    working_directory: str = Field(min_length=1)
    timeout_seconds: int = Field(default=20, ge=1, le=600)


class RunResponse(BaseModel):
    success: bool
    exit_code: int | None
    stdout: str
    stderr: str
    rich_outputs: list["RichOutput"] = Field(default_factory=list)
    duration_seconds: float
    timed_out: bool = False
    status: str = "success"


class HealthResponse(BaseModel):
    ok: bool = True
    status: str = "healthy"
    running: bool
    config_path: str


class StopResponse(BaseModel):
    success: bool
    message: str


class CompletionRequest(BaseModel):
    code: str = Field(default="")
    line_number: int = Field(ge=1)
    column: int = Field(ge=1)
    python_executable: str = Field(min_length=1)
    working_directory: str = Field(min_length=1)
    max_items: int = Field(default=50, ge=1, le=200)


class CompletionItem(BaseModel):
    label: str
    kind: str = "value"
    detail: str = ""
    insert_text: str | None = None


class CompletionResponse(BaseModel):
    items: list[CompletionItem]
    source: str = "interpreter"
    error: str | None = None


class RichOutput(BaseModel):
    type: str
    content: str
    mime_type: str = ""
    title: str = ""
