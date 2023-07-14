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
  Radio,
  Stack,
  RadioGroup,
  VStack,
  HStack,
  Checkbox,
  Text,
  useToast,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { onLogout } from "common/functions";
import { useQueryClient } from "react-query";
import { API_PATH } from "helpers/routeManager";
import API from "helpers/api";
import { useHistory } from "react-router-dom";
import { FiLink2 } from "react-icons/fi";
import InvitedMemberItem from "./InvitedMemberItem";

const InviteMemberForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  const history = useHistory();

  const queryClient = useQueryClient();
  const toast = useToast();

  const userList = [];

  const addOrganisationUserRequest = async () => {
    try {
      const { data } = await API.post(API_PATH.API_ADD_ORGANISATION_USERS, {
        users: userList,
      });
      if (data.status === "success") {
        toast({
          title: data.message,
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: data.message,
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "65vw"]}
          minW={"300px"}
          minH={"600px"}
          alignItems={"center"}
          borderRadius="15px"
          mb={10}
          p={5}
        >
          <ModalHeader textAlign={"center"} fontSize={["lg", "lg", "xl"]}>
            Invite Members
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
              justifyContent={"space-between"}
              w={"100%"}
              h={"50vh"}
              direction="column"
              alignItems={"center"}
            >
              <Flex
                w={"100%"}
                direction="column"
                alignItems={"center"}
                textAlign="center"
                justifyContent={"flex-start"}
              >
                <InputGroup alignItems="center" mb={4}>
                  <Input
                    isRequired
                    type="text"
                    placeholder="Type email ID to send invite"
                    variant={"brand"}
                    bgColor="#f7f9fa"
                    size="lg"
                    onChange={(e) => {}}
                  />
                  <InputRightElement w="300px" children={<></>} />
                </InputGroup>
                <Flex
                  w="100%"
                  h="100%"
                  flexDir="column"
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <InvitedMemberItem />
                  <InvitedMemberItem />
                  <InvitedMemberItem />
                </Flex>
              </Flex>
              <HStack
                w="100%"
                justifyContent={"space-between"}
                alignItems={"flex-start"}
              >
                <Button
                  h={"50px"}
                  color={"#3300FF"}
                  w="fit-content"
                  variant="ghost"
                  px={12}
                  borderRadius={10}
                  fontSize={"md"}
                  fontWeight={500}
                  disabled={false}
                  rightIcon={<FiLink2 />}
                >
                  Click here to copy Invitation link
                </Button>
                <Button
                  h={"50px"}
                  w="200px"
                  variant="brand"
                  px={12}
                  borderRadius={10}
                  fontSize={"md"}
                  fontWeight={500}
                  disabled={false}
                >
                  Create Organization
                </Button>
              </HStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteMemberForm;
