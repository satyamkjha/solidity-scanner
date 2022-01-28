import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
  useHistory,
} from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import Layout from "components/layout";

import Auth from "helpers/auth";
import API from "helpers/api";
import PaymentSucess from "pages/Billing/payment";

const Landing = lazy(
  () => import("pages/Landing" /* webpackChunkName: "Landing" */)
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

const Routes: React.FC = () => {
  return (
    <Router>
      <ErrorHandler>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/billing/:status">
            <PaymentSucess />
          </Route>

          <Route exact path="/pricing">
            <Pricing />
          </Route>
          <Route exact path="/faq">
            <FAQ />
          </Route>
          <Route exact path="/terms-of-service">
            <TermsOfService />
          </Route>
          <Route exact path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/reset">
            <Reset />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/verify">
            <Verify />
          </Route>
          <Route exact path="/forgot">
            <ForgotPassword />
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
                <PrivateRoute path="/projects/:projectId">
                  <ProjectPage />
                </PrivateRoute>
                <PrivateRoute exact path="/blocks">
                  <Blocks />
                </PrivateRoute>
                <PrivateRoute exact path="/blocks/:scanId">
                  <BlockPage />
                </PrivateRoute>
                <PrivateRoute exact path="/integrations">
                  <Integrations />
                </PrivateRoute>
                <PrivateRoute exact path="/billing">
                  <Billing />
                </PrivateRoute>
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

  const logout = async () => {
    // await API.get("api-logout");
    Auth.deauthenticateUser();
    history.push("/signin");
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
            title: error.response.data.message,
            status: "error",
            isClosable: true,
            position: "bottom",
          });
        }

        return Promise.reject(error);
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

export default Routes;
