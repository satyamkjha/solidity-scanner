import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";
import {
  getAssetsURL,
  getProjectType,
  getContractBlockChainLogoUrl,
} from "helpers/helperFunction";
import VulnerabilityDistribution from "components/vulnDistribution";
import { useHistory } from "react-router-dom";
import { capitalize } from "common/functions";

import { useAllScans } from "hooks/useAllScans";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";
import { ScanObj } from "common/types";
import Loader from "components/styled-components/Loader";
import { contractChain } from "common/values";

const RecentScansList: React.FC = () => {
  const assetsURL = getAssetsURL();
  const history = useHistory();

  const { data: projects, isLoading } = useAllScans(
    {
      pageNo: 1,
      perPageCount: 4,
    },
    "",
    "recent_scans"
  );

  const [changeView] = useMediaQuery("(min-width: 650px)");

  const [projectList, setprojectList] = useState<ScanObj[]>([]);
  const [fillScore, setFillScore] = useState(false);

  useEffect(() => {
    if (projects && projects.data.length > 0) {
      setprojectList(projects.data);
      setTimeout(() => {
        setFillScore(true);
      }, 100);
    }
  }, [projects]);

  const getProjectTypeIconUrl = (
    scanType: string,
    projectUrl: string,
    contractPlatform: string,
    contractChain: string
  ) =>
    `${assetsURL}${
      scanType === "project"
        ? "icons/integrations/" + getProjectType(projectUrl)
        : scanType === "block"
        ? getContractBlockChainLogoUrl(contractPlatform, contractChain)
        : ""
    }.svg`;

  return (
    <>
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        p={3}
        flexDirection="column"
        bgColor="bg.subtle"
        w="100%"
        h={changeView ? "430px" : "fit-content"}
        borderRadius={10}
      >
        <HStack
          px={3}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Text
            sx={{
              fontSize: "md",
              fontWeight: 600,
              textAlign: "left",
              color: "gray.500",
            }}
          >
            Recenly Scanned Projects
          </Text>

          <Button
            variant="ghost"
            color="accent"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => history.push("/projects")}
          >
            View All
          </Button>
        </HStack>

        {isLoading ? (
          <Loader />
        ) : projectList.length === 0 ? (
          <Flex
            w="100%"
            h="100%"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={`${assetsURL}common/add_project_icon.svg`}
              height="80px"
              width="95px"
              mb={5}
            />
            <Text>
              You have not made any scans yet. Please initiate a scan by
              clicking on Add Project
            </Text>
          </Flex>
        ) : (
          projectList.map((project) =>
            changeView ? (
              <HStack
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                py={1}
                px={5}
                borderRadius={10}
                bg="white"
                mt={2}
                cursor={"pointer"}
                onClick={() =>
                  history.push(
                    `/${project.scan_type}s/${project.scan_id}/${project.scan_details.project_id}`
                  )
                }
              >
                <HStack spacing={5} w="calc(55% - 110px)">
                  <Image
                    src={getProjectTypeIconUrl(
                      project.scan_type,
                      project.scan_details.project_url || "",
                      project.scan_details.contract_platform || "",
                      project.scan_details.contract_chain || ""
                    )}
                    height="40px"
                    width="40px"
                  />
                  <VStack
                    justifyContent="center"
                    alignItems="flex-start"
                    textAlign="left"
                    spacing={0}
                    w="calc(100% - 50px)"
                  >
                    <Text
                      sx={{
                        fontSize: "sm",
                        fontWeight: 600,
                      }}
                      w="100%"
                      isTruncated={true}
                    >
                      {project.scan_details.project_name ||
                        project.scan_details.contractname ||
                        ""}
                    </Text>
                    <Text
                      sx={{
                        fontSize: "xs",
                        fontWeight: 500,
                      }}
                      color="gray.400"
                      w="100%"
                      isTruncated={true}
                    >
                      {project.scan_details.project_url ||
                        project.scan_details.contract_address ||
                        ""}
                    </Text>
                  </VStack>
                </HStack>

                <Box w="40%">
                  <VulnerabilityDistribution
                    issueSeverityDistribution={
                      project.scan_details.multi_file_scan_summary
                        .issue_severity_distribution
                    }
                    view="scans"
                    showLabel={false}
                  />
                </Box>
                <SolidityScoreProgress
                  score={
                    fillScore
                      ? project.scan_details.multi_file_scan_summary.score_v2
                      : "0"
                  }
                  size={"65px"}
                  thickness={"7px"}
                  fontSize={"12px"}
                  padding={1}
                />
              </HStack>
            ) : (
              <VStack
                justifyContent="flex-start"
                alignItems="flex-start"
                p={[5, 7]}
                bg="white"
                mt={4}
                w="100%"
                spacing={7}
                borderRadius={10}
              >
                <HStack justifyContent="space-between" w="100%">
                  <VStack
                    justifyContent="center"
                    alignItems="flex-start"
                    textAlign="left"
                    spacing={0}
                    w="calc(100% - 50px)"
                  >
                    <Text
                      sx={{
                        fontSize: "sm",
                        fontWeight: 600,
                      }}
                      w="100%"
                      isTruncated={true}
                    >
                      {capitalize(
                        project.scan_details.project_name ||
                          project.scan_details.contractname ||
                          ""
                      )}
                    </Text>
                    <Text
                      sx={{
                        fontSize: "xs",
                        fontWeight: 500,
                      }}
                      color="gray.400"
                      w="100%"
                      isTruncated={true}
                    >
                      {project.scan_details.project_url ||
                        project.scan_details.contract_address ||
                        ""}
                    </Text>
                  </VStack>
                  <Image
                    src={getProjectTypeIconUrl(
                      project.scan_type,
                      project.scan_details.project_url || "",
                      project.scan_details.contract_platform || "",
                      project.scan_details.contract_chain || ""
                    )}
                    height="40px"
                    width="40px"
                  />
                </HStack>
                {project.scan_details.multi_file_scan_status ===
                  "scan_done" && (
                  <Text
                    color={"#3300FF"}
                    textAlign={"left"}
                    fontSize="lg"
                    fontWeight={700}
                  >
                    {project.scan_details.multi_file_scan_summary.score_v2}
                    <Box as={"span"} color="gray.500" fontSize={"sm"}>
                      /100
                    </Box>
                  </Text>
                )}

                <VulnerabilityDistribution
                  issueSeverityDistribution={
                    project.scan_details.multi_file_scan_summary
                      .issue_severity_distribution
                  }
                  view="scans"
                />
              </VStack>
            )
          )
        )}
      </Flex>
    </>
  );
};

export default RecentScansList;
