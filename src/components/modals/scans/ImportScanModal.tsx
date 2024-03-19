import React, { useState } from "react";

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  Image,
  Button,
  ModalHeader,
  Divider,
  VStack,
} from "@chakra-ui/react";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { useHistory } from "react-router-dom";
import { Profile } from "common/types";
import {
  getContractBlockChainLogoUrl,
  getAssetsURL,
  getContractBlockchainId,
  getContractChainLabel,
  sentenceCapitalize,
} from "helpers/helperFunction";
import { contractChain } from "common/values";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import StyledButton from "components/styled-components/StyledButton";

const ImportScanModal: React.FC<{
  onClose: any;
  isOpen: boolean;
  scanDetails: any;
  profileData: Profile | undefined;
}> = ({ isOpen, onClose, scanDetails, profileData }) => {
  const history = useHistory();
  const assetsUrl = getAssetsURL();

  const [isLoading, setIsLoading] = useState(false);

  const importScan = async () => {
    setIsLoading(true);
    const responseData = await API.post(API_PATH.API_START_SCAN_BLOCK, {
      parent_project_id: scanDetails.project_id,
      contract_address: scanDetails.contract_address,
      contract_chain: scanDetails.contract_chain,
      contract_platform: scanDetails.contract_platform,
    });
    if (responseData.status === 200 && responseData.data.status === "success") {
      onClose();
      history.push("/projects");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent
          bg="bg.subtle"
          w={"50vw"}
          maxW={"800px"}
          minW={"300px"}
          minH={"fit-content"}
          px={8}
        >
          <ModalHeader textAlign={"center"} pt={6}>
            View Detailed Result
          </ModalHeader>
          <ModalCloseButton mt={4} />
          <Divider mt={2} color="#ECECEC" borderBottomWidth={"2px"} />
          <ModalBody h={"fit-content"} w={"100%"} py={10}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              flexDir="column"
            >
              <Flex
                w="100%"
                justifyContent={["flex-start"]}
                alignItems={"center"}
                flexDir={["column", "column", "row"]}
                mb={8}
              >
                <Flex
                  w="60px"
                  h="60px"
                  backgroundColor={"white"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDir={["column", "column", "row"]}
                >
                  <Image
                    src={`${assetsUrl}${getContractBlockChainLogoUrl(
                      scanDetails.contract_platform || "",
                      scanDetails.contract_chain || ""
                    )}.svg`}
                    width="50px"
                  />
                </Flex>
                <VStack
                  ml={5}
                  alignItems={["center", "center", "flex-start"]}
                  w={["100%", "100%", "calc(100% - 60px)"]}
                  spacing={0}
                  textAlign={["center", "center", "left"]}
                  color={"#171717"}
                >
                  <Text
                    w="100%"
                    overflowWrap="break-word"
                    fontWeight={600}
                    fontSize="md"
                  >
                    {scanDetails.contract_address}
                  </Text>
                  <Flex
                    w="100%"
                    justifyContent={["flex-start"]}
                    alignItems={"center"}
                    flexDir={["row"]}
                  >
                    <Text whiteSpace="nowrap" fontWeight={300} fontSize="sm">
                      {scanDetails.contract_platform === "buildbear"
                        ? "Buildbear"
                        : contractChain[
                            getContractBlockchainId(
                              scanDetails.contract_platform || "",
                              scanDetails.contract_chain || ""
                            )
                          ].blockchainName.toUpperCase()}{" "}
                      {`(${getContractChainLabel(
                        scanDetails.contract_platform || "",
                        scanDetails.contract_chain || ""
                      )})`}
                    </Text>
                    <Divider
                      mx={5}
                      h={7}
                      borderColor="gray.200"
                      orientation="vertical"
                      display={["none", "none", "block"]}
                    />
                    <Text
                      whiteSpace="nowrap"
                      color="gray.400"
                      fontWeight={300}
                      fontSize="sm"
                      mr={2}
                      cursor="pointer"
                      onClick={() =>
                        window.open(scanDetails.contract_url, "_blank")
                      }
                    >
                      {`View on ${sentenceCapitalize(
                        scanDetails.contract_platform || " "
                      )}`}
                      <ExternalLinkIcon ml={2} />
                    </Text>
                  </Flex>
                </VStack>
              </Flex>
              {/* {profileData?.credits ? (
                <Text
                  fontSize="md"
                  textAlign="center"
                  lineHeight="title"
                  fontWeight={"300"}
                >
                  Heads up! You currently have{" "}
                  <strong>{profileData?.credits}</strong> scan credits. Viewing
                  full detail result of a scan will use <strong>1</strong>{" "}
                  credit. Do you wish to proceed?
                </Text>
              ) : (
                <Text
                  fontSize="md"
                  textAlign="center"
                  lineHeight="title"
                  fontWeight={"300"}
                >
                  Not enough scan credits
                </Text>
              )} */}
              <Text
                fontSize="md"
                textAlign="center"
                lineHeight="title"
                fontWeight={"300"}
              >
                Heads up! You currently have{" "}
                <strong>{profileData?.loc_remaining}</strong> LOC. Viewing full
                detail result of a scan will use{" "}
                <strong>{scanDetails.loc}</strong> LOC. Do you wish to proceed?
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter mt={10}>
            {profileData?.credits ? (
              <Button
                h={"50px"}
                mt={"auto"}
                mb={2}
                variant="outline"
                px={12}
                borderRadius={10}
                fontSize={"md"}
                fontWeight={500}
                onClick={onClose}
              >
                Cancel
              </Button>
            ) : null}
            <StyledButton
              h={"50px"}
              mt={"auto"}
              mb={2}
              ml={6}
              variant="brand"
              px={12}
              borderRadius={10}
              fontSize={"md"}
              fontWeight={500}
              isLoading={isLoading}
              // onClick={() => (profileData?.credits ? importScan() : onClose())}
              onClick={() => {
                importScan();
              }}
            >
              {/* {profileData?.credits ? "Confirm" : "OK"} */}Confirm
            </StyledButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImportScanModal;
