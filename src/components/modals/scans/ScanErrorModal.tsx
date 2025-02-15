import React from "react";

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  HStack,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { getTrimmedScanMessage, snakeToNormal } from "helpers/helperFunction";
import { WarningIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { RescanIcon } from "components/icons";
import { ScanTitleComponent } from "./InScanModal";
import { useHistory } from "react-router-dom";
import ModalBlurOverlay from "components/common/ModalBlurOverlay";
import { useWebSocket } from "hooks/useWebhookData";
import AddProjectForm from "pages/Home/AddProjectForm";
import { useQueryClient } from "react-query";

const ScanErrorModal: React.FC<{
  onClose: any;
  isOpen: boolean;
  inScanDetails: any;
  insufficientMsg?: any;
}> = ({ isOpen, onClose, inScanDetails, insufficientMsg }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { sendMessage } = useWebSocket();
  const { isOpen: openModal, onOpen, onClose: closeModal } = useDisclosure();

  const rescan = () => {
    if (inScanDetails.scan_type === "project") {
      if (inScanDetails.project_url === "File Scan") {
        onOpen();
      } else {
        sendMessage({
          type: "project_scan_initiate",
          body: {
            project_id: inScanDetails.project_id,
            project_type: "existing",
          },
        });
        queryClient.invalidateQueries("profile");
        onClose();
      }
    } else {
      let req = {};
      req = {
        contract_address: inScanDetails.contract_address,
        contract_platform: inScanDetails.contract_platform,
        contract_chain: inScanDetails.contract_chain,
      };
      sendMessage({
        type: "block_scan_initiate",
        body: req,
      });
      queryClient.invalidateQueries("profile");
      onClose();
    }
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
    >
      <ModalBlurOverlay />
      <ModalContent
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
                  inScanDetails.scan_state === "insufficient_loc"
                    ? "#FFFCF7"
                    : "#FCFCFF",
                border:
                  inScanDetails.scan_state === "insufficient_loc"
                    ? "1px solid #FFC661"
                    : "1px solid #FF5630",
                justifyContent: "flex-start",
                flexDir: "column",
                alignItems: "center",
              }}
            >
              <HStack
                color={
                  inScanDetails.scan_state === "insufficient_loc"
                    ? "#FFA403"
                    : "#FF5630"
                }
                w="100%"
                mb={2}
              >
                <WarningIcon />
                <Heading
                  sx={{
                    fontSize: "sm",
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
                    "This scan has failed, lost LOC will be reimbursed in a few minutes. Please contact support"}
              </Text>

              <Flex
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                mt={5}
              >
                <HStack
                  onClick={() => {
                    rescan();
                  }}
                  spacing={5}
                  cursor={"pointer"}
                >
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
                      rightIcon={<ExternalLinkIcon />}
                      onClick={() =>
                        history.push(
                          `/${inScanDetails.scan_type}s/${inScanDetails.project_id}/${inScanDetails.scan_id}`
                        )
                      }
                      size="sm"
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
      <AddProjectForm
        formType="filescan"
        onClose={() => {
          closeModal();
          onClose();
        }}
        isOpen={openModal}
      />
    </Modal>
  );
};

export default ScanErrorModal;
