import { TableContainer, Table, Tbody, Flex } from "@chakra-ui/react";
import { IssueDetailObject, IssueItem } from "common/types";
import React, { useEffect, useState } from "react";
import IssueRow from "./IssueRow";
import IssueHead from "./IssueHead";
import DescriptionRemediationContainer from "./DescriptionRemediationContainer";
import CommentContainer from "./CommentContainer";

const NonDynamicContainer: React.FC<{ issue: IssueDetailObject }> = ({
  issue,
}) => {
  let issueDetails = issue.issue_details;

  const [commentsMap, setCommentsMao] = useState<
    {
      comment: string;
      issueList: IssueItem[];
    }[]
  >([]);

  let comments_map: {
    comment: string;
    issueList: IssueItem[];
  }[] = [];

  useEffect(() => {
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

    comments_map.push({
      comment: "no_comment",
      issueList: issueDetails,
    });

    setCommentsMao(comments_map);
  }, []);

  // issue.issue_details[0].issue_description
  // issue.issue_details[0].issue_description

  return (
    <>
      {issue.issue_details[0].issue_description &&
        issue.issue_details[0].issue_remediation && (
          <DescriptionRemediationContainer
            issue_description={issue.issue_details[0].issue_description}
            issue_remediation={issue.issue_details[0].issue_remediation}
          />
        )}

      {commentsMap.map((comment) => (
        <>
          <TableContainer
            mt={5}
            border="1px solid #D9D9D9"
            borderRadius={20}
            width="100%"
            borderBottomWidth={0}
            borderBottomRadius={comment.comment === "no_comment" ? 20 : 0}
          >
            <Table variant="unstyled">
              <IssueHead />
              <Tbody>
                {comment.issueList.map((item) => (
                  <IssueRow issue={item} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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
        </>
      ))}
    </>
  );
};

export default NonDynamicContainer;
