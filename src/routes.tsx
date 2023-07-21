import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import Layout from "components/layout";

import Auth from "helpers/auth";
import API from "helpers/api";
import PageNotFound, { CustomPageNotFound } from "pages/PageNotFound";
import Cookies from "js-cookie";
import { onLogout } from "common/functions";
import { useQueryClient } from "react-query";
import PublicLayout from "components/PublicLayout";
import Loader from "components/styled-components/Loader";

const Landing = lazy(
  () => import("pages/Landing" /* webpackChunkName: "Landing" */)
);

const QuickScan = lazy(
  () => import("pages/QuickScan" /* webpackChunkName: "QuickScan" */)
);

const Report = lazy(
  () => import("pages/Report" /* webpackChunkName: "Landing" */)
);

const Pricing = lazy(
  () => import("pages/Pricing" /* webpackChunkName: "Pricing" */)
);

const TermsOfService = lazy(
  () => import("pages/Extra/tos" /* webpackChunkName: "TermsOfService" */)
);

const PrivacyPolicy = lazy(
  () => import("pages/Extra/privacy" /* webpackChunkName: "PrivacyPolicy" */)
);

const FAQ = lazy(() => import("pages/FAQ" /* webpackChunkName: "FAQ" */));

//  Auth Pages
const SignIn = lazy(
  () => import("pages/Signin" /* webpackChunkName: "Signin" */)
);

const Reset = lazy(
  () => import("pages/Signin/reset" /* webpackChunkName: "Reset" */)
);

const SignUp = lazy(
  () => import("pages/Signup" /* webpackChunkName: "SignUp" */)
);

const CheckEmail = lazy(
  () => import("pages/Signup/CheckEmail" /* webpackChunkName: "CheckEmail" */)
);

const Verify = lazy(
  () => import("pages/Signup/verify" /* webpackChunkName: "Verify" */)
);

const ForgotPassword = lazy(
  () => import("pages/Forgot" /* webpackChunkName: "ForgotPassword" */)
);

// Core Pages
const Home = lazy(() => import("pages/Home" /* webpackChunkName: "Home" */));

const Profile = lazy(
  () => import("pages/Profile" /* webpackChunkName: "Profile" */)
);

const Projects = lazy(
  () => import("pages/Projects" /* webpackChunkName: "Projects" */)
);

const ProjectPage = lazy(
  () =>
    import("pages/Projects/ProjectPage" /* webpackChunkName: "ProjectPage" */)
);

const Blocks = lazy(
  () => import("pages/Blocks" /* webpackChunkName: "Blocks" */)
);

const BlockPage = lazy(
  () => import("pages/Blocks/BlockPage" /* webpackChunkName: "BlockPage" */)
);
const Integrations = lazy(
  () => import("pages/Integrations" /* webpackChunkName: "Integration" */)
);

const Billing = lazy(
  () => import("pages/Billing" /* webpackChunkName: "Billing" */)
);

const PaymentSucess = lazy(
  () =>
    import(
      "pages/Billing/components/PaymentStatus" /* webpackChunkName: "PaymentSucess" */
    )
);

const PrivateApi = lazy(
  () => import("pages/PrivateAPI" /* webpackChunkName: "PrivateApi" */)
);

const Organisation = lazy(
  () => import("pages/Organisation" /* webpackChunkName: "PrivateApi" */)
);

const PublicReportPage = lazy(
  () =>
    import(
      "pages/Report/PublicReport" /* webpackChunkName: "PublicReportPage" */
    )
);

const Detectors = lazy(
  () => import("pages/Detectors" /* webpackChunkName: "Detectors" */)
);

const AcceptOrgInvitation = lazy(
  () =>
    import(
      "pages/Organisation/AcceptOrgInvitation" /* webpackChunkName: "Detectors" */
    )
);
const LeaderBoard = lazy(
  () => import("pages/LeaderBoard" /* webpackChunkName: "LeaderBoard" */)
);

