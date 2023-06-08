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

const IssueRow: React.FC<{ issue: IssueItem }> = ({ issue }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Tr fontWeight={300} borderBottom={"1px solid #D9D9D9"}>
      <Td w="15%">{issue.bug_id}</Td>
      <Td w="70%">
        {issue.findings.map((finding) => (
          <HStack w="100%">
            <Text w="80%">{finding.file_path}</Text>
            <Text w="20%">
              {finding.line_nos_start}-{finding.line_nos_end}
            </Text>
          </HStack>
        ))}
      </Td>
      <Td w="15%">
        <HStack>
          <Image src={`${assetsURL}icons/${issue.bug_status}_color.svg`} />
          <Text>{actionTaken[issue.bug_status]}</Text>
        </HStack>
      </Td>
    </Tr>
  );
};

export default IssueRow;
