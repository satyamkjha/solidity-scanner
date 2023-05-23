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
  Text,
  Divider,
} from "@chakra-ui/react";

const ConfirmActionForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  onActionConfirm: any;
  modalHeader: string;
  modelText: any;
  addComment?: boolean;
  confirmBtnText?: string;
}> = ({
  isOpen,
  onClose,
  onActionConfirm,
  modalHeader,
  modelText,
  addComment,
  confirmBtnText,
}) => {
  const [comment, setComment] = useState<string>();
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
              {modelText}
              {addComment && (
                <Textarea
                  variant={"brand"}
                  placeholder="Your Comment"
                  borderRadius={"16px"}
                  fontSize={"15px"}
                  borderColor={"gray.100"}
                  borderWidth={"2px"}
                  noOfLines={4}
                  mt={10}
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  height={"120px"}
                  _hover={{ borderColor: "gray.200" }}
                  size="sm"
                  _focus={{
                    borderColor: "#52FF00",
                    boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                  }}
                />
              )}
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

export default ConfirmActionForm;
