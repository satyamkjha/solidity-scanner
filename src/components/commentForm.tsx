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
} from "@chakra-ui/react";

export const CommentForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  updateBugStatus: any;
  status: string;
}> = ({ isOpen, onClose, updateBugStatus, status }) => {
  const [comment, setComment] = useState<string>();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "50vw"]}
          minW={"300px"}
          minH={"fit-content"}
          borderRadius="15px"
          mb={10}
        >
          <ModalHeader
            m={[2, 2, 6]}
            mt={[10, 10, 10, 6]}
            textAlign={"center"}
            fontSize={["lg", "lg", "2xl"]}
          >
            Confirm Action
          </ModalHeader>
          <ModalCloseButton
            m={[2, 2, 6]}
            onClick={() => {
              onClose();
            }}
          />
          <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
            <Flex
              justifyContent={"center"}
              w={"100%"}
              direction="column"
              alignItems={"center"}
              textAlign="center"
            >
              <Text my={4} color="subtle" w={["100%"]}>
                You are about to confirm the Won’t Fix action on the Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Ac a tempor rutrum
                posuere turpis sit amet, consectetur adipiscing elit. Ac a
                tempor rutrum
              </Text>
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
              <Button
                w={["40%", "40%", "20%"]}
                h={"50px"}
                mt={16}
                mb={8}
                variant="brand"
                borderRadius={10}
                fontSize={"md"}
                fontWeight={500}
                disabled={!comment}
                onClick={() => {
                  if (comment) {
                    updateBugStatus(status, comment);
                    onClose();
                  }
                }}
              >
                Confirm
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentForm;
