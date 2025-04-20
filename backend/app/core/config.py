import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Resume Optimizer API"
    
    # Gemini API
    GEMINI_API_KEY: str = os.environ.get("GEMINI_API_KEY", "AIzaSyCJW-inmVcHaBkAZ3yLHKhgPbntMX6Sc54")
    GEMINI_MODEL: str = "gemini-2.0-flash"
    
    # CORS - Allow requests from the React development server
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000"]

settings = Settings()