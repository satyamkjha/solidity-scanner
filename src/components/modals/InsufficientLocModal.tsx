import React from "react";

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Button,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Profile } from "common/types";
import { getAssetsURL } from "helpers/helperFunction";
import { LOCInfoContainer } from "components/locInfoContainer";
import { ScanTitleComponent } from "./InScanModal";

const InsufficientLocModal: React.FC<{
  closeModal: any;
  open: boolean;
  scanDetails: any;
  profileData: Profile | undefined;
}> = ({ open, closeModal, scanDetails, profileData }) => {
  const history = useHistory();
  const assetsUrl = getAssetsURL();

  const navigateToTopup = () => {
    closeModal();
    history.push(`/billing?tab=topup&loc=${scanDetails.loc}`);
  };

  return (
    <>
      <Modal isCentered isOpen={open} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="bg.subtle"
          w={"90vw"}
          maxW={"800px"}
          minW={"300px"}
          minH={"fit-content"}
          px={[2, 4, 8]}
        >
          <ModalCloseButton mt={4} />
          <ModalBody px={[0, 0, 2]} h={"fit-content"} w={"100%"} py={10}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              flexDir="column"
            >
              <ScanTitleComponent scanData={scanDetails} />
              <HStack
                w="100%"
                border="1px solid #FFC661"
                bgColor="#FFFCF7"
                p={5}
                borderRadius={10}
              >
                <VStack
                  alignItems={["center", "center", "flex-start"]}
                  justifyContent="flex-start"
                  textAlign={["center", "center", "left"]}
                  spacing={5}
                >
                  <Text fontSize="lg" color="#FFA403" fontWeight={700}>
                    Your current project has Insufficient LoCs !
                  </Text>
                  <Text fontSize="sm" color="#4E5D78" fontWeight={300}>
                    The current project has {scanDetails.loc} Lines of Code, as
                    per. Pulvinar sit nulla semper pellentesque ac eget. In nisl
                    suspendisse pellentesque augue egestas. Aliquam diam
                    scelerisque risus cursus vel diam nam.
                  </Text>
                  <HStack
                    justifyContent={["center", "center", "space-between"]}
                    w="100%"
                    alignItems="center"
                  >
                    {scanDetails.loc !== "insufficient" && (
                      <VStack
                        color="#323B4B"
                        spacing={0}
                        textAlign={["center", "center", "left"]}
                        alignItems={["center", "center", "flex-start"]}
                      >
                        <Text fontSize="2xl" fontWeight={500}>
                          {scanDetails.loc}
                        </Text>
                        <Text fontSize="sm" fontWeight={300}>
                          Required Lines of Code
                        </Text>
                      </VStack>
                    )}

                    {profileData && (
                      <Box display={["none", "none", "flex"]} w="250px">
                        <LOCInfoContainer
                          view="insufficient_scan_modal"
                          profileData={profileData}
                        />
                      </Box>
                    )}
                  </HStack>
                </VStack>
              </HStack>
              <VStack
                alignItems="flex-start"
                justifyContent="flex-start"
                textAlign="left"
                background="linear-gradient(to right, #1BD8E330, #FBEAAA30)"
                spacing={4}
                p={7}
                display={["none", "none", "flex"]}
                borderRadius={10}
                mt={5}
              >
                <Text fontWeight={900}>Get the LoCs Top-up</Text>
                <Text>
                  Lorem ipsum dolor sit amet consectetur. Morbi tellus nunc
                  risus amet. Dolor rhoncus.
                </Text>
                <Button onClick={navigateToTopup} variant="brand">
                  Get LoCs Top up now
                </Button>
              </VStack>
              <Button
                display={["flex", "flex", "none"]}
                mt={10}
                variant="brand"
                onClick={navigateToTopup}
              >
                Get LoCs Top up now
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InsufficientLocModal;
