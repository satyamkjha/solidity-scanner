import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Logo, MailSent } from "components/icons";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import { AuthResponse } from "common/types";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import EmailInput from "components/forms/EmailInput";

const CustomFlex = motion(Flex);

const ForgotPassword: React.FC = () => {
  const [mailSent, setMailSent] = useState(false);
  const [email, setEmail] = useState("");

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
      {!mailSent ? (
        <Flex align="center" direction="column" my={40}>
          <Heading fontSize="2xl">Forgot password?</Heading>
          <Text color="subtle" my={3}>
            Enter your details to recieve a reset link
          </Text>

          <ForgotPasswordForm
            email={email}
            setMailSent={setMailSent}
            setEmail={setEmail}
          />
          <Link
            as={RouterLink}
            variant="subtle"
            fontSize="sm"
            mr={1}
            mt={4}
            to="/signin"
          >
            Back to sign in
          </Link>
        </Flex>
      ) : (
        <CustomFlex
          align="center"
          direction="column"
          my={36}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MailSent size={130} />
          <Text fontSize="2xl" fontWeight={600} mb={4} mt={8}>
            Reset your password
          </Text>
          <Text color="subtle">
            We've sent a link to reset your password on:{" "}
            <Box as="span" color="accent">
              {email}
            </Box>
          </Text>
        </CustomFlex>
      )}
    </>
  );
};

type FormData = {
  email: string;
};

const ForgotPasswordForm: React.FC<{
  email: string;
  setMailSent: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}> = ({ email, setMailSent, setEmail }) => {
  const { handleSubmit, formState } = useForm<FormData>();

  const { orgName } = useParams<{
    orgName: string | null;
  }>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async () => {
    try {
      const reqHeaders = await getReCaptchaHeaders("forgot");
      const { data } = await API.post<AuthResponse>(
        API_PATH.API_SEND_EMAIL,
        {
          org_name: orgName,
          email,
        },
        {
          headers: reqHeaders,
        }
      );

      if (data.status === "success") {
        setMailSent(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6} mt={8} width={["300px", "400px", "500px"]}>
        <EmailInput
          isRequired
          showLeftIcon
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onError={(e: any) =>
            setErrors((prv) => {
              return { ...prv, Email: e };
            })
          }
        />

        <Button
          type="submit"
          variant="brand"
          isLoading={formState.isSubmitting}
          isDisabled={Object.values(errors).join("").length > 0}
          spinner={<Loader color={"#3300FF"} size={25} />}
        >
          Send Now
        </Button>
      </Stack>
    </form>
  );
};
export default ForgotPassword;
