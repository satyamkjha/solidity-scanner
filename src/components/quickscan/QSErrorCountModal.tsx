import React, { useState } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { useHistory } from "react-router-dom";
import { WarningIcon } from "@chakra-ui/icons";

const QSErrorCountModal: React.FC<{
  onClose(): any;
  isOpen: boolean;
  errorCount: number;
  errorType: string;
}> = ({ isOpen, onClose, errorCount, errorType }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const history = useHistory();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w={"90vw"}
          maxW={["90vw", "500px", "500px", "1100px"]}
          h="90vh"
          maxH="800px"
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="white"
          minH={"fit-content"}
          py={[3, 3, 3, 5]}
        >
          <ModalHeader
            bgColor="white"
            px={[6, 6, 6, 12]}
            textAlign={["center", "center", "center", "left"]}
          >
            Issues Found
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody h={"100%"} w={"100%"} px={[6, 6, 6, 10]} bgColor="white">
            <Flex
              w={"100%"}
              h="100%"
              sx={{
                flexDir: ["column", "column", "row"],
                alignItems: "flex-start",
                justifyContent: ["flex-start", "flex-start", "space-between"],
              }}
            >
              <Flex
                w={["100%", "100%", "100%", "300px"]}
                height="100%"
                p={7}
                alignItems={"center"}
                justifyContent="space-between"
                flexDir="column"
                borderRadius={15}
                backgroundColor={[
                  "transparent",
                  "transparent",
                  "transparent",
                  "#FCFCFC",
                ]}
                textAlign={["center", "center", "center", "left"]}
              >
                <VStack
                  w="100%"
                  justifyContent="flex-start"
                  alignItems={["center", "center", "center", "flex-start"]}
                >
                  <HStack
                    w="100%"
                    justifyContent={[
                      "center",
                      "center",
                      "center",
                      "flex-start",
                    ]}
                  >
                    <WarningIcon color={errorType} />{" "}
                    <Text fontSize="lg" fontWeight={700}>
                      {`${errorCount} ${sentenceCapitalize(errorType)} Found`}
                    </Text>
                  </HStack>
                  <Text fontSize="md" fontWeight={400}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Molestie ultricies id posuere mauris proin duis placerat
                    lorem. Sed pellentesque tortor, Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Molestie ultricies id posuere
                    mauris
                  </Text>
                </VStack>
                <VStack
                  w="100%"
                  justifyContent="flex-start"
                  alignItems={["center", "center", "center", "flex-start"]}
                >
                  <Text fontSize="md" fontWeight={600}>
                    Check and fix your vulnerability with SolidityScan code
                    viewer
                  </Text>
                  <Text fontSize="sm" fontWeight={400}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Molestie ultricies id posuere mauris proin duis placerat
                    lorem. Sed pellentesque tortor, Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Molestie ultricies id posuere
                    mauris
                  </Text>
                </VStack>

                <Button
                  w="100%"
                  variant="brand"
                  onClick={() => history.push("/signup")}
                >
                  Signup For Free Trial
                </Button>
              </Flex>
              <VStack
                p={7}
                borderRadius={15}
                backgroundColor={[
                  "transparent",
                  "transparent",
                  "transparent",
                  "#FCFCFC",
                ]}
                spacing={5}
                h="100%"
                display={["none", "none", "none", "flex"]}
                sx={{
                  width: "calc(100% - 350px)",
                }}
                alignItems={"flex-start"}
              >
                <Text fontSize="md" fontWeight={600}>
                  Check and fix your vulnerability with SolidityScan code viewer
                </Text>
                <Text color="#4E5D78" fontSize="sm" fontWeight={600}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Molestie ultricies id posuere mauris proin duis placerat
                  lorem. Sed pellentesque tortor, Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Molestie ultricies id posuere
                  mauris
                </Text>

                <Image
                  src={`${assetsURL}quickscan/screenshot_dashboard_qs_error_count_modal.png`}
                  height="calc(100% - 100px)"
                  width="auto"
                />
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QSErrorCountModal;
