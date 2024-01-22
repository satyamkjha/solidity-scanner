import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  useMediaQuery,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
// import Lottie from "lottie-react";
import API from "helpers/api";
import { Page, Pagination, ScanObj } from "common/types";
import { useProfile } from "hooks/useProfile";
import InfiniteScroll from "react-infinite-scroll-component";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import { useUserRole } from "hooks/useUserRole";
import { onSnapshot, doc, Unsubscribe } from "firebase/firestore";
import { db } from "helpers/firebase";
import {
  getFeatureGateConfig,
  getAssetsURL,
  // getAssetsFromS3,
} from "helpers/helperFunction";
import { useAllScans } from "hooks/useAllScans";
import ScanCardDuplicate from "components/cards/ScanCardDuplicate";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi";
import { RxDoubleArrowDown } from "react-icons/rx";
import { debounce } from "lodash";
import RadioButton from "components/styled-components/RadioButton";
import { AddProject } from "components/common/AddProject";

const ScansDuplicate: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1920px)");
  const [isMobileView] = useMediaQuery("(max-width: 500px)");
  const { role } = useUserRole();
  const assetsURL = getAssetsURL();
  const [queryTerm, setQueryTerm] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [filterParam, setFilterParam] = useState<
    "gitlab" | "github" | "bitbucket" | "block" | "File Scan" | ""
  >();
  const [paramType, setParamType] = useState<
    "gitlab" | "github" | "bitbucket" | "block" | "File Scan" | ""
  >();
  const [page, setPage] = useState<Page>();
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: 1,
    perPageCount: isDesktopView ? 20 : 12,
  });
  const [hasMore, setHasMore] = useState(true);

  const { data: projects, refetch } = useAllScans(
    pagination,
    queryTerm,
    filterParam
  );
  const [projectList, setProjectList] = useState<ScanObj[]>();
  const [projectsMonitored, setProjectsMonitored] = useState(0);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [projectsInScanning, setProjectsInScanning] = useState<
    {
      scanId: string;
      scanStatus: string;
    }[]
  >([]);
  const [projectsIdsInScanning, setProjectsIdsInScanning] = useState<string[]>(
    []
  );

  // const [ssIconAnimation, setSsIconAniamtion] = useState<any>(null);

  // useEffect(() => {
  //   getSsIconAnimationFromUrl();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const getSsIconAnimationFromUrl = async () => {
  //   const jsonData = await getAssetsFromS3("icons/ss_icon_animation.json");
  //   setSsIconAniamtion(jsonData);
  // };

  const { data: profileData, refetch: refetchProfile } = useProfile(true);

  useEffect(() => {
    if (profileData) {
      setProjectsMonitored(profileData.projects_remaining);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData, refetchProfile]);

  useEffect(() => {
    if (projects) {
      let pList =
        projectList && pagination.pageNo > 1
          ? projectList.concat(projects.data)
          : projects.data;
      const uniqueProjectList = pList.filter(
        (project, index, self) =>
          index === self.findIndex((p) => p.scan_id === project.scan_id)
      );
      setIsProjectsLoading(false);
      setProjectList(uniqueProjectList);
      setPage(projects.page);
      if (pagination.pageNo < projects.page.total_pages) setHasMore(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const refetchTillScanComplete = () => {
      if (
        projectList &&
        projectList.some(
          ({ scan_details }) =>
            scan_details.multi_file_scan_status === "scanning" ||
            scan_details.multi_file_scan_status === "initialised"
        )
      ) {
        if (getFeatureGateConfig().event_consumption_enabled) {
          const scanningScanIds: string[] = projectList
            .filter((project) =>
              ["initialised", "downloaded", "scanning"].includes(
                project.scan_details.multi_file_scan_status
              )
            )
            .map((project) => {
              return project.scan_details.scan_id;
            });
          setProjectsIdsInScanning(scanningScanIds);
        } else {
          intervalId = setInterval(async () => {
            const { data } = await API.get(
              `${API_PATH.API_GET_PROJECTS_BETA}?page=${1}&per_page=${
                pagination.perPageCount
              }`
            );
            const pList = [
              ...data.data,
              ...projectList.slice(pagination.perPageCount, projectList.length),
            ];
            setProjectList(pList);
            if (
              pList &&
              pList.every(
                ({ _latest_scan }) =>
                  _latest_scan.multi_file_scan_status === "scan_done"
              )
            ) {
              clearInterval(intervalId);
            }
          }, 5000);
        }
      }
    };

    if (projectList) {
      refetchTillScanComplete();
    }
    return () => {
      clearInterval(intervalId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectList]);

  const onSearch = async () => {
    if (searchTerm !== undefined) {
      setIsProjectsLoading(true);
      setPagination({
        pageNo: 1,
        perPageCount: isDesktopView ? 20 : 12,
      });
      setQueryTerm(searchTerm);
    }
  };

  const debouncedSearch = debounce(onSearch, 500);

  useEffect(() => {
    if (paramType !== undefined) {
      setIsProjectsLoading(true);
      setPagination({
        pageNo: 1,
        perPageCount: isDesktopView ? 20 : 12,
      });
      setFilterParam(paramType);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramType]);

  useEffect(() => {
    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const fetchProjectList = async () => {
    if (pagination.pageNo !== 1)
      setPagination({
        pageNo: 1,
        perPageCount: isDesktopView ? 20 : 12,
      });
    else refetch();
  };

  useEffect(() => {
    let listeners: { [docId: string]: Unsubscribe } = {};
    if (projectsIdsInScanning && projectsIdsInScanning.length) {
      projectsIdsInScanning.forEach((scan_id) => {
        listeners[scan_id] = onSnapshot(
          doc(db, "scan_events", scan_id),
          (doc) => {
            if (doc.exists()) {
              const eventData = doc.data();
              if (
                ["scan_done", "download_failed", "scan_failed"].includes(
                  eventData.scan_status
                )
              ) {
                // Unsubscribe and remove the listener
                listeners[scan_id]();
                delete listeners[scan_id];

                fetchProjectList();
              }
              let newProjectsInScanning = projectsInScanning.filter(
                (item) => scan_id !== item.scanId
              );
              setProjectsInScanning([
                ...newProjectsInScanning,
                { scanId: scan_id, scanStatus: eventData.scan_status },
              ]);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      });
    }

    const filteredProjects = projectsInScanning.filter((project) =>
      projectsIdsInScanning.includes(project.scanId)
    );
    setProjectsInScanning(filteredProjects);

    return () => {
      if (listeners)
        Object.values(listeners).forEach((unsubscribe) => unsubscribe());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsIdsInScanning]);

  const fetchMoreProjects = async () => {
    if (page && pagination.pageNo >= page.total_pages) {
      setHasMore(false);
      return;
    }
    setPagination({
      pageNo: pagination.pageNo + 1,
      perPageCount: pagination.perPageCount,
    });
  };

  const updateProjectList = (scan_id: string) => {
    let newProjectList = projectList || [];
    newProjectList = newProjectList.filter((projectItem) => {
      if (projectItem.scan_id === scan_id) return false;
      return true;
    });
    setProjectsMonitored(projectsMonitored - 1);
    setProjectList(newProjectList);
  };

  const paramList: {
    param: "gitlab" | "github" | "bitbucket" | "block" | "File Scan" | "";
    label: string;
  }[] = [
    {
      param: "github",
      label: "Github",
    },
    {
      param: "gitlab",
      label: "Gitlab",
    },
    {
      param: "bitbucket",
      label: "BitBucket",
    },
    {
      param: "block",
      label: "Verified Contracts",
    },
    {
      param: "File Scan",
      label: "Upload Contract",
    },
  ];

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 1.5rem)"],
        h: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: [4, 6, 8, 8],
        mx: [0, 0, 4],
        mb: 4,
        minH: "78vh",
      }}
      boxSizing={"border-box"}
    >
      <Flex
        sx={{
          alignItems: ["center", "center", "flex-start"],
          justifyContent: "flex-start",
          flexDirection: ["column", "column", "row"],
          mb: 4,
        }}
        w={"100%"}
      >
        <Text
          width="100%"
          textAlign="left"
          sx={{ color: "subtle", fontWeight: 600, ml: 4 }}
          ml={[10, 10, 10, 0]}
        >
          PROJECTS
        </Text>
        {profileData ? (
          <Flex
            w={"100%"}
            mt={[5, 5, 0]}
            mr={[0, 0, 4]}
            ml={"auto"}
            justifyContent={"flex-end"}
          >
            <Flex w={["100%", "100%", "500px"]}>
              <InputGroup alignItems="center">
                <InputLeftElement
                  height="48px"
                  width="45px"
                  children={<Search2Icon color={"#A0AEC0"} />}
                />
                <Input
                  placeholder="Search by Project name/Contract address"
                  size="lg"
                  fontSize="sm"
                  bg="white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputRightElement
                  height="48px"
                  w="80px"
                  children={
                    <Menu placement={"bottom-end"} matchWidth>
                      <MenuButton
                        as={Box}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <HStack
                          spacing={2}
                          p={2}
                          w="70px"
                          borderRadius={10}
                          bg="bg.subtle"
                        >
                          {paramType === "" || paramType === undefined ? (
                            <FiFilter
                              color={!paramType ? "#8A94A6" : "#3300ff"}
                              size={20}
                            />
                          ) : (
                            <Image
                              height="25px"
                              width="25px"
                              src={`${assetsURL}icons/integrations/${
                                paramType === "File Scan"
                                  ? "filescan"
                                  : paramType
                              }.svg`}
                            />
                          )}

                          <RxDoubleArrowDown color="#C4C4C4" size={16} />
                        </HStack>
                      </MenuButton>
                      <MenuList
                        sx={{
                          boxShadow:
                            "0px 4px 12px rgba(0, 0, 0, 0.2) !important",
                          _hover: "0px 4px 24px rgba(0, 0, 0, 0.2) !important",
                          px: 6,
                          py: 4,
                          w: ["100%", "320px"],
                          borderRadius: 20,
                        }}
                      >
                        <Text w="100%" textAlign="center" mb={3}>
                          Filter by Project Type
                        </Text>
                        {paramList.map((item) => (
                          <MenuItem
                            _focus={{ backgroundColor: "#FFFFFF" }}
                            _hover={{ backgroundColor: "#FFFFFF" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setParamType(item.param);
                            }}
                            sx={{
                              py: 4,
                              borderBottom: "1px solid #ececec",
                            }}
                            justifyContent="space-between"
                          >
                            {item.label}{" "}
                            <RadioButton isActive={paramType === item.param} />
                          </MenuItem>
                        ))}
                        <HStack w="100%" justifyContent="center">
                          <Button
                            leftIcon={<CloseIcon fontSize="10px" />}
                            fontSize="sm"
                            size="sm"
                            mt={4}
                            variant="ghost"
                            color="accent"
                            onClick={() => setParamType("")}
                          >
                            Clear Filter
                          </Button>
                        </HStack>
                      </MenuList>
                    </Menu>
                  }
                />
              </InputGroup>
            </Flex>
            <Flex ml={4}>
              <AddProject profileData={profileData} />
            </Flex>
          </Flex>
        ) : null}
      </Flex>

      {!projectList || !profileData || isProjectsLoading ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Loader />
        </Flex>
      ) : profileData.projects_remaining === 0 ? (
        <Flex
          w="100%"
          h="70vh"
          direction="column"
          justifyItems="center"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={`${assetsURL}common/add_project_icon.svg`}
            height="80px"
            width="95px"
            mb={5}
          />
          <Text fontSize="sm">No projects started yet.</Text>
          <Link to="/home">
            <Button variant="brand" width={["90%", "250px", "350px"]} my={8}>
              Add a New Project
            </Button>
          </Link>
        </Flex>
      ) : projectList.length === 0 ? (
        <Flex
          w="100%"
          h="70vh"
          direction="column"
          justifyItems="center"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="sm">No projects found matching your query.</Text>
        </Flex>
      ) : (
        <Flex
          alignItems={"row"}
          flexWrap="wrap"
          flexDir={"row"}
          justifyItems={["center", "center", "space-around"]}
          w="100%"
          boxSizing={"border-box"}
          pt={[4, 4, 0]}
          pb={[10, 10, 0]}
        >
          <InfiniteScroll
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              overflow: "hidden",
              boxSizing: "border-box",
              justifyContent: "flex-start",
              padding: isMobileView ? 0 : "1rem",
              paddingRight: 0,
              gap: "2rem",
            }}
            dataLength={projectList.length}
            next={() => fetchMoreProjects()}
            hasMore={hasMore}
            loader={
              <Box w={"100%"}>
                <Loader />
              </Box>
            }
            scrollableTarget="pageScroll"
          >
            {[...(projectList || [])].map((project) => (
              <ScanCardDuplicate
                key={project.scan_id}
                scan={project}
                updateScanList={updateProjectList}
                isViewer={role === "viewer"}
                scanIdsInScanning={projectsIdsInScanning}
                scanInProgress={projectsInScanning}
              />
            ))}
          </InfiniteScroll>
        </Flex>
      )}
    </Box>
  );
};

export default ScansDuplicate;
