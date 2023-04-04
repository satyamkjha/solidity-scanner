import "@fontsource/poppins/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";

import Routes from "./routes";
import { theme } from "./theme";

import { Global, css } from "@emotion/react";
import { getFeatureGateConfig } from "helpers/helperFunction";

const queryClient = new QueryClient();

///
/// Have added a Global CSS to remove the focus indicator on click.
///
const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

export const App: React.FC = () => {
  return (
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

      {getFeatureGateConfig().load_clarity_script && (
        <Helmet>
          <script type="text/javascript">
            {`(function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "gj5br0bppy");`}
          </script>
        </Helmet>
      )}

      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Global styles={GlobalStyles} />
          <Routes />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
};
