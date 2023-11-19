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
  Link,
} from "@chakra-ui/react";
import StyledButton from "components/styled-components/StyledButton";
import Loader from "components/styled-components/Loader";
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { contractChain, platforms } from "common/values";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { StylesConfig, GroupBase } from "react-select";
import Select from "react-select";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { FaPen } from "react-icons/fa";
import RadioButton from "components/styled-components/RadioButton";
import { QuickScanResult } from "common/types";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";
import { useHistory } from "react-router-dom";

export const QuickScanResultContainer: React.FC<{
  scanReport: QuickScanResult;
}> = ({ scanReport }) => {
  const assetsUrl = getAssetsURL();
  const history = useHistory();

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
          </Flex>
          <VStack
            ml={5}
            alignItems={["center", "center", "flex-start"]}
            w="calc(100% - 60px)"
            spacing={1}
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
              <Text
                whiteSpace="nowrap"
                color="white"
                fontWeight={300}
                fontSize="md"
              >
                {scanReport.contract_platform?.toUpperCase()} {"asdkj"}
              </Text>
              <Divider
                mx={5}
                h={7}
                borderColor="gray.200"
                orientation="vertical"
                display={["none", "none", "block"]}
              />
              <Text
                whiteSpace="nowrap"
                color="gray.400"
                fontWeight={300}
                fontSize="md"
                mr={2}
              >
                {`View on ${sentenceCapitalize(
                  scanReport.contract_platform || " "
                )}`}
                <ExternalLinkIcon />
              </Text>
            </Flex>
          </VStack>
        </Flex>
        <Flex
          w="100%"
          justifyContent={["flex-start", "flex-start", "space-between"]}
          alignItems="center"
          flexDir={["column", "column", "row"]}
        >
          <HStack bgColor="#272727" w="32%" borderRadius={5} p={3}>
            <Flex
              padding={2}
              bgColor="#383838"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            ></Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Security Score
              </Text>
              <HStack spacing={0}>
                <Text color="white" fontSize="lg" fontWeight={600}>
                  {scanReport.multi_file_scan_summary.score_v2}
                </Text>
                <Text color="white" fontSize="sm" fontWeight={400}>
                  /100
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack bgColor="#272727" w="32%" borderRadius={5} p={3}>
            <Flex
              padding={2}
              bgColor="#383838"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            ></Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Scan duration
              </Text>
              <Text color="white" fontSize="lg" fontWeight={600}>
                {scanReport.multi_file_scan_summary.scan_time_taken} secs
              </Text>
            </VStack>
          </HStack>
          <HStack bgColor="#272727" w="32%" borderRadius={5} p={3}>
            <Flex
              padding={2}
              bgColor="#383838"
              justifyContent="center"
              alignItems="center"
              height="45px"
              width="45px"
              mr={2}
            ></Flex>
            <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
              <Text color="gray.400" fontSize="sm" fontWeight={300}>
                Lines of code
              </Text>
              <Text color="white" fontSize="lg" fontWeight={600}>
                {scanReport.multi_file_scan_summary.lines_analyzed_count}
              </Text>
            </VStack>
          </HStack>
        </Flex>
        <Box
          bgColor="#272727"
          w="100%"
          px={[4, 4, 4, 8]}
          py={6}
          borderRadius={"15px"}
        >
          <Flex
            w="100%"
            justifyContent={["center", "center", "center", "flex-start"]}
            alignItems={["center", "center", "center", "flex-start"]}
            direction={["column", "column", "row"]}
          >
            <SolidityScoreProgress
              score={scanReport.multi_file_scan_summary.score_v2}
              size={"100px"}
              thickness={"7px"}
            />
            <VStack ml={5} textAlign="left" alignItems="flex-start" px={4}>
              <Text
                color="white"
                fontSize="18px"
                fontWeight={600}
                textAlign="center"
              >
                Your Security Score is
                {parseFloat(scanReport.multi_file_scan_summary.score_v2) < 50
                  ? " LOW"
                  : parseFloat(scanReport.multi_file_scan_summary.score_v2) >=
                    90
                  ? " GREAT"
                  : " AVERAGE"}
              </Text>
              <Text color="#B0B7C3" fontSize="14px" fontWeight={400}>
                The SolidityScan score is calculated based on lines of code and
                weights assigned to each issue depending on the severity and
                confidence. To improve your score, view the detailed result and
                leverage the remediation solutions provided.
              </Text>
            </VStack>
          </Flex>
        </Box>
      </VStack>
    </Flex>
  );
};
