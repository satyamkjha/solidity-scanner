import { Thead, Tr, Th, HStack, Text } from "@chakra-ui/react";
import React from "react";

const IssueHead: React.FC<{ view?: string }> = ({ view }) => {
  return (
    <Thead backgroundColor={"#FAFAFA"} color="#8A94A6" fontWeight={100}>
      <Tr>
        <Th w="8%">Bug ID</Th>
        <Th w={"70%"}>
          <HStack w="100%">
            <Text w="85%">File Location</Text>
            <Text w="15%"> Line No</Text>
          </HStack>
        </Th>
        <Th w={"22%"}>Action Taken</Th>
      </Tr>
    </Thead>
  );
};

export default IssueHead;
