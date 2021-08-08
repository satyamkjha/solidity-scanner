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
} from "@chakra-ui/react";
import Overview from "./components/Overview";
import Result from "./components/result";

import { useScan } from "hooks/useScan";

export const ProjectPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const { data, isLoading } = useScan(scanId);
  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        my: 4,
        px: 8,
        py: 4,
        minH: "80vh",
      }}
    >
      {isLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        data && (
          <>
            {" "}
            <Flex
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                {data?.scan_report.project_name}
              </Text>
              <Link
                as={RouterLink}
                to="/projects"
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
              <Tabs variant="soft-rounded" colorScheme="green">
                <TabList
                  sx={{
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    borderColor: "border",
                    pb: 4,
                    px: 4,
                  }}
                >
                  <Tab mx={2}>Overview</Tab>
                  <Tab mx={2}>Detailed Result</Tab>
                  <Tab mx={2}>Advanced Scan(Beta)</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {data.scan_report.scan_summary && (
                      <Overview data={data.scan_report.scan_summary} />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {data.scan_report.scan_details &&
                      data.scan_report.scan_summary && (
                        <Result
                          scanSummary={data.scan_report.scan_summary}
                          scanDetails={data.scan_report.scan_details}
                        />
                      )}
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

export default ProjectPage;
