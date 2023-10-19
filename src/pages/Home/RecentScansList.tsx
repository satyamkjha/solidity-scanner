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
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { getAssetsURL, getProjectType } from "helpers/helperFunction";
import VulnerabilityDistribution from "components/vulnDistribution";
import { useHistory } from "react-router-dom";
import { capitalize, logout } from "common/functions";
import { BiPlug, BiUser, BiPowerOff } from "react-icons/bi";
import { ProfileIconOne } from "components/icons";
import { Profile } from "common/types";
import { useAllScans } from "hooks/useAllScans";
import SolidityScoreProgress from "components/common/SolidityScoreProgress";

const RecentScansList: React.FC = () => {
  const assetsURL = getAssetsURL();
  const history = useHistory();

  const { data: projects } = useAllScans({
    pageNo: 1,
    perPageCount: 4,
  });

  const [changeView] = useMediaQuery("(min-width: 650px)");

  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      p={3}
      flexDirection="column"
      bgColor="bg.subtle"
      w="100%"
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
            textAlign: "center",
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
      {projects &&
        projects.data.map((project) =>
          changeView ? (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              py={2}
              px={5}
              borderRadius={10}
              bg="white"
              mt={4}
            >
              <HStack spacing={5} w="calc(55% - 110px)">
                <Image
                  src={`${assetsURL}${
                    project.scan_type === "project"
                      ? "icons/integrations/" +
                        getProjectType(project.scan_details.project_url || "")
                      : "blockscan/" + project.scan_details.contract_platform
                  }.svg`}
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
              </HStack>
              <Box w="40%">
                <VulnerabilityDistribution
                  {...project.scan_details.multi_file_scan_summary
                    .issue_severity_distribution}
                  view="scans"
                />
              </Box>
              <SolidityScoreProgress
                score={project.scan_details.multi_file_scan_summary.score_v2}
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
                  src={`${assetsURL}${
                    project.scan_type === "project"
                      ? "icons/integrations/" +
                        getProjectType(project.scan_details.project_url || "")
                      : "blockscan/" + project.scan_details.contract_platform
                  }.svg`}
                  height="40px"
                  width="40px"
                />
              </HStack>
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
              <VulnerabilityDistribution
                {...project.scan_details.multi_file_scan_summary
                  .issue_severity_distribution}
                view="scans"
              />
            </VStack>
          )
        )}
    </Flex>
  );
};

export default RecentScansList;
