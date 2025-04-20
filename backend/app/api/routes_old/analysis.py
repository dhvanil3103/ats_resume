from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from typing import Optional

from app.services.pdf_processor import read_resume_file
from app.services.ai_service import get_resume_summary, get_similarity_score, get_missing_keywords
from app.schemas.analysis import SummaryResponse, SimilarityResponse, KeywordsResponse

router = APIRouter()

@router.post("/summary", response_model=SummaryResponse)
async def get_summary(
    resume: Optional[str] = Form(None),
    resume_file: Optional[UploadFile] = File(None),
):
    """Generate a summary of the resume"""
    resume_text = ""
    
    if resume:
        resume_text = resume
    elif resume_file:
        resume_text = read_resume_file(await resume_file.read(), resume_file.filename)
    else:
        raise HTTPException(status_code=400, detail="No resume provided")
    
    summary = get_resume_summary(resume_text)
    return {"summary": summary}

@router.post("/similarity", response_model=SimilarityResponse)
async def get_similarity(
    job_description: str = Form(...),
    resume: Optional[str] = Form(None),
    resume_file: Optional[UploadFile] = File(None),
):
    """Calculate similarity score between resume and job description"""
    resume_text = ""
    
    if resume:
        resume_text = resume
    elif resume_file:
        resume_text = read_resume_file(await resume_file.read(), resume_file.filename)
    else:
        raise HTTPException(status_code=400, detail="No resume provided")
    
    if not job_description:
        raise HTTPException(status_code=400, detail="No job description provided")
    
    similarity_data = get_similarity_score(job_description, resume_text)
    return similarity_data

@router.post("/keywords", response_model=KeywordsResponse)
async def get_keywords(
    job_description: str = Form(...),
    resume: Optional[str] = Form(None),
    resume_file: Optional[UploadFile] = File(None),
):
    """Identify missing keywords and suggest placements"""
    resume_text = ""
    
    if resume:
        resume_text = resume
    elif resume_file:
        resume_text = read_resume_file(await resume_file.read(), resume_file.filename)
    else:
        raise HTTPException(status_code=400, detail="No resume provided")
    
    if not job_description:
        raise HTTPException(status_code=400, detail="No job description provided")
    
    keywords_data = get_missing_keywords(job_description, resume_text)
    return keywords_data