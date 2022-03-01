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
} from "@chakra-ui/react";
import Overview from "components/overview";
import Result from "components/result";
import TrialWall from "components/trialWall";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useScan } from "hooks/useScan";
import { useProfile } from "hooks/useProfile";

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
                {data?.scan_report.contract_address}
                <Text as="span" fontSize="14px" ml={3} color="gray.500">
                  {data.scan_report?.contract_platform?.toUpperCase()}
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
                p: 4,
              }}
            >
              <Accordion allowMultiple borderBottomWidth={0}>
                <AccordionItem borderTopWidth={0} style={{}}>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" p={3} textAlign="left">
                            Section 2 title
                          </Box>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
