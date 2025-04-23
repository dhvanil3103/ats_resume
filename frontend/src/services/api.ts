import axios from 'axios';
import { 
  SummaryResponse, 
  SimilarityResponse, 
  KeywordsResponse, 
  CoverLetterResponse 
} from './types';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://ats-resume-ihvx.onrender.com/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Resume summary
export const getResumeSummary = async (
  resumeText?: string,
  resumeFile?: File
): Promise<SummaryResponse> => {
  const formData = new FormData();
  
  if (resumeText) {
    formData.append('resume', resumeText);
  }
  
  if (resumeFile) {
    formData.append('resume_file', resumeFile);
  }
  
  const response = await api.post<SummaryResponse>('/analysis/summary', formData);
  return response.data;
};

// Similarity score
export const getSimilarityScore = async (
  jobDescription: string,
  resumeText?: string,
  resumeFile?: File
): Promise<SimilarityResponse> => {
  const formData = new FormData();
  formData.append('job_description', jobDescription);
  
  if (resumeText) {
    formData.append('resume', resumeText);
  }
  
  if (resumeFile) {
    formData.append('resume_file', resumeFile);
  }
  
  const response = await api.post<SimilarityResponse>('/analysis/similarity', formData);
  
  // Ensure similarityScore is a string
  if (typeof response.data.similarityScore !== 'string') {
    response.data.similarityScore = `${response.data.similarityScore}%`;
  }
  
  return response.data;
};

// Missing keywords
export const getMissingKeywords = async (
  jobDescription: string,
  resumeText?: string,
  resumeFile?: File
): Promise<KeywordsResponse> => {
  const formData = new FormData();
  formData.append('job_description', jobDescription);
  
  if (resumeText) {
    formData.append('resume', resumeText);
  }
  
  if (resumeFile) {
    formData.append('resume_file', resumeFile);
  }
  
  const response = await api.post<KeywordsResponse>('/analysis/keywords', formData);
  return response.data;
};

// Cover letter generation
export const generateCoverLetter = async (
  jobDescription: string,
  companyName: string,
  fullName: string,
  resumeText?: string,
  resumeFile?: File,
  additionalInfo?: {
    hiringManager?: string;
    companyAddress?: string;
    email?: string;
    phone?: string;
    address?: string;
  }
): Promise<CoverLetterResponse> => {
  const formData = new FormData();
  formData.append('job_description', jobDescription);
  formData.append('company_name', companyName);
  formData.append('full_name', fullName);
  
  if (resumeText) {
    formData.append('resume', resumeText);
  }
  
  if (resumeFile) {
    formData.append('resume_file', resumeFile);
  }
  
  if (additionalInfo) {
    if (additionalInfo.hiringManager) {
      formData.append('hiring_manager', additionalInfo.hiringManager);
    }
    
    if (additionalInfo.companyAddress) {
      formData.append('company_address', additionalInfo.companyAddress);
    }
    
    if (additionalInfo.email) {
      formData.append('email', additionalInfo.email);
    }
    
    if (additionalInfo.phone) {
      formData.append('phone', additionalInfo.phone);
    }
    
    if (additionalInfo.address) {
      formData.append('address', additionalInfo.address);
    }
  }
  
  const response = await api.post<CoverLetterResponse>('/generate/cover-letter', formData);
  return response.data;
};

// Download cover letter
export const downloadCoverLetter = async (
  coverLetter: string,
  fullName: string
): Promise<Blob> => {
  const formData = new FormData();
  formData.append('cover_letter', coverLetter);
  formData.append('full_name', fullName);
  
  const response = await api.post('/generate/download-cover-letter', formData, {
    responseType: 'blob',
  });
  
  return response.data;
};

// Extract text from uploaded file
export const extractTextFromFile = async (
    file: File
  ): Promise<{ content: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    console.log("Uploading file:", file.name, "Size:", file.size, "Type:", file.type);
    
    try {
      const response = await api.post<{ filename: string; content: string }>('/documents/upload', formData);
      console.log("Upload response:", response.data);
      return { content: response.data.content };
    } catch (error) {
      console.error("Error details:", error);
      throw error;
    }
  };

