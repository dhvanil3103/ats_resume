from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from typing import Optional
import io
import re

from app.services.pdf_processor import read_resume_file
from app.services.ai_service import generate_cover_letter
from app.schemas.cover_letter import CoverLetterResponse

router = APIRouter()

@router.post("/cover-letter", response_model=CoverLetterResponse)
async def create_cover_letter(
    job_description: str = Form(...),
    company_name: str = Form(...),
    full_name: str = Form(...),
    resume: Optional[str] = Form(None),
    resume_file: Optional[UploadFile] = File(None),
    hiring_manager: Optional[str] = Form(None),
    company_address: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    phone: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
):
    """Generate a cover letter based on resume and job description"""
    resume_text = ""
    
    if resume:
        resume_text = resume
    elif resume_file:
        resume_text = read_resume_file(await resume_file.read(), resume_file.filename)
    else:
        raise HTTPException(status_code=400, detail="No resume provided")
    
    if not job_description:
        raise HTTPException(status_code=400, detail="No job description provided")
    
    if not company_name:
        raise HTTPException(status_code=400, detail="Company name is required")
    
    if not full_name:
        raise HTTPException(status_code=400, detail="Full name is required")
    
    # Prepare personal info
    personal_info = {
        "fullName": full_name,
        "email": email,
        "phone": phone,
        "address": address
    }

    # Prepare company info
    company_info = {
        "companyName": company_name,
        "hiringManager": hiring_manager,
        "companyAddress": company_address
    }

    # Generate cover letter text
    letter_text = generate_cover_letter(personal_info, company_info, job_description, resume_text)

    return {"coverLetter": letter_text}

@router.post("/download-cover-letter")
async def download_cover_letter(
    cover_letter: str = Form(...),
    full_name: str = Form(...)
):
    """Download a cover letter as a text file"""
    # Clean name for filename
    safe_name = re.sub(r'[^a-zA-Z0-9]', '_', full_name)
    
    # Create text file in memory
    file_content = cover_letter.encode('utf-8')
    file_obj = io.BytesIO(file_content)
    file_obj.seek(0)
    
    # Return as downloadable file
    return StreamingResponse(
        file_obj,
        media_type="text/plain",
        headers={
            "Content-Disposition": f"attachment; filename=Cover_Letter_{safe_name}.txt"
        }
    )