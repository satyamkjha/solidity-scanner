import { IssueItem } from "common/types";
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
import { actionTaken } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import React, { useEffect, useState } from "react";

const IssueHead: React.FC = () => {
  return (
    <Thead backgroundColor={"#FAFAFA"} color="#8A94A6" fontWeight={100}>
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
  );
};

export default IssueHead;
