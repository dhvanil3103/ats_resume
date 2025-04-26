import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useToast,
  Grid,
  GridItem,
  Button,
  HStack,
  useColorModeValue,
  Stepper,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepNumber,
  StepSeparator,
  useSteps,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import PageLayout from './components/ui/PageLayout';
import LoadingOverlay from './components/ui/LoadingOverlay';
import ResumeJobForm from './components/forms/ResumeJobForm';
import PersonalInfoForm from './components/forms/PersonalInfoForm';
import ResumeSummary from './components/analysis/ResumeSummary';
import SimilarityScore from './components/analysis/SimilarityScore';
import MissingKeywords from './components/analysis/MissingKeywords';
import CoverLetter from './components/generation/CoverLetter';

// Services & Types
import {
  getResumeSummary,
  getSimilarityScore,
  getMissingKeywords,
  generateCoverLetter,
} from './services/api';
import {
  ResumeJobFormData,
  PersonalInfoFormData,
  CompanyInfoFormData,
  AnalysisResults,
  WizardStep,
} from './services/types';

// Create React Query client
const queryClient = new QueryClient();

// Main app wrapped with providers
const AppWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Steps for the wizard
const steps = [
  { title: 'Upload', description: 'Resume & Job Description' },
  { title: 'Details', description: 'Personal Information' },
  { title: 'Results', description: 'Analysis & Cover Letter' },
];

