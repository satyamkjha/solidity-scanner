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
  HStack,
  Image,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useAccessKey } from "hooks/useAccessKey";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { HiDuplicate, HiOutlineCheck } from "react-icons/hi";
import { CheckIcon } from "@chakra-ui/icons";
import { getAssetsURL } from "helpers/helperFunction";
import ConfirmActionForm from "components/confirmActionForm";

export default function PrivateApi() {
  const { data, isLoading } = useAccessKey();
  const [accessKey, setAccessKey] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isViewable, setViewable] = useState(false);
  const { onCopy, hasCopied } = useClipboard(accessKey);
  const [actionType, setActionType] = useState("regenerate");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const assetsUrl = getAssetsURL();

  useEffect(() => {
    if (data && data.api_key) {
      setAccessKey(data.api_key);
      setIsFirstTime(false);
    }
  }, [data]);

  const getAccessKey = async () => {
    if (accessKey) {
      setActionType("regenerate");
      onOpen();
    } else {
      setIsSpinning(true);
      const { data } = await API.get(API_PATH.API_CREATE_ACCESS_KEY);
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
      const { data } = await API.get(API_PATH.API_REGENERATE_ACCESS_KEY);
      setAccessKey(data.api_key);
      setIsFirstTime(false);
    } else if (actionType === "delete") {
      const { data } = await API.get(API_PATH.API_REVOKE_ACCESS_KEY);
      setAccessKey("");
      setViewable(true);
    }
    setIsSpinning(false);
  };

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: [2, 2, 2, 8],
        mx: [0, 0, 4],
        my: 4,
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
          h={"65vh"}
          borderRadius={"5px"}
          my={6}
          pb={6}
          flexDir="column"
        >
          <Flex
            m={6}
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
            >
              {accessKey ? "Regenrate Key" : "Generate Key"}
            </Button>
          </Flex>
          <Box
            mx={[4, 4, 4, 6]}
            px={[4, 4, 4, 6]}
            py={8}
            backgroundColor="#FCFCFC"
            border={"2px solid #EAEAEA"}
            borderRadius="15px"
          >
            {isSpinning ? (
              <Flex
                sx={{
                  w: "100%",
                  my: "6",
                  justifyContent: "center",
                }}
              >
                <Spinner />
              </Flex>
            ) : (
              <>
                {accessKey ? (
                  <>
                    <Flex w="100%" display={["flex", "flex", "flex", "none"]}>
                      <Text color="blue">
                        Click here to copy the access code
                      </Text>
                      <Flex
                        onClick={onCopy}
                        color="blue"
                        ml={2}
                        cursor="pointer"
                      >
                        {hasCopied ? (
                          <CheckIcon />
                        ) : (
                          <Icon as={HiDuplicate} fontSize="2xl" />
                        )}
                      </Flex>
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
                    >
                      <Text
                        color="blue"
                        display={["none", "none", "none", "block"]}
                      >
                        Click here to copy the access code
                      </Text>
                      <Flex
                        onClick={onCopy}
                        color="blue"
                        ml={2}
                        cursor="pointer"
                        display={["none", "none", "none", "block"]}
                      >
                        {hasCopied ? (
                          <CheckIcon />
                        ) : (
                          <Icon as={HiDuplicate} fontSize="2xl" />
                        )}
                      </Flex>
                      <Text
                        color="detail"
                        fontWeight={400}
                        ml={[0, 0, 0, "auto"]}
                        mb={[4, 4, 4, 0]}
                      >
                        created on 12 May 2023
                      </Text>
                      {!isFirstTime && (
                        <>
                          <Button
                            onClick={() => setViewable(!isViewable)}
                            variant={"outline"}
                            borderWidth={"1px"}
                            borderColor={"blackAlpha.600"}
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
                        color={"#FF5630"}
                        fontWeight={500}
                        px={8}
                        ml={4}
                      >
                        Delete Key
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <VStack spacing={4}>
                    <Image
                      src={assetsUrl + "background/private_api_cover.svg"}
                      my={2}
                    />
                    <Text fontWeight={400}>
                      No access key has been created yet, Click generate key to
                      create new key
                    </Text>
                    <Link onClick={getAccessKey} fontWeight={400} color="blue">
                      Generate Key
                    </Link>
                  </VStack>
                )}
              </>
            )}
          </Box>
          {isFirstTime && (
            <Flex
              border={"1px solid #FFC661"}
              bgColor="#FFF8ED"
              p={6}
              m={6}
              borderRadius={"15px"}
            >
              <Text color="detail" fontWeight={400}>
                Make sure to copy your personal access token in a secure place
                now, next time you visit the access token will be hidden
              </Text>
            </Flex>
          )}
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
                ? "are you sure you want to Regenerate the  key?"
                : "are you sure you want to delete the current key?"}
            </Text>
            <Text color="detail" fontWeight={400}>
              {actionType === "regenerate"
                ? "Regenerating the key will generate a new API key and invalidate the current key. Please ensure that you have updated any applications or services that use this key with the new key before proceeding."
                : "This action will revoke access to all APIs integrated with this key. Please ensure that you have updated any applications or services that use this key before proceeding."}
            </Text>
          </VStack>
        }
      />
    </Box>
  );
}
