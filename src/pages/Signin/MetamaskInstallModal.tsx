import React from "react";
import SmallMessageModal from "components/smallMessageModal";
import { HStack, Text, Heading, Image } from "@chakra-ui/react";
import { useConfig } from "hooks/useConfig";
import StyledButton from "components/styled-components/StyledButton";
import { getAssetsURL } from "helpers/helperFunction";

const MetamaskInstallModal: React.FC<{
  onClose(): any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  const config = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <>
      <SmallMessageModal
        isOpen={isOpen}
        onClose={onClose}
        modalHeader={
          <HStack width="100%">
            <Text>Connect with Metamask</Text>{" "}
            <Image
              mr={2}
              src={`${assetsURL}common/MetaMask_Fox.svg`}
              height="35px"
              width="35px"
            />
          </HStack>
        }
        modalBody={
          <>
            <Image
              mb={5}
              src={`${assetsURL}common/MetaMask_Fox.svg`}
              height="100px"
              width="100px"
            />
            <Heading w="70%" fontSize="2xl">
              MetaMask is not Installed
            </Heading>
            <Heading w="70%" mt={3} color="#8A94A6" fontSize="md">
              MetaMask extension is not installed in your browser
            </Heading>
            <StyledButton
              py={6}
              mt={10}
              background="#F2F2F2"
              fontWeight={900}
              width={"200px"}
              alignSelf="center"
              px={6}
              color="#8B8B8B"
              onClick={() => {
                window.open("https://metamask.io/download/", "_blank");
                onClose();
              }}
            >
              INSTALL
            </StyledButton>
          </>
        }
      />
    </>
  );
};

export default MetamaskInstallModal;
