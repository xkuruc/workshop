from __future__ import annotations

import json
import os
import shutil
import signal
import subprocess
import tempfile
import threading
import time
from dataclasses import dataclass
from pathlib import Path

from backend.models import RichOutput, RunRequest, RunResponse, StopResponse


class RunnerValidationError(ValueError):
    """Raised when user-provided execution settings are invalid."""


class RunConflictError(RuntimeError):
    """Raised when a second run is requested while one is already active."""


HELPER_SCRIPT_PATH = Path(__file__).resolve().parent / "rich_output_helper.py"


@dataclass
class ExecutionFiles:
    temp_dir: Path
    code_path: Path
    rich_output_path: Path


def resolve_python_executable(python_executable: str) -> str:
    candidate = python_executable.strip()
    if not candidate:
        raise RunnerValidationError("Python executable path is required.")

    path_candidate = Path(candidate).expanduser()
    if path_candidate.is_absolute() or path_candidate.parent != Path("."):
        if not path_candidate.exists():
            raise RunnerValidationError(f"Python executable was not found: {path_candidate}")
        if path_candidate.is_dir():
            raise RunnerValidationError(f"Python executable points to a directory: {path_candidate}")
        return str(path_candidate)

    resolved = shutil.which(candidate)
    if resolved:
        return resolved

    raise RunnerValidationError(f"Python executable was not found: {candidate}")


def resolve_working_directory(working_directory: str) -> str:
    directory = Path(working_directory).expanduser().resolve()
    if not directory.exists():
        raise RunnerValidationError(f"Working directory does not exist: {directory}")
    if not directory.is_dir():
        raise RunnerValidationError(f"Working directory is not a directory: {directory}")
    return str(directory)


class ExecutionManager:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._process: subprocess.Popen[str] | None = None
        self._stop_requested = False
        self._temp_file: str | None = None

    def is_running(self) -> bool:
        with self._lock:
            return self._process is not None

    def run(self, request: RunRequest) -> RunResponse:
        interpreter = resolve_python_executable(request.python_executable)
        working_directory = resolve_working_directory(request.working_directory)
        execution_files = self._create_execution_files(request.code)

        process = self._start_process(
            interpreter=interpreter,
            code_path=str(execution_files.code_path),
            rich_output_path=str(execution_files.rich_output_path),
            working_directory=working_directory,
        )

        with self._lock:
            if self._process is not None:
                process.kill()
                self._cleanup_execution_files(execution_files)
                raise RunConflictError("A Python script is already running. Stop it before starting a new one.")

            self._process = process
            self._stop_requested = False
            self._temp_file = str(execution_files.code_path)

        start_time = time.perf_counter()
        stdout = ""
        stderr = ""
        rich_outputs: list[RichOutput] = []
        exit_code: int | None = None
        timed_out = False
        status = "success"

        try:
            stdout, stderr = process.communicate(timeout=request.timeout_seconds)
            exit_code = process.returncode
        except subprocess.TimeoutExpired:
            timed_out = True
            status = "timeout"
            stderr = self._append_message(stderr, f"Execution timed out after {request.timeout_seconds} seconds.")
            self._terminate_process(process)
            stdout, process_stderr = process.communicate()
            stderr = self._append_message(process_stderr, stderr)
            exit_code = process.returncode
        finally:
            duration_seconds = round(time.perf_counter() - start_time, 3)
            rich_outputs = self._load_rich_outputs(execution_files.rich_output_path)
            with self._lock:
                stopped_manually = self._stop_requested
                self._process = None
                self._stop_requested = False
                self._temp_file = None

            self._cleanup_execution_files(execution_files)

        if stopped_manually and status != "timeout":
            status = "stopped"
            stderr = self._append_message(stderr, "Execution stopped by user.")

        success = bool(exit_code == 0 and not timed_out and not stopped_manually)
        if not success and status == "success":
            status = "error"

        return RunResponse(
            success=success,
            exit_code=exit_code,
            stdout=stdout,
            stderr=stderr,
            rich_outputs=rich_outputs,
            duration_seconds=duration_seconds,
            timed_out=timed_out,
            status=status,
        )

    def stop(self) -> StopResponse:
        with self._lock:
            if self._process is None:
                return StopResponse(success=False, message="No active Python process to stop.")

            self._stop_requested = True
            process = self._process

        self._terminate_process(process)
        return StopResponse(success=True, message="Stop signal sent to the running Python process.")

    def _create_execution_files(self, code: str) -> ExecutionFiles:
        temp_dir = Path(tempfile.mkdtemp(prefix="local_python_runner_"))
        code_path = temp_dir / "user_code.py"
        rich_output_path = temp_dir / "rich_outputs.json"
        code_path.write_text(code, encoding="utf-8")
        return ExecutionFiles(temp_dir=temp_dir, code_path=code_path, rich_output_path=rich_output_path)

    def _start_process(
        self, interpreter: str, code_path: str, rich_output_path: str, working_directory: str
    ) -> subprocess.Popen[str]:
        creationflags = subprocess.CREATE_NEW_PROCESS_GROUP if os.name == "nt" else 0
        env = os.environ.copy()
        env.setdefault("MPLBACKEND", "Agg")
        return subprocess.Popen(
            [interpreter, str(HELPER_SCRIPT_PATH), code_path, rich_output_path],
            cwd=working_directory,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            errors="replace",
            env=env,
            start_new_session=os.name != "nt",
            creationflags=creationflags,
        )

    def _terminate_process(self, process: subprocess.Popen[str]) -> None:
        if process.poll() is not None:
            return

        try:
            if os.name == "nt":
                process.terminate()
            else:
                os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        except ProcessLookupError:
            return

        try:
            process.wait(timeout=3)
        except subprocess.TimeoutExpired:
            if os.name == "nt":
                process.kill()
            else:
                os.killpg(os.getpgid(process.pid), signal.SIGKILL)

    def _cleanup_execution_files(self, execution_files: ExecutionFiles) -> None:
        try:
            shutil.rmtree(execution_files.temp_dir, ignore_errors=True)
        except OSError:
            pass

    def _load_rich_outputs(self, rich_output_path: Path) -> list[RichOutput]:
        if not rich_output_path.exists():
            return []

        try:
            payload = json.loads(rich_output_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return []

        rich_outputs: list[RichOutput] = []
        for item in payload.get("rich_outputs", []):
            try:
                rich_outputs.append(RichOutput(**item))
            except Exception:
                continue
        return rich_outputs

    def _append_message(self, original: str, message: str) -> str:
        if not original.strip():
            return message
        if not message.strip():
            return original
        return f"{original.rstrip()}\n{message.lstrip()}"
