import React from "react";

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
  useToast,
  ModalHeader,
  Divider,
} from "@chakra-ui/react";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { useHistory } from "react-router-dom";
import { Profile } from "common/types";

const ImportScanModal: React.FC<{
  onClose: any;
  isOpen: boolean;
  scanDetails: any;
  profileData: Profile | undefined;
}> = ({ isOpen, onClose, scanDetails, profileData }) => {
  const toast = useToast();
  const history = useHistory();
  const importScan = async () => {
    const responseData = await API.post(API_PATH.API_START_SCAN_BLOCK, {
      parent_project_id: scanDetails.project_id,
      contract_address: scanDetails.contract_address,
      contract_chain: scanDetails.contract_chain,
      contract_platform: scanDetails.contract_platform,
    });
    if (responseData.status === 200 && responseData.data.status === "success") {
      history.push("/projects");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="bg.subtle"
          w={"40vw"}
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
              <Text
                fontSize="md"
                textAlign="center"
                lineHeight="title"
                fontWeight={"300"}
              >
                Heads up! You currently have{" "}
                <strong>{profileData?.credits}</strong> scan credits. Viewing
                full detail result of a scan will use <strong>1</strong> credit.
                Do you wish to proceed?
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter alignItems={"center"} justifyContent={"center"} mt={10}>
            <Button
              h={"50px"}
              mt={"auto"}
              mb={2}
              variant="brand"
              px={12}
              borderRadius={10}
              fontSize={"md"}
              fontWeight={500}
              onClick={importScan}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImportScanModal;