const App = () => {
  // State
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.UPLOAD_RESUME);
  const [resumeJobForm, setResumeJobForm] = useState<ResumeJobFormData>({
    jobDescription: '',
    resumeText: '',
  });
  const [personalInfoForm, setPersonalInfoForm] = useState<PersonalInfoFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [companyInfoForm, setCompanyInfoForm] = useState<CompanyInfoFormData>({
    companyName: '',
    hiringManager: '',
    companyAddress: '',
  });
  const [results, setResults] = useState<AnalysisResults>({});
  
  // Hooks
  const toast = useToast();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  
  // Background colors
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  // Track animation direction
  const [direction, setDirection] = useState<number>(0);
  
  // Resume Summary mutation
  const summaryMutation = useMutation({
    mutationFn: () => 
      getResumeSummary(resumeJobForm.resumeText, resumeJobForm.resumeFile),
    onSuccess: (data) => {
      setResults((prev) => ({
        ...prev,
        summary: data.summary,
      }));
    },
    onError: (error) => {
      console.error('Error getting resume summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate resume summary. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  
  // Similarity Score mutation
  const similarityMutation = useMutation({
    mutationFn: () => 
      getSimilarityScore(
        resumeJobForm.jobDescription,
        resumeJobForm.resumeText,
        resumeJobForm.resumeFile
      ),
    onSuccess: (data) => {
      setResults((prev) => ({
        ...prev,
        similarity: data,
      }));
    },
    onError: (error) => {
      console.error('Error getting similarity score:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate similarity score. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  
  // Keywords mutation
  const keywordsMutation = useMutation({
    mutationFn: () => 
      getMissingKeywords(
        resumeJobForm.jobDescription,
        resumeJobForm.resumeText,
        resumeJobForm.resumeFile
      ),
    onSuccess: (data) => {
      setResults((prev) => ({
        ...prev,
        keywords: data,
      }));
    },
    onError: (error) => {
      console.error('Error getting missing keywords:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze keywords. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  
  // Cover Letter mutation
  const coverLetterMutation = useMutation({
    mutationFn: () => 
      generateCoverLetter(
        resumeJobForm.jobDescription,
        companyInfoForm.companyName,
        personalInfoForm.fullName,
        resumeJobForm.resumeText,
        resumeJobForm.resumeFile,
        {
          hiringManager: companyInfoForm.hiringManager,
          companyAddress: companyInfoForm.companyAddress,
          email: personalInfoForm.email,
          phone: personalInfoForm.phone,
          address: personalInfoForm.address,
        }
      ),
    onSuccess: (data) => {
      setResults((prev) => ({
        ...prev,
        coverLetter: data.coverLetter,
      }));
      
      // Move to the results step
      setDirection(1);
      setCurrentStep(WizardStep.VIEW_RESULTS);
      setActiveStep(2); // Move stepper to the results step
    },
    onError: (error) => {
      console.error('Error generating cover letter:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate cover letter. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  
  // Check if any mutation is loading
  const isLoading =
    summaryMutation.isLoading ||
    similarityMutation.isLoading ||
    keywordsMutation.isLoading ||
    coverLetterMutation.isLoading;
  
  // Handle Resume & Job form submission
  const handleResumeJobSubmit = async () => {
    try {
      // Start all analysis mutations in parallel
      await Promise.all([
        summaryMutation.mutateAsync(),
        similarityMutation.mutateAsync(),
        keywordsMutation.mutateAsync(),
      ]);
      
      // Move to the next step
      setDirection(1);
      setCurrentStep(WizardStep.ENTER_PERSONAL_INFO);
      setActiveStep(1); // Move stepper to the personal info step
      
      toast({
        title: 'Analysis complete',
        description: 'Resume analysis complete. Now enter your personal details.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error during analysis:', error);
    }
  };
  
  // Handle Personal Info form submission
  const handlePersonalInfoSubmit = () => {
    // Generate cover letter
    coverLetterMutation.mutate();
  };
  
  // Handle back button
  const handleBack = () => {
    setDirection(-1);
    
    if (currentStep === WizardStep.ENTER_PERSONAL_INFO) {
      setCurrentStep(WizardStep.UPLOAD_RESUME);
      setActiveStep(0);
    } else if (currentStep === WizardStep.VIEW_RESULTS) {
      setCurrentStep(WizardStep.ENTER_PERSONAL_INFO);
      setActiveStep(1);
    }
  };
  
  // Handle restart
  const handleRestart = () => {
    // Reset all state
    setResumeJobForm({
      jobDescription: '',
      resumeText: '',
    });
    setPersonalInfoForm({
      fullName: '',
      email: '',
      phone: '',
      address: '',
    });
    setCompanyInfoForm({
      companyName: '',
      hiringManager: '',
      companyAddress: '',
    });
    setResults({});
    
    // Go back to first step
    setDirection(-1);
    setCurrentStep(WizardStep.UPLOAD_RESUME);
    setActiveStep(0);
  };
  
  return (
    <PageLayout>
      <LoadingOverlay 
        isVisible={isLoading} 
        message={
          coverLetterMutation.isLoading
            ? 'Generating your cover letter...'
            : 'Analyzing your resume...'
        }
      />
      
      <Container maxW="container.md" py={{ base: 3, md: 8 }} px={{ base: 3, md: 6 }}>
        <VStack spacing={{ base: 4, md: 8 }} align="stretch">
          {/* Hero Section */}
          <VStack spacing={{ base: 1, md: 2 }} textAlign="center" mb={{ base: 3, md: 6 }}>
            <Heading 
              as="h1" 
              size={{ base: "xl", md: "2xl" }}
              bgGradient="linear(to-r, brand.400, brand.600)"
              bgClip="text"
              lineHeight="1.2"
              fontSize={{ base: "28px", md: "36px" }}
              px={2}
              wordBreak="break-word"
            >
              Resume Optimizer & Cover Letter Generator
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="gray.500" px={2}>
              Optimize your resume for ATS systems and generate tailored cover letters
            </Text>
          </VStack>
          
          {/* Stepper */}
          <Box width="100%" overflow="hidden" position="relative" pb={2}>
            <Box overflowX="auto" width="100%" pb={2} mx={-2} px={2}>
              <Stepper 
                index={activeStep} 
                colorScheme="brand" 
                mb={{ base: 4, md: 8 }} 
                size={{ base: "sm", md: "md" }}
                minWidth="400px"
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    
                    <Box flexShrink={0}>
                      <StepTitle fontSize={{ base: "xs", md: "sm" }}>{step.title}</StepTitle>
                      <StepDescription 
                        display={{ base: "none", md: "block" }}
                        fontSize={{ base: "xs", md: "xs" }}
                      >
                        {step.description}
                      </StepDescription>
                    </Box>
                    
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          
          {/* Main Content */}
          <Box
            as={motion.div}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 } as any}
            width="100%"
          >
            <AnimatePresence mode="wait" custom={direction}>
              {currentStep === WizardStep.UPLOAD_RESUME && (
                <motion.div
                  key="upload"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 } as any}
                >
                  <ResumeJobForm 
                    formData={resumeJobForm}
                    onChange={setResumeJobForm}
                    onSubmit={handleResumeJobSubmit}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}
              
              {currentStep === WizardStep.ENTER_PERSONAL_INFO && (
                <motion.div
                  key="personal"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 } as any}
                >
                  <PersonalInfoForm 
                    personalInfo={personalInfoForm}
                    companyInfo={companyInfoForm}
                    onPersonalInfoChange={setPersonalInfoForm}
                    onCompanyInfoChange={setCompanyInfoForm}
                    onSubmit={handlePersonalInfoSubmit}
                    onBack={handleBack}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}
              
              {currentStep === WizardStep.VIEW_RESULTS && (
                <motion.div
                  key="results"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 } as any}
                >
                  <VStack spacing={8} align="stretch">
                    <Box
                      p={{ base: 4, md: 6 }}
                      bg={cardBgColor}
                      borderRadius="lg"
                      border="1px"
                      borderColor={borderColor}
                      boxShadow="md"
                    >
                      <VStack spacing={4} align="stretch">
                        <Heading size={{ base: "md", md: "lg" }}>Analysis Results</Heading>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          Here's your resume analysis and cover letter. You can download or copy the cover letter to use in your job application.
                        </Text>
                        
                        <HStack spacing={3} justify="space-between" flexWrap="wrap" gap={2}>
                          <Button
                            colorScheme="brand"
                            variant="outline"
                            onClick={handleBack}
                            size={{ base: "sm", md: "md" }}
                          >
                            Back
                          </Button>
                          <Button
                            colorScheme="brand"
                            variant="ghost"
                            onClick={handleRestart}
                            size={{ base: "sm", md: "md" }}
                          >
                            Start Over
                          </Button>
                        </HStack>
                      </VStack>
                    </Box>
                    
                    <Grid
                      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                      gap={{ base: 4, md: 6 }}
                    >
                      <GridItem>
                        <ResumeSummary 
                          summary={results.summary || ''} 
                        />
                      </GridItem>
                      
                      <GridItem>
                        <SimilarityScore 
                          data={results.similarity} 
                        />
                      </GridItem>
                      
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <MissingKeywords 
                          data={results.keywords} 
                        />
                      </GridItem>
                      
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <CoverLetter 
                          coverLetter={results.coverLetter || ''} 
                          fullName={personalInfoForm.fullName}
                        />
                      </GridItem>
                    </Grid>
                  </VStack>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </VStack>
      </Container>
    </PageLayout>
  );
};

export default AppWrapper;