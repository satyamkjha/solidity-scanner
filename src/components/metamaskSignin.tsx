import { Button, HStack, Divider, Text, Image } from "@chakra-ui/react";
import MetaMaskSDK from "@metamask/sdk";
import API from "helpers/api";
import Auth from "helpers/auth";
import {
  getBrowserName,
  getDeviceType,
  getFeatureGateConfig,
} from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import React from "react";
import { useHistory } from "react-router-dom";

const MetaMaskLogin: React.FC = () => {
  const history = useHistory();
  const MMSDK = new MetaMaskSDK({
    useDeeplink: true,
    communicationLayerPreference: "socket",
  });

  const ethereum = MMSDK.getProvider();

  const connect = async () => {
    await ethereum.request({ method: "eth_requestAccounts", params: [] });
    if (window.ethereum.selectedAddress) {
      getNonce(window.ethereum.selectedAddress);
    }
  };

  const checkBrowserAndDevice = (): boolean => {
    // Detect Brave
    if (navigator.brave) return false;

    //Check if Mobile
    if (getDeviceType() === "mobile")
      return getFeatureGateConfig().metamask_integration.mobile_enabled;

    return (
      getBrowserName() &&
      getFeatureGateConfig().metamask_integration.supported_browser.includes(
        getBrowserName().toLowerCase()
      )
    );
  };

  const getNonce = async (address: string) => {
    const { data } = await API.get<{
      status: string;
      nonce: string;
    }>(`${API_PATH.API_METAMASK_LOGIN}?public_address=${address}`);
    if (data.status === "success") {
      sign(address, data.nonce);
    }
  };

  const sign = async (address: string, nonce: string) => {
    var from = window.ethereum.selectedAddress;
    var params = [from, nonce];
    var method = "personal_sign";
    const signature = await ethereum.request({ method, params });
    const { data } = await API.post(API_PATH.API_METAMASK_LOGIN, {
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
      {getFeatureGateConfig().metamask_integration.enabled &&
        checkBrowserAndDevice() && (
          <>
            <Button
              onClick={connect}
              py={6}
              my={5}
              background="#F2F2F2"
              fontWeight={500}
              width={"fit-content"}
              alignSelf="center"
              px={6}
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
          </>
        )}
    </>
  );
};

export default MetaMaskLogin;
