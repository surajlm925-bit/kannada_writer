from fastapi import FastAPI
from core.module_loader import load_active_modules

app = FastAPI(
    title="Kannada Content Generator",
    description="Modular FastAPI backend for content generation",
    version="1.0.0"
)

load_active_modules(app)

@app.get("/")
def read_root():
    return {"message": "Kannada Content Bot API is live"}
