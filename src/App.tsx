import "@fontsource/poppins/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";

import Routes from "./routes";
import { theme } from "./theme";

const queryClient = new QueryClient();

export const App = () => (
  <Suspense fallback="">
    <Helmet>
      <script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js-eu1.hs-scripts.com/24889894.js"
      ></script>
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Suspense>
);
