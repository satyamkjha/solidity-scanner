import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Icon,
  VStack,
  useClipboard,
  Divider,
  Image,
  Link,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { HiDuplicate, HiOutlineCheck } from "react-icons/hi";
import { CheckIcon } from "@chakra-ui/icons";
import { getAssetsURL } from "helpers/helperFunction";
import ConfirmActionForm from "components/confirmActionForm";
import { useProfile } from "hooks/useProfile";
import { useConfig } from "hooks/useConfig";
import UpgradePackage from "components/upgradePackage";
import Loader from "components/styled-components/Loader";

const Organisation: React.FC = () => {
  const { data: profileData, isLoading } = useProfile();
  const [hasAccess, setHasAccess] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);
  const toast = useToast();

  useEffect(() => {
    if (
      profileData &&
      ["pro", "custom"].includes(profileData.current_package)
    ) {
      setHasAccess(true);
      setIsSpinning(true);
    } else {
      setHasAccess(false);
    }
  }, [profileData]);

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        h: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        pt: 4,
        pb: 1,
        px: [2, 2, 2, 8],
        mx: [0, 0, 4],
        my: 2,
        minH: "78vh",
      }}
    >
      <VStack alignItems="flex-start" spacing={0} pl={4}>
        <Text color="subtle" fontWeight="600" fontSize="sm">
          ADMIN CONTROLS
        </Text>
      </VStack>

      {isLoading ? (
        <Flex
          sx={{
            w: "100%",
            mx: [0, 0, 0, 4],
            my: 24,
            justifyContent: "center",
          }}
        >
          <Loader />
        </Flex>
      ) : (
        <Flex
          bgColor={["bg.subtle", "bg.subtle", "bg.subtle", "white"]}
          w="100%"
          h={"100%"}
          minH={"70vh"}
          borderRadius={"5px"}
          my={6}
          pb={6}
          flexDir="column"
        >
          <Flex
            m={6}
            mb={[2, 2, 2, 6]}
            align="center"
            flexDir={[
              "column-reverse",
              "column-reverse",
              "column-reverse",
              "row",
            ]}
          >
            <Flex
              bgColor={"white"}
              borderRadius={"5px"}
              align={"center"}
              justifyContent={"center"}
              mt={[6, 6, 6, 0]}
              p={[5, 5, 5, 0]}
              w={["100%", "100%", "100%", "fit-content"]}
            >
              {/* {accessKey ? ( */}
              {/* <Flex
                align={"center"}
                fontWeight={100}
                borderColor="#289F4C"
                borderRadius="21px"
                border={"1px solid"}
                px={4}
                py={1.5}
                color="#289F4C"
              >
                <Icon as={HiOutlineCheck} fontSize={"2xl"} />
                <Text ml={2}>Activated</Text>
              </Flex> */}
              {/* ) : ( */}
              <Text
                fontWeight={100}
                borderColor="detail"
                borderRadius="21px"
                border={"1px solid"}
                px={4}
                py={1.5}
                color="detail"
              >
                No Organisation created
              </Text>
              {/* )} */}
            </Flex>

            <Button
              onClick={() => {}}
              variant={"cta-outline"}
              borderWidth={"1px"}
              fontWeight={500}
              px={10}
              py={2}
              ml={[0, 0, 0, "auto"]}
              isDisabled={!hasAccess}
            >
              {"Create Organisation"}
            </Button>
          </Flex>
          <Flex
            mx={[4, 4, 4, 6]}
            mb={6}
            px={[4, 4, 4, 6]}
            pt={8}
            pb={6}
            backgroundColor="#FCFCFC" 
            border={"2px solid #EAEAEA"}
            borderRadius="15px"
            flexDir={"column"}
            h={"65vh"}
          >
            <Flex position={"relative"} w="100%" h="33vh">
              <VStack
                w="100%"
                spacing={4}
                mb={[6, 6, 6, 0]}
                top={0}
                left={0}
                opacity={hasAccess ? 1 : 0.5}
              >
                <Image
                  src={assetsUrl + "background/private_api_cover.svg"}
                  h={"150px"}
                  mb={2}
                />
                <Text fontWeight={400}>
                  No Organization has been created yet, Click Create
                  Organization to set-up an Organization and start inviting
                  members to your team
                </Text>
                <Link
                  display={hasAccess ? "block" : "none"}
                  onClick={() => {}}
                  fontWeight={400}
                  color="blue"
                >
                  Create Organisation
                </Link>
              </VStack>
              {!hasAccess && (
                <UpgradePackage
                  text="Upgrade to our pro plan or a custom plan to use this feature and much more."
                  iconSize={85}
                />
              )}
            </Flex>
          </Flex>
          {/* {isFirstTime && (
            <Flex
              border={"1px solid #FFC661"}
              bgColor="#FFF8ED"
              p={6}
              mx={6}
              mb={8}
              borderRadius={"15px"}
            >
              <Text color="detail" fontWeight={400}>
                Make sure to copy your personal access token in a secure place
                now, next time you visit the access token will be hidden
              </Text>
            </Flex>
          )} */}
        </Flex>
      )}
      {/* <ConfirmActionForm
        isOpen={isOpen}
        onClose={onClose}
        onActionConfirm={onActionConfirm}
        confirmBtnText={actionType === "regenerate" ? "Regenerate" : "Delete"}
        modalHeader={
          actionType === "regenerate" ? "Regenerate Key" : "Delete Key"
        }
        modelText={
          <VStack>
            <Text my={4} w={["100%"]} fontSize={"lg"} fontWeight={600}>
              {actionType === "regenerate"
                ? "are you sure you want to regenerate the  key?"
                : "are you sure you want to delete the current key?"}
            </Text>
            <Text color="detail" fontWeight={400}>
              {actionType === "regenerate"
                ? "Regenerating the key will generate a new API key and invalidate the current key. After regenerating, please remember to update any applications or services that use the current key with the new key to avoid any service disruptions."
                : "This action will revoke access to all APIs integrated with this key. Please ensure that you have updated any applications or services that use this key before proceeding."}
            </Text>
          </VStack>
        }
      /> */}
    </Box>
  );
};

export default Organisation;
