import { Button, Image, useDisclosure } from "@chakra-ui/react";
import API from "helpers/api";
import Auth from "helpers/auth";
import {
  getBrowserName,
  getDeviceType,
  getFeatureGateConfig,
  getAssetsURL,
} from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useConfig } from "hooks/useConfig";
import Loader from "../../components/styled-components/Loader";
import { useMetaMask } from "metamask-react";
import StyledButton from "components/styled-components/StyledButton";
import MetamaskInstallModal from "./MetamaskInstallModal";

const MetaMaskLogin: React.FC = () => {
  const config = useConfig();
  const assetsURL = getAssetsURL(config);
  const history = useHistory();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const { status, connect, ethereum } = useMetaMask();
  const connectToMetamask = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
    if (status === "unavailable") {
      onOpen();
      return;
    }
    await connect();
    if (window.ethereum.selectedAddress) {
      getNonce(window.ethereum.selectedAddress);
    }
  };

  const checkBrowserAndDevice = (): boolean => {
    // Detect Brave
    if (navigator.brave) return true;

    //Check if Mobile
    if (getDeviceType() === "mobile")
      return getFeatureGateConfig(config).metamask_integration.mobile_enabled;

    return (
      getBrowserName() &&
      getFeatureGateConfig(
        config
      ).metamask_integration.supported_browser.includes(
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
      {getFeatureGateConfig(config).metamask_integration.enabled &&
        checkBrowserAndDevice() && (
          <>
            <StyledButton
              onClick={connectToMetamask}
              py={6}
              mt={[5, 5, 5, 0]}
              background="#F2F2F2"
              fontWeight={500}
              width={"fit-content"}
              alignSelf="center"
              px={6}
              color="#8B8B8B"
              isLoading={isLoading}
            >
              <Image
                mr={2}
                src={`${assetsURL}common/MetaMask_Fox.svg`}
                height="35px"
                width="35px"
              />
              Continue with MetaMask
            </StyledButton>
            <MetamaskInstallModal onClose={onClose} isOpen={isOpen} />
          </>
        )}
    </>
  );
};

export default MetaMaskLogin;
