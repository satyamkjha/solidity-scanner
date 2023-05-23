import { AccordionPanel } from "@chakra-ui/accordion";
import { Flex, HStack, Text, Image, VStack } from "@chakra-ui/react";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import React from "react";
import { blockExplorer } from "common/values";
import { useConfig } from "hooks/useConfig";

export const ContractDetails: React.FC<{
  scanData: any;
}> = ({ scanData }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  return (
    <AccordionPanel backgroundColor={"#F4F5F6"} pb={4} mt={[4, 4, 4, 0]}>
      <Flex
        flexDirection={"row"}
        justifyContent="flex-start"
        alignItems={"flex-start"}
        width={"100%"}
        height="fit-content"
        flexWrap={"wrap"}
        textAlign={"left"}
        p={[2, 2, 2, 6]}
      >
        <HStack
          py={2}
          px={9}
          borderRadius={36}
          backgroundColor={"white"}
          cursor="pointer"
          onClick={() =>
            window.open(`${scanData.scan_report.contract_url}`, "_blank")
          }
          boxShadow="0px 1px 1px rgba(0, 0, 0, 0.09)"
        >
          <Text minW={"50px"} width={"100%"} as="p" fontSize="12px">
            View on
          </Text>
          <Text width={"100%"} color="gray.200" as="p" fontSize="16px">
            |
          </Text>
          <Image
            src={`${assetsURL}blockscan/${scanData.scan_report.contract_platform}-scan.svg`}
            alt="Product screenshot"
            mx="auto"
            h={"20px"}
            w={"20px"}
          />
          {scanData.scan_report.contract_platform && (
            <Text
              fontWeight={"700"}
              width={"fit-content"}
              as="p"
              fontSize="18px"
            >
              {blockExplorer[scanData.scan_report.contract_platform]}
            </Text>
          )}
        </HStack>
      </Flex>
      <Flex
        flexDirection={"row"}
        justifyContent="flex-start"
        alignItems={"flex-start"}
        width={"100%"}
        height="fit-content"
        flexWrap={"wrap"}
        textAlign={"left"}
        p={[2, 2, 2, 6]}
      >
        <VStack
          textAlign={"left"}
          width={["100%", "100%", "100%", "33.33%"]}
          spacing={[0, 0, 0, 2]}
        >
          <Text
            width={"100%"}
            as="p"
            fontSize="14px"
            color="gray.500"
            mt={[4, 4, 4, 0]}
          >
            Contract Name
          </Text>
          <Text width={"100%"} as="p" fontSize="14px">
            {scanData.scan_report.contractname
              ? scanData.scan_report.contractname
              : "NA"}
          </Text>
        </VStack>
        <VStack
          textAlign={"left"}
          width={["100%", "100%", "100%", "33.33%"]}
          spacing={[0, 0, 0, 2]}
        >
          <Text
            width={"100%"}
            as="p"
            fontSize="14px"
            color="gray.500"
            mt={[4, 4, 4, 0]}
          >
            Compiler Version
          </Text>
          <Text width={"100%"} as="p" fontSize="14px">
            {scanData.scan_report.compilerversion
              ? scanData.scan_report.compilerversion
              : "NA"}
          </Text>
        </VStack>
        <VStack
          textAlign={"left"}
          width={["100%", "100%", "100%", "33.33%"]}
          spacing={[0, 0, 0, 2]}
        >
          <Text
            width={"100%"}
            as="p"
            fontSize="14px"
            color="gray.500"
            mt={[4, 4, 4, 0]}
          >
            EVM Version
          </Text>
          <Text width={"100%"} as="p" fontSize="14px">
            {scanData.scan_report.evmversion
              ? scanData.scan_report.evmversion
              : "NA"}
          </Text>
        </VStack>
        <VStack
          textAlign={"left"}
          width={["100%", "100%", "100%", "33.33%"]}
          spacing={[0, 0, 0, 2]}
        >
          <Text
            width={"100%"}
            as="p"
            fontSize="14px"
            color="gray.500"
            mt={[4, 4, 4, 10]}
          >
            License Type
          </Text>
          <Text width={"100%"} as="p" fontSize="14px">
            {scanData.scan_report.licensetype
              ? scanData.scan_report.licensetype
              : "NA"}
          </Text>
        </VStack>
        <VStack
          textAlign={"left"}
          width={["100%", "100%", "100%", "33.33%"]}
          spacing={[0, 0, 0, 2]}
        >
          <Text
            width={"100%"}
            as="p"
            fontSize="14px"
            color="gray.500"
            mt={[4, 4, 4, 10]}
          >
            Balance
          </Text>
          <Text width={"100%"} as="p" fontSize="14px">
            {scanData.scan_report.value && scanData.scan_report.currency
              ? `${scanData.scan_report.value} ${scanData.scan_report.currency}`
              : "NA"}
          </Text>
        </VStack>
        <VStack
          textAlign={"left"}
          width={["100%", "100%", "100%", "33.33%"]}
          spacing={[0, 0, 0, 2]}
        >
          <Text
            width={"100%"}
            as="p"
            fontSize="14px"
            color="gray.500"
            mt={[4, 4, 4, 10]}
          >
            Contract Chain
          </Text>
          <Text width={"100%"} as="p" fontSize="14px">
            {scanData.scan_report.contract_chain
              ? scanData.scan_report.contract_chain
              : "NA"}
          </Text>
        </VStack>
      </Flex>
    </AccordionPanel>
  );
};
export default ContractDetails;
