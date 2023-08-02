import React, { useState } from "react";

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Divider,
  VStack,
  HStack,
  Text,
  Heading,
  useToast,
  Image,
} from "@chakra-ui/react";
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "600px"]}
          minW={"300px"}
          minH={"500px"}
          alignItems={"center"}
          borderRadius="15px"
          mb={10}
          p={5}
        >
          <ModalHeader
            width="100%"
            textAlign={"left"}
            fontSize={["lg", "lg", "xl"]}
          >
            <HStack width="100%">
              <Text>Connect with Metamask</Text>{" "}
              <Image
                mr={2}
                src={`${assetsURL}common/MetaMask_Fox.svg`}
                height="35px"
                width="35px"
              />
            </HStack>
          </ModalHeader>
          <ModalCloseButton
            m={[6, 6, 6, 7]}
            onClick={() => {
              onClose();
            }}
          />
          <Divider
            w={"90%"}
            mb={10}
            color="#ECECEC"
            borderBottomWidth={"2px"}
          />
          <ModalBody h={"100%"} w={"100%"} px={[6, 6, 6, 12]}>
            <Flex
              justifyContent={"center"}
              w={"100%"}
              h={"300px"}
              direction="column"
              alignItems={"center"}
              textAlign="center"
            >
              <Image
                mb={5}
                src={`${assetsURL}common/MetaMask_Fox.svg`}
                height="100px"
                width="100px"
              />
              <Heading w="70%" fontSize="2xl">
                MetaMask is not Installed
              </Heading>
              <Heading w="70%" mt={3} color="#8A94A6" fontSize="lg">
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
                }}
              >
                INSTALL
              </StyledButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MetamaskInstallModal;
