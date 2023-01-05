import React, { useState } from "react";

import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
  Box,
  HStack,
  Text,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FaDiscord, FaEnvelope, FaTelegram } from "react-icons/fa";
import { GiLetterBomb } from "react-icons/gi";

import axios from "axios";
import { CredshieldsIcon, MailSent } from "./icons";

export const ManualAuditForm: React.FC<{ onClose(): any; isOpen: boolean }> = ({
  isOpen,
  onClose,
}) => {
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();

  const onSubmit = () => {
    if (!email || !subject || !body) {
      toast({
        title: "Email, Subject and Body fields cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setLoading(true);
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://formsubmit.co/ajax/info@credshields.com", {
        email: email,
        subject: "[Manual_Audit] " + subject,
        discord: discord,
        telegram: telegram,
        message: body,
      })
      .then((response) => {
        if (response.data.success) {
          setMailSent(true);
          setEmail("");
          setBody("");
          setSubject("");
          setDiscord("");
          setTelegram("");
        }
      })
      .catch((error) => {
        setMailSent(false);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "70vw"]}
          minW={"300px"}
          minH={"fit-content"}
          borderRadius="15px"
          mb={10}
        >
          <ModalHeader
            m={[2, 2, 6]}
            mt={[10, 10, 10, 6]}
            textAlign={["center", "center", "center", "left"]}
            fontSize={["lg", "lg", "2xl"]}
          >
            {!mailSent ? "Request Manual Audit" : "Request Sent"}
          </ModalHeader>
          <ModalCloseButton
            m={[2, 2, 6]}
            onClick={() => {
              setMailSent(false);
              onClose();
            }}
          />
          {!mailSent ? (
            <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
              <Flex justifyContent="flex-start" w={"100%"} direction={["column", "column", "column", "row"]}>
                <Flex
                  zIndex={"10"}
                  w={["100%", "100%", "100%", "60%"]}
                  mb={10}
                  alignItems={["center", "center", "flex-start"]}
                  flexDir="column"
                >
                  <Stack zIndex={"10"}  spacing={6} mt={4} w={"100%"}>
                    <InputGroup mt={0} alignItems="center">
                      <InputLeftElement
                        height="48px"
                        children={<Icon as={FaEnvelope} color="gray.300" />}
                      />
                      <Input
                        isRequired
                        type="email"
                        placeholder="Your Email"
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
                        placeholder="Discord (Optional)"
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
                        placeholder="Telegram (Optional)"
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
                      placeholder="Enter your query here"
                      borderRadius={"16px"}
                      fontSize={"15px"}
                      borderColor={"gray.200"}
                      borderWidth={"1px"}
                      noOfLines={4}
                      value={body}
                      onChange={(e) => {
                        setBody(e.target.value);
                      }}
                      height={"120px"}
                      _hover={{ borderColor: "gray.300" }}
                      size="sm"
                      _focus={{
                        borderColor: "#52FF00",
                        boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                      }}
                    />
                  </Stack>
                  <Button
                    w={["100%", "100%", "100%", "40%"]}
                    h={"50px"}
                    mt={[10, 10, 10, 16]}
                    variant="dark"
                    borderRadius={10}
                    fontSize={"md"}
                    fontWeight={500}
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    {!loading ? "Submit" : <Spinner />}
                  </Button>
                </Flex>
                <VStack
                  w={["100%", "100%", "100%", "50%"]}
                  alignItems="center"
                  my={[10, 10, 10, 0]}
                >
                  <Flex
                    mt={"-16"}
                    mb={"6"}
                    w={["100%", "100%", "100%", "75%"]}
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <CredshieldsIcon size={185} hidePoweredBy={true} />
                    <Text
                      mt={6}
                      fontSize="14px"
                      fontWeight="400"
                      textAlign="center"
                    >
                      Follow the link to check out the published audit reports
                      of our portfolio clients
                    </Text>
                    <Link
                      variant={"brand"}
                      href="https://github.com/Credshields/Audit-Reports"
                      target={"_blank"}
                      fontSize={"14px"}
                      fontWeight="700"
                    >
                      Click here
                    </Link>
                  </Flex>
                  <Image
                    mt={28}
                    src="/common/manualAudit.svg"
                    alt="Product screenshot"
                    w={"90%"}
                  />
                </VStack>
              </Flex>
            </ModalBody>
          ) : (
            <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
              <Flex
                justifyContent={"center"}
                w={"100%"}
                direction="column"
                alignItems={"center"}
                textAlign="center"
              >
                <Flex my={6}>
                  <MailSent size={180} />
                </Flex>
                <Text mt={6} fontSize={"xl"} fontWeight="700">
                  Email sent successfully
                </Text>
                <Text my={4} color="subtle" w={["100%", "100%", "60%"]}>
                  Your request for Manual Audit has been submitted, our team
                  will contact you shortly.
                </Text>
                <Button
                  w={["40%", "40%", "20%"]}
                  h={"50px"}
                  mt={24}
                  mb={8}
                  variant="dark"
                  borderRadius={10}
                  fontSize={"md"}
                  fontWeight={500}
                  onClick={() => {
                    setMailSent(false);
                    onClose();
                  }}
                >
                  Close
                </Button>
              </Flex>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManualAuditForm;
