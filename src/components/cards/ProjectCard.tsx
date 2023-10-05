import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
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
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useToast,
  Heading,
} from "@chakra-ui/react";
// import Lottie from "lottie-react";
import { LogoIcon, RescanIcon } from "components/icons";
import Score from "components/score";
import VulnerabilityDistribution from "components/vulnDistribution";
import API from "helpers/api";
import { ScanObj } from "common/types";
import { timeSince } from "common/functions";
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import { snakeToNormal, getTrimmedScanMessage } from "helpers/helperFunction";
import { scanStatesLabel } from "common/values";

const ProjectCard: React.FC<{
  project: ScanObj;
  refetch: any;
  refetchProfile: any;
  updateProjectList: (project_id: string) => void;
  isViewer: boolean;
  scans_remaining: number;
  projectsIdsInScanning: string[];
  projectsInScanning: {
    scanId: string;
    scanStatus: string;
  }[];
  // ssIconAnimation: any;
}> = ({
  project,
  refetch,
  refetchProfile,
  updateProjectList,
  isViewer,
  scans_remaining,
  projectsIdsInScanning,
  projectsInScanning,
  // ssIconAnimation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const [isRescanLoading, setRescanLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const [hover, setHover] = useState(false);

  const history = useHistory();
  const { scan_id, scan_details } = project;

  const { multi_file_scan_summary, multi_file_scan_status, scan_message } =
    scan_details;

  const onClose = () => setIsOpen(false);

  const rescan = async () => {
    setRescanLoading(true);
    await API.post(API_PATH.API_PROJECT_SCAN, {
      project_id: scan_details.project_id,
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
      projectsIdsInScanning.includes(project.scan_details.scan_id)
    ) {
      const proj = projectsInScanning.find(
        (item) => item.scanId === project.scan_details.scan_id
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
        project_ids: [scan_details.project_id],
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
    updateProjectList(scan_details.project_id);
  };

  return (
    <>
      {["scan_done", "scanning", "initialised"].includes(
        multi_file_scan_status
      ) ? (
        <Flex
          onClick={() => {
            if (multi_file_scan_status === "scan_done") {
              history.push(
                `/projects/${scan_details.project_id}/${scan_details.scan_id}`
              );
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
          minH={"260px"}
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
                  <Text isTruncated>{scan_details.project_name}</Text>
                  <Text sx={{ fontSize: "xs", color: "subtle" }}>
                    Last scanned {timeSince(new Date(scan_details._updated))}
                  </Text>
                </Box>
                <HStack mr={hover && !isViewer ? 0 : 7} alignItems="flex-start">
                  {scan_details.project_url !== "File Scan" && (
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
                {scan_details.project_name}
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
                <LogoIcon size={15} />
                {/* {ssIconAnimation && (
                    <Lottie
                      style={{
                        height: "30px",
                        width: "30px",
                      }}
                      animationData={ssIconAnimation}
                    />
                  )} */}
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
            history.push(
              `/projects/${scan_details.project_id}/${scan_details.scan_id}`
            );
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
          minH={"260px"}
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
              <Text isTruncated>{scan_details.project_name}</Text>
              <Text sx={{ fontSize: "sm", color: "subtle" }}>
                Last scanned {timeSince(new Date(scan_details._updated))}
              </Text>
            </Box>
            <HStack mr={hover ? 2 : 9} alignItems="flex-start">
              {scan_details.project_url !== "File Scan" && (
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
                {multi_file_scan_status.length > 25
                  ? getTrimmedScanMessage(multi_file_scan_status)
                  : snakeToNormal(multi_file_scan_status)}
              </Heading>
            </HStack>
            <Text sx={{ fontSize: "xs", color: "#4E5D78" }}>
              {multi_file_scan_status.length > 25
                ? multi_file_scan_status
                : scan_message}
            </Text>
          </Box>
        </Flex>
      )}
      <AlertDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <Box as="span" sx={{ fontWeight: 600 }}>
                {scan_details.project_name}
              </Box>{" "}
              project ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setOpen(false)} py={6}>
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

export default ProjectCard;
