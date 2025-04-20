from pydantic import BaseModel
from typing import Optional

class PersonalInfo(BaseModel):
    fullName: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class CompanyInfo(BaseModel):
    companyName: str
    hiringManager: Optional[str] = None
    companyAddress: Optional[str] = None

class CoverLetterRequest(BaseModel):
    resume: Optional[str] = None
    job_description: str
    personal_info: PersonalInfo
    company_info: CompanyInfo

class CoverLetterResponse(BaseModel):
    coverLetter: str