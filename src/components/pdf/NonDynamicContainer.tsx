import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  HStack,
  Text,
  Tbody,
  Td,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { IssueDetailObject, IssueItem } from "common/types";
import { actionTaken } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import React, { useEffect, useState } from "react";
import IssueRow from "../report/IssueRow";
import IssueHead from "../report/IssueHead";
import DescriptionRemediationContainer from "../report/DescriptionRemediationContainer";
import CommentContainer from "../report/CommentContainer";

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

    if (issueDetails.length > 0) {
      comments_map.push({
        comment: "no_comment",
        issueList: issueDetails,
      });
    }

    setCommentsMao(comments_map);
  }, []);

  // issue.issue_details[0].issue_description
  // issue.issue_details[0].issue_description

  return (
    <>
      <DescriptionRemediationContainer
        issue_description={issue.issue_details[0].issue_description}
        issue_remediation={issue.issue_details[0].issue_remediation}
      />
      {commentsMap.map((comment) => (
        <Flex
          width={"100%"}
          height={"fit-content"}
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            pageBreakAfter: "always",
          }}
        >
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
        </Flex>
      ))}
    </>
  );
};

export default NonDynamicContainer;

const DescriptionWrapper = styled.div`
  p {
    font-weight: 300;
    word-break: break-all;
  }

  ul,
  ol {
    margin-left: 20px;
  }

  li {
    font-weight: 400;
    font-size: 16px;
  }

  code {
    background: #cbd5e0;
    padding: 2px 4px;
    border-radius: 5px;
    word-break: break-all;
  }
  a {
    color: #4299e1;
    text-decoration: underline;
    word-break: break-all;
    transition: 0.2s color;
    &:hover {
      color: #2b6cb0;
    }
  }
`;
