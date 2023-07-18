import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Flex,
  Text,
  Button,
  Heading,
  HStack,
  VStack,
  Stack,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

import { Logo, MailSent, MailLock } from "components/icons";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useOrgProfile } from "hooks/useOrgProfile";
import API from "helpers/api";
import Auth from "helpers/auth";

import { AuthResponse } from "common/types";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AcceptOrgInvitation: React.FC = () => {
  //   const [loading, setLoading] = useState(false);
  //   const [verification, setVerification] = useState<"success" | "failed" | null>(
  //     null
  //   );
  //   const [errorMessage, setErrorMessage] = useState("");

  const query = useQuery();
  const email = query.get("email")?.toString();
  const token = query.get("token")?.toString();
  const orgName = query.get("org_name")?.toString();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useOrgProfile(orgName);

  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);
  const [show, setShow] = useState(false);

  const rejectOrgRequest = async () => {
    if (orgName.length > 5) {
      try {
        setLoading(true);
        const { data } = await API.post<{
          status: string;
          message: boolean;
        }>(API_PATH.API_REJECT_ORGANISATION_REQUEST, {
          org_name: orgName,
          token: token,
          email: "satyam+testorg23@credshields.com",
        });
        if (data.status === "success") {
          toast({
            title: data.message,
            status: data.status,
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: data.message,
            status: data.status,
            duration: 3000,
            isClosable: true,
          });
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const checkOrganisationNameRequest = async () => {
    if (orgName.length > 5) {
      try {
        setLoading(true);
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
            setNext(true);
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
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // const verifyEmail = async () => {
    //   setLoading(true);
    //   try {
    //     const { data } = await API.post<AuthResponse>(
    //       API_PATH.API_VERIFY_EMAIL,
    //       {
    //         email,
    //         token,
    //       }
    //     );
    //     if (data.status === "success") {
    //       setVerification("success");
    //       setLoading(false);
    //       Auth.authenticateUser();
    //     }
    //   } catch (error) {
    //     setLoading(false);
    //     setVerification("failed");
    //     setErrorMessage(error.response.data.message);
    //   }
    // };
    // verifyEmail();
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
        <Logo />
      </Flex>
      <Flex
        align="center"
        direction="column"
        justifyContent="space-between"
        my={8}
        h="60vh"
        w="100vw"
      >
        {isLoading ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Loader />
          </Flex>
        ) : (
          <>
            <VStack
              align="center"
              direction="column"
              justifyContent="flex-start"
              spacing={3}
              w="90vw"
            >
              <Heading fontSize="2xl">
                {next ? "Add password?" : "Organization Invitation"}
              </Heading>
              <Text color="subtle">
                {next ? "Create a password to join the Orgnization" : ""}
              </Text>
            </VStack>
            <Flex
              w="90%"
              align="center"
              direction="column"
              justifyContent="flex-start"
              maxW="750px"
              h="fit-content"
              bgColor="#FCFCFC"
              border="1px solid #EAEAEA"
              p={10}
              borderRadius={10}
            >
              <Heading fontSize="lg">{data?.org_name}</Heading>
              <HStack mt={7}>
                <Text fontSize="sm">Total</Text>
                <Text fontSize="sm" color="#3E15F4">
                  {data?.user_count} Members
                </Text>
              </HStack>
              {next ? (
                <InputGroup mt={10}>
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
              ) : (
                <Text fontSize="sm" mt={10}>
                  Polygon Compound Team has invited you join their organization
                </Text>
              )}
            </Flex>
            {next ? (
              <VStack spacing={5}>
                <Button variant="brand" w="500px">
                  Join Organisation
                </Button>
                <Button
                  variant="accent-ghost"
                  w="200px"
                  onClick={() => setNext(false)}
                >
                  {"< Go Back"}
                </Button>
              </VStack>
            ) : (
              <Stack direction="row" spacing={10}>
                <Button
                  py={6}
                  variant="outline"
                  w="200px"
                  isLoading={loading}
                  onClick={rejectOrgRequest}
                >
                  Reject
                </Button>
                <Button
                  disabled={next ? true : orgName.length < 5}
                  variant="brand"
                  w="200px"
                  isLoading={loading}
                  onClick={checkOrganisationNameRequest}
                >
                  Accept
                </Button>
              </Stack>
            )}
          </>
        )}
      </Flex>
      {/* {loading && (
        <Flex align="center" direction="column" >
          <Loader />
        </Flex>
      )} */}

      {/* {verification === "success" && (
        <CustomFlex
          align="center"
          direction="column"
          my={36}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MailSent size={130} />
          <Text fontSize="2xl" fontWeight={600} mb={4} mt={8}>
            Email has been verified
          </Text>
          <Link to="/home">
            <Button variant="brand" width="350px" my={2}>
              Go to dashboard
            </Button>
          </Link>
        </CustomFlex>
      )} */}
      {/* {verification === "failed" && (
        <CustomFlex
          align="center"
          direction="column"
          my={36}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MailLock size={130} />
          <Text fontSize="2xl" fontWeight={600} mb={4} mt={8} color="red">
            {errorMessage}
          </Text>
        </CustomFlex>
      )} */}
    </>
  );
};

export default AcceptOrgInvitation;
