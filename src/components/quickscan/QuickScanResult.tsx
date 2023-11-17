import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import {
  HStack,
  PinInput,
  PinInputField,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Flex,
  Image,
  Divider,
  Box,
  Input,
} from "@chakra-ui/react";
import StyledButton from "components/styled-components/StyledButton";
import Loader from "components/styled-components/Loader";
import { ChevronDownIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { contractChain, platforms } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { StylesConfig, GroupBase } from "react-select";
import Select from "react-select";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { FaPen } from "react-icons/fa";
import RadioButton from "components/styled-components/RadioButton";
import { QuickScanResult } from "common/types";

export const QuickScanResultContainer: React.FC<{
  scanReport: QuickScanResult;
}> = ({ scanReport }) => {
  const assetsUrl = getAssetsURL();

  return (
    <Flex
      w="90%"
      maxW="1800px"
      h="fit-content"
      flexDir={["column", "column", "row"]}
      justifyContent={["flex-start", "flex-start", "space-between"]}
      alignItems="center"
      my={20}
    >
      <VStack
        spacing={5}
        borderRadius={10}
        padding={5}
        bgColor="#222222"
        justifyContent="flex-start"
        alignItems="center"
        w="55%"
      >
        <Flex
          w="100%"
          justifyContent={["flex-start"]}
          alignItems={"center"}
          flexDir={["column", "column", "row"]}
        >
          <Flex
            w="60px"
            h="60px"
            backgroundColor={"#272727"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={["column", "column", "row"]}
          >
            <Image
              src={`${assetsUrl}blockscan/${scanReport.contract_platform}.svg`}
              height="40px"
              width="40px"
            />
            <VStack
              alignItems={["center", "center", "flex-start"]}
              w="calc(100% - 60px)"
              spacing={3}
              textAlign={["center", "center", "left"]}
            >
              <Text color="white" fontWeight={600} fontSize="lg">
                {scanReport.contract_address}
              </Text>
              <Flex
                w="100%"
                justifyContent={["flex-start"]}
                alignItems={"center"}
                flexDir={["column", "column", "row"]}
              >
                <Text color="white" fontWeight={300} fontSize="md">
                  {scanReport.contract_platform?.toUpperCase()}
                </Text>
                <Divider
                  mx={2}
                  orientation="vertical"
                  display={["none", "none", "block"]}
                />
                <Text color="white" fontWeight={300} fontSize="md">
                  View on {}
                </Text>
              </Flex>
            </VStack>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
};
