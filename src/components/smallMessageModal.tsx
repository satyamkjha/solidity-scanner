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
} from "@chakra-ui/react";

const SmallMessageModal: React.FC<{
  onClose(): any;
  isOpen: boolean;
  modalHeader: any;
  modalBody: any;
}> = ({ isOpen, onClose, modalHeader, modalBody }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "45vw"]}
          minW={"300px"}
          minH={"600px"}
          alignItems={"center"}
          borderRadius="15px"
          mb={10}
          p={5}
        >
          <ModalHeader textAlign={"center"} fontSize={["lg", "lg", "2xl"]}>
            {modalHeader}
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
              h={"50vh"}
              direction="column"
              alignItems={"center"}
              textAlign="center"
            >
              {modalBody}
              <Button
                h={"50px"}
                mt={"auto"}
                mb={2}
                variant="brand"
                px={12}
                borderRadius={10}
                fontSize={"md"}
                fontWeight={500}
                disabled={addComment ? !comment : false}
                onClick={() => {
                  if (addComment) {
                    onActionConfirm(comment);
                    setComment("");
                    onClose();
                  } else {
                    onClose();
                    onActionConfirm();
                  }
                }}
              >
                {confirmBtnText || "Confirm"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SmallMessageModal;
