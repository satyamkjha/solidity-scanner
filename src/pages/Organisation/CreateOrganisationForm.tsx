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

const CreateOrganisationForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [orgName, setOrgName] = useState("");

  const createOrganisationRequest = async () => {
    try {
      const { data } = await API.post(API_PATH.API_CREATE_ORGANISATION, {
        org_name: orgName,
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

  const checkOrganisationNameRequest = async () => {
    try {
      const { data } = await API.post(
        API_PATH.API_CHECK_ORGANISATION_NAME_AVAILABILITY,
        {
          org_name: orgName,
        }
      );
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
            Create Organization
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
                w={"80%"}
                direction="column"
                alignItems={"center"}
                textAlign="center"
                justifyContent={"flex-start"}
              >
                <Text fontSize="md" fontWeight={500}>
                  Setup your Organization Name
                </Text>
                <Text fontSize="sm" color="#4E5D78" fontWeight={300}>
                  Lorem ipsum dolor sit amet consectetur. Iaculis libero eget.
                </Text>
                <InputGroup mt={10} alignItems="center" mb={4}>
                  <Input
                    isRequired
                    type="text"
                    placeholder="Search your Organization name here"
                    variant={"brand"}
                    bgColor="#f7f9fa"
                    size="lg"
                    onChange={(e) => {
                      setOrgName(e.target.value);
                    }}
                  />
                  <InputRightElement children={<></>} />
                </InputGroup>
              </Flex>
              <Button
                h={"50px"}
                mt={"auto"}
                mb={10}
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
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateOrganisationForm;
