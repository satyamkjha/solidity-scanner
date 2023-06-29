import { TableContainer, Table, Tbody, Flex } from "@chakra-ui/react";
import { IssueItem } from "common/types";
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

export default DynamicContainer;
