import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link as RouterLink,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
  Box,
  useToast,
  InputRightElement,
  HStack,
  Divider,
  Image,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FiAtSign } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import MetaMaskSDK from "@metamask/sdk";

import { Logo } from "components/icons";

import API from "helpers/api";
import Auth from "helpers/auth";
import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { EBADF } from "constants";
import MetaMaskLogin from "components/metamaskSignin";
import { API_PATH } from "helpers/routeManager";
import GoogleSignIn from "components/googleSignin";
import Cookies from "js-cookie";
import {
  getFeatureGateConfig,
  getReCaptchaHeaders,
} from "helpers/helperFunction";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignIn: React.FC = () => {
  const query = useQuery();
  const isPasswordReset = Boolean(query.get("isPasswordReset")?.toString());
  const toast = useToast();
  const googleLoginEnabled = getFeatureGateConfig().enable_google_signin;

  if (isPasswordReset) {
    toast({
      title: "Password successfully reset.",
      description: "Please login with your new password.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const campaign_type = searchParams.get("utm_source");
    const campaign_id = searchParams.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
  }, []);

  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        maxW="80vw"
        mx="auto"
        py={8}
      >
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Flex>
      <Flex align="center" direction="column" my={8}>
        <Heading fontSize="2xl">Sign In</Heading>
        <Text color="subtle" my={3}>
          Welcome back, you’ve been missed!
        </Text>
        <Stack spacing={4} direction={["column", "column", "column", "row"]}>
          <MetaMaskLogin />
          {googleLoginEnabled && <GoogleSignIn />}
        </Stack>

        <HStack spacing={5} width={["90%", "80%", "600px"]}>
          <Divider background={"#FAFBFC"} width={"43%"} />
          <Text color="subtle" my={3}>
            OR
          </Text>
          <Divider background={"#FAFBFC"} width={"45%"} />
        </HStack>
        <LoginForm />
        <Link
          as={RouterLink}
          variant="subtle"
          fontSize="sm"
          mr={1}
          mt={4}
          to="/signup"
        >
          Dont have an account yet?{" "}
          <Box as="span" color="black" fontWeight={600}>
            Sign up
          </Box>
        </Link>
      </Flex>
    </>
  );
};

const LoginForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    let reqHeaders = await getReCaptchaHeaders("signin");
    setIsLoading(true);
    API.post<AuthResponse>(
      API_PATH.API_LOGIN,
      {
        email,
        password,
      },
      {
        headers: reqHeaders,
      }
    ).then(
      (res) => {
        if (res.status === 200) {
          if (res.data.status === "success") {
            Auth.authenticateUser();
            history.push("/home");
          }
        }
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
      }
    );
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={6} mt={8} width={["90%", "80%", "600px"]}>
        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FiAtSign} color="gray.300" />}
          />
          <Input
            isRequired
            type="email"
            placeholder="Your email"
            autoComplete="username"
            variant="brand"
            value={email}
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            height="48px"
            color="gray.300"
            children={<Icon as={FaLock} color="gray.300" />}
          />
          <Input
            isRequired
            type={show ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            variant="brand"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement
            height="48px"
            color="gray.300"
            children={
              show ? (
                <ViewOffIcon
                  color={"gray.500"}
                  mr={5}
                  boxSize={5}
                  onClick={() => setShow(false)}
                />
              ) : (
                <ViewIcon
                  color={"gray.500"}
                  mr={5}
                  boxSize={5}
                  onClick={() => setShow(true)}
                />
              )
            }
          />
        </InputGroup>
        <Flex width="100%" justify="flex-end">
          <Link
            as={RouterLink}
            variant="subtle"
            fontSize="sm"
            mr={1}
            to="/forgot"
          >
            Forgot Password?
          </Link>
        </Flex>
        <Button
          // type="submit"
          variant="brand"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
};
export default SignIn;
