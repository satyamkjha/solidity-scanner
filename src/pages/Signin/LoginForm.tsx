import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Stack, Button, Link } from "@chakra-ui/react";
import API from "helpers/api";
import Auth from "helpers/auth";
import { AuthResponse } from "common/types";
import { API_PATH } from "helpers/routeManager";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";
import { useForm } from "react-hook-form";
import { TwoFAField } from "components/common/TwoFAField";
import EmailInput from "components/forms/EmailInput";
import PasswordInput from "components/forms/PasswordInput";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
            window.open("/home", "_self");
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
    setIsLoading(true);
    const reqHeaders = await getReCaptchaHeaders("login");
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
              window.open("/home", "_self");
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
            <EmailInput
              isRequired
              showLeftIcon
              placeholder="Your email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onError={(e: any) => setError(e)}
            />

            <PasswordInput
              isRequired
              showLeftIcon
              enableSpecialCharCheck={false}
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onError={(e: any) => setError(e)}
            />
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
              disabled={error ? true : false}
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
