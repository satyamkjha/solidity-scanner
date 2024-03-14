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
} from "@chakra-ui/react";
import { getFeatureGateConfig } from "helpers/helperFunction";

import StyledButton from "components/styled-components/StyledButton";
import { monthNames } from "common/values";

const DowntimeAlertModal: React.FC<{
  onClose: any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  const d = new Date(getFeatureGateConfig().maintenance_data.maintenance_start);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent
          bg="bg.subtle"
          w={"50vw"}
          maxW={"800px"}
          minW={"300px"}
          minH={"fit-content"}
          px={8}
        >
          <ModalHeader textAlign={"center"} pt={6}>
            Scheduled Maintenance
          </ModalHeader>
          <ModalCloseButton mt={4} />
          <Divider mt={2} color="#ECECEC" borderBottomWidth={"2px"} />
          <ModalBody h={"fit-content"} w={"100%"} py={10}>
            <VStack
              justifyContent={"center"}
              alignItems={"flex-start"}
              w={"100%"}
            >
              <Text
                fontSize="md"
                textAlign="left"
                lineHeight="title"
                fontWeight={"300"}
              >
                We're updating our platform with new features! The update will
                start on{" "}
                <strong>
                  {d.getDate() +
                    " " +
                    monthNames[d.getMonth()] +
                    " " +
                    d.getFullYear()}
                </strong>{" "}
                at <strong>{d.getHours() + ":" + d.getMinutes()}</strong>, and
                we expect it to take around
                <strong>
                  {" "}
                  {
                    getFeatureGateConfig().maintenance_data.maintenance_duration
                  }{" "}
                </strong>{" "}
                hours.
              </Text>
              <Text
                fontSize="md"
                textAlign="left"
                lineHeight="title"
                fontWeight={"300"}
              >
                During this time, the platform will be temporarily unavailable.
                But don't worry, we're hustling to get everything up and running
                smoother than ever before.
              </Text>
              <Text
                fontSize="md"
                textAlign="left"
                lineHeight="title"
                fontWeight={"300"}
              >
                Thanks for your patience!
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter mt={10}>
            <StyledButton
              h={"50px"}
              mt={"auto"}
              mb={2}
              ml={6}
              variant="brand"
              px={12}
              borderRadius={10}
              fontSize={"md"}
              fontWeight={500}
              onClick={() => {
                onClose();
              }}
            >
              Okay
            </StyledButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DowntimeAlertModal;
