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

const DescriptionRemediationContainer: React.FC<{
  issue_description: string;
  issue_remediation: string;
}> = ({ issue_description, issue_remediation }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <>
      <HStack spacing={5} mb={3}>
        <Image
          src={`${assetsURL}report/issue_description.svg`}
          height={8}
          width={8}
        />
        <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
          Issue Description
        </Text>
      </HStack>
      <DescriptionWrapper>
        <Box
          dangerouslySetInnerHTML={{
            __html: issue_description,
          }}
        />
      </DescriptionWrapper>
      <HStack spacing={5} mt={5} mb={3}>
        <Image
          src={`${assetsURL}report/issue_remediation.svg`}
          height={8}
          width={8}
        />
        <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
          Issue Remediation
        </Text>
      </HStack>
      <DescriptionWrapper>
        <Box
          dangerouslySetInnerHTML={{
            __html: issue_remediation,
          }}
        />
      </DescriptionWrapper>
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

export default DescriptionRemediationContainer;
