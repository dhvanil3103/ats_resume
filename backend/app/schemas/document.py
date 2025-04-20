from pydantic import BaseModel
from typing import Optional

class DocumentBase(BaseModel):
    filename: Optional[str] = None
    content: str

class DocumentResponse(DocumentBase):
    pass