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
import Auth from "helpers/auth";


const CustomFlex = motion(Flex);

const CheckEmail: React.FC = () => {
  const [email, setEmail] = useState<string | null>("");
  const history = useHistory()
  useEffect(() => {
    if (localStorage.getItem("current-registered-email")) {
      setEmail(localStorage.getItem("current-registered-email"));
      localStorage.removeItem("current-registered-email");
    }
    let intervalId: NodeJS.Timeout;
    const checkIfAuthenticated = () => {
      intervalId = setInterval(async () => {
        if(Auth.isUserAuthenticated()){
          history.push('/home')
        }
      }, 2000);
    };
    checkIfAuthenticated();
    return () => {
      clearInterval(intervalId);
    };

  }, []);

  return (
    <>
      <Helmet>
        {/* Event snippet for Signup Completion - Nov conversion page */}
        <script>
          {`  gtag('event', 'conversion', {'send_to': 'AW-11015092885/e-hACNzf-4IYEJX1s4Qp'});`}
        </script>
      </Helmet>
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
          We've sent a link to your registered email address.
        </Text>
        <Text mt={3} color="subtle">
          Haven't received your email ? Have you checked your{" "}
          <Box as="span" color={"black"} fontWeight={700}>
            Spam/Promotions
          </Box>{" "}
          Folder?
        </Text>
      </CustomFlex>
    </>
  );
};

export default CheckEmail;

