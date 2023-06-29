import { TableContainer, Table, Tbody, Flex } from "@chakra-ui/react";
import { IssueItem } from "common/types";
import React from "react";
import IssueRow from "./IssueRow";
import IssueHead from "./IssueHead";
import DescriptionRemediationContainer from "./DescriptionRemediationContainer";
import CommentContainer from "./CommentContainer";

const DynamicContainer: React.FC<{ issue: IssueItem }> = ({ issue }) => {
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

export default DynamicContainer;
