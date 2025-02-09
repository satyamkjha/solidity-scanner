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
import ConfirmActionForm from "components/modals/confirmActionForm";
import { useProfile } from "hooks/useProfile";
import { useConfig } from "hooks/useConfig";
import UpgradePackage from "components/upgradePackage";
import Loader from "components/styled-components/Loader";
import { formattedDate } from "common/functions";

export default function PrivateApi() {
  const { data: profileData, isLoading } = useProfile(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isViewable, setViewable] = useState(false);
  const { onCopy, hasCopied } = useClipboard(accessKey);
  const [actionType, setActionType] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);
  const toast = useToast();
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    if (
      profileData &&
      ["pro", "custom"].includes(profileData.current_package)
    ) {
      setHasAccess(true);
      setIsSpinning(true);
      fetchAccessKey();
    } else {
      setHasAccess(false);
    }
    if (profileData && profileData.logged_in_via === "normal_login") {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [profileData]);

  const fetchAccessKey = async () => {
    setIsSpinning(true);
    const { data } = await API.get(API_PATH.API_GET_ACCESS_KEY);
    if (data && data.api_key) {
      setAccessKey(data.api_key);
      setCreatedDate(data.created_at);
      setIsFirstTime(false);
    }
    setIsSpinning(false);
  };

  const onKeyCopy = () => {
    onCopy();
    toast({
      title: "Access key copied",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "bottom",
    });
  };

  const getAccessKey = async () => {
    setIsSpinning(true);
    setViewable(true);
    const { data } = await API.post(API_PATH.API_CREATE_ACCESS_KEY);
    setAccessKey(data.api_key);
    setIsSpinning(false);
    setIsFirstTime(true);
  };

  const revokeAccessKey = async () => {
    if (accessKey) {
      setActionType("delete");
      onOpen();
    }
  };

  const onActionConfirm = async () => {
    setIsSpinning(true);
    if (actionType === "delete") {
      await API.post(API_PATH.API_REVOKE_ACCESS_KEY);
      setAccessKey("");
      setViewable(true);
      setIsFirstTime(false);
    }
    setIsSpinning(false);
  };

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        h: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        pt: 4,
        pb: 1,
        px: [4, 6, 8, 8],
        mx: [0, 0, 4],
        mb: 4,
        minH: "85vh",
      }}
    >
      <Text sx={{ color: "subtle", fontWeight: 600 }}>PRIVATE API ACCESS</Text>

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
          h={["fit-content", "fit-content", "88%"]}
          borderRadius={"5px"}
          my={6}
          pb={6}
          flexDir="column"
        >
          <Flex
            m={[0, 0, 0, 6]}
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
              {accessKey ? (
                <Flex
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
                </Flex>
              ) : (
                <Text
                  fontWeight={100}
                  borderColor="detail"
                  borderRadius="21px"
                  border={"1px solid"}
                  px={4}
                  py={1.5}
                  color="detail"
                >
                  No access key assigned
                </Text>
              )}
            </Flex>
            {!accessKey && (
              <Button
                onClick={getAccessKey}
                variant={"cta-outline"}
                borderWidth={"1px"}
                _hover={{ color: "#3300FF" }}
                fontWeight={500}
                px={10}
                py={2}
                ml={[0, 0, 0, "auto"]}
                isDisabled={!hasAccess || !isOwner}
              >
                Generate Key
              </Button>
            )}
          </Flex>
          <Flex
            mx={[0, 0, 0, 6]}
            mb={6}
            px={[4, 4, 4, 6]}
            pt={8}
            pb={6}
            backgroundColor="#FCFCFC"
            border={"2px solid #EAEAEA"}
            borderRadius="15px"
            flexDir={"column"}
            h={accessKey ? "fit-content" : "100%"}
          >
            {isSpinning ? (
              <Flex
                sx={{
                  w: "100%",
                  h: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loader />
              </Flex>
            ) : (
              <>
                {accessKey ? (
                  <>
                    <Flex
                      w="100%"
                      align={"center"}
                      cursor="pointer"
                      color="blue"
                      display={["flex", "flex", "flex", "none"]}
                      onClick={onKeyCopy}
                    >
                      <Text>Click here to copy the access key</Text>
                      {hasCopied ? (
                        <CheckIcon ml={2} />
                      ) : (
                        <Icon as={HiDuplicate} fontSize="2xl" ml={2} />
                      )}
                    </Flex>
                    <Divider
                      my={6}
                      color="#EAEAEA"
                      borderBottomWidth={"2px"}
                      display={["flex", "flex", "flex", "none"]}
                    />
                    {isViewable ? (
                      <Text color="detail" fontWeight={400}>
                        {accessKey}
                      </Text>
                    ) : (
                      <Text
                        color="#323B4B"
                        fontWeight={400}
                        lineHeight={[1.5, 1.5, 1.5, "3rem"]}
                      >
                        The access key is hidden click view key to see the key
                        series
                      </Text>
                    )}
                    <Divider my={5} color="#EAEAEA" borderBottomWidth={"2px"} />
                    <Flex
                      align="center"
                      flexDir={["column", "column", "column", "row"]}
                      mb={[6, 6, 6, 0]}
                    >
                      <Flex
                        align={"center"}
                        cursor="pointer"
                        color="blue"
                        display={["none", "none", "none", "flex"]}
                        onClick={onKeyCopy}
                      >
                        <Text>Click here to copy the access key</Text>
                        {hasCopied ? (
                          <CheckIcon ml={2} />
                        ) : (
                          <Icon as={HiDuplicate} fontSize="2xl" ml={2} />
                        )}
                      </Flex>
                      <Text
                        color="detail"
                        fontWeight={400}
                        ml={[0, 0, 0, "auto"]}
                        mb={[4, 4, 4, 0]}
                      >
                        {createdDate && formattedDate(new Date(createdDate))}
                      </Text>
                      {!isFirstTime && (
                        <>
                          <Button
                            onClick={() => setViewable(!isViewable)}
                            variant={"outline"}
                            borderWidth={"1px"}
                            borderColor={"blackAlpha.600"}
                            borderRadius={"8px"}
                            fontWeight={500}
                            px={8}
                            ml={4}
                          >
                            {isViewable ? "Hide Key" : "View Key"}
                          </Button>
                          <Divider
                            my={6}
                            color="#EAEAEA"
                            borderBottomWidth={"2px"}
                            display={["flex", "flex", "flex", "none"]}
                          />
                        </>
                      )}
                      <Button
                        onClick={revokeAccessKey}
                        variant={"outline"}
                        borderWidth={"1px"}
                        borderColor={"#FF5630"}
                        borderRadius={"8px"}
                        color={"#FF5630"}
                        fontWeight={500}
                        isDisabled={!isOwner}
                        px={8}
                        ml={4}
                        _hover={{
                          bgColor: "#FFF5F3",
                        }}
                      >
                        Delete Key
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <Flex position={"relative"} w="100%" h="30vh">
                    <VStack
                      w="100%"
                      spacing={4}
                      mb={[6, 6, 6, 0]}
                      top={0}
                      left={0}
                      opacity={hasAccess ? 1 : 0.5}
                      position={"relative"}
                    >
                      <Image
                        src={assetsUrl + "background/private_api_cover.svg"}
                        h={"150px"}
                        mb={2}
                      />
                      <Text fontWeight={400}>
                        No access key has been created yet, Click generate key
                        to create new key
                      </Text>
                      <Link
                        display={hasAccess && isOwner ? "block" : "none"}
                        onClick={getAccessKey}
                        fontWeight={400}
                        color="blue"
                      >
                        Generate Key
                      </Link>
                    </VStack>
                    {!hasAccess && (
                      <UpgradePackage
                        text={
                          <>
                            Upgrade to our<strong> Pro </strong>plan or a
                            <strong> Enterprise </strong>
                            plan to use this feature and much more
                          </>
                        }
                        iconSize={85}
                      />
                    )}
                  </Flex>
                )}
              </>
            )}
          </Flex>
          {isFirstTime && (
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
          )}
          <Flex
            background="#FAFBFC"
            boxShadow={"0px 2p 2px rgba(0, 0, 0, 0.06)"}
            borderRadius={"15px"}
            align="center"
            justifyContent="center"
            flexDir={["column", "column", "column", "row"]}
            p={[2, 2, 2, 5]}
            mx={[2, 2, 2, 6]}
            mt={["auto"]}
          >
            <Image src={assetsUrl + "icons/enlighten.svg"} />
            <Flex flexDir={"column"} ml={6} textColor="text" my={[3, 3, 3, 0]}>
              <Text fontWeight={600}>
                Know more about the Private API access
              </Text>
              <Text fontWeight={400}>
                Click to know how to use this private API access feature and
                supported documentation
              </Text>
            </Flex>
            <Link
              href="https://apidoc.solidityscan.com/solidityscan-security-api/solidityscan-private-api"
              ml={[0, 0, 0, "auto"]}
              color={"accent"}
              target={"_blank"}
            >
              Learn More
            </Link>
          </Flex>
        </Flex>
      )}
      <ConfirmActionForm
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
                ? "Are you sure you want to regenerate the  key?"
                : "Are you sure you want to delete the current key?"}
            </Text>
            <Text color="detail" fontWeight={400}>
              {actionType === "regenerate"
                ? "Regenerating the key will generate a new API key and invalidate the current key. After regenerating, please remember to update any applications or services that use the current key with the new key to avoid any service disruptions."
                : "This action will revoke access to all APIs integrated with this key. Please ensure that you have updated any applications or services that use this key before proceeding."}
            </Text>
          </VStack>
        }
      />
    </Box>
  );
}
