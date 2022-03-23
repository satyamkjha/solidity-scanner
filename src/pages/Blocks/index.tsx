import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  Progress,
  Spinner,
  HStack,
  Image,
} from "@chakra-ui/react";

import { LogoIcon, BlockCredit, ScanErrorIcon } from "components/icons";
import Score from "components/score";
import VulnerabilityDistribution from "components/vulnDistribution";

import { Scan } from "common/types";
import { timeSince } from "common/functions";
import { useBlocks } from "hooks/useBlocks";
import { useProfile } from "hooks/useProfile";

const Blocks: React.FC = () => {
  const { data, isLoading, refetch } = useBlocks();
  const { data: profileData } = useProfile();
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const refetchTillScanComplete = () => {
      if (
        data &&
        data.scans.some(({ scan_status }) => scan_status !== "scan_done")
      ) {
        intervalId = setInterval(async () => {
          await refetch();
          if (
            data &&
            data.scans.every(({ scan_status }) => scan_status === "scan_done")
          ) {
            clearInterval(intervalId);
          }
        }, 3000);
      }
    };

    refetchTillScanComplete();
    return () => {
      clearInterval(intervalId);
    };
  }, [data, refetch]);

  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: 8,
        mx: [0, 0, 4],
        my: 4,
        minH: "78vh",
      }}
    >
      <Flex
        sx={{
          w: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          my: 4,
        }}
      >
        <Flex alignItems="center">
          <Text sx={{ color: "subtle", fontWeight: 600 }}> BLOCKS</Text>
          <Flex alignItems="center" ml={2}>
            <BlockCredit />
            <Text fontSize="xl" fontWeight="700" ml={2}>
              {profileData?.credits}
            </Text>
            <Text
              ml={2}
              mt="2px"
              color={(profileData?.credits || 0) > 0 ? "low" : "high"}
            >
              contract scan credits
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {isLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : data?.scans.length === 0 ? (
        <Flex
          w="100%"
          h="70vh"
          direction="column"
          justifyItems="center"
          alignItems="center"
          justifyContent="center"
        >
          <Box mb={2} opacity={0.5}>
            <LogoIcon size={50} />
          </Box>
          <Text fontSize="sm">No blocks started yet.</Text>
          <Link to="/home">
            <Button variant="brand" width="200px" my={8}>
              Start a scan
            </Button>
          </Link>
        </Flex>
      ) : (
        <Flex
          sx={{
            flexWrap: "wrap",
            justifyItems: ["center", "center", "space-around"],
          }}
        >
          {[...(data?.scans || [])]
            .sort((scan1, scan2) =>
              new Date(scan1._updated) < new Date(scan2._updated) ? 1 : -1
            )
            .map((scan) => (
              <BlockCard key={scan.scan_id} scan={scan} />
            ))}
        </Flex>
      )}
    </Box>
  );
};

const BlockCard: React.FC<{ scan: Scan }> = ({ scan }) => {
  const {
    scan_status,
    project_name,
    scan_id,
    scan_summary,
    _updated,
    contract_address,
    contractname,
    contract_platform,
  } = scan;
  return (
    <Link to={scan_status === "scan_done" ? `/blocks/${scan_id}` : "/blocks"}>
      <Flex
        sx={{
          cursor: scan_status === "scan_done" ? "pointer" : "not-allowed",
          flexDir: "column",
          justifyContent: "space-between",
          w: "320px",
          h: "260px",
          my: 4,
          mr: 8,
          borderRadius: 15,
          bg: "white",
          transition: "0.3s box-shadow",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)",
          _hover: {
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box p={5}>
          <Text sx={{ w: "100%", color: "subtle" }}>{contractname}</Text>
          <Text sx={{ w: "100%" }} isTruncated>
            {project_name || contract_address}
          </Text>
          <Text sx={{ fontSize: "xs", color: "subtle" }}>
            Last scanned {timeSince(new Date(_updated))}
          </Text>
        </Box>
        {scan_status === "scan_done" ? (
          <Flex width={"100%"} flexDir="column" height="fit-content" p={5}>
            <Flex
              width={"100%"}
              flexDir="row"
              justifyContent={"space-between"}
              height="fit-content"
              mb={7}
            >
              <Score score={scan_summary?.score || "0"} />
              <HStack
                h="fit-content"
                py={2}
                px={4}
                borderRadius={36}
                backgroundColor="#FAFBFC"
                cursor="pointer"
                boxShadow="0px 1px 1px rgba(0, 0, 0, 0.09)"
              >
                <Image
                  src={
                    contract_platform === "polygonscan"
                      ? "/polygon.svg"
                      : contract_platform === "etherscan"
                      ? "/etherscan.svg"
                      : "/bscscan.svg"
                  }
                  alt="Product screenshot"
                  h={"20px"}
                  w={"20px"}
                />
                <Text fontWeight={"700"} width={"100%"} as="p" fontSize="14px">
                  {contract_platform}
                </Text>
              </HStack>
            </Flex>
            <VulnerabilityDistribution
              critical={
                scan_summary?.issue_severity_distribution?.critical || 0
              }
              high={scan_summary?.issue_severity_distribution?.high || 0}
              medium={scan_summary?.issue_severity_distribution?.medium || 0}
              low={scan_summary?.issue_severity_distribution?.low || 0}
              informational={
                scan_summary?.issue_severity_distribution?.informational || 0
              }
            />
          </Flex>
        ) : scan_status === "download_failed" ||
          scan_status ===
            "Download_failed, either invalid URL / or Github token expired, please re-integrate" ? (
          <Box
            sx={{
              p: 5,
              pl: 10,
              backgroundColor: "high-subtle",
              position: "relative",
              borderBottomRadius: 15,
            }}
          >
            <Box position="absolute" transform="translate3d(-30px, -34px,0)">
              <ScanErrorIcon size={28} />
            </Box>
            <Text sx={{ fontSize: "xs", color: "#FF5630", h: "46px" }}>
              {"This scan has failed, please contact support"}
            </Text>
          </Box>
        ) : (
          <Box p={5}>
            <Flex
              sx={{
                display: "inline-flex",
                bg: "bg.subtle",
                alignItems: "center",
                p: 2,
                mb: 2,
                borderRadius: 15,
              }}
            >
              <LogoIcon size={15} />
              <Text mx={2} fontSize="sm">
                Scan in progress
              </Text>
            </Flex>
            <Progress value={20} isIndeterminate size="xs" />
          </Box>
        )}
      </Flex>
    </Link>
  );
};

export default Blocks;
