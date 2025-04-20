// API Response Types
export interface SummaryResponse {
    summary: string;
  }
  
  export interface SimilarityResponse {
    similarityScore: string;
    similarityExplanation: string;
  }
  
  export interface KeywordsResponse {
    missingKeywords: string[];
    optimizationSuggestions: string;
  }
  
  export interface CoverLetterResponse {
    coverLetter: string;
  }
  
  // Form Data Types
  export interface ResumeJobFormData {
    jobDescription: string;
    resumeText: string;
    resumeFile?: File;
  }
  
  export interface PersonalInfoFormData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export interface CompanyInfoFormData {
    companyName: string;
    hiringManager: string;
    companyAddress: string;
  }
  
  // Combined form data
  export interface AllFormData {
    resumeJob: ResumeJobFormData;
    personalInfo: PersonalInfoFormData;
    companyInfo: CompanyInfoFormData;
  }
  
  // Analysis Results
  export interface AnalysisResults {
    summary?: string;
    similarity?: SimilarityResponse;
    keywords?: KeywordsResponse;
    coverLetter?: string;
  }
  
  // Steps for the wizard interface
  export enum WizardStep {
    UPLOAD_RESUME = 'upload',
    ENTER_JOB_DETAILS = 'job',
    ENTER_PERSONAL_INFO = 'personal',
    ENTER_COMPANY_INFO = 'company',
    VIEW_RESULTS = 'results'
  }