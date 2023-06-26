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

const CommentContainer: React.FC<{
  comment: string;
}> = ({ comment }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <>
      <HStack mt={5} spacing={5}>
        <Image src={`${assetsURL}report/comment.svg`} height={8} width={8} />
        <Text fontSize="md" fontWeight={"bold"} width={"100%"}>
          Comments
        </Text>
      </HStack>
      <Text fontWeight={300} fontSize={"16px"} wordBreak="break-all">
        {comment}
      </Text>
    </>
  );
};

export default CommentContainer;
