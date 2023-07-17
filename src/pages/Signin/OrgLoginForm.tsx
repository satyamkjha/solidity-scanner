import React, { useEffect, useState } from "react";
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
  useToast,
  InputRightElement,
  HStack,
  Divider,
  Image,
} from "@chakra-ui/react";
import { MdPeopleAlt } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { useConfig } from "hooks/useConfig";
import { Logo } from "components/icons";
import { getAssetsURL } from "helpers/helperFunction";
import API from "helpers/api";
import Auth from "helpers/auth";
import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import MetaMaskLogin from "components/metamaskSignin";
import { API_PATH } from "helpers/routeManager";
import GoogleSignIn from "components/googleSignin";
import {
  getFeatureGateConfig,
  getReCaptchaHeaders,
} from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";

const OrgLoginForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(false);
  const [orgName, setOrgName] = useState("");

  const onSubmit = async () => {
    let reqHeaders = await getReCaptchaHeaders("signin");
    setIsLoading(true);
    API.post<AuthResponse>(
      API_PATH.API_ORG_LOGIN,
      { org_name: orgName, email, password },
      {
        headers: reqHeaders,
      }
    ).then(
      (res) => {
        if (res.status === 200) {
          if (res.data.status === "success") {
            Auth.authenticateUser();
            history.push("/home");
          }
        }
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={6} mt={8} width={["90%", "80%", "600px"]}>
        {step ? (
          <>
            <InputGroup alignItems="center">
              <InputLeftElement
                height="48px"
                children={<Icon as={FiAtSign} color="gray.300" />}
              />
              <Input
                isRequired
                type="email"
                placeholder="Your email"
                autoComplete="username"
                variant="brand"
                value={email}
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
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
                type={show ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                variant="brand"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement
                height="48px"
                color="gray.300"
                children={
                  show ? (
                    <ViewOffIcon
                      color={"gray.500"}
                      mr={5}
                      boxSize={5}
                      onClick={() => setShow(false)}
                    />
                  ) : (
                    <ViewIcon
                      color={"gray.500"}
                      mr={5}
                      boxSize={5}
                      onClick={() => setShow(true)}
                    />
                  )
                }
              />
            </InputGroup>
          </>
        ) : (
          <InputGroup alignItems="center">
            <InputLeftElement
              height="48px"
              children={<Icon size={30} as={MdPeopleAlt} color="gray.300" />}
            />
            <Input
              isRequired
              type="text"
              placeholder="Organisation Name"
              autoComplete="username"
              variant="brand"
              value={orgName}
              size="lg"
              onChange={(e) => setOrgName(e.target.value)}
            />
          </InputGroup>
        )}

        <Flex width="100%" justify={step ? "space-between" : "flex-end"}>
          {step && (
            <Button
              variant="link"
              fontSize="sm"
              mr={1}
              my={1}
              onClick={() => setStep(false)}
            >
              Back
            </Button>
          )}

          <Link
            as={RouterLink}
            variant="subtle"
            fontSize="sm"
            mr={1}
            my={1}
            to="/forgot"
          >
            Forgot Password?
          </Link>
        </Flex>
        <Button
          // type="submit"
          variant="brand"
          onClick={() => {
            if (step) {
              onSubmit();
            } else {
              setStep(true);
            }
          }}
          isLoading={isLoading}
          spinner={<Loader color={"#3300FF"} size={25} />}
        >
          {step ? "Sign in" : "Proceed to Sign in"}
        </Button>
      </Stack>
    </form>
  );
};
export default OrgLoginForm;
