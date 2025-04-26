import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import FileUpload from './FileUpload';
import { ResumeJobFormData } from '../../services/types';

const MotionBox = motion(Box);

interface ResumeJobFormProps {
  formData: ResumeJobFormData;
  onChange: (data: ResumeJobFormData) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const ResumeJobForm: React.FC<ResumeJobFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading = false,
}) => {
  const [errors, setErrors] = useState<{
    jobDescription?: string;
    resume?: string;
  }>({});
  
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      jobDescription?: string;
      resume?: string;
    } = {};
    
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    }
    
    if (!formData.resumeText.trim() && !formData.resumeFile) {
      newErrors.resume = 'Please enter your resume or upload a file';
    }
    
    setErrors(newErrors);
    
    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };
  
  // Handle resume file content
  const handleResumeFileContent = (content: string) => {
    onChange({
      ...formData,
      resumeText: content,
    });
    
    toast({
      title: 'Resume uploaded successfully',
      description: 'We\'ve extracted the text from your resume.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={{ base: 4, md: 6 }}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      width="100%"
    >
      <VStack spacing={{ base: 4, md: 6 }} align="stretch">
        <Heading size={{ base: "sm", md: "md" }}>Job & Resume Information</Heading>
        
        {/* Job Description */}
        <FormControl isRequired isInvalid={!!errors.jobDescription}>
          <FormLabel>Job Description</FormLabel>
          <Textarea
            placeholder="Paste the job description here..."
            value={formData.jobDescription}
            onChange={(e) => {
              onChange({
                ...formData,
                jobDescription: e.target.value,
              });
              
              if (e.target.value.trim()) {
                setErrors((prev) => ({
                  ...prev,
                  jobDescription: undefined,
                }));
              }
            }}
            minHeight={{ base: "150px", md: "200px" }}
            fontSize={{ base: "sm", md: "md" }}
          />
          {errors.jobDescription && (
            <FormErrorMessage>{errors.jobDescription}</FormErrorMessage>
          )}
        </FormControl>
        
        {/* Resume Section with Tabs */}
        <FormControl isRequired isInvalid={!!errors.resume}>
          <FormLabel>Your Resume</FormLabel>
          
          <Tabs variant="enclosed" colorScheme="brand" size={{ base: "sm", md: "md" }}>
            <TabList>
              <Tab>Upload Resume</Tab>
              <Tab>Paste Resume</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel px={0}>
                <FileUpload
                  onFileContent={handleResumeFileContent}
                  onFileSelected={(file) => {
                    onChange({
                      ...formData,
                      resumeFile: file || undefined,
                    });
                    
                    if (file) {
                      setErrors((prev) => ({
                        ...prev,
                        resume: undefined,
                      }));
                    }
                  }}
                  label=""
                  placeholder="Drag and drop your resume here, or click to select a file"
                />
              </TabPanel>
              
              <TabPanel px={0}>
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={formData.resumeText}
                  onChange={(e) => {
                    onChange({
                      ...formData,
                      resumeText: e.target.value,
                    });
                    
                    if (e.target.value.trim()) {
                      setErrors((prev) => ({
                        ...prev,
                        resume: undefined,
                      }));
                    }
                  }}
                  minHeight={{ base: "150px", md: "200px" }}
                  fontSize={{ base: "sm", md: "md" }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          {errors.resume && (
            <FormErrorMessage>{errors.resume}</FormErrorMessage>
          )}
        </FormControl>
        
        <Text fontSize="xs" color="gray.500">
          Your data is processed securely and not stored beyond this session.
        </Text>
        
        <Button
          type="submit"
          colorScheme="brand"
          size={{ base: "md", md: "lg" }}
          isLoading={isLoading}
          loadingText="Analyzing..."
          width="100%"
        >
          Continue
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default ResumeJobForm;