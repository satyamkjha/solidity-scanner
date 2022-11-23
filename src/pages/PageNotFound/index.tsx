import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
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
  FormControl,
  FormLabel,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaDiscord,
  FaLinkedin,
  FaPhoneAlt,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { MdWork } from "react-icons/md";
import { passwordStrength } from "check-password-strength";

import { FaLock, FaUserAlt } from "react-icons/fa";

import { Logo, MailSent } from "components/icons";

import API from "helpers/api";
import { AuthResponse } from "common/types";
import { platform } from "os";
import { Helmet } from "react-helmet";

const CustomFlex = motion(Flex);

const PageNotFound: React.FC = () => {
  return (
    <>
      <CustomFlex
        align="center"
        direction="column"
        my={36}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Heading fontSize="5xl" fontWeight={600} mb={4} mt={8}>
          Error 404
        </Heading>
        <Text fontSize="xl" color="subtle">
          The page you are looking for can't be found
        </Text>
      </CustomFlex>
    </>
  );
};

export default PageNotFound;

export const CustomPageNotFound: React.FC = () => {

  const history = useHistory()

  useEffect(() => {
    history.push('/page-not-found')
  }, [])

  return (
    <>
      <CustomFlex
        align="center"
        direction="column"
        my={36}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Spinner/>
      </CustomFlex>
    </>
  );
};


