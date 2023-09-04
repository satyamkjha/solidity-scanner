import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  Progress,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useMediaQuery,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useToast,
  Heading,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import {
  LogoIcon,
  ProjectIcon,
  RescanIcon,
  ScanErrorIcon,
} from "components/icons";
import Score from "components/score";
import VulnerabilityDistribution from "components/vulnDistribution";
import API from "helpers/api";
import { Page, Pagination, Project } from "common/types";
import { timeSince } from "common/functions";
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useProjects } from "hooks/useProjects";
import { useProfile } from "hooks/useProfile";
import InfiniteScroll from "react-infinite-scroll-component";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import { useUserRole } from "hooks/useUserRole";
import { onSnapshot, doc, Unsubscribe } from "firebase/firestore";
import { db } from "helpers/firebase";
import {
  getFeatureGateConfig,
  snakeToNormal,
  getAssetsURL,
} from "helpers/helperFunction";
import { scanStatesLabel } from "common/values";

const Projects: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1920px)");
  const role: string = useUserRole();
  const assetsURL = getAssetsURL();
  const [page, setPage] = useState<Page>();
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: 1,
    perPageCount: isDesktopView ? 20 : 12,
  });
  const [hasMore, setHasMore] = useState(true);

  const { data: projects, refetch } = useProjects(pagination);
  const [projectList, setProjectList] = useState<Project[]>();
  const [projectsMonitored, setProjectsMonitored] = useState(0);
  const [projectsInScanning, setProjectsInScanning] = useState<
    {
      scanId: string;
      scanStatus: string;
    }[]
  >([]);
  const [projectsIdsInScanning, setProjectsIdsInScanning] = useState<string[]>(
    []
  );

  const [ssIconAnimation, setSsIconAniamtion] = useState<any>(null);

  useEffect(() => {
    getSsIconAnimationFromUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSsIconAnimationFromUrl = async () => {
    const response = await fetch(`${assetsURL}icons/ss_icon_animation.json`);
    const jsonData = await response.json();
    setSsIconAniamtion(jsonData);
  };

  const { data: profileData, refetch: refetchProfile } = useProfile();

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
          index === self.findIndex((p) => p.project_id === project.project_id)
      );
      setProjectList(uniqueProjectList);
      setPage(projects.page);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, refetch]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const refetchTillScanComplete = () => {
      if (
        projectList &&
        projectList.some(
          ({ _latest_scan }) =>
            _latest_scan.multi_file_scan_status === "scanning"
        )
      ) {
        if (getFeatureGateConfig().event_consumption_enabled) {
          const scanningScanIds: string[] = projectList
            .filter((project) =>
              ["initialised", "downloaded", "scanning"].includes(
                project._latest_scan.multi_file_scan_status
              )
            )
            .map((project) => project._latest_scan.scan_id);
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

  const fetchProjectList = async () => {
    const { data } = await API.get(
      `${API_PATH.API_GET_PROJECTS_BETA}?page=${1}&per_page=${
        pagination.perPageCount
      }`
    );
    if (data.data && projectList) {
      const pList = [
        ...data.data,
        ...projectList.slice(pagination.perPageCount, projectList.length),
      ];
      setProjectList(pList);
    }
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

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

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
      if (projectItem.project_id === project_id) return false;
      return true;
    });
    setProjectsMonitored(projectsMonitored - 1);
    setProjectList(newProjectList);
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
        <Text sx={{ color: "subtle", fontWeight: 600, ml: 4 }}>PROJECTS</Text>
        {profileData && (
          <Flex ml={20} sx={{ display: ["none", "none", "flex"] }}>
            <Text fontWeight={600} fontSize="2xl" ml={4} mr={10}>
              {projectsMonitored.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              <Box as="span" ml={2} color="subtle" fontSize="sm">
                Projects Monitored
              </Box>
            </Text>
          </Flex>
        )}
      </Flex>

      {!projectList || !profileData ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Loader />
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
          <Box mb={2} opacity={0.5}>
            <LogoIcon size={50} />
          </Box>
          <Text fontSize="sm">No projects started yet.</Text>
          <Link to="/home">
            <Button variant="brand" width="200px" my={8}>
              Add a New Project
            </Button>
          </Link>
        </Flex>
      ) : (
        <Flex
          alignItems={"row"}
          flexWrap="wrap"
          flexDir={"row"}
          justifyItems={["center", "center", "space-around"]}
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
              <ProjectCard
                key={project.project_id}
                project={project}
                refetchProfile={refetchProfile}
                refetch={refetch}
                updateProjectList={updateProjectList}
                isViewer={role === "viewer"}
                projectsIdsInScanning={projectsIdsInScanning}
                projectsInScanning={projectsInScanning}
              />
            ))}
          </InfiniteScroll>
        </Flex>
      )}
    </Box>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  refetch: any;
  refetchProfile: any;
  updateProjectList: (project_id: string) => void;
  isViewer: boolean;
  projectsIdsInScanning: string[];
  projectsInScanning: {
    scanId: string;
    scanStatus: string;
  }[];
  ssIconAnimation: any;
}> = ({
  project,
  refetch,
  refetchProfile,
  updateProjectList,
  isViewer,
  projectsIdsInScanning,
  projectsInScanning,
  ssIconAnimation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const [isRescanLoading, setRescanLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const [hover, setHover] = useState(false);

  const history = useHistory();
  const {
    project_id,
    project_name,
    date_updated,
    scans_remaining,
    _latest_scan,
  } = project;

  const { multi_file_scan_summary, multi_file_scan_status, scan_message } =
    _latest_scan;

  const onClose = () => setIsOpen(false);

  const rescan = async () => {
    setRescanLoading(true);
    await API.post(API_PATH.API_PROJECT_SCAN, {
      project_id,
      project_type: "existing",
    });
    refetch();
    setRescanLoading(false);
    refetchProfile();
    onClose();
  };

  const [scanStatus, setScanStatus] = useState("");

  useEffect(() => {
    if (
      projectsInScanning &&
      projectsIdsInScanning &&
      projectsIdsInScanning.includes(project._latest_scan.scan_id)
    ) {
      const proj = projectsInScanning.find(
        (item) => item.scanId === project._latest_scan.scan_id
      );
      if (proj) setScanStatus(proj.scanStatus);
      else setScanStatus("initialised");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsIdsInScanning, projectsInScanning]);

  const [open, setOpen] = useState(false);
  const deleteProject = async () => {
    const { data } = await API.delete(API_PATH.API_DELETE_PROJECT, {
      data: {
        project_ids: [project_id],
      },
    });
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      toast({
        title: data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
    onClose();
    updateProjectList(project_id);
  };

  return (
    <>
      {multi_file_scan_status === "scan_done" ||
      multi_file_scan_status === "scanning" ? (
        <Flex
          onClick={() => {
            if (multi_file_scan_status === "scan_done") {
              history.push(`/projects/${project_id}/${_latest_scan.scan_id}`);
            }
          }}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            cursor:
              multi_file_scan_status === "scan_done"
                ? "pointer"
                : "not-allowed",
            flexDir: "column",
            justifyContent: "space-between",
            h: "230px",
            borderRadius: 15,
            bg: "white",
            transition: "0.3s box-shadow",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)",
            _hover: {
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
            },
          }}
          boxSizing={"border-box"}
          my={4}
          mx={4}
          py={5}
          maxWidth="400px"
          w={["90%", "95%", "45%", "320px"]}
        >
          {multi_file_scan_status === "scan_done" ? (
            <>
              <Flex
                w="100%"
                px={2}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Box px={4} w="70%">
                  <Text isTruncated>{project_name}</Text>
                  <Text sx={{ fontSize: "xs", color: "subtle" }}>
                    Last scanned {timeSince(new Date(date_updated))}
                  </Text>
                </Box>
                <HStack mr={hover && !isViewer ? 0 : 7} alignItems="flex-start">
                  {project.project_url !== "File Scan" && (
                    <Tooltip label="Rescan" aria-label="A tooltip" mt={2}>
                      <Button
                        size="sm"
                        colorScheme="white"
                        height="58px"
                        width="58px"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(true);
                        }}
                        transition="0.3s opacity"
                        _hover={{
                          opacity:
                            scans_remaining === 0 || isViewer ? 0.4 : 0.9,
                        }}
                        isDisabled={scans_remaining === 0 || isViewer}
                      >
                        <Flex sx={{ flexDir: "column", alignItems: "center" }}>
                          <RescanIcon size={60} />
                        </Flex>
                      </Button>
                    </Tooltip>
                  )}
                  {hover && !isViewer && (
                    <Menu placement={"bottom-end"}>
                      <MenuButton
                        zIndex={10}
                        as={IconButton}
                        backgroundColor="#FFFFFF"
                        _hover={{ backgroundColor: "#FFFFFF" }}
                        _active={{ backgroundColor: "#FFFFFF" }}
                        icon={<BsThreeDotsVertical />}
                        w={5}
                        minW={5}
                        aria-label="Options"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                      <MenuList
                        sx={{
                          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <MenuItem
                          _focus={{ backgroundColor: "#FFFFFF" }}
                          _hover={{ backgroundColor: "#FFFFFF" }}
                          icon={<DeleteIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen(true);
                          }}
                        >
                          Delete Project
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </HStack>
              </Flex>
              <Flex
                px={4}
                w="100%"
                alignItems="center"
                justifyContent="flex-start"
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
              </Flex>
              <Box px={4}>
                <VulnerabilityDistribution
                  critical={
                    multi_file_scan_summary?.issue_severity_distribution
                      ?.critical || 0
                  }
                  high={
                    multi_file_scan_summary?.issue_severity_distribution
                      ?.high || 0
                  }
                  medium={
                    multi_file_scan_summary?.issue_severity_distribution
                      ?.medium || 0
                  }
                  low={
                    multi_file_scan_summary?.issue_severity_distribution?.low ||
                    0
                  }
                  informational={
                    multi_file_scan_summary?.issue_severity_distribution
                      ?.informational || 0
                  }
                  gas={
                    multi_file_scan_summary?.issue_severity_distribution?.gas
                  }
                />
              </Box>
            </>
          ) : (
            <Box w="100%" px={6}>
              <Text sx={{ w: "80%", mb: 8 }} isTruncated>
                {project_name}
              </Text>

              <Flex
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                  borderRadius: 15,
                }}
              >
                {ssIconAnimation && (
                  <Lottie
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
                    animationData={ssIconAnimation}
                  />
                )}
                <Text mx={2} fontSize="sm">
                  {scanStatesLabel[scanStatus] || scanStatesLabel["scanning"]}
                </Text>
              </Flex>
              <Progress value={20} isIndeterminate size="xs" />
            </Box>
          )}
        </Flex>
      ) : (
        <Flex
          onClick={() => {
            history.push(`/projects/${project_id}/${_latest_scan.scan_id}`);
          }}
          sx={{
            cursor: "pointer",
            my: 4,
            mx: 4,
            borderRadius: 15,
            h: "230px",
            bg: "white",
            transition: "0.3s box-shadow",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)",
            _hover: {
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
            },
            overflow: "hidden",
            flexDir: "column",
            justifyContent: "space-between",
          }}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          maxW="400px"
          w={["90%", "95%", "45%", "320px"]}
        >
          <Flex
            sx={{
              h: "fit-content",
              pt: 5,
              w: "100%",
            }}
            w="100%"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box px={4}>
              <Text isTruncated>{project_name}</Text>
              <Text sx={{ fontSize: "sm", color: "subtle" }}>
                Last scanned {timeSince(new Date(date_updated))}
              </Text>
            </Box>
            <HStack mr={hover ? 2 : 9} alignItems="flex-start">
              {project.project_url !== "File Scan" && (
                <Tooltip label="Rescan" aria-label="A tooltip" mt={2}>
                  <Button
                    size="sm"
                    colorScheme="white"
                    height="58px"
                    width="58px"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                    }}
                    transition="0.3s opacity"
                    _hover={{ opacity: scans_remaining === 0 ? 0.4 : 0.9 }}
                    isDisabled={scans_remaining === 0 || isViewer}
                  >
                    <Flex sx={{ flexDir: "column", alignItems: "center" }}>
                      <RescanIcon size={60} />
                    </Flex>
                  </Button>
                </Tooltip>
              )}
              {hover && !isViewer && (
                <Menu placement={"bottom-end"}>
                  <MenuButton
                    zIndex={10}
                    as={IconButton}
                    backgroundColor="#FFFFFF"
                    _hover={{ backgroundColor: "#FFFFFF" }}
                    _active={{ backgroundColor: "#FFFFFF" }}
                    icon={<BsThreeDotsVertical />}
                    w={5}
                    minW={5}
                    aria-label="Options"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  <MenuList
                    sx={{
                      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <MenuItem
                      _focus={{ backgroundColor: "#FFFFFF" }}
                      _hover={{ backgroundColor: "#FFFFFF" }}
                      icon={<DeleteIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                      }}
                    >
                      Delete Project
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </HStack>
          </Flex>
          <Box
            sx={{
              p: 3,
              m: 3,
              h: "fit-content",
              borderRadius: 5,
              backgroundColor: "#FCFCFF",
            }}
          >
            <HStack mb={2}>
              <WarningIcon color="#FF5630" />
              <Heading sx={{ fontSize: "sm", color: "#FF5630" }}>
                {snakeToNormal(multi_file_scan_status)}
              </Heading>
            </HStack>
            <Text sx={{ fontSize: "xs", color: "#4E5D78" }}>
              {scan_message}
            </Text>
          </Box>
        </Flex>
      )}
      <AlertDialog isOpen={open} onClose={() => setOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <Box as="span" sx={{ fontWeight: 600 }}>
                {project_name}
              </Box>{" "}
              project ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setOpen(false)} py={6}>
                No, My bad
              </Button>
              <Button variant="brand" onClick={deleteProject} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Rescan Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You have{" "}
              <Box as="span" sx={{ fontWeight: 600 }}>
                {scans_remaining}
              </Box>{" "}
              scans remaining.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} py={6}>
                Cancel
              </Button>
              <Button
                variant="brand"
                onClick={rescan}
                ml={3}
                isLoading={isRescanLoading}
                spinner={<Loader color={"#3300FF"} size={25} />}
              >
                Rescan
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Projects;
