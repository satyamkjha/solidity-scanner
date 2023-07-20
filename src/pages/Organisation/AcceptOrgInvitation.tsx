import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
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
import { passwordStrength } from "check-password-strength";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Logo, MailSent, MailLock } from "components/icons";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useOrgProfile } from "hooks/useOrgProfile";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AcceptOrgInvitation: React.FC = () => {
  const query = useQuery();
  const email = query.get("email")?.toString().replace(" ", "+");
  console.log(email);

  const token = query.get("token")?.toString();
  const orgName = query.get("org_name")?.toString();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { data, isLoading } = useOrgProfile(orgName);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState<{
    contains: string[];
    id: number;
    value: string;
    length: number;
  } | null>(null);

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
          status: data.status,
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
          status: data.status,
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

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

      if (flag === 0) {
        uniqueArr.push(arr1[i]);
      }
    }
    arr2.forEach((item) => {
      uniqueArr.push(item);
    });
    return uniqueArr;
  }

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
                <>
                  <InputGroup alignItems="center" mt={10}>
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaUserAlt} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      name="name"
                      value={name}
                      type="text"
                      placeholder="Your name"
                      variant="brand"
                      size="lg"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </InputGroup>
                  <InputGroup mt={3}>
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(passwordStrength(e.target.value));
                      }}
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
                  {passwordError &&
                    passwordError.length < 8 &&
                    passwordError.contains.length < 4 && (
                      <Text color={"subtle"} size={"xs"}>
                        Your password should contain a
                        {unique(passwordError.contains, charTypes).map(
                          (item) => ` ${item}, `
                        )}
                        {passwordError.length < 8 &&
                          ` and should have ${
                            8 - passwordError.length
                          } more characters`}
                      </Text>
                    )}
                </>
              ) : (
                <Text fontSize="sm" mt={10}>
                  {orgName} has invited you join their organization
                </Text>
              )}
            </Flex>
            {next ? (
              <VStack spacing={5} w="100%">
                <Button
                  variant="brand"
                  maxW="500px"
                  w="90%"
                  isLoading={loading}
                  onClick={acceptOrgRequest}
                >
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
              <Stack
                direction={["column", "column", "row"]}
                spacing={[3, 3, 10]}
              >
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
                  variant="brand"
                  w="200px"
                  isLoading={loading}
                  onClick={() => setNext(true)}
                >
                  Accept
                </Button>
              </Stack>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default AcceptOrgInvitation;
