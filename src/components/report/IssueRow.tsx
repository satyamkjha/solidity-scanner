import { IssueItem } from "common/types";
import { Tr, HStack, Text, Td, Image } from "@chakra-ui/react";
import { actionTaken } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import React from "react";

const IssueRow: React.FC<{
  issue: IssueItem;
  view?: string;
}> = ({ issue, view }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Tr
      fontWeight={300}
      borderBottom={"1px solid #D9D9D9"}
      w={"100%"}
      overflowX={"hidden"}
    >
      <Td w="8%">{issue.bug_id}</Td>
      <Td w={"70%"}>
        {issue.findings.map((finding) => (
          <HStack w="100%">
            <Text w="85%" whiteSpace="pre-line" wordBreak="break-word">
              {finding.file_path}
            </Text>
            <Text w="15%">
              {finding.line_nos_start}-{finding.line_nos_end}
            </Text>
          </HStack>
        ))}
      </Td>
      <Td w={"22%"}>
        <HStack>
          <Image src={`${assetsURL}icons/${issue.bug_status}_color.svg`} />
          <Text>{actionTaken[issue.bug_status]}</Text>
        </HStack>
      </Td>
    </Tr>
  );
};

export default IssueRow;
