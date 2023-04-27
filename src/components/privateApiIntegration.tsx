import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Spinner,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  HStack,
  useClipboard,
} from "@chakra-ui/react";
import { useAccessKey } from "hooks/useAccessKey";
import { API_PATH } from "helpers/routeManager";
import API from "helpers/api";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";

export default function PrivateApiIntegration() {
  const { data, isLoading } = useAccessKey();
  const [accessKey, setAccessKey] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isViewable, setViewable] = useState(false);
  const { onCopy, hasCopied } = useClipboard(accessKey);

  useEffect(() => {
    setAccessKey(data.api_key);
  }, [data]);

  const getAccessKey = async () => {
    setIsSpinning(true);
    if (accessKey) {
      const { data } = await API.get(API_PATH.API_REVOKE_ACCESS_KEY);
      setAccessKey(data.api_key);
      setIsSpinning(false);
    } else {
      const { data } = await API.get(API_PATH.API_CREATE_ACCESS_KEY);
      setAccessKey(data.api_key);
      setIsSpinning(false);
    }
  };

  return (
    <Box width="100%" bg="white" borderRadius="5px" p={5}>
      <Flex
        width={"100%"}
        justifyContent={["flex-start", "flex-start", "space-between"]}
        alignItems={["flex-start", "flex-start", "center"]}
        flexDir={["column", "column", "row"]}
        transition="0.2s opacity"
      >
        <Flex
          w={["100%", "100%", "60%"]}
          justifyContent={"flex-start"}
          alignItems="center"
          mb={[5, 5, 0]}
        >
          <Box w={["20%", "15%"]} mr={4}></Box>
          <Box w={["80%", "85%"]} ml={4}>
            <Text fontWeight="600" fontSize="16px">
              Private APIs
            </Text>
            <Text fontSize="13px" fontWeight="400" opacity={0.8} maxW="500px">
              This is the description
            </Text>
            <HStack spacing={0} mt={2}>
              <InputGroup size="md" w="100%" maxW="400px">
                <Input
                  borderRadius="10px"
                  borderRightRadius={0}
                  type={isViewable ? "text" : "password"}
                  value={accessKey}
                  isReadOnly={true}
                />
                <InputRightElement>
                  <Icon
                    cursor="pointer"
                    color="gray.500"
                    as={isViewable ? AiOutlineEyeInvisible : AiOutlineEye}
                    onClick={() => setViewable(!isViewable)}
                  />
                </InputRightElement>
              </InputGroup>
              <Button borderLeftRadius={0} borderRadius="10px" onClick={onCopy}>
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </HStack>
          </Box>
        </Flex>
        <Button
          variant="brand"
          fontSize="15px"
          py={6}
          width="250px"
          onClick={getAccessKey}
        >
          {isLoading || isSpinning ? (
            <Spinner />
          ) : accessKey ? (
            "Revoke Key"
          ) : (
            "Generate Key"
          )}
        </Button>
      </Flex>
    </Box>
  );
}
