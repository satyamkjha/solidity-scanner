import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: any;
}> = ({ isOpen, onClose }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
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
        <ModalHeader background="#FFFFFF" textAlign={"center"}>
          Select Payment Method
        </ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
