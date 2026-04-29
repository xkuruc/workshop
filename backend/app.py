from __future__ import annotations

import asyncio
import subprocess

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.completion_service import CompletionService
from backend.config_store import CONFIG_PATH, load_config, save_config
from backend.models import (
    AppConfig,
    CompletionRequest,
    CompletionResponse,
    HealthResponse,
    RunRequest,
    RunResponse,
    StopResponse,
)
from backend.runner import ExecutionManager, RunConflictError, RunnerValidationError


LOCAL_FRONTEND_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:4173",
    "http://localhost:4173",
]

execution_manager = ExecutionManager()
completion_service = CompletionService()

app = FastAPI(
    title="Local Python Coding App API",
    description="Local-only backend for executing Python with a user-selected interpreter.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=LOCAL_FRONTEND_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(running=execution_manager.is_running(), config_path=str(CONFIG_PATH))


@app.get("/config", response_model=AppConfig)
def get_config() -> AppConfig:
    return load_config()


@app.post("/config", response_model=AppConfig)
def update_config(config: AppConfig) -> AppConfig:
    return save_config(config)


@app.post("/run", response_model=RunResponse)
async def run_code(request: RunRequest) -> RunResponse:
    try:
        return await asyncio.to_thread(execution_manager.run, request)
    except RunnerValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RunConflictError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Unexpected runner failure: {exc}") from exc


@app.post("/completions", response_model=CompletionResponse)
async def get_completions(request: CompletionRequest) -> CompletionResponse:
    try:
        return await asyncio.to_thread(completion_service.complete, request)
    except RunnerValidationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except subprocess.TimeoutExpired as exc:
        raise HTTPException(status_code=504, detail="Completion request timed out.") from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Unexpected completion failure: {exc}") from exc


@app.post("/stop", response_model=StopResponse)
def stop_code() -> StopResponse:
    return execution_manager.stop()


if __name__ == "__main__":
    uvicorn.run("backend.app:app", host="127.0.0.1", port=8000, reload=False)
