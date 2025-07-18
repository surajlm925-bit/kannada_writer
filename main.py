from fastapi import FastAPI
from core.module_loader import load_active_modules
from fastapi.middleware.cors import CORSMiddleware
from routers.breaking import router as breaking_router

app = FastAPI(
    title="Kannada Content Generator",
    description="Modular FastAPI backend for content generation",
    version="1.0.0"
)

app.include_router(breaking_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_active_modules(app)

@app.get("/")
def read_root():
    return {"message": "Kannada Content Bot API is live"}
