import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiAtSign } from "react-icons/fi";

import { Logo, MailSent } from "components/icons";

import { AuthResponse } from "common/types";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

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

          <ForgotPasswordForm setMailSent={setMailSent} setEmail={setEmail} />
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
  setMailSent: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setMailSent, setEmail }) => {
  const { handleSubmit, register, formState } = useForm<FormData>();

  const onSubmit = async ({ email }: FormData) => {
    const { data } = await API.post<AuthResponse>(API_PATH.API_SEND_EMAIL, {
      email,
    });

    if (data.status === "success") {
      setMailSent(true);
      setEmail(email);
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

        <Button
          type="submit"
          variant="brand"
          isLoading={formState.isSubmitting}
        >
          Send Now
        </Button>
      </Stack>
    </form>
  );
};
export default ForgotPassword;
