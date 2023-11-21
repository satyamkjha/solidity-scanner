import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Image,
  Link,
  HStack,
  VStack,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { ThreatScoreMeter } from "components/threatScoreMeter";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaEllipsisV } from "react-icons/fa";
import PaginationNav from "components/common/PaginationNav";
import { useLocation } from "react-router-dom";
import { RecentQSItem, Pagination, Page } from "common/types";
import { API_PATH } from "helpers/routeManager";
import API from "helpers/api";
import { useConfig } from "hooks/useConfig";
import {
  getAssetsURL,
  getContractBlockchainId,
  getContractBlockChainLogoUrl,
} from "helpers/helperFunction";
import { blockScans, contractChain } from "common/values";
import Loader from "components/styled-components/Loader";
import QSApiBanner from "./QSApiBanner";

export default function RecentScans() {
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const ref = query.get("ref");
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: 1,
    perPageCount: 10,
  });
  const [recentScans, setRecentScans] = useState<RecentQSItem[]>([]);
  const [isRecentScansLoading, setIsRecentScansLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (ref) {
      runRecentQuickScan(ref);
    } else {
      const refSession = sessionStorage.getItem("ref");
      runRecentQuickScan(refSession);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runRecentQuickScan = async (
    ref: string | null,
    page: number = 1,
    perPageCount: number = pagination.perPageCount
  ) => {
    setIsRecentScansLoading(true);
    let api_url = `${API_PATH.API_GET_LATEST_QS}?page=${page}&per_page=${perPageCount}`;
    if (ref) {
      api_url = api_url + `&ref=${ref}`;
    }
    const { data } = await API.get<{ data: RecentQSItem[]; page: Page }>(
      api_url
    );
    if (data) {
      setRecentScans(data.data);
      if (!pagination.totalPages)
        setPagination({ ...pagination, totalPages: data.page.total_pages });
    }
    setIsRecentScansLoading(false);
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, pageNo: page });
    runRecentQuickScan(ref, page);
  };

  return (
    <>
      <QSApiBanner />

      <Heading mt={20} as="h1" fontSize="3xl" mb={4}>
        Recent Scanned
        <Box ml={2} as="span" color="#3300FF">
          Contracts
        </Box>{" "}
      </Heading>

      <Box
        w={"100%"}
        borderRadius={15}
        p={[0, 0, 5]}
        mt={[0, 0, 10]}
        background={["#FFFFFF", "#FFFFFF", "#FAFBFC"]}
        display="flex"
        flexDir={"column"}
        alignItems={["center", "center", "center", "flex-start"]}
        justifyContent={"flex-start"}
      >
        <HStack
          justifyContent="flex-start"
          alignItems="flex-start"
          w="100%"
          px={[0, 0, 0, 6]}
          py={0}
          ml={[0, 0, 20, 2]}
          spacing={4}
          display={["none", "none", "flex"]}
        >
          <Text fontWeight={600} textAlign={"left"} w={"30%"} fontSize="sm">
            Contract Address
          </Text>
          <Text fontWeight={600} textAlign={"left"} w={"10%"} fontSize="sm">
            Security Score
          </Text>
          <Text fontWeight={600} textAlign={"left"} w={"20%"} fontSize="sm">
            Blockchain
          </Text>
          <Text fontWeight={600} textAlign={"left"} w={"15%"} fontSize="sm">
            ThreatScore
          </Text>
          <Text fontWeight={600} textAlign={"left"} w={"25%"} fontSize="sm">
            Actions
          </Text>
        </HStack>
        <Box
          w={"100%"}
          borderRadius={15}
          p={5}
          mt={5}
          background={" #FFFFFF "}
          display="flex"
          flexDir={"column"}
          alignItems={["flex-start", "flex-start", "flex-start", "center"]}
          justifyContent={"center"}
        >
          <VStack
            width={"100%"}
            justifyContent="flex-start"
            alignItems={"flex-start"}
            spacing={4}
          >
            {isRecentScansLoading && !recentScans.length ? (
              <Flex w={"100%"} alignItems={"center"} justifyContent="center">
                <Loader />
              </Flex>
            ) : (
              <Box w="100%" px={[0, 0, 0, 4]} position={"relative"}>
                {recentScans.map((item: any, index: number) => (
                  <>
                    <HStack
                      justifyContent="flex-start"
                      alignItems="center"
                      w="100%"
                      spacing={[5, 5, 5, 6]}
                    >
                      {!isDesktopView && (
                        <Image
                          display={["block", "block", "none"]}
                          height={"20px"}
                          width={"20px"}
                          src={`${assetsURL}blockscan/${item.contract_platform}.svg`}
                        />
                      )}
                      <Tooltip label={item.contract_address}>
                        <Text
                          color={"#8A94A6"}
                          textAlign={"left"}
                          w={["50%", "50%", "30%"]}
                          fontSize="sm"
                          isTruncated
                        >
                          {item.contract_address}
                        </Text>
                      </Tooltip>
                      <Text
                        color={"#3300FF"}
                        textAlign={"left"}
                        w={["20%", "20%", "10%"]}
                        fontSize="md"
                        fontWeight={700}
                      >
                        {item.score_v2}
                        <Box as={"span"} color="gray.500" fontSize={"xs"}>
                          /100
                        </Box>
                      </Text>
                      <HStack
                        display={["none", "none", "flex"]}
                        w={"20%"}
                        justifyContent="flex-start"
                        alignItems={"center"}
                        spacing={3}
                      >
                        <Image
                          height={"20px"}
                          width={"20px"}
                          src={`${assetsURL}${getContractBlockChainLogoUrl(
                            item.contract_platform,
                            item.contract_chain
                          )}.svg`}
                        />
                        <Tooltip label={blockScans[item.contract_platform]}>
                          <Text
                            color={"#8A94A6"}
                            textAlign={"left"}
                            fontSize="sm"
                            isTruncated
                          >
                            {item.contract_platform === "buildbear"
                              ? "Buildbear"
                              : contractChain[
                                  getContractBlockchainId(
                                    item.contract_platform,
                                    item.contract_chain
                                  )
                                ].blockchainName}
                          </Text>
                        </Tooltip>
                      </HStack>
                      <Flex w={"15%"} pt={3} pb={4}>
                        {isDesktopView ? (
                          <ThreatScoreMeter
                            percentage={Math.round(item.threat_score)}
                            diameter={85}
                            strokeWidth={4}
                            fontSize="md"
                            subtleFontSize="xx-small"
                            textMarginTop={-5}
                          />
                        ) : (
                          <Text
                            textAlign={"left"}
                            fontSize="md"
                            fontWeight={700}
                            pr={2}
                          >
                            {Math.round(item.threat_score)}
                            <Box as={"span"} color="gray.500" fontSize={"xs"}>
                              /100
                            </Box>
                          </Text>
                        )}
                      </Flex>
                      <Flex
                        display={["none", "none", "none", "flex"]}
                        w={"25%"}
                        justifyContent="flex-start"
                        alignItems={"center"}
                        ml={4}
                      >
                        <Link
                          variant="subtle-without-underline"
                          href={item.scanner_reference_url}
                          isExternal
                        >
                          <Button
                            fontWeight={100}
                            fontSize={13}
                            height={9}
                            borderColor="#000000"
                            variant={"outline"}
                            color="#000000"
                          >
                            View Scan
                          </Button>
                        </Link>
                        <Link href={item.contract_url} isExternal ml="8">
                          <HStack>
                            <Text
                              color={"#323B4B"}
                              textAlign={"left"}
                              fontSize="sm"
                            >
                              View Contract
                            </Text>
                            <ExternalLinkIcon color={"#323B4B"} />
                          </HStack>
                        </Link>
                      </Flex>
                      <Menu isLazy>
                        <MenuButton
                          display={["block", "block", "block", "none"]}
                          aria-label="Options"
                        >
                          <FaEllipsisV color={"#8A94A6"} />
                        </MenuButton>
                        <MenuList p={2}>
                          <Link href={item.scanner_reference_url} isExternal>
                            <MenuItem>View Scan</MenuItem>
                          </Link>
                          <Divider my={1} />
                          <Link href={item.contract_url} isExternal>
                            <MenuItem>View Contract</MenuItem>
                          </Link>
                        </MenuList>
                      </Menu>
                    </HStack>
                    {index !== recentScans.length - 1 && <Divider />}
                  </>
                ))}
                {isRecentScansLoading && (
                  <Flex
                    w={"100%"}
                    h={"100%"}
                    position={"absolute"}
                    top={0}
                    left={0}
                    alignItems={"center"}
                    justifyContent="center"
                    sx={{
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <Loader />
                  </Flex>
                )}
              </Box>
            )}
          </VStack>
        </Box>
        <Flex
          w={"100%"}
          alignItems={"center"}
          justifyContent="center"
          mt={10}
          mb={6}
        >
          {pagination.totalPages && (
            <PaginationNav
              currentPage={pagination.pageNo}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Flex>
      </Box>
    </>
  );
}
