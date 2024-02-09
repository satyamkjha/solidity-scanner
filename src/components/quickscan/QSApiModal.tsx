import React, { useState } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  useToast,
  Image,
  VStack,
  HStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaEnvelope } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import axios from "axios";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { socialIconsList } from "common/values";
import { capitalize } from "common/functions";

export const QSApiModal: React.FC<{ onClose(): any; isOpen: boolean }> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const { handleSubmit, formState } = useForm<FormData>();
  const onSubmit = () => {
    setIsLoading(true);
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://formsubmit.co/ajax/satyam@credshields.com", {
        email: email,
        subject: organisation,
        name: name,
        message: body,
      })
      .then((response) => {
        if (response.data.success) {
          toast({
            title: response.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setIsLoading(false);
          onClose();
          setEmail("");
          setBody("");
          setOrganisation("");
          setName("");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
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
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <ModalHeader
              px={[6, 6, 6, 12]}
              textAlign={["center", "center", "center", "left"]}
            >
              <Heading mt={10} fontSize="2xl">
                Request for API
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
              <Flex
                w={"100%"}
                sx={{
                  flexDir: ["column", "column", "row"],
                  alignItems: "flex-end",
                  justifyContent: ["flex-start", "flex-start", "space-between"],
                }}
              >
                <Flex
                  zIndex={"10"}
                  w={["100%", "100%", "60%"]}
                  alignItems={["center", "center", "flex-start"]}
                  flexDir="column"
                >
                  <Stack zIndex={"10"} w={"100%"} spacing={6} mt={8}>
                    <InputGroup mt={0} alignItems="center">
                      <InputLeftElement height="48px">
                        <Icon as={FaUserAlt} color="gray.300" />
                      </InputLeftElement>
                      <Input
                        isRequired
                        placeholder="Name"
                        variant="brand"
                        size="lg"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <InputGroup mt={0} alignItems="center">
                      <InputLeftElement height="48px">
                        <Icon as={FaEnvelope} color="gray.300" />
                      </InputLeftElement>
                      <Input
                        isRequired
                        placeholder="Email"
                        variant="brand"
                        size="lg"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <InputGroup mt={0} alignItems="center">
                      <InputLeftElement height="48px">
                        <Icon as={MdWork} color="gray.300" />
                      </InputLeftElement>
                      <Input
                        isRequired
                        placeholder="Organisation"
                        variant="brand"
                        size="lg"
                        value={organisation}
                        onChange={(e) => {
                          setOrganisation(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <Textarea
                      variant={"brand"}
                      placeholder="Additional Comments (optional)"
                      borderRadius={"16px"}
                      fontSize={"15px"}
                      borderColor={"gray.100"}
                      borderWidth={"2px"}
                      noOfLines={4}
                      value={body}
                      onChange={(e) => {
                        setBody(e.target.value);
                      }}
                      height={"120px"}
                      _hover={{ borderColor: "gray.200" }}
                      size="sm"
                      _focus={{
                        borderColor: "#52FF00",
                        boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                      }}
                    />
                  </Stack>
                </Flex>
                <VStack
                  my={[10, 10, 0]}
                  spacing={5}
                  w={["100%", "100%", "35%"]}
                  alignItems={["center", "center", "flex-start"]}
                >
                  <Text fontSize="lg" fontWeight={600}>
                    Join the Community
                  </Text>
                  {socialIconsList.map((item) => (
                    <HStack
                      borderRadius={10}
                      bgColor="#F5F5F5"
                      p={5}
                      w="100%"
                      maxWidth="350px"
                      cursor="pointer"
                      onClick={() => window.open(item.link, "_blank")}
                    >
                      <Image
                        src={`${assetsURL}icons/social_icons/${item.imgUrl}.svg`}
                      />
                      <Text>{capitalize(item.imgUrl)}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Flex>
            </ModalBody>
            <ModalFooter
              px={[6, 6, 6, 12]}
              display="flex"
              flexDir="row"
              justifyContent="flex-start"
            >
              <Button
                w={["100%", "100%", "100%", "200px"]}
                variant="brand"
                mr={[0, 0, 0, "50px"]}
                mb={5}
                isLoading={isLoading}
                type="submit"
                // onClick={() => {
                //   onSubmit();
                // }}
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QSApiModal;
