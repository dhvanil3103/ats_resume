import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Custom colors
const colors = {
  brand: {
    50: '#e6f2ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#0073e6',
    600: '#005cb3',
    700: '#004480',
    800: '#002d4d',
    900: '#00161a',
  },
  accent: {
    50: '#fff9e6',
    100: '#ffecb3',
    200: '#ffe080',
    300: '#ffd34d',
    400: '#ffc61a',
    500: '#e6b300',
    600: '#b38c00',
    700: '#806600',
    800: '#4d3d00',
    900: '#1a1400',
  },
};

// Custom font configuration
const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Roboto, sans-serif',
};

// Custom component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
    },
    variants: {
      solid: (props: any) => ({
        bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.600',
        },
      }),
      outline: (props: any) => ({
        borderColor: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
        color: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
        _hover: {
          bg: props.colorMode === 'dark' ? 'rgba(0, 115, 230, 0.1)' : 'rgba(0, 115, 230, 0.1)',
        },
      }),
    },
  },
  Card: {
    baseStyle: (props: any) => ({
      container: {
        bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        boxShadow: 'md',
        borderRadius: 'lg',
        overflow: 'hidden',
      },
    }),
  },
};

// Custom theme
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
      },
    }),
  },
});

export default theme;