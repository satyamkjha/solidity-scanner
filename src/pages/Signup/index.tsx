import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
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
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { MdWork } from "react-icons/md";

import { FaLock, FaUserAlt } from "react-icons/fa";

import { Logo, MailSent } from "components/icons";

import API from "helpers/api";
import { AuthResponse } from "common/types";

const CustomFlex = motion(Flex);

const SignUp: React.FC = () => {
  const [registered, setRegistered] = useState(false);
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
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Flex>
      {!registered ? (
        <Flex align="center" direction="column" my={4}>
          <Heading fontSize="2xl">Getting Started</Heading>
          <Text color="subtle" my={3}>
            Create an account to continue!
          </Text>
          <Button my={4} sx={{ fontSize: "13px", px: 8, py: 6 }}>
            <Icon as={FcGoogle} mr={2} fontSize="20px" />
            Sign Up with Google
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
          <RegisterForm setRegistered={setRegistered} setEmail={setEmail} />
          <Link
            as={RouterLink}
            variant="subtle"
            fontSize="sm"
            mr={1}
            mt={4}
            to="/signin"
          >
            Already have an account?{" "}
            <Box as="span" color="black" fontWeight={600}>
              Sign In
            </Box>
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
            Verify your email
          </Text>
          <Text color="subtle">
            We've sent a link to your email address:{" "}
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
  first_name: string;
  email: string;
  password1: string;
  contact_number: string;
  company_name: string;
};

const RegisterForm: React.FC<{
  setRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setRegistered, setEmail }) => {
  const { handleSubmit, register, formState } = useForm<FormData>();

  const onSubmit = async ({
    email,
    password1,
    company_name,
    contact_number,
    first_name,
  }: FormData) => {
    const { data } = await API.post<AuthResponse>("/api-register/", {
      email,
      password1,
      company_name,
      contact_number,
      first_name,
    });

    if (data.status === "success") {
      setRegistered(true);
      setEmail(email);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6} mt={8} width={["300px", "400px", "500px"]}>
        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FaUserAlt} color="gray.300" />}
          />
          <Input
            isRequired
            type="text"
            placeholder="Your name"
            variant="brand"
            size="lg"
            {...register("first_name", { required: true })}
          />
        </InputGroup>

        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={MdWork} color="gray.300" />}
          />
          <Input
            isRequired
            placeholder="Your company"
            variant="brand"
            size="lg"
            {...register("company_name", { required: true })}
          />
        </InputGroup>

        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FaPhoneAlt} color="gray.300" />}
          />
          <Input
            isRequired
            placeholder="Your phone number"
            variant="brand"
            size="lg"
            {...register("contact_number", { required: true })}
          />
        </InputGroup>

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
            placeholder="Create password"
            variant="brand"
            size="lg"
            {...register("password1", { required: true })}
          />
        </InputGroup>
        <Button
          type="submit"
          variant="brand"
          isLoading={formState.isSubmitting}
        >
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};
export default SignUp;
