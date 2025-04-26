import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  Flex,
  Skeleton,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiPercent } from 'react-icons/fi';
import { SimilarityResponse } from '../../services/types';

const MotionBox = motion(Box);

interface SimilarityScoreProps {
  data?: SimilarityResponse;
  isLoading?: boolean;
}

const SimilarityScore: React.FC<SimilarityScoreProps> = ({
  data,
  isLoading = false,
}) => {
  const [scoreValue, setScoreValue] = useState<number>(0);
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const scoreColor = getScoreColor(scoreValue);
  
  useEffect(() => {
    if (data && data.similarityScore) {
      // Add type checking before using string methods
      if (typeof data.similarityScore === 'string') {
        // Extract numeric value from percentage string (e.g. "75%" -> 75)
        const numericValue = parseInt(data.similarityScore.replace(/\D/g, ''), 10);
        setScoreValue(isNaN(numericValue) ? 0 : numericValue);
      } else if (typeof data.similarityScore === 'number') {
        // Handle case where similarityScore is already a number
        setScoreValue(data.similarityScore);
      } else {
        // Handle unexpected type
        console.error('similarityScore has unexpected type:', typeof data.similarityScore);
        setScoreValue(0);
      }
    }
  }, [data]);
  
  function getScoreColor(score: number): string {
    if (score >= 80) return 'green.500';
    if (score >= 60) return 'yellow.500';
    if (score >= 40) return 'orange.500';
    return 'red.500';
  }
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={{ base: 4, md: 6 }}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      boxShadow="md"
      position="relative"
      overflow="hidden"
      height="100%"
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
      <VStack spacing={{ base: 4, md: 6 }} align="stretch" height="100%">
        <Flex align="center">
          <Icon as={FiPercent} boxSize={{ base: 5, md: 6 }} color={accentColor} />
          <Heading size={{ base: "sm", md: "md" }} ml={2}>
            Match Analysis
          </Heading>
        </Flex>
        
        {isLoading ? (
          <VStack spacing={6} align="center">
            <Skeleton height="120px" width="120px" borderRadius="full" />
            <VStack spacing={3} align="stretch" width="100%">
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="95%" />
              <Skeleton height="20px" width="90%" />
            </VStack>
          </VStack>
        ) : data ? (
          <VStack spacing={5} align="stretch" flex="1">
            <Flex justify="center" mb={4}>
              <Box position="relative">
                <CircularProgress
                  value={scoreValue}
                  color={scoreColor}
                  size={{ base: "120px", md: "150px" }}
                  thickness="10px"
                >
                  <CircularProgressLabel fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                    {data.similarityScore}
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
            </Flex>
            
            <Box>
              <Heading 
                size="sm" 
                mb={2}
              >
                Resume-Job Match
              </Heading>
              <Text 
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="1.5"
              >
                {data.similarityExplanation}
              </Text>
            </Box>
          </VStack>
        ) : (
          <Text>No similarity data available</Text>
        )}
      </VStack>
    </MotionBox>
  );
};

export default SimilarityScore;