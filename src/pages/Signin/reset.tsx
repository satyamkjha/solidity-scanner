import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
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
  InputRightElement,
} from "@chakra-ui/react";
import { FiAtSign } from "react-icons/fi";
import { FaLock } from "react-icons/fa";

import { Logo } from "components/icons";

import API from "helpers/api";

import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type FormData = {
  email: string;
  password: string;
};

const Reset: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const token = query.get("token")?.toString();
  const { handleSubmit, register, formState } = useForm<FormData>();
  const [show, setShow] = useState(false);

  const onSubmit = async ({ email, password }: FormData) => {
    const { data } = await API.post<AuthResponse>("/api-forgot-password/", {
      email,
      token,
      password,
    });

    if (data.status === "success") {
      history.push("/signin?isPasswordReset=true");
    }
  };
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
      <Flex align="center" direction="column" my={40}>
        <Heading fontSize="2xl">Reset password</Heading>
        <Text color="subtle" my={3}>
          Enter your details to reset your password
        </Text>

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
                type={show ? "text" : "password"}
                placeholder="New Password"
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

            <Button
              type="submit"
              variant="brand"
              isLoading={formState.isSubmitting}
            >
              Update Password
            </Button>
          </Stack>
        </form>
      </Flex>
    </>
  );
};

export default Reset;
