import json
import re
import google.generativeai as genai
from typing import Dict, Any, List

from app.core.config import settings

# Configure the Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel(settings.GEMINI_MODEL)

def get_resume_summary(resume_text: str) -> str:
    """Generate a summary of the resume"""
    prompt = f"""
    You are an expert at generating summaries of resumes in the fields of Data Science, Data Analysts, Software Engineering and Electrical Engineering. Provide me a concise 2-3 sentence summary of this resume, highlighting:
    - Overall professional profile and experience level
    - Key skills and qualifications
    - Career trajectory and achievements

    Resume:
    {resume_text}
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating resume summary: {e}")
        return "Unable to generate resume summary."


def get_similarity_score(job_description: str, resume_text: str) -> Dict[str, str]:
    """Calculate similarity score between resume and job description"""
    prompt = f"""
    You are an expert at analyzing resume like an ATS software in fields of Data Science, Data Analysts, Software Engineering and Electrical Engineering. Analyze seriously how well this resume matches the job description.

    Return a JSON object with:
    - similarityScore: A percentage score of how well the resume matches the job description out of 100
    - similarityExplanation: Brief explanation of weaknesses in the match

    Job Description:
    {job_description}

    Resume:
    {resume_text}
    """

    try:
        response = model.generate_content(prompt)
        # Try to extract JSON from the response text
        json_match = re.search(r'\{[\s\S]*\}', response.text)
        if json_match:
            json_str = json_match.group(0)
            return json.loads(json_str)
        else:
            return {
                "similarityScore": "0%",
                "similarityExplanation": "Unable to analyze similarity."
            }
    except Exception as e:
        print(f"Error calculating similarity: {e}")
        return {
            "similarityScore": "0%",
            "similarityExplanation": "Error analyzing similarity."
        }


def get_missing_keywords(job_description: str, resume_text: str) -> Dict[str, Any]:
    """Identify missing keywords and suggest placements"""
    prompt = f"""
    Yuu are an expert at ATS Resume Analyzing in the fields of Data Science, Data Analysts, Software Engineering and Electrical Engineering. Analyze the job description and resume to:
    1. Identify important keywords from the job description missing from the resume
    2. Suggest where to naturally add these keywords. Each suggestion should be a separate line.

    IMPORTANT: Return your response as plain text in this format:

    MISSING KEYWORDS:
    - keyword1
    - keyword2
    - keyword3

    SUGGESTIONS:
    Detailed suggestions for where and how to integrate these keywords into the resume. Make sure that each suggestion should be on a different line.

    Job Description:
    {job_description}

    Resume:
    {resume_text}
    """

    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()

        # Parse the plain text format instead of JSON
        keywords = []
        suggestions = ""

        # Extract sections
        if "MISSING KEYWORDS:" in response_text:
            parts = response_text.split("SUGGESTIONS:")

            # Extract keywords
            keywords_section = parts[0].split("MISSING KEYWORDS:")[1].strip()
            keywords_lines = keywords_section.split("\n")
            for line in keywords_lines:
                if line.strip().startswith("- "):
                    keywords.append(line.strip()[2:])

            # Extract suggestions
            if len(parts) > 1:
                suggestions = parts[1].strip()

        return {
            "missingKeywords": keywords,
            "optimizationSuggestions": suggestions
        }
    except Exception as e:
        print(f"Error analyzing keywords: {e}")
        return {
            "missingKeywords": [],
            "optimizationSuggestions": f"Error analyzing keywords. Please try again."
        }


def generate_cover_letter(personal_info: Dict[str, str], company_info: Dict[str, str], 
                         job_description: str, resume_text: str) -> str:
    """Generate a cover letter based on resume and job description"""
    # Format the personal information for the prompt
    personal_info_formatted = f"""
Full Name: {personal_info.get('fullName', '')}
"""

    if personal_info.get('email'):
        personal_info_formatted += f"Email: {personal_info.get('email')}\n"

    if personal_info.get('phone'):
        personal_info_formatted += f"Phone: {personal_info.get('phone')}\n"

    if personal_info.get('address'):
        personal_info_formatted += f"Address: {personal_info.get('address')}\n"

    # Format the company information for the prompt
    company_info_formatted = f"""
Company Name: {company_info.get('companyName', '')}
"""

    if company_info.get('hiringManager'):
        company_info_formatted += f"Hiring Manager: {company_info.get('hiringManager')}\n"

    if company_info.get('companyAddress'):
        company_info_formatted += f"Company Address: {company_info.get('companyAddress')}\n"

    prompt = f"""
    You are an expert cover letter writer in fields of Data Science, Data Analysts, Software Engineering and Electrical Engineering. Write a professional cover letter with:
    - Include the personal information at the top left
    - Include the company information below personal info
    - 3-4 paragraphs highlighting relevant experience and skills
    - Address key job requirements
    - Natural, personalized tone
    - End with "Sincerely," followed by the person's name

    Personal Information:
    {personal_info_formatted}

    Company Information:
    {company_info_formatted}

    Job Description:
    {job_description}

    Resume:
    {resume_text}

    Please format the cover letter properly with the personal information at the top left, company info below it, then a greeting, body paragraphs, and closing.
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating cover letter: {e}")
        return "Unable to generate cover letter."