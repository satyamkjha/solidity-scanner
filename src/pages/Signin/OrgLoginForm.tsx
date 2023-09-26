import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Flex,
  Stack,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
  useToast,
  InputRightElement,
} from "@chakra-ui/react";
import { MdPeopleAlt } from "react-icons/md";
import { FaLock, FaMobileAlt } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import API from "helpers/api";
import Auth from "helpers/auth";
import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { API_PATH } from "helpers/routeManager";
import { useForm } from "react-hook-form";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import StyledButton from "components/styled-components/StyledButton";
import { isEmail, checkOrgName } from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";

const OrgLoginForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(false);
  const [orgName, setOrgName] = useState("");
  const { handleSubmit } = useForm();
  const [twoFAScreen, setTwoFAScreen] = useState(false);
  const [otp, setOtp] = useState("");

  const onSubmit = async () => {
    if (step) {
      signIn();
    } else {
      // setStep(true);
      checkOrganisationNameRequest();
    }
  };

  const signIn = async () => {
    if (twoFAScreen) {
      setIsLoading(true);
      API.post<AuthResponse>(API_PATH.API_2FA_VERIFY, {
        otp,
        email,
        password,
      }).then(
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
    } else {
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
    }
  };

  const checkOrganisationNameRequest = async () => {
    if (orgName.length > 50 || orgName.length < 1 || checkOrgName(orgName)) {
      toast({
        title: "Organisation Name not Valid",
        description:
          "The number of characters allowed for an Organisation Name should be less than 50",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await API.post<{
        status: string;
        org_name_available: boolean;
      }>(API_PATH.API_CHECK_ORGANISATION_NAME_AVAILABILITY, {
        org_name: orgName,
      });
      if (data.status === "success") {
        if (data.org_name_available) {
          toast({
            title: "Organisation does not exist",
            description:
              "The organisation name you entered is not valid. Please check if the name is correct.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setStep(true);
        }
      } else {
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
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
      onSubmit={handleSubmit(onSubmit)}
    >
      {" "}
      {twoFAScreen ? (
        <Stack spacing={6} mt={8} width={["90%", "80%", "600px"]}>
          <InputGroup alignItems="center">
            <InputLeftElement
              height="48px"
              children={<Icon as={FaMobileAlt} color="gray.300" />}
            />
            <Input
              isRequired
              type="text"
              placeholder="OTP from Authenticator App"
              autoComplete="off"
              variant="brand"
              value={otp}
              size="lg"
              onChange={(e) => {
                if (otp.length < 7) setOtp(e.target.value);
              }}
            />
          </InputGroup>
          <Button
            type="submit"
            variant="brand"
            isLoading={isLoading}
            spinner={<Loader color={"#3300FF"} size={25} />}
            disabled={otp.length !== 6}
          >
            Sign In
          </Button>
        </Stack>
      ) : (
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
                name="org_name"
                type="text"
                placeholder="Organisation Name"
                autoComplete="off"
                variant="brand"
                value={orgName}
                size="lg"
                onChange={(e) => setOrgName(e.target.value)}
              />
            </InputGroup>
          )}

          <Flex width="100%" justify={step ? "space-between" : "flex-end"}>
            {step && (
              <>
                <Button
                  variant="link"
                  fontSize="sm"
                  mr={1}
                  my={1}
                  onClick={() => setStep(false)}
                >
                  Back
                </Button>

                <Link
                  as={RouterLink}
                  variant="subtle"
                  fontSize="sm"
                  mr={1}
                  my={1}
                  to={`/forgot/${orgName}`}
                >
                  Forgot Password?
                </Link>
              </>
            )}
          </Flex>
          <StyledButton
            type="submit"
            variant="brand"
            isLoading={isLoading}
            disabled={
              step
                ? email.length < 1 ||
                  password.length < 1 ||
                  email.length > 50 ||
                  password.length > 50 ||
                  !isEmail(email)
                : orgName.length < 1 ||
                  orgName.length > 50 ||
                  checkOrgName(orgName)
            }
          >
            {step ? "Sign in" : "Proceed to Sign in"}
          </StyledButton>
        </Stack>
      )}
    </form>
  );
};
export default OrgLoginForm;
