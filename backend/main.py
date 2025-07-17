from fastapi import FastAPI
from core.module_loader import load_active_modules
from dotenv import load_dotenv
import os
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()  # Loads from .env
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(
    title="Kannada Content Generator",
    description="Modular FastAPI backend for content generation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_active_modules(app)

@app.get("/")
def read_root():
    return {"message": "Kannada Content Bot API is live"}
