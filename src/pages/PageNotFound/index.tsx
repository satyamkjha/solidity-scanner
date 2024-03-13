import React, { useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Flex,
  Heading,
  Text,
  Button,
  Box,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import Auth from "helpers/auth";
import { LogoIcon } from "components/icons";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import Loader from "components/styled-components/Loader";

const CustomFlex = motion(Flex);

const PageNotFound: React.FC = () => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const history = useHistory();

  useEffect(() => {
    const handleBackButton = () => {
      // Your code to handle the back button press
      if (Auth.isUserAuthenticated()) {
        history.push("/home");
      } else {
        window.open("/", "_self");
      }
    };
    window.addEventListener("popstate", handleBackButton);
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
        <HStack spacing={4}>
          <LogoIcon size={45} />
          <Heading fontSize="4xl" fontWeight={700}>
            SolidityScan
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
            src={`${assetsURL}common/404.png`}
            zIndex={"10"}
            alt={"404 Page Not Found"}
          />
        </Box>
        <VStack my={[20, 20, 20, 4]} mx="8" spacing="2" textAlign={"center"}>
          <Heading fontSize="2xl">We are Sorry ...</Heading>
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Loader />
      </CustomFlex>
    </>
  );
};
