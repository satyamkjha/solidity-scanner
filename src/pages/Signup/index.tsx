import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
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
import { passwordStrength } from "check-password-strength";

import { FaLock, FaUserAlt } from "react-icons/fa";

import { Logo, MailSent } from "components/icons";

import API from "helpers/api";
import { AuthResponse } from "common/types";

const CustomFlex = motion(Flex);

const SignUp: React.FC = () => {
  const [registered, setRegistered] = useState(false);

  const [email, setEmail] = useState("");

  const passwordChecker = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

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
          {/* <Button my={4} sx={{ fontSize: "13px", px: 8, py: 6 }} isDisabled>
            <Icon as={FcGoogle} mr={2} fontSize="20px" />
            Sign Up with Google
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
          <RegisterForm
            setRegistered={setRegistered}
            setEmail={setEmail}
            email={email}
          />
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
          <Text mt={3} color="subtle">
            Haven't received your email ? Have you checked your {" "}
            <Box as="span" color={'black'} fontWeight={700}>
              Spam/Promotions
            </Box>{" "}
            Folder?
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
  email: string;
}> = ({ setRegistered, setEmail, email }) => {
  const { handleSubmit, register, formState } = useForm<FormData>();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<{
    contains: string[];
    id: number;
    value: string;
    length: number;
  } | null>(null);
  const [contactNumber, setContactNumber] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const onSubmit = async () => {
    const { data } = await API.post<AuthResponse>("/api-register/", {
      email: email,
      password1: password,
      company_name: companyName,
      contact_number: contactNumber,
      first_name: name,
    });

    if (data.status === "success") {
      setRegistered(true);
      setEmail(email);
    }
  };

  const charTypes = ["lowercase", "uppercase", "symbol", "number"];

  function unique(arr1: string[], arr2: string[]) {
    let uniqueArr: string[] = [];
    for (var i = 0; i < arr1.length; i++) {
      let flag = 0;
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          arr2.splice(j, 1);
          j--;
          flag = 1;
        }
      }

      if (flag == 0) {
        uniqueArr.push(arr1[i]);
      }
    }
    arr2.forEach((item) => {
      uniqueArr.push(item);
    });
    return uniqueArr;
  }

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
            value={name}
            type="text"
            placeholder="Your name"
            variant="brand"
            size="lg"
            onChange={(event) => setName(event.target.value)}
          />
        </InputGroup>

        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={MdWork} color="gray.300" />}
          />
          <Input
            isRequired
            value={companyName}
            placeholder="Your company"
            variant="brand"
            size="lg"
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </InputGroup>

        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FaPhoneAlt} color="gray.300" />}
          />
          <Input
            value={contactNumber}
            isRequired
            placeholder="Your phone number"
            variant="brand"
            size="lg"
            onChange={(event) => setContactNumber(event.target.value)}
          />
        </InputGroup>

        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FiAtSign} color="gray.300" />}
          />
          <Input
            isRequired
            value={email}
            type="email"
            placeholder="Your email"
            variant="brand"
            size="lg"
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            type="password"
            placeholder="Create password"
            variant="brand"
            size="lg"
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError(passwordStrength(event.target.value));
            }}
          />
        </InputGroup>
        {passwordError &&
          passwordError.length < 8 &&
          passwordError.contains.length < 4 && (
            <Text color={"subtle"} size={"xs"}>
              Your password should contain a
              {unique(passwordError.contains, charTypes).map(
                (item) => ` ${item}, `
              )}
              {passwordError.length < 8 &&
                ` and should have ${8 - passwordError.length} more characters`}
            </Text>
          )}

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
