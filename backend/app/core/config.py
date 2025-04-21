import os
from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Resume Optimizer API"
    
    # Gemini API - Get from environment variable with no default
    GEMINI_API_KEY: str = os.environ.get("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = "gemini-2.0-flash"
    
    # CORS - Allow requests from the React development server
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000", "https://ats-resume-ebon.vercel.app/"]

settings = Settings()