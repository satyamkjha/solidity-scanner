import React, { useState, useEffect } from "react";

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Button,
  VStack,
  HStack,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ScanTitleComponent } from "./InScanModal";
import ModalBlurOverlay from "components/common/ModalBlurOverlay";
import { useWebSocket } from "hooks/useWebhookData";
import AddProjectForm from "pages/Home/AddProjectForm";

const ReScanTrialScanModal: React.FC<{
  closeModal: any;
  open: boolean;
  scanDetails: any;
}> = ({ open, closeModal, scanDetails }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sendMessage } = useWebSocket();
  const rescan = () => {
    if (scanDetails.scan_type === "project") {
      if (scanDetails.project_url === "File Scan") {
        onOpen();
      } else {
        sendMessage({
          type: "project_scan_initiate",
          body: {
            project_id: scanDetails.project_id,
            project_type: "existing",
          },
        });
      }
    } else {
      let req = {};
      req = {
        contract_address: scanDetails.contract_address,
        contract_platform: scanDetails.contract_platform,
        contract_chain: scanDetails.contract_chain,
      };
      sendMessage({
        type: "block_scan_initiate",
        body: req,
      });
    }
    closeModal();
  };

  return (
    <>
      <Modal
        isCentered
        isOpen={open}
        onClose={closeModal}
        scrollBehavior={"inside"}
      >
        <ModalBlurOverlay />
        <ModalContent
          bg="bg.subtle"
          w={"90vw"}
          maxW={"800px"}
          minW={"300px"}
          minH={"fit-content"}
          px={[2, 4, 8]}
        >
          <ModalCloseButton mt={4} />
          <ModalBody px={[0, 0, 2]} h={"fit-content"} w={"100%"} py={10}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              flexDir="column"
            >
              <ScanTitleComponent scanData={scanDetails} />
              <VStack
                alignItems="flex-start"
                justifyContent="flex-start"
                textAlign="left"
                background={
                  scanDetails.scan_type === "project" &&
                  scanDetails.project_url === "File Scan"
                    ? "#FBFBFB"
                    : "linear-gradient(to right, #1BD8E330, #FBEAAA30)"
                }
                spacing={4}
                p={7}
                display={["none", "none", "flex"]}
                borderRadius={10}
                mt={5}
              >
                <Text fontWeight={900}>
                  {scanDetails.scan_type === "project" &&
                  scanDetails.project_url === "File Scan"
                    ? "Rescan Project"
                    : `${scanDetails.loc} LoCs`}
                </Text>
                <Text>
                  The current project , as per. Pulvinar sit nulla semper
                  pellentesque ac eget. In nisl suspendisse pellentesque augue
                  egestas. Aliquam diam scelerisque risus cursus vel diam nam.
                  scelerisque risus cursus vel diam.
                </Text>
                <Button width="250px" onClick={rescan} variant="brand">
                  {scanDetails.scan_type === "project" &&
                  scanDetails.project_url === "File Scan"
                    ? "Upload Files"
                    : `Unlock Details`}
                </Button>
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
        <AddProjectForm formType="filescan" onClose={onClose} isOpen={isOpen} />
      </Modal>
    </>
  );
};

export default ReScanTrialScanModal;
