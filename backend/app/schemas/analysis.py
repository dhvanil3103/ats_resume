from pydantic import BaseModel
from typing import Optional, List

class SummaryResponse(BaseModel):
    summary: str

class SimilarityResponse(BaseModel):
    similarityScore: str
    similarityExplanation: str

class KeywordsResponse(BaseModel):
    missingKeywords: List[str]
    optimizationSuggestions: str