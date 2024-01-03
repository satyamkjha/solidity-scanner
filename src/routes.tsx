import React, { lazy, Suspense, useEffect, useState } from "react";
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
import { useQueryClient } from "react-query";
import PublicLayout from "components/PublicLayout";
import Loader from "components/styled-components/Loader";
import { useProfile } from "hooks/useProfile";
import { OrgUserRole } from "common/types";
import { useUserOrgProfile } from "hooks/useUserOrgProfile";
import { UserRoleProvider } from "hooks/useUserRole";
import { onLogout } from "common/functions";
import { WebSocketProvider } from "hooks/useWebhookData";

const Landing = lazy(() =>
  lazyRetry(
    () => import("pages/Landing" /* webpackChunkName: "Landing" */),
    "landing"
  )
);

const QuickScan = lazy(() =>
  lazyRetry(
    () => import("pages/QuickScan" /* webpackChunkName: "QuickScan" */),
    "quickScan"
  )
);

const Report = lazy(() =>
  lazyRetry(
    () => import("pages/Report" /* webpackChunkName: "report" */),
    "report"
  )
);

const Pricing = lazy(() =>
  lazyRetry(
    () => import("pages/Pricing" /* webpackChunkName: "Pricing" */),
    "pricing"
  )
);

const TermsOfService = lazy(() =>
  lazyRetry(
    () => import("pages/Extra/tos" /* webpackChunkName: "TermsOfService" */),
    "tos"
  )
);

const PrivacyPolicy = lazy(() =>
  lazyRetry(
    () => import("pages/Extra/privacy" /* webpackChunkName: "PrivacyPolicy" */),
    "privacy"
  )
);

const FAQ = lazy(() =>
  lazyRetry(() => import("pages/FAQ" /* webpackChunkName: "FAQ" */), "faq")
);

//  Auth Pages
const SignIn = lazy(() =>
  lazyRetry(
    () => import("pages/Signin" /* webpackChunkName: "Signin" */),
    "signin"
  )
);

const Reset = lazy(() =>
  lazyRetry(
    () => import("pages/Signin/reset" /* webpackChunkName: "Reset" */),
    "reset"
  )
);

const SignUp = lazy(() =>
  lazyRetry(
    () => import("pages/Signup" /* webpackChunkName: "SignUp" */),
    "signup"
  )
);

const CheckEmail = lazy(() =>
  lazyRetry(
    () =>
      import("pages/Signup/CheckEmail" /* webpackChunkName: "CheckEmail" */),
    "check"
  )
);

const Verify = lazy(() =>
  lazyRetry(
    () => import("pages/Signup/verify" /* webpackChunkName: "Verify" */),
    "verify"
  )
);

const ForgotPassword = lazy(() =>
  lazyRetry(
    () => import("pages/Forgot" /* webpackChunkName: "ForgotPassword" */),
    "forgot"
  )
);

// Core Pages
const Home = lazy(() =>
  lazyRetry(() => import("pages/Home" /* webpackChunkName: "Home" */), "home")
);

const Profile = lazy(() =>
  lazyRetry(
    () => import("pages/Profile" /* webpackChunkName: "Profile" */),
    "profile"
  )
);

const Scans = lazy(() =>
  lazyRetry(
    () => import("pages/Scans" /* webpackChunkName: "Scans" */),
    "scans"
  )
);

const ProjectPage = lazy(() =>
  lazyRetry(
    () =>
      import(
        "pages/Projects/ProjectPage" /* webpackChunkName: "ProjectPage" */
      ),
    "project"
  )
);

const BlockPage = lazy(() =>
  lazyRetry(
    () => import("pages/Blocks/BlockPage" /* webpackChunkName: "BlockPage" */),
    "block"
  )
);
const Integrations = lazy(() =>
  lazyRetry(
    () => import("pages/Integrations" /* webpackChunkName: "Integration" */),
    "integration"
  )
);

const Billing = lazy(() =>
  lazyRetry(
    () => import("pages/Billing" /* webpackChunkName: "Billing" */),
    "billing"
  )
);

const PaymentSucess = lazy(() =>
  lazyRetry(
    () =>
      import(
        "pages/Billing/components/PaymentStatus" /* webpackChunkName: "PaymentSucess" */
      ),
    "payment"
  )
);

const PrivateApi = lazy(() =>
  lazyRetry(
    () => import("pages/PrivateAPI" /* webpackChunkName: "PrivateApi" */),
    "api"
  )
);

