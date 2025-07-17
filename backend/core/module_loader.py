import json
import importlib
from fastapi import FastAPI
from pathlib import Path

# Track loaded modules
loaded_modules = set()

def load_active_modules(app: FastAPI):
    config_path = Path(__file__).parent.parent / "config.json"
    
    with open(config_path) as f:
        config = json.load(f)

    functions = config.get("functions", {})
    
    print(f"\n=== Loading modules ===")
    print(f"Found {len(functions)} functions in config")
    
    for func_name, enabled in functions.items():
        if enabled:
            if func_name in loaded_modules:
                print(f"⚠️ {func_name} already loaded, skipping")
                continue
                
            try:
                print(f"\nAttempting to import module: routers.{func_name}")
                module = importlib.import_module(f"routers.{func_name}")
                print(f"✅ Successfully imported: {func_name}")
                app.include_router(module.router, prefix=f"/{func_name}")
                loaded_modules.add(func_name)
                print(f"✔️ Active routes for {func_name}: {module.router.routes}")
            except Exception as e:
                print(f"❌ Failed to load {func_name}: {str(e)}")
                
    print(f"\n=== Loaded {len(loaded_modules)} modules ===\n")
