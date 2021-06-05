import React from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useHistory } from "react-router-dom";
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
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import { FiAtSign } from "react-icons/fi";
import { FaLock } from "react-icons/fa";

import { Logo } from "components/icons";
import API from "helpers/api";
import Auth from "helpers/auth";

const SignIn: React.FC = () => {
  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        maxW="80vw"
        mx="auto"
        py={8}
      >
        <Logo />
      </Flex>
      <Flex align="center" direction="column" my={8}>
        <Heading fontSize="2xl">Sign In</Heading>
        <Text color="subtle" my={3}>
          Welcome back, you’ve been missed!
        </Text>
        <Button my={4} sx={{ fontSize: "13px", px: 8, py: 6 }}>
          <Icon as={FcGoogle} mr={2} fontSize="20px" />
          Sign In with Google
        </Button>

        <Flex
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
        </Flex>
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

type LoginResponse = {
  status: string;
  message: string;
};

const LoginForm: React.FC = () => {
  const { handleSubmit, register, formState } = useForm<FormData>();
  const history = useHistory();
  const onSubmit = async ({ email, password }: FormData) => {
    const { data } = await API.post<LoginResponse>("/api-login/", {
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
      <Stack spacing={6} mt={8} width={["300px", "400px", "500px"]}>
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
            type="password"
            placeholder="Password"
            variant="brand"
            size="lg"
            {...register("password", { required: true })}
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
