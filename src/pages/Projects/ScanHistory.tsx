import { Profile, ScanMeta, TreeItem, TreeItemUP } from "common/types";
import {
  Box,
  Flex,
  VStack,
  Button,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Collapse,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { restructureRepoTree, updateCheckedValue } from "helpers/fileStructure";
import { ScanErrorIcon } from "components/icons";
import Loader from "components/styled-components/Loader";
import { ChevronUpIcon, ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import { monthNames } from "common/values";
import FolderSettings from "components/projectFolderSettings";

export const ScanHistory: React.FC<{
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  profile: Profile;
  scans: ScanMeta[];
  repoTree: TreeItem | null;
  getRepoTreeReq: () => Promise<void>;
  project_url: string;
}> = ({
  setTabIndex,
  profile,
  scans,
  repoTree,
  getRepoTreeReq,
  project_url,
}) => {
  return (
    <Box
      sx={{
        w: "100%",
        borderRadius: "20px",
        px: 2,
        h: "65vh",
        overflowY: "scroll",
      }}
    >
      {profile &&
        scans?.map((scan) => (
          <ScanBlock
            key={scan.scan_id}
            scan={scan}
            setTabIndex={setTabIndex}
            repoTree={repoTree}
            project_url={project_url}
            profile={profile}
            getRepoTreeReq={getRepoTreeReq}
          />
        ))}
    </Box>
  );
};

const ScanBlock: React.FC<{
  scan: ScanMeta;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  profile: Profile;
  repoTree: TreeItem | null;
  getRepoTreeReq: () => Promise<void>;
  project_url: string;
}> = ({
  scan,
  setTabIndex,
  profile,
  repoTree,
  getRepoTreeReq,
  project_url,
}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [repoTreeUP, setRepoTreeUP] = useState<TreeItemUP | null>(null);

  useEffect(() => {
    if (repoTree && scan.skip_file_paths) {
      let newRepoTreeUP = restructureRepoTree(repoTree, true);
      scan.skip_file_paths.forEach((path) => {
        newRepoTreeUP = updateCheckedValue(path, false, newRepoTreeUP);
      });
      setRepoTreeUP(newRepoTreeUP);
    }
  }, [repoTree, scan.skip_file_paths]);

  return (
    <>
      <Flex
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        sx={{
          cursor: "pointer",
          w: "100%",
          bg: "white",
          my: 4,
          px: [5, 5, 7, 10],
          borderRadius: "10px",
          transition: "0.3s box-shadow",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          _hover: {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Flex
          w="100%"
          h="fit-content"
          flexDir={"row"}
          alignItems={["flex-start", "flex-start", "center"]}
          justifyContent="space-between"
          py={3}
        >
          <Flex
            width={"calc(100% - 60px)"}
            justifyContent="flex-start"
            flexWrap={"wrap"}
            alignItems={"flex-start"}
            flexDir="row"
          >
            <VStack my={2} alignItems={"flex-start"} spacing={1} width="130px">
              <Text fontSize={"sm"} color="gray.400">
                Scan Name
              </Text>
              <Text fontSize={"md"}>{scan.scan_name}</Text>
            </VStack>
            {scan.scan_status === "scan_incomplete" ? (
              <Flex
                p={3}
                sx={{ bgColor: "high-subtle", borderRadius: "20px" }}
                mr={10}
                my={2}
              >
                <ScanErrorIcon size={28} />
              </Flex>
            ) : (
              <VStack
                my={2}
                alignItems={"flex-start"}
                spacing={1}
                width="120px"
              >
                <Text fontSize={"sm"} color="gray.400">
                  Security Score
                </Text>
                <Text
                  sx={{
                    color: "accent",
                    fontSize: "xl",
                    fontWeight: 600,
                    mx: "auto",
                    lineHeight: 1,
                  }}
                >
                  {parseFloat(scan.scan_score_v2).toFixed(2) || scan.scan_score}
                </Text>
              </VStack>
            )}
            <Flex
              justifyContent={"flex-start"}
              alignItems="flex-start"
              flexWrap={"wrap"}
              width={"fit-content"}
              flexDir={["column", "row", "row"]}
            >
              <Button
                variant="accent-outline"
                minW="200px"
                bg={"white"}
                mr={10}
                my={2}
                onClick={() => {
                  setTabIndex(0);
                  history.push(`/projects/${scan.project_id}/${scan.scan_id}`);
                }}
              >
                View Scan Result
              </Button>

              <Button
                variant="accent-outline"
                minW="200px"
                bg={"white"}
                mr={10}
                my={2}
                isDisabled={
                  scan.reporting_status !== "report_generated" ||
                  (profile.actions_supported
                    ? !profile.actions_supported.generate_report
                    : profile.current_package === "trial")
                }
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `http://${document.location.host}/report/project/${scan.project_id}/${scan.latest_report_id}`,
                    "_blank"
                  );
                }}
              >
                {scan.reporting_status === "generating_report" && (
                  <Flex mr={3}>
                    <Loader color="#806CCF" size={25} />
                  </Flex>
                )}
                {scan.reporting_status === "report_generated"
                  ? "View Report"
                  : scan.reporting_status === "generating_report"
                  ? "Generating Report"
                  : "Report Not Generated"}
              </Button>
              {project_url !== "File Scan" &&
                scan.skip_file_paths &&
                scan.scan_status === "scan_done" && (
                  <HStack spacing={3} mr={10} my={2}>
                    <Button
                      variant="accent-outline"
                      minW="200px"
                      isLoading={isLoading}
                      spinner={<Loader color={"#3300FF"} size={25} />}
                      onClick={async () => {
                        if (show) {
                          setShow(false);
                        } else {
                          setIsLoading(true);
                          setShow(true);
                          await getRepoTreeReq();
                          setIsLoading(false);
                        }
                      }}
                    >
                      {show ? "Hide Scanned Files" : "View Scanned Files"}{" "}
                      {show ? (
                        <ChevronUpIcon ml={2} />
                      ) : (
                        <ChevronDownIcon ml={2} />
                      )}
                    </Button>
                    <Popover placement="bottom-end">
                      <PopoverTrigger>
                        <InfoIcon color="#d7cdfa" />
                      </PopoverTrigger>
                      <PopoverContent p={1}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Text
                            fontSize="sm"
                            textAlign="left"
                            lineHeight="title"
                            fontWeight={"300"}
                            mb={0}
                          >
                            The scanned files have been highlighted while the
                            remaining ones were skipped. To modify settings for
                            future scans, please refer to the{" "}
                            <Box
                              textDecoration="underline"
                              as="span"
                              color="#3E15F4"
                              mr={1}
                            >
                              Custom Settings
                            </Box>
                            option.
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                )}
            </Flex>
          </Flex>
          <Box
            sx={{
              width: "60px",
              height: "60px",
              my: 2,
              bg: "#F7F7F7",
              color: "#4E5D78",
              borderRadius: "50%",
              textAlign: "center",
            }}
          >
            <Text fontSize="xl" fontWeight="600">
              {new Date(scan.scan_time).getDate()}
            </Text>
            <Text fontSize="12px" mt="-4px">
              {monthNames[new Date(scan.scan_time).getMonth()]}
            </Text>
          </Box>
        </Flex>
        <Collapse
          style={{
            width: "100%",
          }}
          in={show}
          animateOpacity
        >
          {repoTreeUP && (
            <FolderSettings
              branch=""
              view="scan_history"
              repoTreeUP={repoTreeUP}
              setRepoTreeUP={setRepoTreeUP}
            />
          )}
        </Collapse>
      </Flex>
    </>
  );
};
