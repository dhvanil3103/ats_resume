from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import Optional

from app.services.pdf_processor import read_resume_file
from app.schemas.document import DocumentResponse

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
):
    """Upload and process a document"""
    try:
        contents = await file.read()
        # Add print statement for debugging
        print(f"Received file: {file.filename}, size: {len(contents)} bytes")
        text_content = read_resume_file(contents, file.filename)
        return {"filename": file.filename, "content": text_content}
    except Exception as e:
        # Enhanced error logging
        print(f"Error processing file: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")