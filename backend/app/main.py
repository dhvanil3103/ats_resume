from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

from app.api.endpoints import api_router
from app.core.config import settings

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
        <head>
            <title>Resume Optimizer API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    color: #3498db;
                }
                .endpoint {
                    margin-bottom: 20px;
                    padding: 10px;
                    border-left: 4px solid #3498db;
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <h1>Resume Optimizer API</h1>
            <p>Welcome to the Resume Optimizer API. The following endpoints are available:</p>
            
            <div class="endpoint">
                <h3>GET /api/documents/upload</h3>
                <p>Upload a resume file (PDF, TXT)</p>
            </div>
            
            <div class="endpoint">
                <h3>POST /api/analysis/summary</h3>
                <p>Get a summary of the resume</p>
            </div>
            
            <div class="endpoint">
                <h3>POST /api/analysis/similarity</h3>
                <p>Compare resume to job description</p>
            </div>
            
            <div class="endpoint">
                <h3>POST /api/analysis/keywords</h3>
                <p>Get missing keywords and suggestions</p>
            </div>
            
            <div class="endpoint">
                <h3>POST /api/generate/cover-letter</h3>
                <p>Generate a cover letter based on resume and job description</p>
            </div>
            
            <div class="endpoint">
                <h3>POST /api/generate/download-cover-letter</h3>
                <p>Download the generated cover letter as a text file</p>
            </div>
            
            <p>For full API documentation, visit <a href="/docs">/docs</a></p>
        </body>
    </html>
    """

# For debugging purposes
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)