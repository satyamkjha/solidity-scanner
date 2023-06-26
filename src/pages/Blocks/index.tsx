import React, { useEffect, useState } from "react";
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
  useMediaQuery,
  Tooltip,
} from "@chakra-ui/react";

import { LogoIcon, BlockCredit, ScanErrorIcon } from "components/icons";
import Score from "components/score";
import VulnerabilityDistribution from "components/vulnDistribution";

import { Page, Pagination, Scan } from "common/types";
import { timeSince } from "common/functions";
import { useBlocks } from "hooks/useBlocks";
import { useProfile } from "hooks/useProfile";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import Loader from "components/styled-components/Loader";

const Blocks: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1920px)");

  const [page, setPage] = useState<Page>();
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: 1,
    perPageCount: isDesktopView ? 20 : 12,
  });
  const [hasMore, setHasMore] = useState(true);

  const { data: scans, isLoading, refetch } = useBlocks(pagination);
  const { data: profileData } = useProfile();
  const [scanList, setScanList] = useState<Scan[]>();

  useEffect(() => {
    if (scans) {
      let sList =
        scanList && pagination.pageNo > 1
          ? scanList.concat(scans.data)
          : scans.data;
      setScanList(sList);
      setPage(scans.page);
    }
  }, [scans, refetch]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const refetchTillScanComplete = () => {
      if (
        scanList &&
        scanList.some(({ scan_status }) => scan_status !== "scan_done")
      ) {
        intervalId = setInterval(async () => {
          await fetchScan();
          if (
            scanList &&
            scanList.every(({ scan_status }) => scan_status === "scan_done")
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
  }, [scanList]);

  useEffect(() => {
    refetch();
  }, [pagination]);

  const fetchScan = async () => {
    scanList?.forEach(async (scan, index) => {
      if (
        scan.multi_file_scan_status === "scanning" ||
        scan.multi_file_scan_status === "initialised"
      ) {
        const { data } = await API.post<{
          scan_report: Scan;
          is_latest_scan: boolean;
        }>(API_PATH.API_GET_SCAN_DETAILS, { scan_id: scan.scan_id });
        let scanL = [...scanList];
        data.scan_report._updated = scan._updated;
        scanL[index] = data.scan_report;
        setScanList(scanL);
      }
    });
  };
  const fetchMoreBlocks = async () => {
    if (page && pagination.pageNo >= page.total_pages) {
      setHasMore(false);
      return;
    }
    setPagination({
      pageNo: pagination.pageNo + 1,
      perPageCount: pagination.perPageCount,
    });
  };

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: [0, 0, 4],
        mx: [0, 0, 4],
        my: 4,
        minH: "78vh",
      }}
      boxSizing={"border-box"}
    >
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          my: 4,
        }}
        w="100%"
      >
        <Flex alignItems="center">
          <Text sx={{ color: "subtle", fontWeight: 600, ml: 4 }}> BLOCKS</Text>
          <Flex alignItems="center" ml={2} display={["none", "none", "flex"]}>
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

      {!scanList ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Loader />
        </Flex>
      ) : scanList.length === 0 ? (
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
          w="100%"
          boxSizing={"border-box"}
        >
          <InfiniteScroll
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
            dataLength={scanList.length}
            next={fetchMoreBlocks}
            hasMore={hasMore}
            loader={
              <Box w={"100%"} align="center">
                <Loader />
              </Box>
            }
            scrollableTarget="pageScroll"
          >
            {[...(scanList || [])]
              // .sort((scan1, scan2) =>
              //   new Date(scan1._updated) < new Date(scan2._updated) ? 1 : -1
              // )
              .map((scan) => (
                <BlockCard key={scan.scan_id} scan={scan} />
              ))}
          </InfiniteScroll>
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
    multi_file_scan_status,
    multi_file_scan_summary,
    multi_file_scan_details,
    project_id,
  } = scan;

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const history = useHistory();

  return (
    <Flex
      sx={{
        cursor:
          multi_file_scan_status === "scan_done" ? "pointer" : "not-allowed",
        flexDir: "column",
        justifyContent: "space-between",
        h: "260px",
        borderRadius: 15,
        bg: "white",
        transition: "0.3s box-shadow",
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)",
        _hover: {
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
      maxWidth="500px"
      my={4}
      mx={4}
      boxSizing={"border-box"}
      w={["90%", "95%", "45%", "320px"]}
      onClick={() => {
        if (multi_file_scan_status === "scan_done") {
          history.push(`/blocks/${scan_id}/${project_id}`);
        } else {
          history.push("/blocks");
        }
      }}
    >
      <Box p={5}>
        <Tooltip label={contractname} fontSize="md" placement="top-start">
          <Text sx={{ w: "100%", color: "subtle" }} isTruncated>
            {contractname}
          </Text>
        </Tooltip>
        <Text sx={{ w: "100%" }} isTruncated>
          {project_name || contract_address}
        </Text>
        <Text sx={{ fontSize: "xs", color: "subtle" }}>
          Last scanned {timeSince(new Date(_updated))}
        </Text>
      </Box>
      {multi_file_scan_status === "scan_done" ? (
        <Flex width={"100%"} flexDir="column" height="fit-content" p={5}>
          <Flex
            width={"100%"}
            flexDir="row"
            justifyContent={"space-between"}
            height="fit-content"
            mb={7}
          >
            <Score
              score={
                multi_file_scan_summary?.score_v2 ||
                (parseFloat(multi_file_scan_summary?.score) * 20)
                  .toFixed(2)
                  .toString() ||
                "0"
              }
            />
            {/* <HStack
                h="fit-content"
                py={1}
                px={4}
                borderRadius={36}
                backgroundColor="#FAFBFC"
                cursor="pointer"
                boxShadow="0px 1px 1px rgba(0, 0, 0, 0.09)"
              > */}
            <Image
              mx={3}
              src={`${assetsURL}blockscan/${contract_platform}.svg`}
              alt="Product screenshot"
              h={"40px"}
              w={"40px"}
            />
            {/* <Text fontWeight={"700"} width={"100%"} as="p" fontSize="14px">
                  {contract_platform}
                </Text> */}
            {/* </HStack> */}
          </Flex>
          <VulnerabilityDistribution
            critical={
              multi_file_scan_summary?.issue_severity_distribution?.critical ||
              0
            }
            high={
              multi_file_scan_summary?.issue_severity_distribution?.high || 0
            }
            medium={
              multi_file_scan_summary?.issue_severity_distribution?.medium || 0
            }
            low={multi_file_scan_summary?.issue_severity_distribution?.low || 0}
            informational={
              multi_file_scan_summary?.issue_severity_distribution
                ?.informational || 0
            }
            gas={multi_file_scan_summary?.issue_severity_distribution.gas || 0}
          />
        </Flex>
      ) : multi_file_scan_status === "scanning" ||
        multi_file_scan_status === "initialised" ? (
        <Box p={5} w="100%">
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
      ) : (
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
            {scan_status === "download_failed"
              ? "This scan has failed, lost credit will be reimbursed in a few minutes. Please contact support"
              : scan_status}
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default Blocks;
