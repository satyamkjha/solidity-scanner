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

//  Auth Pages
const SignIn = lazy(
  () => import("pages/Signin" /* webpackChunkName: "Signin" */)
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
        <Route exact path="/signin">
          <SignIn />
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
              <PrivateRoute exact path="/projects/:id">
                <ProjectPage />
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
