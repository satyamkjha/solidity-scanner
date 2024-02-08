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
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FaDiscord, FaEnvelope, FaTelegram } from "react-icons/fa";
import { GiLetterBomb } from "react-icons/gi";

import axios from "axios";
import { CredshieldsIcon, MailSent } from "../icons";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import Loader from "../styled-components/Loader";

export const ReportTypeDetailModal: React.FC<{
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

  const textList = [
    {
      heading: "Self-published",
      body: "A Self-Published Report refers to a document in which a user takes responsibility for identifying and documenting false positive bugs. Unlike traditional auditing processes conducted by external teams, this report undergoes scrutiny directly from the user who has identified and reported the potential issues.",
      iconUrl: "user",
    },
    {
      heading: "Verified report",
      body: "A verified report constitutes a verification assertion highlighting false positives identified by the external team within the automated report. It is important to note that a verified report should not be confused with a manual audit report.",
      iconUrl: "ss-shield",
    },
    {
      heading: "Assisted-audit",
      body: "An assisted audit entails an external team performing an automated audit and then a complete audit of the source code documenting all the identified bugs as concerned following the traditional auditing processes. It is suggested to get an assisted audit to ensure your contract’s safety before deploying on a network.",
      iconUrl: "assisted",
    },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "75vw"]}
          minW={"300px"}
          minH={"fit-content"}
          borderRadius="15px"
          mb={10}
        >
          <ModalHeader
            mt={[2, 2, 4]}
            textAlign={"center"}
            fontSize={["lg", "lg", "2xl"]}
          >
            Verified Report Details
          </ModalHeader>
          <ModalCloseButton
            m={[2, 2, 6]}
            onClick={() => {
              setMailSent(false);
              onClose();
            }}
          />

          <ModalBody
            h={"fit-content"}
            height="700px"
            w={"100%"}
            px={[6, 6, 6, 12]}
            pb={6}
          >
            <Divider mb={6} />
            <VStack
              justifyContent="space-between"
              w="100%"
              h="600px"
              spacing={0}
              alignItems="center"
            >
              {textList.map((item) => (
                <HStack
                  justifyContent="space-between"
                  w="100%"
                  h="180px"
                  spacing={4}
                  alignItems="center"
                >
                  <Flex
                    justify="center"
                    alignItems="center"
                    bgColor="#FAFAFA"
                    h="180px"
                    w="180px"
                    borderRadius={10}
                  >
                    <Image
                      src={`${assetsURL}report/${item.iconUrl}.svg`}
                      w={["120px"]}
                      h={"120px"}
                    />
                  </Flex>
                  <VStack
                    p={5}
                    w="calc(100% - 200px)"
                    h="180px"
                    borderRadius={10}
                    bgColor="#FAFAFA"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                  >
                    <Text fontSize="lg" fontWeight={600}>
                      {item.heading}
                    </Text>
                    <Text fontSize="md" color="#4A4A4A">
                      {item.body}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportTypeDetailModal;
