import React, { useEffect, useState } from "react";
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
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Page, Pagination, ScanObj } from "common/types";
import { useProfile } from "hooks/useProfile";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "components/styled-components/Loader";
import { useUserRole } from "hooks/useUserRole";
import { getAssetsURL, getTrimmedScanMessage } from "helpers/helperFunction";
import { useAllScans } from "hooks/useAllScans";
import ScanCard from "components/cards/ScanCard";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi";
import { RxDoubleArrowDown } from "react-icons/rx";
import { debounce } from "lodash";
import RadioButton from "components/styled-components/RadioButton";
import { useWebSocket } from "hooks/useWebhookData";
import { inProcessScanStates } from "common/values";
import { AddProject } from "components/common/AddProject";
import InScanModal from "components/modals/InScanModal";

const Scans: React.FC = () => {
  const scanMessageTypes = [
    "scan_initiate",
    "scan_status",
    "scan_complete",
    "insufficient_loc",
    "project_scan_acknowledge",
    "block_scan_acknowledge",
    "delete_block_acknowledge",
    "delete_project_acknowledge",
  ];

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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: projects, refetch: refetchProjects } = useAllScans(
    pagination,
    queryTerm,
    filterParam
  );
  const [insufficientMsg, setInsufficientMsg] = useState<any>();
  const [projectList, setProjectList] =
    useState<{ scanItem: ScanObj; tempScanStatus: string }[]>();
  const [projectsMonitored, setProjectsMonitored] = useState(0);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  const [inScanDetails, setInScanDetails] = useState<any>(null);

  const { messageQueue, updateMessageQueue, setKeepWSOpen } = useWebSocket();
  const toast = useToast();
  const { data: profileData, refetch: refetchProfile } = useProfile(true);

  useEffect(() => {
    if (profileData) {
      setProjectsMonitored(profileData.projects_remaining);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData, refetchProfile]);

  useEffect(() => {
    if (projects) {
      let alteredPlist = projects.data.map((item) => ({
        scanItem: item,
        tempScanStatus:
          item.scan_details.scan_status.length > 25
            ? getTrimmedScanMessage(item.scan_details.scan_status)
            : item.scan_details.scan_status,
      }));

      let pList =
        projectList && pagination.pageNo > 1
          ? projectList.concat(alteredPlist)
          : alteredPlist;
      const uniqueProjectList = pList.filter(
        (project, index, self) =>
          index ===
          self.findIndex(
            (p) =>
              p.scanItem.scan_details.project_id ===
              project.scanItem.scan_details.project_id
          )
      );
      setIsProjectsLoading(false);
      setProjectList(uniqueProjectList);
      setPage(projects.page);
      if (pagination.pageNo < projects.page.total_pages) setHasMore(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

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

  const updateProjectList = (project_id: string) => {
    let newProjectList = projectList || [];
    newProjectList = newProjectList.filter((projectItem) => {
      if (projectItem.scanItem.scan_details.project_id === project_id)
        return false;
      return true;
    });
    setProjectsMonitored(projectsMonitored - 1);
    setProjectList(newProjectList);
  };

  useEffect(() => {
    if (projectList && messageQueue.length > 0) {
      const isMessageTypeIncluded = (msg: any) =>
        scanMessageTypes.includes(msg.type);

      const filteredMessages = messageQueue.filter(isMessageTypeIncluded);
      if (filteredMessages.length === 0) {
        return;
      }

      setProjectList((prevProjectList) => {
        let updatedProjectList = prevProjectList ? [...prevProjectList] : [];
        let tempMsgQueue = [...messageQueue];

        filteredMessages.forEach((msgItem: any) => {
          if (msgItem.type === "scan_status") {
            updatedProjectList = updatedProjectList.map((item) => {
              if (
                item.scanItem.scan_details.project_id ===
                msgItem.payload.project_id
              ) {
                if (msgItem.payload.scan_status === "scan_done") {
                  refetchProjects();
                  onClose();
                  setInScanDetails(null);
                  return {
                    scanItem: {
                      scan_id: msgItem.payload.scan_id,
                      scan_type: msgItem.payload.scan_details.scan_type,
                      scan_details: msgItem.payload.scan_details,
                    },
                    tempScanStatus: msgItem.payload.scan_status,
                  };
                } else if (
                  ["download_failed", "scan_failed"].includes(
                    msgItem.payload.scan_status
                  )
                ) {
                  if (
                    inScanDetails &&
                    msgItem.payload.project_id === inScanDetails.project_id
                  ) {
                    setInScanDetails({
                      ...inScanDetails,
                      scan_state: msgItem.payload.scan_status,
                    });
                  }
                  return {
                    scanItem: {
                      ...item.scanItem,
                      scan_id: msgItem.payload.scan_id,
                      scan_err_message: msgItem.payload.scan_status_err_message,
                    },
                    tempScanStatus: msgItem.payload.scan_status,
                  };
                } else {
                  if (
                    inScanDetails &&
                    msgItem.payload.project_id === inScanDetails.project_id
                  ) {
                    setInScanDetails({
                      ...inScanDetails,
                      scan_state: msgItem.payload.scan_status,
                    });
                  }
                  return {
                    ...item,
                    tempScanStatus: msgItem.payload.scan_status,
                  };
                }
              } else return item;
            });
          } else if (
            ["block_scan_acknowledge", "project_scan_acknowledge"].includes(
              msgItem.type
            )
          ) {
            const scan_type =
              msgItem.type === "block_scan_acknowledge" ? "block" : "project";
            const findIndex = updatedProjectList.findIndex(
              (item) =>
                item.scanItem.scan_details.project_id ===
                msgItem.payload.project_id
            );
            if (findIndex !== -1) {
              updatedProjectList[findIndex] = {
                scanItem: {
                  scan_id: "",
                  scan_type,
                  scan_details: {
                    ...msgItem.payload,
                    multi_file_scan_status: "in_queue",
                    scan_status: "in_queue",
                  },
                },
                tempScanStatus: "in_queue",
              };
            } else {
              updatedProjectList = [
                {
                  scanItem: {
                    scan_id: "",
                    scan_type,
                    scan_details: {
                      ...msgItem.payload,
                      multi_file_scan_status: "in_queue",
                      scan_status: "in_queue",
                    },
                  },
                  tempScanStatus: "in_queue",
                },
                ...updatedProjectList,
              ];
            }
            setInScanDetails({
              project_id: msgItem.payload.project_id,
              scan_state: "in_queue",
              scan_type,
              ...msgItem.payload,
            });
            onOpen();
          } else if (msgItem.type === "scan_initiate") {
            const findIndex = updatedProjectList.findIndex(
              (item) =>
                item.scanItem.scan_details.project_id ===
                msgItem.payload.scan_details.project_id
            );

            if (findIndex !== -1) {
              updatedProjectList[findIndex] = {
                scanItem: {
                  scan_id: msgItem.payload.scan_details.scan_id,
                  scan_type: msgItem.payload.scan_details.scan_type,
                  scan_details: msgItem.payload.scan_details,
                },
                tempScanStatus: msgItem.type,
              };
            } else {
              updatedProjectList = [
                {
                  scanItem: {
                    scan_id: msgItem.payload.scan_details.scan_id,
                    scan_type: msgItem.payload.scan_details.scan_type,
                    scan_details: msgItem.payload.scan_details,
                  },
                  tempScanStatus: msgItem.type,
                },
                ...updatedProjectList,
              ];
            }
            if (msgItem.payload.scan_details.scan_type === "block")
              setInScanDetails({
                project_id: msgItem.payload.scan_details.project_id,
                contract_address: msgItem.payload.scan_details.contract_address,
                contract_platform:
                  msgItem.payload.scan_details.contract_platform,
                contract_url: msgItem.payload.scan_details.contract_url,
                contract_chain: msgItem.payload.scan_details.contract_chain,
                scan_state: msgItem.type,
                scan_type: msgItem.payload.scan_details.scan_type,
              });
            else
              setInScanDetails({
                project_id: msgItem.payload.scan_details.project_id,
                project_url: msgItem.payload.scan_details.project_url,
                project_name: msgItem.payload.scan_details.project_name,
                scan_state: msgItem.type,
                scan_type: msgItem.payload.scan_details.scan_type,
              });
          } else if (msgItem.type === "insufficient_loc") {
            const inScanProjectIndex = updatedProjectList.findIndex(
              (proj) => proj.scanItem.scan_id === msgItem.payload.scan_id
            );
            if (inScanProjectIndex !== -1) {
              const inScanProject = updatedProjectList[inScanProjectIndex];
              setInScanDetails({
                loc: msgItem.payload.loc_required,
                ...inScanProject.scanItem.scan_details,
              });
            }
            setInsufficientMsg(msgItem.payload);
          } else if (
            msgItem.type === "delete_block_acknowledge" ||
            msgItem.type === "delete_project_acknowledge"
          ) {
            toast({
              title: msgItem.payload.payload.message,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
          tempMsgQueue = tempMsgQueue.filter(
            (msg) => msg.type !== msgItem.type
          );
        });

        updateMessageQueue(tempMsgQueue);

        return updatedProjectList;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageQueue]);

  useEffect(() => {
    if (
      projectList &&
      !projectList.some((item) =>
        inProcessScanStates.includes(item.tempScanStatus)
      )
    ) {
      setKeepWSOpen(false);
    } else if (
      projectList &&
      projectList.some((item) =>
        inProcessScanStates.includes(item.tempScanStatus)
      )
    ) {
      setKeepWSOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectList]);

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
          flexDirection: ["column", "column", "row"],
          mb: 4,
        }}
        w={"100%"}
      >
        <Text
          width="100%"
          textAlign="left"
          sx={{ color: "subtle", fontWeight: 600 }}
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
      ) : profileData.projects_remaining === 0 && projectList.length === 0 ? (
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
          <Text fontSize="sm">No projects scanned yet.</Text>
          {/* <Link to="/home">
            <Button variant="brand" width={["90%", "250px", "350px"]} my={8}>
              Add a New Project
            </Button>
          </Link> */}
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
              <ScanCard
                key={project.scanItem.scan_details.project_id}
                scan={project.scanItem}
                tempScanStatus={project.tempScanStatus}
                updateScanList={updateProjectList}
                isViewer={role === "viewer"}
                setInScanDetails={setInScanDetails}
                inScanDetails={inScanDetails}
                openScanStateModal={onOpen}
              />
            ))}
          </InfiniteScroll>
        </Flex>
      )}
      {inScanDetails ? (
        <InScanModal
          inScanDetails={inScanDetails}
          isOpen={isOpen}
          onClose={() => {
            setInsufficientMsg(null);
            onClose();
          }}
          insufficientMsg={insufficientMsg}
        />
      ) : null}
    </Box>
  );
};

export default Scans;
