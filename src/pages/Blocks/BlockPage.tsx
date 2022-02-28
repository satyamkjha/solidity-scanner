import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  Flex,
  Box,
  Text,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  VStack,
} from "@chakra-ui/react";
import Overview from "components/overview";
import Result from "components/result";
import TrialWall from "components/trialWall";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useScan } from "hooks/useScan";
import { useProfile } from "hooks/useProfile";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";

const BlockPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const { data, isLoading } = useScan(scanId);
  const { data: profile, isLoading: isProfileLoading } = useProfile();

  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        my: 4,
        px: 8,
        py: 4,
        minH: "78vh",
      }}
    >
      {isLoading || isProfileLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        data &&
        profile && (
          <>
            {" "}
            <Flex
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                {data?.scan_report.project_name}
                <Text as="span" fontSize="14px" ml={3} color="gray.500">
                  {data.scan_report?.contract_address}
                </Text>
              </Text>
              <Link
                as={RouterLink}
                to="/blocks"
                variant="subtle-without-underline"
                fontSize="md"
              >
                ← back
              </Link>
            </Flex>
            <Box
              sx={{
                w: "100%",
                bg: "white",
                borderRadius: "20px",
                my: 4,
                py: 4,
              }}
            >
              <Accordion allowMultiple borderBottomWidth={0}>
                <AccordionItem borderTopWidth={0} style={{}}>
                  {({ isExpanded }) => (
                    <>
                      <Flex
                        flexDirection={"row"}
                        justifyContent="space-between"
                        alignItems={"center"}
                        width={"100%"}
                        height="fit-content"
                        pt={2}
                        pb={5}
                        px={4}
                      >
                        <Text sx={{ fontSize: "lg", fontWeight: 600, ml: 2 }}>
                          {data?.scan_report.contract_address}
                        </Text>
                        <AccordionButton
                          width={"fit-content"}
                          borderRadius="48px"
                        >
                          {isExpanded ? (
                            <BiChevronUpCircle />
                          ) : (
                            <BiChevronDownCircle />
                          )}
                        </AccordionButton>
                      </Flex>

                      <AccordionPanel backgroundColor={"#FAFBFC"} pb={4}>
                        <Flex
                          flexDirection={"row"}
                          justifyContent="flex-start"
                          alignItems={"flex-start"}
                          width={"100%"}
                          height="fit-content"
                          flexWrap={"wrap"}
                          textAlign={"left"}
                          p={6}
                        >
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                            >
                              Contract Name
                            </Text>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                            >
                              {data?.scan_report.contractname}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                            >
                              Compiler Version
                            </Text>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                            >
                              {data?.scan_report.compilerversion}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                            >
                              EVM Version
                            </Text>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                            >
                              {data?.scan_report.evmversion}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                              mt={10}

                            >
                              License Type
                            </Text>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                            >
                              {data?.scan_report.licensetype}
                            </Text>
                          </VStack>
                          <VStack textAlign={"left"} width={"33.33%"}>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                              color="gray.500"
                              mt={10}

                            >
                              Balance
                            </Text>
                            <Text
                              width={"100%"}
                              as="p"
                              fontSize="14px"
                            >
                              {data?.scan_report.contract_address}
                            </Text>
                          </VStack>
                        </Flex>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
              <Tabs variant="soft-rounded" colorScheme="green">
                <TabList
                  sx={{
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    borderColor: "border",
                    py: 4,
                    px: 4,
                  }}
                >
                  <Tab mx={2}>Overview</Tab>
                  <Tab mx={2}>Detailed Result</Tab>
                  {/* <Tab mx={2}>Advanced Scan(Beta)</Tab> */}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {data.scan_report.scan_summary && (
                      <Overview data={data.scan_report.scan_summary} />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {
                      // profile.current_package === "trial" ? (
                      //   <TrialWall />
                      // ) :
                      data.scan_report.scan_details &&
                        data.scan_report.scan_summary && (
                          <Result
                            scanSummary={data.scan_report.scan_summary}
                            scanDetails={data.scan_report.scan_details}
                            type="block"
                          />
                        )
                    }
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </>
        )
      )}
    </Box>
  );
};

export default BlockPage;
