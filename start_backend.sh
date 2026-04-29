#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if [ -x ".venv/bin/python" ]; then
  PYTHON_CMD=".venv/bin/python"
elif command -v python3 >/dev/null 2>&1; then
  PYTHON_CMD="python3"
else
  PYTHON_CMD="python"
fi

"$PYTHON_CMD" -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
