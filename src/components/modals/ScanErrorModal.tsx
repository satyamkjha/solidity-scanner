import React from "react";

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  Divider,
  VStack,
  Box,
  Progress,
  Link,
  HStack,
  Heading,
  Button,
} from "@chakra-ui/react";
import { getTrimmedScanMessage, snakeToNormal } from "helpers/helperFunction";
import { contractChain, scanStatesLabel } from "common/values";
import { ExternalLinkIcon, WarningIcon } from "@chakra-ui/icons";
import { LogoIcon, RescanIcon } from "components/icons";
import { ScanTitleComponent } from "./InScanModal";
import { useHistory } from "react-router-dom";

const ScanErrorModal: React.FC<{
  onClose: any;
  isOpen: boolean;
  inScanDetails: any;
  insufficientMsg?: any;
}> = ({ isOpen, onClose, inScanDetails, insufficientMsg }) => {
  const history = useHistory();
  return (
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

            <Flex
              w="100%"
              sx={{
                p: 6,
                m: 3,
                h: "fit-content",
                borderRadius: 10,
                backgroundColor:
                  inScanDetails.tempScanStatus === "insufficient_loc"
                    ? ""
                    : "#FFFCF7",
                border:
                  inScanDetails.tempScanStatus === "insufficient_loc"
                    ? ""
                    : "1px solid #FFC661",
                justifyContent: "flex-start",
                flexDir: "column",
                alignItems: "center",
              }}
            >
              <HStack w="100%" mb={2}>
                <WarningIcon
                  color={
                    inScanDetails.tempScanStatus === "insufficient_loc"
                      ? "#FF5630"
                      : "#FFC661"
                  }
                />
                <Heading
                  sx={{
                    fontSize: "sm",
                    color:
                      inScanDetails.tempScanStatus === "insufficient_loc"
                        ? "#FF5630"
                        : "#FFC661",
                  }}
                >
                  {inScanDetails.scan_state.length > 25
                    ? getTrimmedScanMessage(inScanDetails.scan_state)
                    : snakeToNormal(inScanDetails.scan_state)}
                </Heading>
              </HStack>
              <Text
                w="100%"
                textAlign="left"
                sx={{ fontSize: "xs", color: "#4E5D78" }}
              >
                {inScanDetails.scan_state.length > 25
                  ? inScanDetails.scan_state
                  : inScanDetails.scan_status ||
                    "This scan has failed, lost credits will be reimbursed in a few minutes. Please contact support"}
              </Text>
              <Flex
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                mt={5}
              >
                <HStack spacing={5}>
                  <RescanIcon size={80} />
                  <Text
                    w="100%"
                    overflowWrap="break-word"
                    isTruncated
                    fontWeight={600}
                    fontSize="md"
                  >
                    Rescan Project
                  </Text>
                </HStack>
                {inScanDetails.scan_type === "project" &&
                  inScanDetails.project_url !== "File Scan" && (
                    <Button
                      onClick={() =>
                        history.push(
                          `/${inScanDetails.scan_type}s/${inScanDetails.project_id}/${inScanDetails.scan_id}`
                        )
                      }
                      variant="text"
                      minW="150px"
                      color="#3300FF"
                    >
                      View Scan History
                    </Button>
                  )}
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScanErrorModal;
