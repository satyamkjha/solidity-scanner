import React from "react";

import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Button,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { LOCInfoContainer } from "components/locInfoContainer";
import { ScanTitleComponent } from "./InScanModal";
import ModalBlurOverlay from "components/common/ModalBlurOverlay";

const ProjectsExceededModal: React.FC<{
  closeModal: any;
  open: boolean;
  scanDetails: any;
}> = ({ open, closeModal, scanDetails }) => {
  const history = useHistory();

  const navigateToTopup = () => {
    closeModal();
    history.push(`/billing`);
  };

  return (
    <>
      <Modal
        isCentered
        isOpen={open}
        onClose={closeModal}
        scrollBehavior={"inside"}
      >
        <ModalBlurOverlay />
        <ModalContent
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
                    Project Limit Exceeded !
                  </Text>
                  <Text fontSize="sm" color="#4E5D78" fontWeight={300}>
                    You have exceeded the maximum permisseable limit of 2
                    projects available in Free Trial account. Please upgrade to
                    a Plan to Scan more projects.
                  </Text>
                </VStack>
              </HStack>
              <VStack
                alignItems="flex-start"
                justifyContent="flex-start"
                textAlign="left"
                w="100% "
                background="linear-gradient(to right, #1BD8E330, #FBEAAA30)"
                spacing={4}
                p={7}
                display={["none", "none", "flex"]}
                borderRadius={10}
                mt={5}
              >
                <Text fontWeight={900}>Upgrade your Plan</Text>
                <Text>Please Upgrade to a plan</Text>
                <Button w="250px" onClick={navigateToTopup} variant="brand">
                  Upgrade
                </Button>
              </VStack>
              <Button
                display={["flex", "flex", "none"]}
                mt={10}
                px={6}
                variant="brand"
                onClick={navigateToTopup}
              >
                Get LOC Top up now
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectsExceededModal;
