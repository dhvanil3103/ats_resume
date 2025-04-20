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
  Wrap,
  WrapItem,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiKey } from 'react-icons/fi';
import { KeywordsResponse } from '../../services/types';

const MotionBox = motion(Box);

interface MissingKeywordsProps {
  data?: KeywordsResponse;
  isLoading?: boolean;
}

const MissingKeywords: React.FC<MissingKeywordsProps> = ({
  data,
  isLoading = false,
}) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const keywordBgColor = useColorModeValue('brand.50', 'brand.800');
  
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
        <Flex align="center">
          <Icon as={FiKey} boxSize={6} color={accentColor} />
          <Heading size="md" ml={2}>
            Missing Keywords
          </Heading>
        </Flex>
        
        {isLoading ? (
          <VStack spacing={6} align="stretch">
            <Wrap spacing={2}>
              {[...Array(8)].map((_, i) => (
                <WrapItem key={i}>
                  <Skeleton height="24px" width={`${Math.floor(Math.random() * 80) + 60}px`} borderRadius="full" />
                </WrapItem>
              ))}
            </Wrap>
            
            <Divider />
            
            <VStack spacing={3} align="stretch">
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="95%" />
              <Skeleton height="20px" width="90%" />
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="85%" />
            </VStack>
          </VStack>
        ) : data ? (
          <>
            {data.missingKeywords && data.missingKeywords.length > 0 ? (
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="sm" mb={3}>
                    Keywords to Add
                  </Heading>
                  <Wrap spacing={2}>
                    {data.missingKeywords.map((keyword, index) => (
                      <WrapItem key={index}>
                        <Badge
                          bg={keywordBgColor}
                          color={accentColor}
                          py={1}
                          px={3}
                          borderRadius="full"
                          fontSize="sm"
                        >
                          {keyword}
                        </Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
                
                <Divider />
                
                <Box>
                  <Heading size="sm" mb={3}>
                    Optimization Suggestions
                  </Heading>
                  <Text whiteSpace="pre-line">{data.optimizationSuggestions}</Text>
                </Box>
              </VStack>
            ) : (
              <Text>No missing keywords found. Your resume matches the job requirements well!</Text>
            )}
          </>
        ) : (
          <Text>No keyword data available</Text>
        )}
      </VStack>
    </MotionBox>
  );
};

export default MissingKeywords;