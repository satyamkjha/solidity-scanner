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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignIn: React.FC = () => {
  const query = useQuery();
  const isPasswordReset = Boolean(query.get("isPasswordReset")?.toString());
  const toast = useToast();

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

  // const env_var = JSON.parse(process.env.REACT_APP_FEATURE_GATE_CONFIG)

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
          <GoogleSignIn />
        </Stack>

        <HStack spacing={5} width={["300px", "400px", "550px"]}>
          <Divider background={"#000000"} width={"43%"} />
          <Text color="subtle" my={3}>
            OR
          </Text>
          <Divider background={"#FAFBFC"} width={"45%"} />
        </HStack>
        {/* <Button my={4} sx={{ fontSize: "13px", px: 8, py: 6 }} isDisabled>
          <Icon as={FcGoogle} mr={2} fontSize="20px" />
          Sign In with Google
        </Button> */}

        {/* <Flex
          align="center"
          justify="center"
          width={["300px", "400px", "500px"]}
          color="subtle"
          px={5}
          mt={8}
          sx={{
            height: 0.5,
            borderColor: "#EDF2F7",
            borderStyle: "solid",
            borderLeftWidth: ["130px", "180px", "220px"],
            borderRightWidth: ["130px", "180px", "220px"],
          }}
        >
          <Text fontWeight={600} color="subtle">
            OR
          </Text>
        </Flex> */}
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

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { handleSubmit, register, formState } = useForm<FormData>();
  const [show, setShow] = useState(false);
  const history = useHistory();

  const onSubmit = async ({ email, password }: FormData) => {
    const { data } = await API.post<AuthResponse>(API_PATH.API_LOGIN, {
      email,
      password,
    });

    if (data.status === "success") {
      Auth.authenticateUser();
      history.push("/home");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6} mt={8} width={["300px", "400px", "550px"]}>
        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FiAtSign} color="gray.300" />}
          />
          <Input
            isRequired
            type="email"
            placeholder="Your email"
            variant="brand"
            size="lg"
            {...register("email", { required: true })}
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
            variant="brand"
            size="lg"
            {...register("password", { required: true })}
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
          type="submit"
          variant="brand"
          isLoading={formState.isSubmitting}
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
};
export default SignIn;
