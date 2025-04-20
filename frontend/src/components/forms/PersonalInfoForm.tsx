import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PersonalInfoFormData, CompanyInfoFormData } from '../../services/types';

const MotionBox = motion(Box);

interface PersonalInfoFormProps {
  personalInfo: PersonalInfoFormData;
  companyInfo: CompanyInfoFormData;
  onPersonalInfoChange: (data: PersonalInfoFormData) => void;
  onCompanyInfoChange: (data: CompanyInfoFormData) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  companyInfo,
  onPersonalInfoChange,
  onCompanyInfoChange,
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const [errors, setErrors] = useState<{
    fullName?: string;
    companyName?: string;
  }>({});
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      fullName?: string;
      companyName?: string;
    } = {};
    
    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = 'Your full name is required';
    }
    
    if (!companyInfo.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    setErrors(newErrors);
    
    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  };
  
  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      width="100%"
    >
      <VStack spacing={8} align="stretch">
        {/* Personal Information Section */}
        <VStack spacing={4} align="stretch">
          <Heading size="md">Your Information</Heading>
          <Text fontSize="sm" color="gray.500">
            This information will be used in your cover letter.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired isInvalid={!!errors.fullName}>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="John Doe"
                value={personalInfo.fullName}
                onChange={(e) => {
                  onPersonalInfoChange({
                    ...personalInfo,
                    fullName: e.target.value,
                  });
                  
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({
                      ...prev,
                      fullName: undefined,
                    }));
                  }
                }}
              />
              {errors.fullName && (
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                value={personalInfo.email}
                onChange={(e) =>
                  onPersonalInfoChange({
                    ...personalInfo,
                    email: e.target.value,
                  })
                }
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="(123) 456-7890"
                value={personalInfo.phone}
                onChange={(e) =>
                  onPersonalInfoChange({
                    ...personalInfo,
                    phone: e.target.value,
                  })
                }
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="123 Main St, City, State, ZIP"
                value={personalInfo.address}
                onChange={(e) =>
                  onPersonalInfoChange({
                    ...personalInfo,
                    address: e.target.value,
                  })
                }
              />
            </FormControl>
          </SimpleGrid>
        </VStack>
        
        {/* Company Information Section */}
        <VStack spacing={4} align="stretch">
          <Heading size="md">Company Information</Heading>
          <Text fontSize="sm" color="gray.500">
            Add details about the company you're applying to.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired isInvalid={!!errors.companyName}>
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder="Acme Corporation"
                value={companyInfo.companyName}
                onChange={(e) => {
                  onCompanyInfoChange({
                    ...companyInfo,
                    companyName: e.target.value,
                  });
                  
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({
                      ...prev,
                      companyName: undefined,
                    }));
                  }
                }}
              />
              {errors.companyName && (
                <FormErrorMessage>{errors.companyName}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl>
              <FormLabel>Hiring Manager</FormLabel>
              <Input
                placeholder="Jane Smith"
                value={companyInfo.hiringManager}
                onChange={(e) =>
                  onCompanyInfoChange({
                    ...companyInfo,
                    hiringManager: e.target.value,
                  })
                }
              />
            </FormControl>
            
            <FormControl gridColumn={{ md: 'span 2' }}>
              <FormLabel>Company Address</FormLabel>
              <Input
                placeholder="456 Business Ave, City, State, ZIP"
                value={companyInfo.companyAddress}
                onChange={(e) =>
                  onCompanyInfoChange({
                    ...companyInfo,
                    companyAddress: e.target.value,
                  })
                }
              />
            </FormControl>
          </SimpleGrid>
        </VStack>
        
        {/* Form Navigation Buttons */}
        <SimpleGrid columns={2} spacing={4}>
          <Button
            variant="outline"
            colorScheme="brand"
            onClick={onBack}
            isDisabled={isLoading}
          >
            Back
          </Button>
          
          <Button
            type="submit"
            colorScheme="brand"
            isLoading={isLoading}
            loadingText="Generating..."
          >
            Generate Cover Letter
          </Button>
        </SimpleGrid>
      </VStack>
    </MotionBox>
  );
};

export default PersonalInfoForm;