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
  HStack,
  Box,
  Progress,
  Link,
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
  getProjectType,
} from "helpers/helperFunction";
import { contractChain, scanStatesLabel } from "common/values";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import StyledButton from "components/styled-components/StyledButton";
import { LOCHeader } from "components/locHeader";
import { LOCInfoContainer } from "components/locInfoContainer";
import { LogoIcon } from "components/icons";

const InScanModal: React.FC<{
  onClose: any;
  isOpen: boolean;
  inScanDetails: any;
}> = ({ isOpen, onClose, inScanDetails }) => {
  const assetsUrl = getAssetsURL();

  const getProjectTypeIconUrl = (
    scanType: string,
    projectUrl: string,
    contractPlatform: string,
    contractChain: string
  ) =>
    `${assetsUrl}${
      scanType === "project"
        ? "icons/integrations/" + getProjectType(projectUrl)
        : scanType === "block"
        ? getContractBlockChainLogoUrl(contractPlatform, contractChain)
        : ""
    }.svg`;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="bg.subtle"
          w={"90vw"}
          maxW={"800px"}
          minW={"300px"}
          minH={"fit-content"}
          borderRadius={20}
          px={[2, 3, 8]}
        >
          <ModalCloseButton mt={4} />
          <ModalBody h={"fit-content"} w={"100%"} px={[0]} py={10}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              flexDir="column"
            >
              <ScanTitleComponent scanData={inScanDetails} />
              <Box mb={10} p={5} w="100%">
                <Flex
                  sx={{
                    display: "inline-flex",

                    alignItems: "center",

                    mb: 2,
                    borderRadius: 15,
                  }}
                >
                  <LogoIcon size={15} />
                  <Text mx={2} fontSize="sm">
                    {scanStatesLabel[inScanDetails.scan_state] ||
                      scanStatesLabel["scanning"]}
                  </Text>
                </Flex>
                <Progress value={20} isIndeterminate size="xs" />
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const ScanTitleComponent: React.FC<{
  scanData: any;
}> = ({ scanData }) => {
  const assetsUrl = getAssetsURL();

  const getProjectTypeIconUrl = (
    scanType: string,
    projectUrl: string,
    contractPlatform: string,
    contractChain: string
  ) =>
    `${assetsUrl}${
      scanType === "project"
        ? "icons/integrations/" + getProjectType(projectUrl)
        : scanType === "block"
        ? getContractBlockChainLogoUrl(contractPlatform, contractChain)
        : ""
    }.svg`;

  return (
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
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={["column", "column", "row"]}
      >
        <Image
          src={getProjectTypeIconUrl(
            scanData.scan_type,
            scanData.project_url || "",
            scanData.contract_platform || "",
            scanData.contract_chain || ""
          )}
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
          isTruncated
          fontWeight={600}
          fontSize="md"
        >
          {scanData.scan_type === "block"
            ? scanData.contract_address
            : scanData.project_name}
        </Text>
        {scanData.scan_type === "block" ? (
          <Flex
            w="100%"
            justifyContent={["flex-start"]}
            alignItems={"center"}
            flexDir={["column", "column", "row"]}
          >
            <Text whiteSpace="nowrap" fontWeight={300} fontSize="sm">
              {scanData.contract_platform === "buildbear"
                ? "Buildbear"
                : contractChain[
                    getContractBlockchainId(
                      scanData.contract_platform || "",
                      scanData.contract_chain || ""
                    )
                  ].blockchainName.toUpperCase()}{" "}
              {`(${getContractChainLabel(
                scanData.contract_platform || "",
                scanData.contract_chain || ""
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
              onClick={() => window.open(scanData.contract_url, "_blank")}
            >
              {`View on ${sentenceCapitalize(
                scanData.contract_platform || " "
              )}`}
              <ExternalLinkIcon ml={2} />
            </Text>
          </Flex>
        ) : (
          <Flex
            w="100%"
            justifyContent={["center", "center", "flex-start"]}
            alignItems={"center"}
            textAlign="center"
            flexDir={["row"]}
            color={"#8A94A6"}
          >
            <Link
              href={
                (scanData.project_url !== "File Scan" &&
                  scanData.project_url) ||
                scanData.project_url
              }
              target={"_blank"}
              fontSize={"sm"}
              isTruncated
              fontWeight={400}
              textDecoration={"none"}
            >
              {scanData.project_url === "File Scan"
                ? "File Scan"
                : "View on" +
                  " " +
                  sentenceCapitalize(getProjectType(scanData.project_url))}
              <ExternalLinkIcon ml={2} />
            </Link>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
};

export default InScanModal;
