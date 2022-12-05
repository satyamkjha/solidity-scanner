import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import {
  Flex,
  Heading,
  Text,
  Button,
  Box,
  Spinner,
  HStack,
  Image,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import Auth from "helpers/auth";

import { LogoIcon } from "components/icons";

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
        my={[12, 12, 12, 16]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <HStack spacing={4}>
          <LogoIcon size={45} />
          <Heading fontSize="4xl" fontWeight={700}>
            Solidity Scan
          </Heading>
        </HStack>
        <Box
          w={["100%", "100%", "100%", "75%"]}
          display={["flex"]}
          flexDirection="column"
          alignItems={"center"}
          overflow="hidden"
        >
          <Image
            marginTop={[24, 24, 24, 10]}
            src="/error/404.png"
            zIndex={"10"}
            alt={"404 Page Not Found"}
          />
        </Box>
        <VStack
          my={[20, 20, 20, 4]}
          mx="8"
          spacing="2"
          textAlign={"center"}
        >
          <Heading fontSize="2xl">
            We are Sorry ...
          </Heading>
          <Text fontSize="md" color="subtle">
            The page you are looking for can't be found
          </Text>
        </VStack>
        <RouterLink to={Auth.isUserAuthenticated() ? "/home" : "/"}>
          <Button variant="brand" mt={[4, 4, 4, 10]}>
            Go Back to Homepage
          </Button>
        </RouterLink>
      </CustomFlex>
    </>
  );
};

export default PageNotFound;

export const CustomPageNotFound: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/page-not-found");
  }, []);

  return (
    <>
      <CustomFlex
        align="center"
        direction="column"
        my={[12, 12, 12, 16]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Spinner />
      </CustomFlex>
    </>
  );
};
