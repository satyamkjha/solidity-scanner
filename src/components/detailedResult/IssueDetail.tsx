import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Flex,
  VStack,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  useMediaQuery,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { useIssueDetail } from "hooks/useIssueDetail";
import { FilesState } from "common/types";
import { ArrowUpIcon, EditIcon } from "@chakra-ui/icons";

import Loader from "components/styled-components/Loader";
import { formatString } from "helpers/helperFunction";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const IssueDetail: React.FC<{
  type: "project" | "block";
  current_file_name: string;
  files: FilesState;
  issue_id: string;
  context: string;
  description_details: any;
  fullScreen?: boolean;
  handleTabsChange?: (index: number) => void;
  tabIndex?: number;
  restrictedBugIds: string[];
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
}> = ({
  type,
  issue_id,
  context,
  description_details,
  files,
  current_file_name,
  setFiles,
  fullScreen,
  handleTabsChange,
  tabIndex,
}) => {
  const { data, isLoading } = useIssueDetail(
    issue_id,
    context,
    files.template_details.issue_severity
  );

  let variableData = description_details;

  const { scanId, projectId } = useParams<{
    scanId: string;
    projectId: string;
  }>();

  const height = fullScreen
    ? ["430px", "430px", "430px", "410px"]
    : ["170px", "170px", "200px", "100px"];

  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  const [editComment, setEditComment] = React.useState(false);

  const [comment, setComment] = React.useState<string>("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setEditComment(false);
  }, [files]);

  useEffect(() => {
    if (tabIndex !== undefined && !isDesktopView) {
      tabRefs.current[tabIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);

  const updateComment = async () => {
    if (comment && comment !== "") {
      const { data } = await API.post(API_PATH.API_UPDATE_BUG_STATUS, {
        bug_ids: [files?.bug_hash],
        scan_id: scanId,
        project_id: projectId,
        bug_status: files?.bug_status,
        comment: comment,
        scan_type: type,
      });
      if (data.status === "success") {
        setFiles({
          ...files,
          comment: comment,
        });
      }

      // commented code
      // if (config && config.REACT_APP_FEATURE_GATE_CONFIG.websockets_enabled) {
      //   if (restrictedBugIds.includes(files.bug_hash)) {
      //     toast({
      //       title: "Comment Update in Progress. Please try after some time",
      //       status: "error",
      //       duration: 3000,
      //       isClosable: true,
      //     });
      //   } else {
      //     sendMessage({
      //       type: "scan_update",
      //       body: {
      //         bug_ids: [files?.bug_hash],
      //         scan_id: scanId,
      //         project_id: projectId,
      //         bug_status: files?.bug_status,
      //         comment: comment,
      //         scan_type: type,
      //       },
      //     });
      //     setRestrictedBugIds([...restrictedBugIds, files.bug_hash]);
      //     setFiles({
      //       ...files,
      //       comment: comment,
      //     });
      //   }
      // } else {

      // }
    }
  };

  return (
    <Tabs
      onChange={handleTabsChange}
      index={tabIndex}
      size="sm"
      variant="soft-rounded"
      colorScheme="green"
      w={["100%", "100%", "100%", "100%"]}
    >
      <Flex
        w={["100%", "100%", "100%", "100%"]}
        overflowX={["scroll", "scroll", "scroll", "scroll"]}
      >
        <TabList
          sx={{
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderColor: "border",
            pb: [3, 3, 3, 2],
            w: "fit-content",
          }}
          px={[0, 0, 0, 0]}
        >
          <Tab
            ref={(el) => (tabRefs.current[0] = el)}
            bgColor={"#FFFFFF"}
            _selected={{
              bgColor: "#4E5D78",
              color: "#FFFFFF",
            }}
            color="#4E5D78"
            minW={"200px"}
            mx={[0, 0, 0, 2]}
          >
            Vulnerability Description
          </Tab>
          <Tab
            ref={(el) => (tabRefs.current[1] = el)}
            bgColor={"#FFFFFF"}
            _selected={{
              bgColor: "#4E5D78",
              color: "#FFFFFF",
            }}
            color="#4E5D78"
            minW={"150px"}
            mx={[0, 0, 0, 2]}
          >
            Remediation
          </Tab>
          <Tab
            ref={(el) => (tabRefs.current[2] = el)}
            bgColor={"#FFFFFF"}
            _selected={{
              bgColor: "#4E5D78",
              color: "#FFFFFF",
            }}
            color="#4E5D78"
            minW={"150px"}
            mx={[0, 0, 0, 2]}
          >
            Comments
          </Tab>
        </TabList>
      </Flex>
      {isLoading && (
        <Flex
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
            h: height,
          }}
        >
          <Loader />
        </Flex>
      )}
      {data && (
        <TabPanels w="100%">
          <TabPanel
            sx={{ w: "100%", overflowY: "hidden", py: [3, 3, 3, 1], px: 2 }}
            _hover={{
              overflowY: "scroll",
            }}
            h={height}
          >
            <DescriptionWrapper>
              <Text fontWeight={500} fontSize="md" pb={2}>
                {data.issue_details.issue_name}
              </Text>
              <Box
                dangerouslySetInnerHTML={{
                  __html: files.issue_description
                    ? formatString(files.issue_description, {
                        ...variableData,
                        current_file_name,
                      })
                    : formatString(data.issue_details.issue_description, {
                        ...variableData,
                        current_file_name,
                      }),
                }}
              />
            </DescriptionWrapper>
          </TabPanel>
          <TabPanel
            sx={{
              h: height,
              w: "100%",
              overflowY: "scroll",
              py: [3, 3, 3, 1],
              px: 2,
            }}
          >
            <DescriptionWrapper>
              <Box
                dangerouslySetInnerHTML={{
                  __html: files.issue_remediation
                    ? formatString(files.issue_remediation, {
                        ...variableData,
                        current_file_name,
                      })
                    : formatString(data.issue_details.issue_remediation, {
                        ...variableData,
                        current_file_name,
                      }),
                }}
              />
            </DescriptionWrapper>
          </TabPanel>
          <TabPanel
            sx={{
              h: height,
              w: "100%",
              overflowY: "scroll",
              justifyContent: "space-between",
              alignItems: "flex-start",
              display: "flex",
              flexDir: "row",
              py: [3, 3, 3, 1],
              px: 2,
            }}
          >
            {editComment ? (
              <VStack
                w="100%"
                bgColor={"#F6F6F6"}
                borderRadius={"16px"}
                height={"110px"}
                alignItems="flex-end"
                spacing={-4}
              >
                <Textarea
                  placeholder="Add Comments"
                  fontSize={"12px"}
                  bgColor={"#F6F6F6"}
                  borderWidth={0}
                  noOfLines={3}
                  borderRadius={"16px"}
                  value={comment}
                  _selected={{
                    borderWidth: "0px",
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && !e.shiftKey) {
                      if (comment !== "" && comment) {
                        updateComment();
                      }
                    }
                  }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  height={"60px"}
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{
                    boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.0)",
                  }}
                />
                <Flex px={1}>
                  <IconButton
                    fontSize={"lg"}
                    p={0}
                    borderRadius="50%"
                    onClick={() => {
                      if (comment !== "" && comment) {
                        updateComment();
                      }
                    }}
                    bgColor={comment !== "" && comment ? "#3300FF" : "#B8B8B8"}
                    aria-label="Edit Comment"
                    color={comment !== "" && comment ? "#FFFFFF" : "#000000"}
                    icon={<ArrowUpIcon />}
                  />
                </Flex>
              </VStack>
            ) : (
              files.comment && (
                <>
                  <Text w="90%" fontSize={"xs"}>
                    {files.comment}
                  </Text>
                  <Tooltip label="Edit Comment" fontSize="md">
                    <IconButton
                      fontSize={"lg"}
                      p={0}
                      onClick={() => {
                        setEditComment(true);
                        if (files.comment) {
                          setComment(files.comment);
                        }
                      }}
                      bgColor="white"
                      aria-label="Edit Comment"
                      icon={<EditIcon />}
                    />
                  </Tooltip>
                </>
              )
            )}
          </TabPanel>
        </TabPanels>
      )}
    </Tabs>
  );
};

export default IssueDetail;

const DescriptionWrapper = styled.div`
  p {
    font-size: 12px;
  }
  
    code {
      background: #cbd5e0;
      padding: 2px 4px;
      border-radius: 5px;
    }
  ul, ol {
    margin-left: 20px
  }
  
    li {
      font-weight: 300;
      font-size: 12px
    }
  
  
    a {
      color: #4299e1;
      text-decoration: underline;
      transition: 0.2s color;
      &:hover {
        color: #2b6cb0;
      }
  
    
  `;
