from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.module_loader import load_active_modules

app = FastAPI(
    title="Kannada Content Generator",
    description="Modular FastAPI backend for content generation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174", 
        "http://localhost:5175", "http://127.0.0.1:5175",
        "http://localhost:5176", "http://127.0.0.1:5176",
        "http://127.0.0.1:58382"  # Browser preview proxy
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_active_modules(app)

@app.get("/")
def read_root():
    return {"message": "Kannada Content Bot API is live"}

@app.get("/favicon.ico")
def favicon():
    return {"message": "No favicon"}
