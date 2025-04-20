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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';

const MotionBox = motion(Box);

interface ResumeSummaryProps {
  summary: string;
  isLoading?: boolean;
}

const ResumeSummary: React.FC<ResumeSummaryProps> = ({
  summary,
  isLoading = false,
}) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  
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
      <VStack spacing={4} align="stretch">
        <Flex align="center">
          <Icon as={FiFileText} boxSize={6} color={accentColor} />
          <Heading size="md" ml={2}>
            Resume Summary
          </Heading>
        </Flex>
        
        {isLoading ? (
          <VStack spacing={3} align="stretch">
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="95%" />
            <Skeleton height="20px" width="90%" />
          </VStack>
        ) : (
          <Text>{summary}</Text>
        )}
      </VStack>
    </MotionBox>
  );
};

export default ResumeSummary;