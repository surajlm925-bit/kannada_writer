import json
import importlib
from fastapi import FastAPI
from pathlib import Path

def load_active_modules(app: FastAPI):
    config_path = Path(__file__).parent.parent / "config.json"
    
    with open(config_path) as f:
        config = json.load(f)

    functions = config.get("functions", {})

    for func_name, enabled in functions.items():
        if enabled:
            try:
                module = importlib.import_module(f"routers.{func_name}")
                app.include_router(module.router, prefix=f"/{func_name}")
                print(f"✅ Loaded: {func_name}")
            except Exception as e:
                print(f"❌ Failed to load {func_name}: {e}")
