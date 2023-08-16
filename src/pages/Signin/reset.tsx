import React, { useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import { Logo } from "components/icons";
import API from "helpers/api";
import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { API_PATH } from "helpers/routeManager";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";
import { passwordStrength } from "check-password-strength";
import { isEmail } from "helpers/helperFunction";
import PasswordError from "components/passwordError";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Reset: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const token = query.get("token")?.toString();
  const org_name = query.get("org_name")?.toString();
  const [show, setShow] = useState(false);
  const { handleSubmit } = useForm<FormData>();
  const passwordChecker = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<{
    contains: string[];
    id: number;
    value: string;
    length: number;
  } | null>(null);
  const onSubmit = async () => {
    try {
      let reqHeaders = await getReCaptchaHeaders("forgot_password_set");
      setIsLoading(true);
      const { data } = await API.post<AuthResponse>(
        API_PATH.API_FORGOT_PASSWORD,
        {
          email,
          token,
          password,
          org_name,
        },
        {
          headers: reqHeaders,
        }
      );
      setIsLoading(false);
      if (data.status === "success") {
        history.push("/signin?isPasswordReset=true");
      }
    } catch (e) {
      setIsLoading(false);
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

        <Stack spacing={6} mt={8} width={["300px", "400px", "500px"]}>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputGroup alignItems="center" mb={5}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup mb={5}>
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(passwordStrength(e.target.value));
                }}
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
            <PasswordError passwordError={passwordError} />
            <Button
              type="submit"
              variant="brand"
              isLoading={isLoading}
              spinner={<Loader color={"#3300FF"} size={25} />}
              w="100%"
              isDisabled={
                email.length < 1 ||
                email.length > 50 ||
                !isEmail(email) ||
                (passwordError &&
                  (passwordError.value === "Too Weak" ||
                    passwordError.value === "Weak"))
              }
            >
              Update Password
            </Button>
          </form>
        </Stack>
      </Flex>
    </>
  );
};

export default Reset;
