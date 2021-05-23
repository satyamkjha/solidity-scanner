import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import Layout from 'components/layout';

import Auth from 'helpers/auth';

//  Auth Pages
const SignIn = lazy(
  () => import('pages/Signin' /* webpackChunkName: "Signin" */)
);

const SignUp = lazy(
  () => import('pages/Signup' /* webpackChunkName: "SignUp" */)
);

const ForgotPasword = lazy(
  () => import('pages/Forgot' /* webpackChunkName: "ForgotPasword" */)
);

// Core Pages
const Home = lazy(() => import('pages/Home' /* webpackChunkName: "Home" */));

const Projects = lazy(
  () => import('pages/Projects' /* webpackChunkName: "Projects" */)
);

const ProjectPage = lazy(
  () =>
    import('pages/Projects/ProjectPage' /* webpackChunkName: "ProjectPage" */)
);

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/forgot">
          <ForgotPasword />
        </Route>

        <Layout>
          <Suspense fallback="">
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/projects">
                <Projects />
              </Route>
              <Route exact path="/projects/:id">
                <ProjectPage />
              </Route>
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
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default Routes;
