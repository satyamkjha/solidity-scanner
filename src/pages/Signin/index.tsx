import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  Image
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FiAtSign } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import MetaMaskSDK from '@metamask/sdk';

import { Logo } from "components/icons";

import API from "helpers/api";
import Auth from "helpers/auth";
import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignIn: React.FC = () => {
  const query = useQuery();
  const isPasswordReset = Boolean(query.get("isPasswordReset")?.toString());
  const toast = useToast();

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
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
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
        <Heading fontSize="2xl">Sign In</Heading>
        <Text color="subtle" my={3}>
          Welcome back, you’ve been missed!
        </Text>
        {/* <Button my={4} sx={{ fontSize: "13px", px: 8, py: 6 }} isDisabled>
          <Icon as={FcGoogle} mr={2} fontSize="20px" />
          Sign In with Google
        </Button> */}

        {/* <Flex
          align="center"
          justify="center"
          width={["300px", "400px", "500px"]}
          color="subtle"
          px={5}
          mt={8}
          sx={{
            height: 0.5,
            borderColor: "#EDF2F7",
            borderStyle: "solid",
            borderLeftWidth: ["130px", "180px", "220px"],
            borderRightWidth: ["130px", "180px", "220px"],
          }}
        >
          <Text fontWeight={600} color="subtle">
            OR
          </Text>
        </Flex> */}
        <LoginForm />
        <Link
          as={RouterLink}
          variant="subtle"
          fontSize="sm"
          mr={1}
          mt={4}
          to="/signup"
        >
          Dont have an account yet?{" "}
          <Box as="span" color="black" fontWeight={600}>
            Sign up
          </Box>
        </Link>
      </Flex>
    </>
  );
};

type FormData = {
  email: string;
  password: string;
};


new MetaMaskSDK({
  useDeeplink: false,
  communicationLayerPreference: "socket",
});

const LoginForm: React.FC = () => {
  const { handleSubmit, register, formState } = useForm<FormData>();
  const [show, setShow] = useState(false);
  const history = useHistory();
  const onSubmit = async ({ email, password }: FormData) => {
    const { data } = await API.post<AuthResponse>("/api-login/", {
      email,
      password,
    });

    if (data.status === "success") {
      Auth.authenticateUser();
      history.push("/home");
    }
  };

  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [response, setResponse] = useState("");

  const connect = () => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
        params: [],
      })
      .then((res) => console.log("request accounts", res))
      .catch((e) => console.log("request accounts ERR", e));
  };

  const addEthereumChain = () => {
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: { symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
          },
        ],
      })
      .then((res) => console.log("add", res))
      .catch((e) => console.log("ADD ERR", e));
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", (chain) => {
      console.log(chain);
      setChain(chain);
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      console.log(accounts);
      setAccount(accounts?.[0]);
    });
  }, []);

  const sign = async () => {
    const msgParams = JSON.stringify({
      domain: {
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: parseInt(window.ethereum.chainId, 16),
        // Give a user friendly name to the specific contract you are signing for.
        name: "Ether Mail",
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: "1",
      },

      // Defining the message signing data content.
      message: {
        /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
        contents: "Hello, Bob!",
        attachedMoneyInEth: 4.2,
        from: {
          name: "Cow",
          wallets: [
            "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
          ],
        },
        to: [
          {
            name: "Bob",
            wallets: [
              "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
              "0xB0B0b0b0b0b0B000000000000000000000000000",
            ],
          },
        ],
      },
      // Refers to the keys of the *types* object below.
      primaryType: "Mail",
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        // Not an EIP712Domain definition
        Group: [
          { name: "name", type: "string" },
          { name: "members", type: "Person[]" },
        ],
        // Refer to PrimaryType
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person[]" },
          { name: "contents", type: "string" },
        ],
        // Not an EIP712Domain definition
        Person: [
          { name: "name", type: "string" },
          { name: "wallets", type: "address[]" },
        ],
      },
    });

    var from = window.ethereum.selectedAddress;

    var params = [from, msgParams];
    var method = "eth_signTypedData_v4";

    try {
      const resp = await window.ethereum.request({ method, params });
      setResponse(resp);
    } catch (e) {
      console.log(e);
    }
  };




  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6} mt={8} width={["300px", "400px", "500px"]}>
        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FiAtSign} color="gray.300" />}
          />
          <Input
            isRequired
            type="email"
            placeholder="Your email"
            variant="brand"
            size="lg"
            {...register("email", { required: true })}
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
            variant="brand"
            size="lg"
            {...register("password", { required: true })}
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
        <Flex width="100%" justify="flex-end">
          <Link
            as={RouterLink}
            variant="subtle"
            fontSize="sm"
            mr={1}
            to="/forgot"
          >
            Forgot Password?
          </Link>
        </Flex>
        <Button
          type="submit"
          variant="brand"
          isLoading={formState.isSubmitting}
        >
          Sign In
        </Button>
        <HStack spacing={5}>
          <Divider background={'#FAFBFC'} width={'43%'}/>
          <Text  color="subtle" my={3}>
          OR
        </Text>
        <Divider background={'#FAFBFC'} width={'45%'}/>
        </HStack>
        <Button
          py={6}
          onClick={connect}
          background='#F2F2F2'
          width={'fit-content'}
          alignSelf='center'
          px={10}
          color='#8B8B8B'
        >
          <Image mr={2} src='/common/MetaMask_Fox.svg' height='35px' width='35px'/>
          Sign In with MetaMask
        </Button>
        
      </Stack>
    </form>
  );
};
export default SignIn;
