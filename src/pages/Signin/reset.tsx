import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Flex, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Logo } from "components/icons";
import API from "helpers/api";
import { AuthResponse } from "common/types";
import { API_PATH } from "helpers/routeManager";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";
import EmailInput from "components/forms/EmailInput";
import PasswordInput from "components/forms/PasswordInput";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Reset: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const token = query.get("token")?.toString();
  const org_name = query.get("org_name")?.toString();
  const { handleSubmit } = useForm<FormData>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
            <EmailInput
              isRequired
              showLeftIcon
              mb={5}
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Email: e };
                })
              }
            />

            <PasswordInput
              isRequired
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Password: e };
                })
              }
            />
            <Button
              type="submit"
              variant="brand"
              isLoading={isLoading}
              spinner={<Loader color={"#3300FF"} size={25} />}
              w="100%"
              isDisabled={Object.values(errors).join("").length > 0}
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
