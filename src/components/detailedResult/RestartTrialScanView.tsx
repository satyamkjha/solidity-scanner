import { getAssetsURL } from "helpers/helperFunction";
import React, { useState, useContext, useEffect } from "react";
import { DetailResultContext } from "common/contexts";
import { Flex, VStack, Box, Text, Button, Divider } from "@chakra-ui/react";
import UpgradePackage from "components/upgradePackage";
import { DummyCode } from "./TrialWall";
import { RescanIcon } from "components/icons";

export const RestartTrialScanView: React.FC = () => {
  const assetsURL = getAssetsURL();
  const [gasIssueCount, setGasIssueCount] = useState<number>(0);


  

  const detailResultContextValue = useContext(DetailResultContext);
  const issues = detailResultContextValue?.issues ?? null;
  const setFiles = detailResultContextValue?.setFiles ?? null;
  const scanSummary = detailResultContextValue?.scanSummary;
  const openIssueIndex = detailResultContextValue?.openIssueIndex;
  const setOpenIssueIndex =
    detailResultContextValue?.setOpenIssueIndex ?? (() => {});

  useEffect(() => {
    if (scanSummary && scanSummary.issue_severity_distribution.gas) {
      setGasIssueCount(scanSummary.issue_severity_distribution.gas);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewGasIssue = () => {
    const gasIssuesIndex =
      issues &&
      issues.findIndex(
        (issue) => issue.template_details.issue_severity === "gas"
      );
    if (issues && setFiles && gasIssuesIndex && gasIssuesIndex !== -1) {
      const expandedIssues = openIssueIndex
        ? [gasIssuesIndex, ...openIssueIndex]
        : [gasIssueCount];
      setOpenIssueIndex(expandedIssues);
      setFiles({
        bug_id:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].bug_id,
        issue_id: issues[gasIssuesIndex].issue_id,
        bug_hash:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].bug_hash,
        bug_status:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].bug_status,
        findings:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].findings,
        description_details:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0]
            .description_details,
        template_details: issues[gasIssuesIndex].template_details,
        comment:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0].comment,
        issue_description:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0]
            .issue_description,
        issue_remediation:
          issues[gasIssuesIndex].metric_wise_aggregated_findings[0]
            .issue_remediation,

        wait_to_scroll: 1000,
      });
    }
  };
  return (
    <Flex
      w="100%"
      sx={{ flexDir: ["column", "column", "column"] }}
      position="relative"
      h="70vh"
      border="1px solid #DADADA"
      borderRadius={20}
      overflow="hidden"
    >
      <VStack
        borderRadius={20}
        w={"100%"}
        alignItems="flex-start"
        spacing={5}
        px={4}
      >
        <Box
          sx={{
            w: "100%",
            position: "sticky",
            top: 8,
          }}
        >
          <DummyCode />
        </Box>
      </VStack>

      <Flex
        w="100%"
        h="100%"
        borderRadius={20}
        position="absolute"
        sx={{
          backdropFilter: "blur(6px)",
        }}
        p={8}
        bg="rgba(255,255,255,0.3)"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          border="1px solid #DADADA"
          borderRadius={20}
        >
          <Flex
            w="100%"
            h="65%"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
          >
            <Text
              textAlign={"center"}
              fontWeight={700}
              fontSize="lg"
              color="black"
            >
              Lorem ipsum dolor sit amet
            </Text>
            <Text
              mt={3}
              textAlign={"center"}
              w={["100%", "100%", "100%", "80%"]}
              fontWeight={300}
              fontSize="sm"
              color="detail"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla leo
              viverra semper platea quis nibh lectus cursus. Neque sem iaculis
              augue sit egestas vivamus massa.
            </Text>
            <Button mt={10} variant="brand" width="250px">
              Unlock Details
            </Button>
          </Flex>
          <Flex
            w="100%"
            h="35%"
            borderTop="1px solid #DADADA"
            alignItems="center"
            justifyContent="center"
            flexDir="row"
          >
            <VStack onClick={() => {}} w="25%" spacing={2}>
              <RescanIcon size={80} />
              <Text
                fontFamily="monospace"
                textAlign={"center"}
                fontWeight={700}
                fontSize="md"
                color="#323B4B"
              >
                RESCAN
              </Text>
            </VStack>
            <Divider
              orientation="vertical"
              border="1px solid #DADADA"
              height="80%"
            />
            <VStack
              alignItems="flex-start"
              textAlign="left"
              w="75%"
              px={10}
              spacing={2}
            >
              <Text w={"100%"} fontWeight={700} fontSize="lg" color="black">
                Rescan Project
              </Text>
              <Text
                mt={3}
                w={"100%"}
                fontWeight={300}
                fontSize="sm"
                color="detail"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                leo viverra semper platea quis nibh lectus cursus. Neque sem
                iaculis augue sit egestas vivamus massa.
              </Text>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
