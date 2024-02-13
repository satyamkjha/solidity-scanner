import React from "react";

import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const ReportTypeDetailModal: React.FC<{
  onClose(): any;
  isOpen: boolean;
  type?: string;
  header?: string;
}> = ({ isOpen, onClose, type = "Manual_Audit" }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

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
          w={["90vw", "90vw"]}
          minW={"300px"}
          maxW={"1000px"}
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
              onClose();
            }}
          />

          <ModalBody
            height={["90vh", "90vh", "600px", "600px"]}
            w={"100%"}
            overflowY="scroll"
            px={[6, 6, 6, 12]}
            pb={6}
          >
            <Divider mb={6} />
            <VStack
              justifyContent="space-between"
              w="100%"
              height={["fit-content", "fit-content", "600px", "600px"]}
              spacing={[5, 5, 5, 0]}
              alignItems="center"
            >
              {textList.map((item) => (
                <HStack
                  justifyContent="space-between"
                  w="100%"
                  h={["fit-content", "fit-content", "180px", "180px"]}
                  spacing={4}
                  alignItems="center"
                >
                  <Flex
                    justify="center"
                    alignItems="center"
                    bgColor="#FAFAFA"
                    h="180px"
                    display={["none", "none", "flex", "flex"]}
                    w="180px"
                    borderRadius={10}
                  >
                    <Image
                      src={`${assetsURL}report/${item.iconUrl}.svg`}
                      w={["80px"]}
                      h={"80px"}
                    />
                  </Flex>
                  <VStack
                    p={5}
                    w={[
                      "100%",
                      "100%",
                      "calc(100% - 200px)",
                      "calc(100% - 200px)",
                    ]}
                    h={["fit-content", "fit-content", "180px", "180px"]}
                    borderRadius={10}
                    bgColor="#FAFAFA"
                    justifyContent="flex-start"
                    alignItems={["center", "center", "flex-start"]}
                    spacing={3}
                  >
                    <Image
                      src={`${assetsURL}report/${item.iconUrl}.svg`}
                      w={["80px"]}
                      h={"80px"}
                      display={["block", "block", "none"]}
                    />
                    <Text fontSize={["md", "md", "md", "lg"]} fontWeight={600}>
                      {item.heading}
                    </Text>
                    <Text fontSize={["sm", "sm", "sm", "md"]} color="#4A4A4A">
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
