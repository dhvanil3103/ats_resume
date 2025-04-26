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
      p={{ base: 4, md: 6 }}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      width="100%"
    >
      <VStack spacing={{ base: 5, md: 8 }} align="stretch">
        {/* Personal Information Section */}
        <VStack spacing={{ base: 2, md: 4 }} align="stretch">
          <Heading size={{ base: "sm", md: "md" }}>Your Information</Heading>
          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
            This information will be used in your cover letter.
          </Text>
          
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
            <FormControl isRequired isInvalid={!!errors.fullName}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Full Name</FormLabel>
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
                fontSize={{ base: "sm", md: "md" }}
              />
              {errors.fullName && (
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Email</FormLabel>
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
                fontSize={{ base: "sm", md: "md" }}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Phone</FormLabel>
              <Input
                placeholder="(123) 456-7890"
                value={personalInfo.phone}
                onChange={(e) =>
                  onPersonalInfoChange({
                    ...personalInfo,
                    phone: e.target.value,
                  })
                }
                fontSize={{ base: "sm", md: "md" }}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Address</FormLabel>
              <Input
                placeholder="123 Main St, City, State, ZIP"
                value={personalInfo.address}
                onChange={(e) =>
                  onPersonalInfoChange({
                    ...personalInfo,
                    address: e.target.value,
                  })
                }
                fontSize={{ base: "sm", md: "md" }}
              />
            </FormControl>
          </SimpleGrid>
        </VStack>
        
        {/* Company Information Section */}
        <VStack spacing={{ base: 2, md: 4 }} align="stretch">
          <Heading size={{ base: "sm", md: "md" }}>Company Information</Heading>
          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
            Add details about the company you're applying to.
          </Text>
          
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
            <FormControl isRequired isInvalid={!!errors.companyName}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Company Name</FormLabel>
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
                fontSize={{ base: "sm", md: "md" }}
              />
              {errors.companyName && (
                <FormErrorMessage>{errors.companyName}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Hiring Manager</FormLabel>
              <Input
                placeholder="Jane Smith"
                value={companyInfo.hiringManager}
                onChange={(e) =>
                  onCompanyInfoChange({
                    ...companyInfo,
                    hiringManager: e.target.value,
                  })
                }
                fontSize={{ base: "sm", md: "md" }}
              />
            </FormControl>
            
            <FormControl gridColumn={{ md: 'span 2' }}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Company Address</FormLabel>
              <Input
                placeholder="456 Business Ave, City, State, ZIP"
                value={companyInfo.companyAddress}
                onChange={(e) =>
                  onCompanyInfoChange({
                    ...companyInfo,
                    companyAddress: e.target.value,
                  })
                }
                fontSize={{ base: "sm", md: "md" }}
              />
            </FormControl>
          </SimpleGrid>
        </VStack>
        
        {/* Form Navigation Buttons */}
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
          <Button
            variant="outline"
            colorScheme="brand"
            onClick={onBack}
            isDisabled={isLoading}
            width="100%"
            mb={{ base: 2, sm: 0 }}
            gridColumn={{ base: "span 1", sm: "auto" }}
          >
            Back
          </Button>
          
          <Button
            type="submit"
            colorScheme="brand"
            isLoading={isLoading}
            loadingText="Generating..."
            width="100%"
            gridColumn={{ base: "span 1", sm: "auto" }}
          >
            Generate Cover Letter
          </Button>
        </SimpleGrid>
      </VStack>
    </MotionBox>
  );
};

export default PersonalInfoForm;