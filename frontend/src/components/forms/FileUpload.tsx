import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import { extractTextFromFile } from '../../services/api';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  onFileSelected: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileContent,
  onFileSelected,
  accept = '.pdf,.txt,.docx',
  maxSize = 5 * 1024 * 1024, // 5MB
  label = 'Upload File',
  placeholder = 'Drag and drop a file here, or click to select a file',
  isRequired = false,
  isError = false,
  errorMessage = 'Please upload a file',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const borderColorHover = useColorModeValue('brand.300', 'brand.400');
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      onFileSelected(selectedFile);
      setError(null);
      
      // Extract content from file
      setIsLoading(true);
      try {
        const { content } = await extractTextFromFile(selectedFile);
        onFileContent(content);
      } catch (error) {
        console.error('Error extracting file content:', error);
        setError('Error reading file. Please try again or paste the content manually.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [onFileContent, onFileSelected]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize,
    multiple: false,
  });
  
  const removeFile = () => {
    setFile(null);
    onFileSelected(null);
    onFileContent('');
  };
  
  return (
    <FormControl isRequired={isRequired} isInvalid={isError || !!error}>
      <FormLabel>{label}</FormLabel>
      <Box
        {...getRootProps()}
        p={4}
        border="2px dashed"
        borderColor={isDragActive ? borderColorHover : borderColor}
        borderRadius="md"
        bg={bg}
        transition="all 0.2s"
        _hover={{
          borderColor: borderColorHover,
        }}
        cursor="pointer"
      >
        <input {...getInputProps()} />
        
        {isLoading ? (
          <Flex justify="center" align="center" p={6}>
            <Spinner size="lg" color="brand.500" />
            <Text ml={4}>Processing file...</Text>
          </Flex>
        ) : file ? (
          <HStack spacing={4} justify="space-between">
            <HStack>
              <Icon as={FiFile} w={6} h={6} />
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">{file.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {(file.size / 1024).toFixed(2)} KB
                </Text>
              </VStack>
            </HStack>
            <Button
              size="sm"
              colorScheme="red"
              variant="ghost"
              leftIcon={<Icon as={FiX} />}
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              Remove
            </Button>
          </HStack>
        ) : (
          <Flex direction="column" align="center" justify="center" p={6}>
            <Icon as={FiUpload} w={8} h={8} mb={2} />
            <Text textAlign="center">{placeholder}</Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Supported formats: PDF, TXT, DOCX (max {maxSize / 1024 / 1024}MB)
            </Text>
          </Flex>
        )}
      </Box>
      
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {isError && !error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default FileUpload;