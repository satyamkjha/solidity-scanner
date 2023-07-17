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
import Select from "react-select";
import { customStylesForInviteMember } from "../../common/stylesForCustomSelect";
import FormatOptionLabelWithImage from "../../components/FormatOptionLabelWithImage";
import { userRolesList } from "../../common/values";

const InviteMemberForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  const history = useHistory();

  const queryClient = useQueryClient();
  const toast = useToast();

  const [userEmail, setUserEmail] = useState("");

  const [userList, setUserList] = useState<
    {
      user: string;
      role: "admin" | "reader" | "editor";
    }[]
  >([]);

  const [userRole, setUserRole] = useState<"admin" | "reader" | "editor">(
    "admin"
  );

  const addUsers = async () => {
    setUserList([
      ...userList,
      {
        user: userEmail,
        role: userRole,
      },
    ]);
  };

  const removeUser = async (userEmail: string) => {
    let newUserList = userList;
    newUserList = newUserList.filter((item) => {
      if (item.user === userEmail) {
        return false;
      }
      return true;
    });
    setUserList(newUserList);
  };

  const updateRole = async (
    userEmail: string,
    userRole: "admin" | "reader" | "editor"
  ) => {
    let newUserList = userList;
    newUserList = newUserList.map((item) => {
      if (item.user === userEmail) {
        return {
          user: userEmail,
          role: userRole,
        };
      }
      return item;
    });
    setUserList(newUserList);
  };

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
          h="80vh"
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
              h="100%"
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
                    type="email"
                    placeholder="Type email ID to send invite"
                    variant={"brand"}
                    bgColor="#f7f9fa"
                    h="55px"
                    value={userEmail}
                    size="lg"
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                  <InputRightElement
                    w="260px"
                    children={
                      <HStack mt={4}>
                        <Text>|</Text>
                        <Select
                          formatOptionLabel={FormatOptionLabelWithImage}
                          options={userRolesList}
                          value={userRolesList.find(
                            (item) => userRole === item.value
                          )}
                          isSearchable={false}
                          styles={customStylesForInviteMember}
                          onChange={(newValue) => {
                            if (newValue) {
                              setUserRole(newValue.value);
                            }
                          }}
                        />
                        <Button
                          onClick={addUsers}
                          variant={"cta-outline"}
                          borderWidth={"1px"}
                          fontWeight={500}
                          px={5}
                          py={1}
                          ml={[0, 0, 0, "auto"]}
                        >
                          {"Add"}
                        </Button>
                      </HStack>
                    }
                  />
                </InputGroup>
                <Flex
                  w="100%"
                  h="100%"
                  flexDir="column"
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  {userList.map((userItem) => (
                    <InvitedMemberItem
                      role={userItem.role}
                      user={userItem.user}
                      removeUser={removeUser}
                      updateRole={updateRole}
                    />
                  ))}
                </Flex>
              </Flex>
              <HStack
                w="100%"
                borderTopWidth={1}
                pt={4}
                justifyContent={"flex-end"}
                alignItems={"flex-start"}
              >
                {/* <Button
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
                </Button> */}
                <Button
                  h={"50px"}
                  w="200px"
                  variant="brand"
                  px={12}
                  borderRadius={10}
                  fontSize={"md"}
                  fontWeight={500}
                  disabled={false}
                  onClick={addOrganisationUserRequest}
                >
                  Add Users
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
