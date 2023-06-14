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
} from "@chakra-ui/react";
import { FaDiscord, FaEnvelope, FaTelegram } from "react-icons/fa";
import { GiLetterBomb } from "react-icons/gi";
import axios from "axios";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const ContactUs: React.FC<{ onClose(): any; isOpen: boolean }> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const onSubmit = () => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://formsubmit.co/ajax/info@credshields.com", {
        email: email,
        subject: subject,
        discord: discord,
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
          onClose();
          setEmail("");
          setBody("");
          setSubject("");
          setDiscord("");
          setTelegram("");
        }
      })
      .catch((error) => console.log(error));
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
          <ModalHeader
            background="rgba(82, 255, 0, 0.04)"
            backgroundImage={`url('${assetsURL}background/pattern.png')`}
            textAlign={["center", "center", "center", "left"]}
          >
            Contact Us
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"center"}
              w={"100%"}
              flexDir="row"
            >
              <Flex
                zIndex={"10"}
                w={"100%"}
                alignItems={["center", "center", "flex-start"]}
                flexDir="column"
              >
                <Stack zIndex={"10"} w={"100%"} spacing={6} mt={8}>
                  <InputGroup mt={0} alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaEnvelope} color="gray.300" />}
                    />
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
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={GiLetterBomb} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      placeholder="Subject of your Query"
                      variant="brand"
                      size="lg"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup mt={0} alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaDiscord} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      placeholder="Discord (optional)"
                      variant="brand"
                      size="lg"
                      value={discord}
                      onChange={(e) => {
                        setDiscord(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup mt={0} alignItems="center">
                    <InputLeftElement
                      height="48px"
                      children={<Icon as={FaTelegram} color="gray.300" />}
                    />
                    <Input
                      isRequired
                      placeholder="Telegram (optional)"
                      variant="brand"
                      size="lg"
                      value={telegram}
                      onChange={(e) => {
                        setTelegram(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <Textarea
                    variant={"brand"}
                    placeholder="Enter your Query here"
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
              <Image
                ml={"-100px"}
                src={`${assetsURL}common/contactus.png`}
                alt="Product screenshot"
                w={"50%"}
                display={["none", "none", "block"]}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              w={["100%", "100%", "100%", "200px"]}
              variant="brand"
              mr={[0, 0, 0, "50px"]}
              mb={5}
              onClick={() => {
                onSubmit();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactUs;