const Organisation = lazy(() =>
  lazyRetry(
    () => import("pages/Organisation" /* webpackChunkName: "Organisation" */),
    "organisation"
  )
);

const PublicReportPage = lazy(() =>
  lazyRetry(
    () =>
      import(
        "pages/Report/PublicReport" /* webpackChunkName: "PublicReportPage" */
      ),
    "publicReport"
  )
);

const Detectors = lazy(() =>
  lazyRetry(
    () => import("pages/Detectors" /* webpackChunkName: "Detectors" */),
    "detectors"
  )
);

const AcceptOrgInvitation = lazy(() =>
  lazyRetry(
    () =>
      import(
        "pages/Organisation/AcceptOrgInvitation" /* webpackChunkName: "AcceptOrganisationInvite" */
      ),
    "orgInvite"
  )
);
const LeaderBoard = lazy(() =>
  lazyRetry(
    () => import("pages/HackBoard" /* webpackChunkName: "HackerBoard" */),
    "hacks"
  )
);

const orgRestrictedRoutes: {
  path: string;
  roles: OrgUserRole[];
}[] = [
  { path: "/billing", roles: ["viewer", "editor", "admin"] },
  { path: "/integrations", roles: ["viewer", "editor", "admin"] },
  { path: "/organisation", roles: ["viewer", "editor"] },
  { path: "/private-api", roles: ["viewer"] },
];

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
              "/hackboard",
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
                  <Route exact path="/hackboard" component={LeaderBoard} />
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
          <UserRoleProvider>
            <WebSocketProvider>
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
                      <Scans />
                    </PrivateRoute>

                    <PrivateRoute path="/projects/:scanId/:projectId">
                      <ProjectPage />
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
            </WebSocketProvider>
          </UserRoleProvider>
        </Switch>
      </ErrorHandler>
    </Router>
  );
};

const lazyRetry = function <T>(
  componentImport: () => Promise<T>,
  name: string
) {
  return new Promise<T>((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem(`retry-${name}-refreshed`) || "false"
    );

    componentImport()
      .then((component) => {
        window.sessionStorage.setItem(`retry-${name}-refreshed`, "false");
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          window.sessionStorage.setItem(`retry-${name}-refreshed`, "true");
          window.location.reload();
        }
        reject(error);
      });
  });
};

const ErrorHandler: React.FC = ({ children }) => {
  const toast = useToast();
  const history = useHistory();
  const queryClient = useQueryClient();

  useEffect(() => {
    const interceptor = API.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          onLogout(history, queryClient);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { path } = rest;
  const isRestrictedRoute = (path: string | readonly string[] | undefined) => {
    return orgRestrictedRoutes.some((route) => route.path === path);
  };
  const getRestrictedRoles = (path: string | readonly string[] | undefined) => {
    const matchedRoute = orgRestrictedRoutes.find(
      (route) => route.path === path
    );
    return matchedRoute ? matchedRoute.roles : [];
  };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.isUserAuthenticated() ? (
          <>
            {isRestrictedRoute(path) ? (
              <CheckOrgRole roles={getRestrictedRoles(path)}>
                {children}
              </CheckOrgRole>
            ) : (
              children
            )}
          </>
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

const CheckOrgRole: React.FC<{ roles: OrgUserRole[] }> = ({
  children,
  roles,
}) => {
  const { data: profile } = useProfile(true);
  const { data: orgProfile } = useUserOrgProfile(
    profile?.logged_in_via === "org_login"
  );
  const history = useHistory();
  const [userHasAccess, setUserHasAccess] = useState(false);

  useEffect(() => {
    if (profile) {
      if (orgProfile) {
        let hasMatchingRole: boolean = false;

        if (
          profile.logged_in_via === "org_login" &&
          orgProfile.user_organization?.role
        ) {
          hasMatchingRole = roles.includes(orgProfile.user_organization.role);
        }

        if (hasMatchingRole) {
          history.push("/page-not-found");
        } else {
          setUserHasAccess(!hasMatchingRole);
        }
      } else if (profile.logged_in_via !== "org_login") {
        setUserHasAccess(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, orgProfile]);

  return (
    <>
      {userHasAccess && React.isValidElement(children) ? (
        React.cloneElement(children, { profileData: profile })
      ) : (
        <Loader width={"100%"} height={"90vh"} />
      )}
    </>
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
