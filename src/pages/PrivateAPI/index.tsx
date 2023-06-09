import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Icon,
  VStack,
  Spinner,
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

export default function PrivateApi() {
  const { data: profileData, isLoading } = useProfile();
  const [hasAccess, setHasAccess] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isViewable, setViewable] = useState(false);
  const { onCopy, hasCopied } = useClipboard(accessKey);
  const [actionType, setActionType] = useState("regenerate");
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
      fetchAccessKey();
    } else {
      setHasAccess(false);
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
    if (accessKey) {
      setActionType("regenerate");
      onOpen();
    } else {
      setIsSpinning(true);
      setViewable(true);
      const { data } = await API.post(API_PATH.API_CREATE_ACCESS_KEY);
      setAccessKey(data.api_key);
      setIsSpinning(false);
      setIsFirstTime(true);
    }
  };

  const revokeAccessKey = async () => {
    if (accessKey) {
      setActionType("delete");
      onOpen();
    }
  };

  const onActionConfirm = async () => {
    setIsSpinning(true);
    if (actionType === "regenerate") {
      const { data } = await API.post(API_PATH.API_REGENERATE_ACCESS_KEY);
      setAccessKey(data.api_key);
      setIsFirstTime(false);
    } else if (actionType === "delete") {
      const { data } = await API.post(API_PATH.API_REVOKE_ACCESS_KEY);
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
        px: [2, 2, 2, 8],
        mx: [0, 0, 4],
        my: 2,
        minH: "78vh",
      }}
    >
      <VStack alignItems="flex-start" spacing={0} pl={4}>
        <Text fontSize="lg">Personal Access API</Text>
        <Text color="subtle" fontSize="sm">
          Generate the code which can be used to access the SolidityScan API
        </Text>
      </VStack>

      {isLoading ? (
        <Flex
          sx={{
            w: "100%",
            mx: [0, 0, 0, 4],
            my: 4,
            justifyContent: "center",
          }}
        >
          <Spinner mt={20} />
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

            <Button
              onClick={getAccessKey}
              variant={"cta-outline"}
              borderWidth={"1px"}
              fontWeight={500}
              px={10}
              py={2}
              ml={[0, 0, 0, "auto"]}
              isDisabled={!hasAccess}
            >
              {accessKey ? "Regenerate Key" : "Generate Key"}
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
                <Spinner />
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
                        {createdDate}
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
                        No access key has been created yet, Click generate key
                        to create new key
                      </Text>
                      <Link
                        display={hasAccess ? "block" : "none"}
                        onClick={getAccessKey}
                        fontWeight={400}
                        color="blue"
                      >
                        Generate Key
                      </Link>
                    </VStack>
                    {!hasAccess && (
                      <UpgradePackage
                        text="Upgrade to our pro plan or a custom plan to use this feature and much more."
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
            boxShadow={"0px 2px 2px rgba(0, 0, 0, 0.06)"}
            borderRadius={"15px"}
            align="center"
            justifyContent="center"
            flexDir={["column", "column", "column", "row"]}
            p={[2, 2, 2, 5]}
            mx={[2, 2, 2, 6]}
            mt={"auto"}
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
              href="https://apidoc.solidityscan.com/solidityscan-security-api/"
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
      />
    </Box>
  );
}
