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
} from "@chakra-ui/react";
import { IssueDetailObject, IssueItem } from "common/types";
import { actionTaken } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import React, { useEffect } from "react";

const NonDynamicContainer: React.FC<{ issue: IssueDetailObject }> = ({
  issue,
}) => {
  let issueDetails = issue.issue_details;

  let comments_map: {
    [key: string]: IssueItem[];
  } = {};

  const assetsURL = getAssetsURL();

  useEffect(() => {
    Object.keys(issue.common_comments_map).forEach((key) => {
      let tempArray: IssueItem[] = [];
      issue.common_comments_map[key].forEach((bugId) => {
        issueDetails = issueDetails.filter((item) => {
          if (item.bug_id === bugId) {
            tempArray.push(item);
            return false;
          }
          return true;
        });
      });
      comments_map[key] = tempArray;
    });

    comments_map["no_comment"] = issueDetails;
  }, []);

  return (
    <>
      {Object.keys(comments_map).map((comment) => (
        <>
          <TableContainer
            mt={5}
            border="1px solid #D9D9D9"
            borderRadius={20}
            width="100%"
            borderBottomWidth={0}
            borderBottomRadius={0}
          >
            <Table variant="unstyled">
              <Thead
                backgroundColor={"#FAFAFA"}
                color="#8A94A6"
                fontWeight={100}
              >
                <Tr>
                  <Th w="15%">Bug ID</Th>
                  <Th w="70%">
                    <HStack w="100%">
                      <Text w="80%">File Location</Text>
                      <Text w="20%"> Line No</Text>
                    </HStack>
                  </Th>
                  <Th w="15%">Action Taken</Th>
                </Tr>
              </Thead>
              <Tbody>
                {comments_map[comment].map((item) => (
                  <Tr fontWeight={300} borderBottom={"1px solid #D9D9D9"}>
                    <Td w="15%">{item.bug_id}</Td>
                    <Td w="70%">
                      {item.findings.map((finding) => (
                        <HStack w="100%">
                          <Text w="80%">{finding.file_path}</Text>
                          <Text w="20%">
                            {finding.line_nos_start}-{finding.line_nos_end}
                          </Text>
                        </HStack>
                      ))}
                    </Td>
                    <Td w="15%">{actionTaken[item.bug_status]}</Td>
                  </Tr>
                ))}
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
            <HStack spacing={5} mt={10} mb={5}>
              <Image
                src={`${assetsURL}report/comment.svg`}
                height={8}
                width={8}
              />
              <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
                Comments
              </Text>
            </HStack>
            <Text fontWeight={300} fontSize={"16px"} wordBreak="break-all">
              {comment}
            </Text>
          </Flex>
        </>
      ))}
    </>
  );
};

export default NonDynamicContainer;
