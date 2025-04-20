from fastapi import APIRouter
from app.api.routes import documents_router, analysis_router, generation_router

api_router = APIRouter()

# Include all route modules
api_router.include_router(documents_router, prefix="/documents", tags=["documents"])
api_router.include_router(analysis_router, prefix="/analysis", tags=["analysis"])
api_router.include_router(generation_router, prefix="/generate", tags=["generation"])