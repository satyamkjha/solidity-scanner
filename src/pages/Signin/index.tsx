import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Link,
  Box,
  useToast,
  HStack,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useConfig } from "hooks/useConfig";
import { Logo } from "components/icons";
import { getAssetsURL } from "helpers/helperFunction";
import MetaMaskLogin from "pages/Signin/MetamaskSignin";
import GoogleSignIn from "pages/Signin/GoogleSignin";
import Loader from "components/styled-components/Loader";
import LoginForm from "./LoginForm";
import OrgLoginForm from "./OrgLoginForm";
import PublishReportForm from "components/modals/report/PublishReportForm";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignIn: React.FC = () => {
  const query = useQuery();
  const isPasswordReset = Boolean(query.get("isPasswordReset")?.toString());
  const toast = useToast();
  const googleLoginEnabled = true;

  const config = useConfig();
  const assetsURL = getAssetsURL(config);
  const [orgLogin, setOrgLogin] = useState(false);

  if (isPasswordReset) {
    toast({
      title: "Password successfully reset.",
      description: "Please login with your new password.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const campaign_type = searchParams.get("utm_source");
    const campaign_id = searchParams.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Flex align="center" direction="column" my={8}>
        <Heading fontSize="2xl">Sign In {orgLogin && "Organisation"}</Heading>
        <Text color="subtle" my={3}>
          {orgLogin
            ? "Type details to Sign In to an Organization"
            : "Welcome back, you’ve been missed!"}
        </Text>
        {!orgLogin && (
          <>
            <Stack
              spacing={[0, 0, 0, 4]}
              direction={["column", "column", "column", "row"]}
            >
              <MetaMaskLogin />
              {googleLoginEnabled && <GoogleSignIn />}
            </Stack>
            <Button
              onClick={() => setOrgLogin(true)}
              py={6}
              mb={5}
              background="#F2F2F2"
              fontWeight={500}
              width={"fit-content"}
              alignSelf="center"
              px={6}
              color="#8B8B8B"
              spinner={<Loader color={"#3300FF"} size={25} />}
            >
              <Image
                mr={2}
                src={`${assetsURL}common/org_icon.svg`}
                height="35px"
                width="35px"
              />
              Sign in to an Organisation
            </Button>
            <HStack spacing={5} width={["90%", "80%", "600px"]}>
              <Divider background={"#FAFBFC"} width={"43%"} />
              <Text color="subtle" my={3}>
                OR
              </Text>
              <Divider background={"#FAFBFC"} width={"45%"} />
            </HStack>
          </>
        )}
        {orgLogin ? <OrgLoginForm /> : <LoginForm />}
        <Link
          as={RouterLink}
          variant="subtle"
          fontSize="sm"
          mr={1}
          mt={10}
          to="/signup"
        >
          Dont have an account yet?{" "}
          <Box as="span" color="black" fontWeight={600}>
            Sign up
          </Box>
        </Link>
        <PublishReportForm />
      </Flex>
    </>
  );
};

export default SignIn;
