import { Button, HStack, Divider, Text, Image } from "@chakra-ui/react";
import MetaMaskSDK from "@metamask/sdk";
import API from "helpers/api";
import Auth from "helpers/auth";
import React from "react";
import { useHistory } from "react-router-dom";
import UAParser from "ua-parser-js";

const MetaMaskLogin: React.FC = () => {
  const history = useHistory();
  const MMSDK = new MetaMaskSDK({
    useDeeplink: true,
    communicationLayerPreference: "socket",
  });

  let env_var;

  if (process.env.REACT_APP_FEATURE_GATE_CONFIG) {
    env_var = JSON.parse(process.env.REACT_APP_FEATURE_GATE_CONFIG);
  }

  function checkBrowser(): boolean {
    // Detect Brave
    if (navigator.brave) return false;

    const UserAgentInstance = new UAParser();
    const browserName = UserAgentInstance.getBrowser().name;

    return (
      browserName &&
      env_var.metamask_integration.supported_browser.includes(
        browserName.toLowerCase()
      )
    );
  }

  const ethereum = MMSDK.getProvider();

  const connect = async () => {
    await ethereum.request({ method: "eth_requestAccounts", params: [] });
    if (window.ethereum.selectedAddress) {
      getNonce(window.ethereum.selectedAddress);
    }
  };

  const getNonce = async (address: string) => {
    const { data } = await API.get<{
      status: string;
      nonce: string;
    }>(`/api-metamask-login/?public_address=${address}`);
    if (data.status === "success") {
      sign(address, data.nonce);
    }
  };

  const sign = async (address: string, nonce: string) => {
    var from = window.ethereum.selectedAddress;
    var params = [from, nonce];
    var method = "personal_sign";
    const signature = await ethereum.request({ method, params });
    const { data } = await API.post(`/api-metamask-login/`, {
      address: address,
      signature,
    });
    if (data.status === "success") {
      Auth.authenticateUser();
      history.push("/home");
    }
  };
  return (
    <>
      {env_var.metamask_integration.enabled && checkBrowser() && (
        <>
          <Button
            onClick={connect}
            py={6}
            my={5}
            background="#F2F2F2"
            width={"fit-content"}
            alignSelf="center"
            px={10}
            color="#8B8B8B"
          >
            <Image
              mr={2}
              src="/common/MetaMask_Fox.svg"
              height="35px"
              width="35px"
            />
            Continue with MetaMask
          </Button>
          <HStack spacing={5} width={["300px", "400px", "500px"]}>
            <Divider background={"#000000"} width={"43%"} />
            <Text color="subtle" my={3}>
              OR
            </Text>
            <Divider background={"#FAFBFC"} width={"45%"} />
          </HStack>
        </>
      )}
    </>
  );
};

export default MetaMaskLogin;
