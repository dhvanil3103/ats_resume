import io
import PyPDF2
from typing import Union

def extract_text_from_pdf(file_content: Union[bytes, io.BytesIO]) -> str:
    """Extract text from a PDF file"""
    try:
        # Create a PDF reader object
        if isinstance(file_content, bytes):
            pdf_file = io.BytesIO(file_content)
        else:
            pdf_file = file_content
            
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # Extract text from all pages
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text() + "\n"

        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return "Error extracting text from PDF."

def read_resume_file(file_content: bytes, filename: str) -> str:
    """Read and extract content from various file types"""
    try:
        filename = filename.lower()

        # Detect file type
        if filename.endswith('.pdf'):
            # PDF file
            return extract_text_from_pdf(file_content)
        elif filename.endswith('.docx'):
            # DOCX file - you may need python-docx for better handling
            return "DOCX files are not fully supported yet. Please convert to PDF or paste text directly."
        elif filename.endswith('.txt') or filename.endswith('.rtf'):
            # Text file
            return file_content.decode('utf-8', errors='ignore')
        else:
            # Unknown file type
            return "Unsupported file type. Please use PDF, TXT, or paste text directly."
    except Exception as e:
        print(f"Error reading file: {e}")
        return f"Error reading file: {str(e)}"