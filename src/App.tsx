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

import { Global, css } from "@emotion/react";

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

    {process.env.NODE_ENV === "development" ? (
      <></>
    ) : (
      <Helmet>
        <script>
          {`(function (h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: 3239945, hjsv: 6 };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");`}
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
