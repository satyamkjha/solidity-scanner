import React from "react";
import {
  Switch,
  Route,
  Link as RouterLink,
  useParams,
  useHistory,
} from "react-router-dom";

import {
  Flex,
  Box,
  Text,
  Link,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Button,
  HStack,
  Tooltip,
} from "@chakra-ui/react";

import { AiOutlineClockCircle, AiOutlineDownload } from "react-icons/ai";
import Overview from "components/overview";
import Result from "components/result";
import { RescanIcon } from "components/icons";

import { useScans } from "hooks/useScans";
import { useScan } from "hooks/useScan";

import { ScanMeta } from "common/types";
import Score from "components/score";

export const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading } = useScans(projectId);
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
            <Flex
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Text sx={{ fontSize: "xl", fontWeight: 600, ml: 2 }}>
                Project 1
                <Link fontSize="14px" ml={3} variant="subtle" target="_blank">
                  {projectId}
                </Link>
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
            <Switch>
              <Route exact path="/projects/:projectId/history">
                <ScanHistory scans={data.scans} />
              </Route>
              <Route exact path="/projects/:projectId/:scanId">
                <ScanDetails scansRemaining={data.scans_remaining} />
              </Route>
            </Switch>
          </>
        )
      )}
    </Box>
  );
};

const ScanDetails: React.FC<{ scansRemaining: number }> = ({
  scansRemaining,
}) => {
  const { projectId, scanId } =
    useParams<{ projectId: string; scanId: string }>();
  const history = useHistory();
  const { data, isLoading } = useScan(scanId);
  return (
    <Box
      sx={{
        w: "100%",
        bg: "white",
        borderRadius: "20px",
        my: 4,
        p: 4,
      }}
    >
      {isLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        data && (
          <>
            <Flex
              sx={{
                justifyContent: ["flex-start", "flex-start", "space-between"],
                alignItems: ["flex-start", "flex-start", "center"],
                pb: 4,
                px: 6,
                borderBottom: "1px solid",
                borderColor: "border",
                flexDir: ["column", "column", "row"],
              }}
            >
              <HStack spacing={[8]} mb={[4, 4, 0]}>
                <Tooltip label="Rescan" aria-label="A tooltip">
                  <Button
                    variant="brand"
                    px={2}
                    py={6}
                    transition="0.3s opacity"
                    _hover={{ opacity: 0.9 }}
                  >
                    <Flex sx={{ flexDir: "column", alignItems: "center" }}>
                      <RescanIcon size={38} />
                    </Flex>
                  </Button>
                </Tooltip>
                <Text sx={{ fontSize: "xl", fontWeight: 600 }}>Scan 01</Text>
              </HStack>
              <HStack spacing={8} alignSelf={["flex-end", "flex-end", "auto"]}>
                <Button
                  variant="accent-ghost"
                  onClick={() => history.push(`/projects/${projectId}/history`)}
                >
                  <Icon as={AiOutlineClockCircle} mr={2} fontSize="17px" />
                  Scan History
                </Button>
                <Button variant="accent-outline">
                  <Icon
                    as={AiOutlineDownload}
                    mr={2}
                    fontSize="17px"
                    color="#806CCF"
                  />
                  Export report
                </Button>
              </HStack>
            </Flex>
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList
                sx={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderColor: "border",
                  p: 4,
                }}
              >
                <Tab mx={2}>Overview</Tab>
                <Tab mx={2}>Detailed Result</Tab>
                <Tab mx={2}>Advanced Scan(Beta)</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {data.scan_report.scan_summary && (
                    <Overview
                      data={data.scan_report.scan_summary}
                      scansRemaining={scansRemaining}
                    />
                  )}
                </TabPanel>
                <TabPanel>
                  {data.scan_report.scan_details &&
                    data.scan_report.scan_summary && (
                      <Result
                        scanSummary={data.scan_report.scan_summary}
                        scanDetails={data.scan_report.scan_details}
                        type="project"
                      />
                    )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )
      )}
    </Box>
  );
};

const ScanHistory: React.FC<{ scans: ScanMeta[] }> = ({ scans }) => {
  return (
    <Box
      sx={{
        w: "100%",
        borderRadius: "20px",
        my: 4,
        p: 4,
      }}
    >
      <Text sx={{ fontSize: "xl", mb: 4 }}>Scan History</Text>
      {scans.map((scan) => (
        <ScanBlock key={scan.scan_id} scan={scan} />
      ))}
    </Box>
  );
};

const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const ScanBlock: React.FC<{ scan: ScanMeta }> = ({ scan }) => {
  const history = useHistory();
  const { projectId } = useParams<{ projectId: string }>();
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      sx={{
        cursor: "pointer",
        w: "100%",
        bg: "white",
        my: 4,
        p: 4,
        px: 10,
        transition: "0.3s box-shadow",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        _hover: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => history.push(`/projects/${projectId}/${scan.scan_id}`)}
    >
      <Flex alignItems="center">
        <Box
          sx={{
            width: "60px",
            height: "60px",
            p: 2,
            bg: "#F7F7F7",
            color: "#4E5D78",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          <Text fontSize="xl" fontWeight="600">
            {new Date(scan.scan_time).getDate()}
          </Text>
          <Text fontSize="12px" mt="-4px">
            {monthNames[new Date(scan.scan_time).getMonth()]}
          </Text>
        </Box>
        <Text fontSize="xl" mx={16}>
          Scan 01
        </Text>
        <Score score="4.5" />
      </Flex>
      <Button
        variant="accent-outline"
        onClick={(e) => {
          e.stopPropagation();
          console.log("PDF Download!");
        }}
      >
        PDF
        <Icon as={AiOutlineDownload} ml={2} fontSize="17px" color="#806CCF" />
      </Button>
    </Flex>
  );
};
export default ProjectPage;
