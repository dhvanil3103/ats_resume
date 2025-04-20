import React from 'react';
import {
  Flex,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionFlex = motion(Flex);

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Processing your request...',
}) => {
  const bgColor = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  );
  const textColor = useColorModeValue('gray.800', 'white');

  if (!isVisible) return null;

  return (
    <MotionFlex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="overlay"
      align="center"
      justify="center"
      bg={bgColor}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      backdropFilter="blur(4px)"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color={textColor} fontWeight="medium">
          {message}
        </Text>
      </VStack>
    </MotionFlex>
  );
};

export default LoadingOverlay;