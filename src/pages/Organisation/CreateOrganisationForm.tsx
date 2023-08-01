import React, { useState, useEffect } from "react";

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
  useMediaQuery,
} from "@chakra-ui/react";
import { API_PATH } from "helpers/routeManager";
import API from "helpers/api";
import { debounce } from "lodash";
import { checkOrgName } from "helpers/helperFunction";

const CreateOrganisationForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  refetch(): any;
}> = ({ isOpen, onClose, refetch }) => {
  const toast = useToast();
  const [orgName, setOrgName] = useState("");
  const [availabililtyStatus, setAvailabilityStatus] = useState("");
  const [isDesktopView] = useMediaQuery("(min-width: 950px)");

  const createOrganisationRequest = async () => {
    if (checkOrgName(orgName)) {
      toast({
        title: "Organisation name cannot have special characters in it.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const { data } = await API.post<{
        status: string;
        message: string;
      }>(API_PATH.API_CREATE_ORGANISATION, {
        org_name: orgName,
      });
      if (data.status === "success") {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        refetch();
      } else {
        toast({
          title: data.message,
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
    if (orgName.length > 0 && orgName.length < 50) {
      try {
        const { data } = await API.post<{
          status: string;
          org_name_available: boolean;
        }>(API_PATH.API_CHECK_ORGANISATION_NAME_AVAILABILITY, {
          org_name: orgName,
        });
        if (data.status === "success") {
          if (data.org_name_available) {
            setAvailabilityStatus("Available");
          } else {
            setAvailabilityStatus("Not-Available");
          }
        } else {
          setAvailabilityStatus("");
        }
      } catch (e) {
        setAvailabilityStatus("");
      }
    } else {
      setAvailabilityStatus("");
    }
  };

  const debouncedSearch = debounce(checkOrganisationNameRequest, 500);

  useEffect(() => {
    debouncedSearch();
    // Cleanup function to cancel any pending debounced search when the component unmounts or when searchTerm changes
    return () => {
      debouncedSearch.cancel();
    };
  }, [orgName]);

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
          py={5}
          px={[2, 2, 5, 5]}
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
          <ModalBody h={"100%"} w={"100%"} px={[2, 2, 6, 12]}>
            <Flex
              justifyContent={"space-between"}
              w={"100%"}
              h={"50vh"}
              direction="column"
              alignItems={"center"}
            >
              <Flex
                w={["100%", "100%", "80%"]}
                direction="column"
                alignItems={"center"}
                textAlign="center"
                justifyContent={"flex-start"}
              >
                <Text fontSize="md" fontWeight={500}>
                  Setup your Organization Name
                </Text>
                {/* <Text fontSize="sm" color="#4E5D78" fontWeight={300}>
                  Lorem ipsum dolor sit amet consectetur. Iaculis libero eget.
                </Text> */}
                <InputGroup mt={10} alignItems="center" mb={4}>
                  <Input
                    isRequired
                    type="text"
                    placeholder="Enter Organization name here"
                    variant={"brand"}
                    bgColor="#f7f9fa"
                    size="lg"
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        createOrganisationRequest();
                      }
                    }}
                    onChange={(e) => {
                      setOrgName(e.target.value);
                    }}
                  />
                  {isDesktopView && (
                    <InputRightElement w="150px">
                      <HStack mt={2}>
                        <Text
                          color={
                            availabililtyStatus === "Available"
                              ? "low"
                              : availabililtyStatus === "Not-Available"
                              ? "high"
                              : "#000000"
                          }
                        >
                          {availabililtyStatus}
                        </Text>
                      </HStack>
                    </InputRightElement>
                  )}
                </InputGroup>
                {!isDesktopView && (
                  <HStack w="100%" justifyContent="flex-end">
                    <Text
                      color={
                        availabililtyStatus === "Available"
                          ? "low"
                          : availabililtyStatus === "Not-Available"
                          ? "high"
                          : "#000000"
                      }
                    >
                      {availabililtyStatus}
                    </Text>
                  </HStack>
                )}
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
                onClick={createOrganisationRequest}
                disabled={
                  orgName.length < 1 ||
                  orgName.length > 50 ||
                  availabililtyStatus === "Not-Available"
                }
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
