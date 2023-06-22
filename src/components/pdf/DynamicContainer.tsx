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
import React, { useRef, useEffect } from "react";
import IssueRow from "../report/IssueRow";
import IssueHead from "../report/IssueHead";
import DescriptionRemediationContainer from "../report/DescriptionRemediationContainer";
import CommentContainer from "../report/CommentContainer";

const DynamicContainer: React.FC<{ issue: IssueItem }> = ({ issue }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkPageBreak = () => {
      const element = elementRef.current;
      if (element) {
        const isPageBreak = element.offsetHeight > window.innerHeight;
        if (isPageBreak) {
          const pageBreakElement = document.createElement("h6");
          const lastElementChild = element.lastElementChild;
          if (lastElementChild) {
            const childrenArray = Array.from(lastElementChild.children);
            const commentElement = childrenArray[
              childrenArray.length - 2
            ] as HTMLDivElement;
            pageBreakElement.style.pageBreakBefore = "always";
            pageBreakElement.style.marginBottom = "20px";
            lastElementChild.insertBefore(pageBreakElement, commentElement);
          }
        }
      }
    };

    checkPageBreak();
  }, []);
  return (
    <>
      <Flex
        ref={elementRef}
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
          border="1px solid #D9D9D9"
          borderRadius={20}
          width="100%"
          mt={5}
          borderBottomWidth={0}
          borderBottomRadius={0}
        >
          <Table variant="unstyled">
            <IssueHead view={"pdf"} />
            <Tbody>
              <IssueRow issue={issue} view={"pdf"} />
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
      </Flex>
      <h6></h6>
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
