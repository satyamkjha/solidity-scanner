import { TableContainer, Table, Tbody, Flex, Text } from "@chakra-ui/react";
import { IssueDetailObject, IssueItem } from "common/types";
import React, { useEffect, useState, useRef } from "react";
import IssueRow from "../report/IssueRow";
import IssueHead from "../report/IssueHead";
import DescriptionRemediationContainer from "../report/DescriptionRemediationContainer";
import CommentContainer from "../report/CommentContainer";

const NonDynamicContainer: React.FC<{ issue: IssueDetailObject }> = ({
  issue,
}) => {
  let issueDetails = issue.issue_details;
  const elementRef = useRef<HTMLDivElement | null>(null);
  // const [isNextPage, setIsNextPage] = useState(false);
  const [commentsMap, setCommentsMap] = useState<
    {
      comment: string;
      issueList: IssueItem[];
    }[]
  >([]);
  const [slicedBugLists, setSlicedBugLists] = useState<IssueItem[][][]>([]);

  useEffect(() => {
    let comments_map: {
      comment: string;
      issueList: IssueItem[];
    }[] = [];

    if (issue.common_comments_map) {
      Object.keys(issue.common_comments_map).forEach((key) => {
        let tempArray: IssueItem[] = [];
        issue.common_comments_map[key].forEach((bugId) => {
          issueDetails = issueDetails.filter((item) => {
            if (item.bug_hash === bugId) {
              tempArray.push(item);
              return false;
            }
            return true;
          });
        });
        comments_map.push({
          comment: key,
          issueList: tempArray,
        });
      });
    }

    if (issueDetails.length > 0) {
      comments_map.push({
        comment: "no_comment",
        issueList: issueDetails,
      });
    }
    checkPageBreak(comments_map);
    setCommentsMap(comments_map);
  }, []);

  const checkPageBreak = (
    comments_map: {
      comment: string;
      issueList: IssueItem[];
    }[]
  ) => {
    const element = elementRef.current;
    if (element) {
      let isNextPage = false;
      const isPageBreak =
        (element.offsetHeight > window.innerHeight * 0.5 &&
          issue.issue_details.length > 4) ||
        issue.issue_details.length > 7;
      if (isPageBreak) {
        const discriptionEl = element.firstElementChild;
        console.log(
          discriptionEl?.clientHeight,
          window.innerHeight,
          discriptionEl?.innerHTML
        );
        if (
          discriptionEl &&
          discriptionEl.clientHeight > window.innerHeight * 0.35
        ) {
          const pageBreakElement = document.createElement("h6");
          pageBreakElement.style.pageBreakBefore = "always";
          pageBreakElement.style.marginBottom = "20px";
          element.insertBefore(pageBreakElement, discriptionEl.nextSibling);
          isNextPage = true;
        } else {
          isNextPage = false;
        }
      }
      const slicedLists = comments_map.map((comment) =>
        slicedBugList(comment.issueList, isNextPage)
      );
      setSlicedBugLists(slicedLists);
    }
  };

  const slicedBugList = (list: IssueItem[], isNextPage: boolean) => {
    const slicedLists = [];
    if (isNextPage) {
      for (let i = 0; i < list.length; i += 10) {
        const slicedGroup = list.slice(i, i + 10);
        slicedLists.push(slicedGroup);
      }
    } else {
      slicedLists.push(list.slice(0, 5));
      for (let i = 5; i < list.length; i += 10) {
        const slicedGroup = list.slice(i, i + 10);
        slicedLists.push(slicedGroup);
      }
    }
    return slicedLists;
  };

  return (
    <>
      <Flex flexDir="column" ref={elementRef} w={"100%"}>
        <Flex w="100%" flexDir="column">
          <DescriptionRemediationContainer
            issue_description={issue.issue_details[0].issue_description}
            issue_remediation={issue.issue_details[0].issue_remediation}
          />
        </Flex>
        {commentsMap &&
          slicedBugLists &&
          slicedBugLists.length &&
          commentsMap.map((comment, index) => (
            <>
              <Flex
                width={"100%"}
                height={"fit-content"}
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                {slicedBugLists[index] &&
                  slicedBugLists[index].map((bugs, issueIndex) => (
                    <React.Fragment key={index + "_" + issueIndex}>
                      <TableContainer
                        mt={5}
                        border="1px solid #D9D9D9"
                        borderRadius={20}
                        width="100%"
                        borderBottomWidth={0}
                        borderBottomRadius={
                          comment.comment === "no_comment" ? 20 : 0
                        }
                        overflowX={"hidden"}
                        sx={{
                          pageBreakAfter: "always",
                        }}
                      >
                        <Table variant="unstyled">
                          <IssueHead view={"pdf"} />
                          <Tbody>
                            {bugs.map((item, bugIndex) => (
                              <React.Fragment
                                key={index + "_" + issueIndex + "_" + bugIndex}
                              >
                                <IssueRow issue={item} view={"pdf"} />
                              </React.Fragment>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      {issueIndex !== slicedBugLists[index].length - 1 && (
                        <h6></h6>
                      )}
                    </React.Fragment>
                  ))}
                {comment.comment !== "no_comment" && (
                  <Flex
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    border="1px solid #D9D9D9"
                    borderRadius={20}
                    pb={5}
                    px={5}
                    width="100%"
                    borderTopWidth={0}
                    borderTopRadius={0}
                  >
                    <CommentContainer comment={comment.comment} />
                  </Flex>
                )}
                <h6></h6>
              </Flex>
            </>
          ))}
      </Flex>
    </>
  );
};

export default NonDynamicContainer;
