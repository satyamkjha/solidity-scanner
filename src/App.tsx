import '@fontsource/poppins/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import Routes from './routes';
import { theme } from './theme';

export const App = () => (
  <Suspense fallback="">
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  </Suspense>
);
