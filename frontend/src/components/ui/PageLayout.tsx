import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  Container,
  IconButton,
  useColorMode,
  useColorModeValue,
  Heading,
  Text,
  HStack,
  Button,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: ReactNode;
}

const MotionBox = motion(Box);

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headerBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header */}
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={10}
        bg={headerBgColor}
        boxShadow="sm"
        borderBottom="1px"
        borderColor={borderColor}
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Heading
                as="h1"
                size="md"
                bgGradient="linear(to-r, brand.500, accent.500)"
                bgClip="text"
              >
                Resume Optimizer
              </Heading>
              <Text color="gray.500" display={{ base: 'none', md: 'block' }}>
                AI-powered job application assistant
              </Text>
            </HStack>

            <HStack spacing={4}>
              <Link
                href="https://github.com/yourusername/resume-optimizer"
                isExternal
              >
                <Button
                  leftIcon={<Icon as={FiGithub} />}
                  variant="ghost"
                  size="sm"
                >
                  GitHub
                </Button>
              </Link>

              <IconButton
                aria-label={`Switch to ${
                  colorMode === 'light' ? 'dark' : 'light'
                } mode`}
                icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container
        as={MotionBox}
        maxW="container.xl"
        py={8}
        px={{ base: 4, md: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 } as any}
      >
        {children}
      </Container>

      {/* Footer */}
      <Box
        as="footer"
        py={6}
        borderTop="1px"
        borderColor={borderColor}
        bg={headerBgColor}
      >
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Text fontSize="sm" color="gray.500">
              © {new Date().getFullYear()} Resume Optimizer. All rights reserved.
            </Text>
            <Text fontSize="sm" color="gray.500" mt={{ base: 2, md: 0 }}>
              Powered by AI • Made with ❤️
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default PageLayout;