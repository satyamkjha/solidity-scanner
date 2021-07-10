import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import Layout from "components/layout";

import Auth from "helpers/auth";
import API from "helpers/api";

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

const Projects = lazy(
  () => import("pages/Projects" /* webpackChunkName: "Projects" */)
);

const ProjectPage = lazy(
  () =>
    import("pages/Projects/ProjectPage" /* webpackChunkName: "ProjectPage" */)
);

const Integrations = lazy(
  () => import("pages/Integrations" /* webpackChunkName: "ProjectPage" */)
);

const Routes: React.FC = () => {
  const toast = useToast();

  useEffect(() => {
    const interceptor = API.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // if (error.response.status === 401) {
        //   logout();
        // } else

        if (!error.response) {
          toast({
            title: `Unexpected Error`,
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        } else {
          toast({
            title: error.response.data.message,
            status: "error",
            isClosable: true,
            position: "bottom-right",
          });
        }

        return Promise.reject(error);
      }
    );
    return () => {
      API.interceptors.response.eject(interceptor);
    };
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
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
              <PrivateRoute exact path="/projects">
                <Projects />
              </PrivateRoute>
              <PrivateRoute exact path="/projects/:scanId">
                <ProjectPage />
              </PrivateRoute>
              <PrivateRoute exact path="/integrations">
                <Integrations />
              </PrivateRoute>
            </Switch>
          </Suspense>
        </Layout>
      </Switch>
    </Router>
  );
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
