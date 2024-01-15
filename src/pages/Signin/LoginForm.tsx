import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Flex,
  Stack,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
  InputRightElement,
} from "@chakra-ui/react";
import { FiAtSign } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import API from "helpers/api";
import Auth from "helpers/auth";
import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { API_PATH } from "helpers/routeManager";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";
import { useForm } from "react-hook-form";
import { isEmail } from "helpers/helperFunction";
import { TwoFAField } from "components/common/TwoFAField";

const LoginForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [twoFAScreen, setTwoFAScreen] = useState(false);

  const { handleSubmit } = useForm();

  const verify2FA = async (otp: string) => {
    setIsLoading(true);
    API.post<AuthResponse>(API_PATH.API_2FA_VERIFY, {
      login_type: "normal",
      otp,
      email,
      password,
    }).then(
      (res) => {
        if (res.status === 200) {
          if (res.data.status === "success") {
            Auth.authenticateUser();
            history.push("/home");
          }
        }
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );
  };

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
            if (res.data.message === "2fa required") {
              setTwoFAScreen(true);
            } else {
              Auth.authenticateUser();
              history.push("/home");
              window.location.reload();
            }
          }
        }
        setIsLoading(false);
      },
      () => {
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={6} mt={8} width={["90%", "80%", "600px"]}>
        {twoFAScreen ? (
          <TwoFAField
            isLoading={isLoading}
            buttonText={"Sign In"}
            verify2FA={verify2FA}
          />
        ) : (
          <>
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
                my={1}
                to="/forgot"
              >
                Forgot Password?
              </Link>
            </Flex>
            <Button
              type="submit"
              variant="brand"
              isLoading={isLoading}
              spinner={<Loader color={"#3300FF"} size={25} />}
              disabled={
                email.length < 1 ||
                password.length < 1 ||
                email.length > 50 ||
                password.length > 50 ||
                !isEmail(email)
              }
            >
              Sign In
            </Button>
          </>
        )}
      </Stack>
    </form>
  );
};
export default LoginForm;
