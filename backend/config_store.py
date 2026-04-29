from __future__ import annotations

import json
from pathlib import Path

from backend.models import AppConfig, PROJECT_ROOT


CONFIG_PATH = PROJECT_ROOT / "local_config.json"


def load_config() -> AppConfig:
    if not CONFIG_PATH.exists():
        config = AppConfig()
        save_config(config)
        return config

    try:
        with CONFIG_PATH.open("r", encoding="utf-8") as config_file:
            payload = json.load(config_file)
    except (OSError, json.JSONDecodeError):
        config = AppConfig()
        save_config(config)
        return config

    return AppConfig(**payload)


def save_config(config: AppConfig) -> AppConfig:
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CONFIG_PATH.open("w", encoding="utf-8") as config_file:
        json.dump(config.model_dump(), config_file, indent=2)
    return config

