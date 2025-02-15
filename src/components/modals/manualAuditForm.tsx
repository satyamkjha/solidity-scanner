import React, { useState } from "react";

import {
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { GiLetterBomb } from "react-icons/gi";

import axios from "axios";
import { CredshieldsIcon, MailSent } from "../icons";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import Loader from "../styled-components/Loader";
import EmailInput from "components/forms/EmailInput";
import NameInput from "components/forms/NameInput";
import LinkInput from "components/forms/LinkInput";

export const ManualAuditForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  type?: string;
  header?: string;
}> = ({
  isOpen,
  onClose,
  type = "Manual_Audit",
  header = "Request Manual Audit",
}) => {
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        subject: `[${type}] ` + subject,
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
      .catch(() => {
        setMailSent(false);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "75vw"]}
          minW={"300px"}
          h={"85vh"}
          overflowY="scroll"
          borderRadius="15px"
          mb={10}
        >
          <ModalHeader
            m={[2, 2, 6]}
            mt={[10, 10, 10, 6]}
            textAlign={["center", "center", "center", "left"]}
            fontSize={["lg", "lg", "2xl"]}
          >
            {!mailSent ? header : "Request Sent"}
          </ModalHeader>
          <ModalCloseButton
            m={[2, 2, 6]}
            onClick={() => {
              setMailSent(false);
              onClose();
            }}
          />
          {!mailSent ? (
            <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]} pb={3}>
              <Flex
                justifyContent="flex-start"
                w={"100%"}
                direction={["column", "column", "column", "row"]}
              >
                <Flex
                  zIndex={"10"}
                  w={["100%", "100%", "100%", "60%"]}
                  mb={10}
                  alignItems={["center", "center", "flex-start"]}
                  flexDir="column"
                >
                  <form
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Stack zIndex={"10"} spacing={6} mt={4} w={"100%"}>
                      <EmailInput
                        isRequired
                        showLeftIcon
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onError={(e: any) =>
                          setErrors((prv) => {
                            return { ...prv, Email: e };
                          })
                        }
                      />

                      <NameInput
                        isRequired
                        showLeftIcon
                        iconChild={<Icon as={GiLetterBomb} color="gray.300" />}
                        title={"Query"}
                        placeholder="Subject of your Query"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                        onError={(e: any) =>
                          setErrors((prv) => {
                            return { ...prv, Query: e };
                          })
                        }
                      />
                      <LinkInput
                        title={"Discord"}
                        placeholder="Discord (optional)"
                        showLeftIcon
                        iconChild={<Icon as={FaDiscord} color="gray.300" />}
                        value={discord}
                        onChange={(e) => {
                          setDiscord(e.target.value);
                        }}
                        onError={(e: any) =>
                          setErrors((prv) => {
                            return { ...prv, Discord: e };
                          })
                        }
                      />
                      <LinkInput
                        title={"Telegram"}
                        placeholder="Telegram (optional)"
                        showLeftIcon
                        iconChild={<Icon as={FaTelegram} color="gray.300" />}
                        value={telegram}
                        onChange={(e) => {
                          setTelegram(e.target.value);
                        }}
                        onError={(e: any) =>
                          setErrors((prv) => {
                            return { ...prv, Telegram: e };
                          })
                        }
                      />
                      <Textarea
                        variant={"brand"}
                        placeholder="Enter your query here"
                        borderRadius={"16px"}
                        fontSize={"15px"}
                        borderColor={"gray.200"}
                        borderWidth={"1px"}
                        noOfLines={4}
                        maxW={"600px"}
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
                      mt={[10, 10, 10, 20]}
                      variant="dark"
                      borderRadius={10}
                      fontSize={"md"}
                      fontWeight={500}
                      type="submit"
                      isDisabled={Object.values(errors).join("").length > 0}
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {!loading ? "Submit" : <Loader size={30} color="white" />}
                    </Button>
                  </form>
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
                    src={`${assetsURL}common/manualAudit.svg`}
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
