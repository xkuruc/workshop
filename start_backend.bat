@echo off
setlocal
cd /d %~dp0

if exist .venv\Scripts\python.exe (
  set PYTHON_CMD=.venv\Scripts\python.exe
) else (
  set PYTHON_CMD=py
)

%PYTHON_CMD% -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
