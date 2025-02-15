import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Flex,
  Text,
  Button,
  Heading,
  HStack,
  VStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "components/icons";
import { useValidateInviteLink } from "hooks/useValidateInviteLink";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import { NoBugIcon } from "components/icons";
import StyledButton from "components/styled-components/StyledButton";
import { useForm } from "react-hook-form";
import NameInput from "components/forms/NameInput";
import PasswordInput from "components/forms/PasswordInput";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AcceptOrgInvitation: React.FC = () => {
  const query = useQuery();
  const email = query.get("email")?.toString().replace(" ", "+") || "";
  const token = query.get("token")?.toString() || "";
  const orgName = query.get("org_name")?.toString() || "";
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { data, isLoading } = useValidateInviteLink(token, email, orgName);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { handleSubmit } = useForm();

  const rejectOrgRequest = async () => {
    try {
      setLoading(true);
      const { data } = await API.post<{
        status: string;
        message: boolean;
      }>(API_PATH.API_REJECT_ORGANISATION_REQUEST, {
        org_name: orgName,
        token: token,
        email: email,
      });
      if (data.status === "success") {
        toast({
          title: data.message,
          status: data.status,
          duration: 3000,
          isClosable: true,
        });
        history.push("/");
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const acceptOrgRequest = async () => {
    try {
      setLoading(true);
      const { data } = await API.post<{
        status: string;
        message: boolean;
      }>(API_PATH.API_ACCEPT_ORGANISATION_REQUEST, {
        org_name: orgName,
        token: token,
        password,
        first_name: name,
        email: email,
      });
      if (data.status === "success") {
        toast({
          title: data.message,
          status: data.status,
          duration: 3000,
          isClosable: true,
        });
        history.push("/home");
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

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
        justifyContent="flex-start"
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
              mb={20}
            >
              <Heading fontSize="2xl">
                {next ? "Add password?" : "Organization Invitation"}
              </Heading>
              <Text color="subtle">
                {next ? "Create a password to join the Orgnization" : ""}
              </Text>
            </VStack>
            {data?.organization.is_token_valid ? (
              <form
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                onSubmit={handleSubmit(acceptOrgRequest)}
              >
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
                  <Heading fontSize="lg">
                    {data?.organization.profile?.org_name}
                  </Heading>
                  <HStack mt={7}>
                    <Text fontSize="sm">Total</Text>
                    <Text fontSize="sm" color="#3E15F4">
                      {data?.organization.profile?.user_count} Members
                    </Text>
                  </HStack>
                  {next ? (
                    <VStack alignItems="flex-start" w={["100%", "100%", "90%"]}>
                      <Text mb={0} fontSize="sm">
                        Name
                      </Text>

                      <NameInput
                        isRequired
                        name="name"
                        value={name}
                        w={"100%"}
                        autoComplete="off"
                        placeholder="Your name"
                        onChange={(event) => setName(event.target.value)}
                        onError={(e: any) =>
                          setErrors((prv) => {
                            return { ...prv, Name: e };
                          })
                        }
                      />
                      <Text mt={3} fontSize="sm">
                        Password
                      </Text>
                      <PasswordInput
                        isRequired
                        placeholder="Password"
                        autoComplete="current-password"
                        w={"100%"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onError={(e: any) =>
                          setErrors((prv) => {
                            return { ...prv, Password: e };
                          })
                        }
                      />
                    </VStack>
                  ) : (
                    <Text fontSize="sm" mt={10}>
                      {orgName} has invited you join their organization as{" "}
                      {data?.organization.role}
                    </Text>
                  )}
                </Flex>
                {next ? (
                  <VStack spacing={5} w="100%" mt={10}>
                    <StyledButton
                      variant="brand"
                      maxW="500px"
                      w="90%"
                      isLoading={loading}
                      type="submit"
                      isDisabled={Object.values(errors).join("").length > 0}
                    >
                      Join Organisation
                    </StyledButton>
                    <Button
                      variant="accent-ghost"
                      w="200px"
                      onClick={() => setNext(false)}
                    >
                      {"< Go Back"}
                    </Button>
                  </VStack>
                ) : (
                  <Stack
                    direction={["column", "column", "row"]}
                    spacing={[3, 3, 10]}
                    mt={10}
                  >
                    <StyledButton
                      py={6}
                      variant="outline"
                      w="200px"
                      isLoading={loading}
                      onClick={rejectOrgRequest}
                    >
                      Reject
                    </StyledButton>
                    <StyledButton
                      variant="brand"
                      w="200px"
                      isLoading={loading}
                      onClick={() => setNext(true)}
                    >
                      Accept
                    </StyledButton>
                  </Stack>
                )}
              </form>
            ) : (
              <VStack
                justifyContent="flex-start"
                alignItems="center"
                spacing={10}
              >
                <NoBugIcon size={200} />
                <Heading fontSize="lg">
                  Invitation Link not found or expired
                </Heading>
                <Text w={["200px", "250px", "500px"]} textAlign="center">
                  Oops!
                  <br />
                  It seems that the invitation link you attempted to access has
                  expired, or your account may have been removed from the
                  organization.
                  <br />
                  To resolve this issue, kindly get in touch with the
                  organization administrator or reach out to our support team
                  for assistance.
                </Text>
              </VStack>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default AcceptOrgInvitation;
