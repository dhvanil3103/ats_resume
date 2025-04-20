import React, { ReactNode } from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
  Flex,
  Icon,
  BoxProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

const MotionBox = motion(Box);

interface ResultCardProps extends BoxProps {
  title: string;
  icon: IconType;
  children: ReactNode;
  delay?: number;
}

const ResultCard: React.FC<ResultCardProps> = ({
  title,
  icon,
  children,
  delay = 0,
  ...rest
}) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
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
      {...rest}
    >
      <Flex align="center" mb={4}>
        <Icon as={icon} boxSize={6} color={accentColor} />
        <Heading size="md" ml={2}>
          {title}
        </Heading>
      </Flex>
      
      {children}
    </MotionBox>
  );
};

export default ResultCard;