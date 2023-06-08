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
import { useConfig } from "hooks/useConfig";
import { IssueDetailObject, IssueItem } from "common/types";
import { actionTaken } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import React, { useEffect, useState } from "react";
import IssueRow from "./IssueRow";
import IssueHead from "./IssueHead";
import DescriptionRemediationContainer from "./DescriptionRemediationContainer";
import CommentContainer from "./CommentContainer";

const DynamicContainer: React.FC<{ issue: IssueItem }> = ({ issue }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  return (
    <>
      <TableContainer
        border="1px solid #D9D9D9"
        borderRadius={20}
        width="100%"
        mt={5}
        borderBottomWidth={0}
        borderBottomRadius={0}
      >
        <Table variant="unstyled">
          <IssueHead />
          <Tbody>
            <IssueRow issue={issue} />
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        flexDirection={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        border="1px solid #D9D9D9"
        borderRadius={20}
        py={10}
        px={5}
        width="100%"
        borderTopWidth={0}
        borderTopRadius={0}
      >
        <DescriptionRemediationContainer
          issue_description={issue.issue_description}
          issue_remediation={issue.issue_remediation}
        />
        {issue.comment &&
          issue.comment !== "" &&
          issue.bug_status === "wont_fix" && (
            <CommentContainer comment={issue.comment} />
          )}
      </Flex>
    </>
  );
};

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

export default DynamicContainer;
