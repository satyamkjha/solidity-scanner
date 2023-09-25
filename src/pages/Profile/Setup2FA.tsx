import React, { useState } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  Text,
  HStack,
  VStack,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Heading,
  PopoverBody,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FaMobileAlt } from "react-icons/fa";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import QRCode from "react-qr-code";
import API from "helpers/api";
import { TreeItem } from "common/types";
import { API_PATH } from "helpers/routeManager";

export const Setup2FA: React.FC<{
  onClose(): any;
  isOpen: boolean;
  provisioning_uri: string;
  two_factor_hash: string;
}> = ({ isOpen, onClose, provisioning_uri, two_factor_hash }) => {
  const toast = useToast();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verify2FA = async () => {
    setIsLoading(true);
    const { data } = await API.post(API_PATH.API_2FA_VERIFY, {
      otp,
    });

    if (data.status === "success" && data.message === "OTP Valid") {
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "70vw"]}
          minW={"300px"}
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="bg.subtle"
          minH={"fit-content"}
        >
          <ModalHeader
            px={10}
            background="rgba(82, 255, 0, 0.04)"
            backgroundImage={`url('${assetsURL}background/pattern.png')`}
            textAlign={["center", "center", "center", "left"]}
          >
            <HStack spacing={5}>
              <FaMobileAlt size={30} />{" "}
              <Heading fontSize={"xl"} fontWeight={600}>
                Setup Two factor Authentication
              </Heading>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]} py={10}>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              flexDir="column"
              py={5}
            >
              <VStack alignItems="flex-start">
                <Text fontSize={"lg"} fontWeight={600}>
                  Setup Two Factor Authentication with Authenticator App
                </Text>
                <Text fontSize="sm">
                  Authenticator apps and browser extensions such as 1Password,
                  Authy, Microsoft Authenticator, and others create single-use
                  passwords utilized as a secondary verification method for
                  confirming your identity when required during the login
                  process.
                </Text>
              </VStack>

              <Text mt={10} fontSize={"md"} fontWeight={600}>
                Scan the QR Code
              </Text>

              <Text mt={2} fontSize={"sm"}>
                Use an authenticator app or browser extension to scan the below
                QR code.
              </Text>

              {provisioning_uri && (
                <QRCode
                  size={50}
                  style={{
                    height: "auto",
                    width: "250px",
                    padding: "10px",
                    border: "2px solid #b2bec2",
                    borderRadius: "10px",
                    marginTop: "20px",
                  }}
                  value={provisioning_uri}
                  viewBox={`0 0 50 50`}
                />
              )}

              <Text mt={10} fontSize={"sm"}>
                Unable to scan? You can use{" "}
                <Popover>
                  <PopoverTrigger>
                    <Box as="span" color="#3300FF" fontStyle="underline">
                      setup key
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Your Two Factor Secret</PopoverHeader>
                    <PopoverBody>{two_factor_hash}</PopoverBody>
                  </PopoverContent>
                </Popover>{" "}
                the to manually configure your authenticator app.
              </Text>

              <Text mt={10} fontSize={"md"} fontWeight={600}>
                Verify the code from the app
              </Text>

              <InputGroup size="lg" w="270px" mt={5}>
                <Input
                  borderRadius="15px"
                  type={"text"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <InputRightElement w="fit-content">
                  <Button
                    py={3}
                    mr={1}
                    w="80px"
                    variant="brand"
                    isLoading={isLoading}
                    onClick={verify2FA}
                  >
                    Verify
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Setup2FA;
