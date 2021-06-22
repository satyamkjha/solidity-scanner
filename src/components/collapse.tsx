import React from "react";
import useCollapse from "react-collapsed";
import { Text, Box, Flex, BoxProps } from "@chakra-ui/react";

type CollapseProps = {
  title: string;
};
export default function Collapse(props: CollapseProps & BoxProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <Box
      p={2}
      py={3}
      backgroundColor="white"
      css={{
        boxShadow: "2px 2px 10px -5px rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: 20,
      }}
      {...props}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        onClick={getToggleProps().onClick}
        css={{ cursor: "pointer" }}
      >
        <Text fontSize="xl" fontWeight={600} px={3} my={2}>
          {props.title}
        </Text>
        <Text
          fontSize="xl"
          px={2}
          css={{
            opacity: 0.8,
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "all 0.3s",
          }}
        >
          ►
        </Text>
      </Flex>
      <Flex width="100%" {...getCollapseProps()}>
        <Text fontSize="md" fontWeight={400} px={3} my={2}>
          {props.children}
        </Text>
      </Flex>
    </Box>
  );
}
