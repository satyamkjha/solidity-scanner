import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Flex,
  HStack,
  Button,
  Link,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";

export const PublishReportInfo: React.FC<{
  onClose(): any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="bg.subtle"
          maxW="70vw"
          minW={"300px"}
          minH={"fit-content"}
        >
          <ModalCloseButton />
          <ModalBody h={"fit-content"} w={"100%"} px={20} py={10}>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              flexDir="column"
            >
              <Text
                fontSize="md"
                textAlign="left"
                lineHeight="title"
                fontWeight={"300"}
              >
                You can publish a detailed report of the scan conducted and then
                share it across your team or organization using a public URL.
              </Text>
              <Image
                style={{
                  boxShadow: "5px 5px 15px 15px #88888840",
                }}
                borderRadius={10}
                mt={5}
                src="/carousel/Screenshot 5.png"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const GenerateReportInfo: React.FC<{
  onClose(): any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="bg.subtle"
          maxW="70vw"
          minW={"300px"}
          minH={"fit-content"}
        >
          <ModalCloseButton />
          <ModalBody h={"fit-content"} w={"100%"} px={20}>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              flexDir="column"
            >
              <Text
                fontSize="md"
                textAlign="left"
                lineHeight="title"
                fontWeight={"300"}
              >
                Generate a report for your entire team.
              </Text>
              <Image src="/carousel/Screenshot 5.png" />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
