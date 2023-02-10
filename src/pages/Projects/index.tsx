import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
  Flex,
  Box,
  Text,
  Button,
  Progress,
  Spinner,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useMediaQuery,
} from "@chakra-ui/react";

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

import { useProjects } from "hooks/useProjects";
import { useProfile } from "hooks/useProfile";
import InfiniteScroll from "react-infinite-scroll-component";
import { API_PATH } from "helpers/routeManager";

const Projects: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1920px)");

  const [page, setPage] = useState<Page>();
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: 1,
    perPageCount: isDesktopView ? 20 : 12,
  });
  const [hasMore, setHasMore] = useState(true);

  const { data: projects, isLoading, refetch } = useProjects(pagination);
  const [projectList, setProjectList] = useState<Project[]>();

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (projects) {
      let pList =
        projectList && pagination.pageNo > 1
          ? projectList.concat(projects.data)
          : projects.data;
      setProjectList(pList);
      setPage(projects.page);
    }
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
        intervalId = setInterval(async () => {
          setPagination({ pageNo: 1, perPageCount: projectList.length });
          if (
            projectList &&
            projectList.every(
              ({ _latest_scan }) =>
                _latest_scan.multi_file_scan_status === "scan_done"
            )
          ) {
            clearInterval(intervalId);
          }
        }, 5000);
      }
    };

    if (projectList) {
      refetchTillScanComplete();
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [projectList]);

  useEffect(() => {
    refetch()
  }, [pagination])

  const refetchProjects = async () => {
    if (projectList) {
      setPagination({ pageNo: 1, perPageCount: projectList.length });
      setTimeout(async () => {
        await refetch();
      }, 10);
    }
  };

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
            <ProjectIcon size={37} />
            <Text fontWeight={600} fontSize="2xl" ml={4} mr={10}>
              {profileData.projects_remaining.toLocaleString("en-US", {
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

      {!projectList ? (
        <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
          <Spinner />
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
              <Box w={"100%"} align="center">
                <Spinner />
              </Box>
            }
            scrollableTarget="pageScroll"
          >
            {[...(projectList || [])].map((project) => (
              <ProjectCard
                key={project.project_id}
                project={project}
                refetch={refetchProjects}
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
}> = ({ project, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRescanLoading, setRescanLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
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
    onClose();
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
          p={5}
          maxWidth="400px"
          w={["90%", "95%", "45%", "320px"]}
        >
          {multi_file_scan_status === "scan_done" ? (
            <>
              <Flex
                w="100%"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Box w="50%">
                  <Text isTruncated>{project_name}</Text>
                  <Text sx={{ fontSize: "sm", color: "subtle" }}>
                    Last scanned {timeSince(new Date(date_updated))}
                  </Text>
                </Box>
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
                      isDisabled={scans_remaining === 0}
                    >
                      <Flex sx={{ flexDir: "column", alignItems: "center" }}>
                        <RescanIcon size={60} />
                      </Flex>
                    </Button>
                  </Tooltip>
                )}
              </Flex>
              <Flex w="100%" alignItems="center" justifyContent="flex-start">
                <Score score={multi_file_scan_summary?.score || "0"} />
              </Flex>
              <VulnerabilityDistribution
                critical={
                  multi_file_scan_summary?.issue_severity_distribution
                    ?.critical || 0
                }
                high={
                  multi_file_scan_summary?.issue_severity_distribution?.high ||
                  0
                }
                medium={
                  multi_file_scan_summary?.issue_severity_distribution
                    ?.medium || 0
                }
                low={
                  multi_file_scan_summary?.issue_severity_distribution?.low || 0
                }
                informational={
                  multi_file_scan_summary?.issue_severity_distribution
                    ?.informational || 0
                }
                gas={multi_file_scan_summary?.issue_severity_distribution?.gas}
              />
            </>
          ) : (
            <Box w="100%">
              <Text sx={{ w: "80%", mb: 8 }} isTruncated>
                {project_name}
              </Text>

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
      ) : (
        <Box
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
          }}
          maxW="400px"
          w={["90%", "95%", "45%", "320px"]}
        >
          <Flex
            sx={{
              flexDir: "column",
              justifyContent: "space-between",
              h: "144px",
              pt: 5,
              px: 5,
            }}
          >
            <Flex
              w="100%"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box>
                <Text sx={{ w: "220px" }} isTruncated>
                  {project_name}
                </Text>
                <Text sx={{ fontSize: "sm", color: "subtle" }}>
                  Last scanned {timeSince(new Date(date_updated))}
                </Text>
              </Box>
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
                    isDisabled={scans_remaining === 0}
                  >
                    <Flex sx={{ flexDir: "column", alignItems: "center" }}>
                      <RescanIcon size={60} />
                    </Flex>
                  </Button>
                </Tooltip>
              )}
            </Flex>
          </Flex>
          <Box
            sx={{
              p: 5,
              pl: 10,
              backgroundColor: "high-subtle",
              position: "relative",
            }}
          >
            <Box position="absolute" transform="translate3d(-30px, -34px,0)">
              <ScanErrorIcon size={28} />
            </Box>
            <Text sx={{ fontSize: "xs", color: "#FF5630", h: "46px" }}>
              {scan_message}
            </Text>
          </Box>
        </Box>
      )}
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
