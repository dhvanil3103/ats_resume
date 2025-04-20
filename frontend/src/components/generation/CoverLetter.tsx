import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  Flex,
  Skeleton,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiFileText, FiDownload, FiClipboard } from 'react-icons/fi';
import { downloadCoverLetter } from '../../services/api';

const MotionBox = motion(Box);

interface CoverLetterProps {
  coverLetter: string;
  fullName: string;
  isLoading?: boolean;
}

const CoverLetter: React.FC<CoverLetterProps> = ({
  coverLetter,
  fullName,
  isLoading = false,
}) => {
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const paperBgColor = useColorModeValue('white', 'gray.800');
  const paperBoxShadow = useColorModeValue('md', 'dark-lg');
  
  const handleDownload = async () => {
    try {
      const blob = await downloadCoverLetter(coverLetter, fullName);
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Cover_Letter_${fullName.replace(/\\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: 'Download successful',
        description: 'Cover letter downloaded as a text file.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error downloading cover letter:', error);
      
      toast({
        title: 'Download failed',
        description: 'There was an error downloading your cover letter.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter)
      .then(() => {
        toast({
          title: 'Copied to clipboard',
          description: 'Cover letter text copied to clipboard.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        
        toast({
          title: 'Copy failed',
          description: 'There was an error copying to clipboard.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        bg: accentColor,
      }}
    >
      <VStack spacing={6} align="stretch">
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Icon as={FiFileText} boxSize={6} color={accentColor} />
            <Heading size="md" ml={2}>
              Cover Letter
            </Heading>
          </Flex>
          
          {!isLoading && coverLetter && (
            <HStack>
              <Button
                size="sm"
                leftIcon={<Icon as={FiClipboard} />}
                onClick={handleCopyToClipboard}
                variant="outline"
                colorScheme="brand"
              >
                Copy
              </Button>
              <Button
                size="sm"
                leftIcon={<Icon as={FiDownload} />}
                onClick={handleDownload}
                colorScheme="brand"
              >
                Download
              </Button>
            </HStack>
          )}
        </Flex>
        
        {isLoading ? (
          <VStack spacing={3} align="stretch">
            <Skeleton height="20px" width="40%" />
            <Skeleton height="20px" width="60%" />
            <Skeleton height="20px" width="30%" />
            <Skeleton height="10px" />
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="95%" />
            <Skeleton height="20px" width="90%" />
            <Skeleton height="10px" />
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="95%" />
            <Skeleton height="20px" width="98%" />
            <Skeleton height="10px" />
            <Skeleton height="20px" width="40%" />
            <Skeleton height="20px" width="20%" />
          </VStack>
        ) : coverLetter ? (
          <Box
            bg={paperBgColor}
            p={6}
            borderRadius="md"
            boxShadow={paperBoxShadow}
            whiteSpace="pre-line"
            fontFamily="'Times New Roman', serif"
          >
            {coverLetter}
          </Box>
        ) : (
          <Text>No cover letter generated yet</Text>
        )}
      </VStack>
    </MotionBox>
  );
};

export default CoverLetter;