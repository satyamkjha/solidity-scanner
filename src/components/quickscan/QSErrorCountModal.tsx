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
                    <WarningIcon fontSize="lg" color={errorType} />{" "}
                    <Text fontSize="lg" fontWeight={700}>
                      {`${errorCount} ${sentenceCapitalize(
                        errorType
                      )} Bugs Found`}
                    </Text>
                  </HStack>
                  <Text fontSize="md" fontWeight={400}>
                    We've identified{" "}
                    <b>{`${errorCount} ${sentenceCapitalize(errorType)}`}</b>{" "}
                    vulnerabilities within the verified contract you recently
                    scanned. Sign up now to access a comprehensive result
                    detailing how to effectively address and rectify these
                    vulnerabilities.
                  </Text>
                </VStack>
                <VStack
                  w="100%"
                  justifyContent="flex-start"
                  display={["flex", "flex", "flex", "none"]}
                  alignItems={["center", "center", "center", "flex-start"]}
                >
                  <Text fontSize="md" fontWeight={600}>
                    Check and fix your vulnerability with SolidityScan
                  </Text>
                  <Text fontSize="sm" fontWeight={400}>
                    Discover the underlying causes of these vulnerabilities by
                    utilizing our platform, where our sophisticated code viewer
                    precisely highlights the location of each issue within your
                    Solidity file. Sign up now to gain comprehensive access to
                    our platform and empower your development process.
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
                  Check and fix your vulnerability with SolidityScan
                </Text>
                <Text color="#4E5D78" fontSize="sm" fontWeight={600}>
                  Discover the underlying causes of these vulnerabilities by
                  utilizing our platform, where our sophisticated code viewer
                  precisely highlights the location of each issue within your
                  Solidity file. But that's not all – our advanced intelligence
                  also offers expert recommendations for remediation. Sign up
                  now to gain comprehensive access to our platform and empower
                  your development process.
                </Text>

                <Image
                  src={`${assetsURL}quickscan/screenshot_dashboard_qs_error_count_modal.svg`}
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
