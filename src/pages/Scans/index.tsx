import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Button, useMediaQuery } from "@chakra-ui/react";
// import Lottie from "lottie-react";
import { LogoIcon } from "components/icons";
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
  // getAssetsFromS3,
} from "helpers/helperFunction";
import ProjectCard from "components/cards/ProjectCard";
import { useAllScans } from "hooks/useAllScans";
import BlockCard from "components/cards/BlockCard";

const Scans: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1920px)");
  const role: string = useUserRole();
  const [page, setPage] = useState<Page>();
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: 1,
    perPageCount: isDesktopView ? 20 : 12,
  });
  const [hasMore, setHasMore] = useState(true);

  const { data: projects, refetch } = useAllScans(pagination);
  const [projectList, setProjectList] = useState<ScanObj[]>();
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

  // const [ssIconAnimation, setSsIconAniamtion] = useState<any>(null);

  // useEffect(() => {
  //   getSsIconAnimationFromUrl();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const getSsIconAnimationFromUrl = async () => {
  //   const jsonData = await getAssetsFromS3("icons/ss_icon_animation.json");
  //   setSsIconAniamtion(jsonData);
  // };

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
          index === self.findIndex((p) => p.scan_id === project.scan_id)
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
              if (project.scan_type === "project")
                return project.scan_details.scan_id;
              else return project.scan_details.project_id;
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

  const fetchProjectList = async () => {
    const { data } = await API.get(
      `${API_PATH.API_GET_ALL_SCANS}?page=${1}&per_page=${
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

  const updateProjectList = (scan_id: string) => {
    let newProjectList = projectList || [];
    newProjectList = newProjectList.filter((projectItem) => {
      if (projectItem.scan_id === scan_id) return false;
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
              <React.Fragment key={project.scan_id}>
                {project.scan_type === "project" ? (
                  <ProjectCard
                    key={project.scan_id}
                    project={project}
                    refetchProfile={refetchProfile}
                    refetch={refetch}
                    updateProjectList={updateProjectList}
                    isViewer={role === "viewer"}
                    scans_remaining={profileData.credits}
                    projectsIdsInScanning={projectsIdsInScanning}
                    projectsInScanning={projectsInScanning}
                  />
                ) : (
                  <BlockCard
                    key={project.scan_id}
                    scan={project}
                    updateScanList={updateProjectList}
                    isViewer={role === "viewer"}
                    scanIdsInScanning={projectsIdsInScanning}
                    scanInProgress={projectsInScanning}
                    // ssIconAnimation={ssIconAnimation}
                  />
                )}
              </React.Fragment>
            ))}
          </InfiniteScroll>
        </Flex>
      )}
    </Box>
  );
};

export default Scans;
