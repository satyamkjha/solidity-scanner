import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiCheck, FiFilter } from "react-icons/fi";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import { VulnerabilityDistributionFilter } from "./vulnDistribution";

export const DetailFilter: React.FC<{
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
  gas?: number | undefined;
  vulnerability: boolean[];
  setVulnerability: Dispatch<SetStateAction<boolean[]>>;
  confidence: boolean[];
  setConfidence: Dispatch<SetStateAction<boolean[]>>;
}> = ({
  critical,
  high,
  medium,
  low,
  informational,
  gas,
  vulnerability,
  setVulnerability,
  confidence,
  setConfidence,
}) => {
  const [filterCount, setFilterCount] = useState(0);
  const [confidenceParam, setConfidenceParam] = useState([false, false, false]);
  const [vulnerabilityParams, setVulnerabilityParams] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const setConfidenceFilter = (conf: boolean[]) => {
    setConfidence([...conf]);
    setConfidenceParam([...conf]);
    setFilterCount(
      conf.filter(Boolean).length + vulnerabilityParams.filter(Boolean).length
    );
  };

  const setVulnerabilityFilter = (vern: boolean[]) => {
    setVulnerability([...vern]);
    setVulnerabilityParams([...vern]);
    setFilterCount(
      confidenceParam.filter(Boolean).length + vern.filter(Boolean).length
    );
  };

  const clearFilter = () => {
    setConfidenceParam([false, false, false]);
    setVulnerabilityParams([false, false, false, false, false, false]);
    setFilterCount(0);
  };

  useEffect(() => {
    if (!filterCount) {
      setConfidence([true, true, true]);
      setVulnerability([true, true, true, true, true, true]);
    }
  }, [filterCount]);

  return (
    <Accordion w="100%" borderBottomWidth={0} allowToggle>
      <AccordionItem w="100%" borderWidth={"0 !important"}>
        {({ isExpanded }) => (
          <>
            <Flex w="100%" p={2} align="center">
              <Text fontWeight={"600"} whiteSpace="nowrap">
                Filter Parameter
              </Text>
              <AccordionButton
                ml="auto"
                w={"max-content"}
                background="#FAFBFC"
                borderRadius={"11px"}
              >
                <HStack spacing={4} p={0}>
                  <HStack spacing={-2}>
                    {filterCount > 0 && (
                      <Box
                        background={"red"}
                        borderRadius={"50%"}
                        w="18px"
                        h="18px"
                        mt={-3}
                        zIndex={10}
                        textAlign="center"
                        color={"white"}
                        fontSize={"xs"}
                      >
                        {filterCount}
                      </Box>
                    )}
                    <FiFilter
                      color={filterCount > 0 ? "#3300FF" : "#8A94A6"}
                      size={24}
                    />
                  </HStack>
                  {isExpanded ? (
                    <RxDoubleArrowDown color="#3300FF" size={20} />
                  ) : (
                    <RxDoubleArrowUp color="#C4C4C4" size={20} />
                  )}
                </HStack>
              </AccordionButton>
            </Flex>
            <AccordionPanel background={"#FAFBFC"} borderBottomRadius={15}>
              <Flex w="100%" justifyContent="space-around">
                <Box
                  width="100%"
                  background={"white"}
                  borderRadius={15}
                  p={4}
                  my={1}
                >
                  <Text color={"#4E5D78"} fontWeight={400} fontSize="sm">
                    By Vulnerability Parameter
                  </Text>
                  <VulnerabilityDistributionFilter
                    critical={critical}
                    high={high}
                    medium={medium}
                    low={low}
                    informational={informational}
                    gas={gas}
                    vulnerabilityParams={vulnerabilityParams}
                    setVulnerabilityFilter={setVulnerabilityFilter}
                  />
                </Box>
                {/* <Score score={score} /> */}
              </Flex>
              <VStack
                width={"100%"}
                justify={"center"}
                alignItems={"flex-start"}
                background={"white"}
                borderRadius={15}
                p={4}
                mt={2}
              >
                <Text color={"#4E5D78"} fontWeight={400} fontSize="sm">
                  By Confidence Parameter
                </Text>
                <HStack pt={2}>
                  <Button
                    variant={"solid"}
                    color={"low"}
                    background={"#EEFFE6"}
                    fontWeight="500"
                    fontSize={"sm"}
                    borderRadius={"27px"}
                    onClick={() =>
                      setConfidenceFilter([
                        confidenceParam[0],
                        confidenceParam[1],
                        !confidenceParam[2],
                      ])
                    }
                  >
                    {confidenceParam[2] && <FiCheck />}&nbsp;Certain
                  </Button>
                  <Button
                    variant={"solid"}
                    color={"#ED9801"}
                    background={"#FFF8EB"}
                    px={4}
                    fontWeight="500"
                    borderRadius={"27px"}
                    onClick={() =>
                      setConfidenceFilter([
                        confidenceParam[0],
                        !confidenceParam[1],
                        confidenceParam[2],
                      ])
                    }
                  >
                    {confidenceParam[1] && <FiCheck />}&nbsp;Firm
                  </Button>
                  <Button
                    variant={"solid"}
                    color={"high"}
                    background={"#FFF5F3"}
                    px={4}
                    fontWeight="500"
                    fontSize={"sm"}
                    borderRadius={"27px"}
                    onClick={() =>
                      setConfidenceFilter([
                        !confidenceParam[0],
                        confidenceParam[1],
                        confidenceParam[2],
                      ])
                    }
                  >
                    {confidenceParam[0] && <FiCheck />}&nbsp;Tentative
                  </Button>
                </HStack>
              </VStack>
              <Flex mt={3} justifyContent="center">
                <Link
                  alignItems={"center"}
                  textAlign="center"
                  variant="accent"
                  fontSize="sm"
                  onClick={() => clearFilter()}
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Clear filter
                </Link>
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