const Routes: React.FC = () => {
  return (
    <Router>
      <ErrorHandler>
        <Switch>
          <RedirectRoute exact path="/signin">
            <SignIn />
          </RedirectRoute>
          <Route exact path="/reset" component={Reset} />
          <RedirectRoute exact path="/signup">
            <SignUp />
          </RedirectRoute>
          <Route exact path="/check-email" component={CheckEmail} />
          <Route exact path="/verify" component={Verify} />
          <Route exact path="/accept" component={AcceptOrgInvitation} />
          <RedirectRoute exact path="/forgot">
            <ForgotPassword />
          </RedirectRoute>
          <RedirectRoute exact path="/forgot/:orgName">
            <ForgotPassword />
          </RedirectRoute>
          <Route exact path="/page-not-found" component={PageNotFound} />
          <Route
            exact
            path="/published-report/:projectType/:reportId"
            component={PublicReportPage}
          />
          <Route
            exact
            path="/report/:projectType/:projectId/:reportId"
            component={Report}
          />
          <Route exact path="/payment/:status" component={PaymentSucess} />

          <Route
            exact
            path={[
              "/",
              "/quickscan/:blockAddress/:blockPlatform/:blockChain",
              "/quickscan/",
              "/pricing",
              "/detectors",
              "/faq",
              "/terms-of-service",
              "/privacy-policy",
              "/hackerboard",
            ]}
          >
            <PublicLayout>
              <Suspense fallback={<Loader width={"100vw"} height={"100vh"} />}>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route
                    exact
                    path="/quickscan/:blockAddress/:blockPlatform/:blockChain"
                    component={QuickScan}
                  />
                  <Route exact path="/quickscan/" component={QuickScan} />
                  <Route exact path="/pricing" component={Pricing} />
                  <Route exact path="/detectors" component={Detectors} />
                  <Route exact path="/hackerboard" component={LeaderBoard} />
                  <Route exact path="/faq" component={FAQ} />
                  <Route
                    exact
                    path="/terms-of-service"
                    component={TermsOfService}
                  />
                  <Route
                    exact
                    path="/privacy-policy"
                    component={PrivacyPolicy}
                  />
                </Switch>
              </Suspense>
            </PublicLayout>
          </Route>

          <Layout>
            <Suspense fallback="">
              <Switch>
                <PrivateRoute exact path="/home">
                  <Home />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                  <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/projects">
                  <Projects />
                </PrivateRoute>
                <PrivateRoute path="/projects/:projectId/:scanId">
                  <ProjectPage />
                </PrivateRoute>
                <PrivateRoute exact path="/blocks">
                  <Blocks />
                </PrivateRoute>
                <PrivateRoute exact path="/blocks/:scanId/:projectId">
                  <BlockPage />
                </PrivateRoute>
                <PrivateRoute exact path="/integrations">
                  <Integrations />
                </PrivateRoute>
                <PrivateRoute exact path="/private-api">
                  <PrivateApi />
                </PrivateRoute>
                <PrivateRoute exact path="/organisation">
                  <Organisation />
                </PrivateRoute>

                <PrivateRoute exact path="/billing">
                  <Billing />
                </PrivateRoute>
                <Route path="*" component={CustomPageNotFound} />
              </Switch>
            </Suspense>
          </Layout>
        </Switch>
      </ErrorHandler>
    </Router>
  );
};

const ErrorHandler: React.FC = ({ children }) => {
  const toast = useToast();
  const history = useHistory();
  const queryClient = useQueryClient();

  const logout = async () => {
    // await API.get("api-logout");
    onLogout(history, queryClient);
  };

  useEffect(() => {
    const interceptor = API.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          logout();
        } else if (!error.response) {
          toast({
            title: `Unexpected Error`,
            status: "error",
            isClosable: true,
            position: "bottom",
          });
        } else {
          toast({
            title: error.response.data.message || error.response.data.detail,
            status: "error",
            isClosable: true,
            position: "bottom",
          });
        }

        return error;
      }
    );
    return () => {
      API.interceptors.response.eject(interceptor);
    };
  });
  return <>{children}</>;
};

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.isUserAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const RedirectRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const authenticated = searchParams.get("authenticated");
  if (
    location.pathname === "/signin" &&
    authenticated &&
    Cookies.get("csrftoken")
  ) {
    localStorage.setItem("authenticated", "true");
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.isUserAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default Routes;
