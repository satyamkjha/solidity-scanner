import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Flex, HStack, Button, Text } from "@chakra-ui/react";
import { Logo } from "components/icons";

export const ReportHeader: React.FC = () => {
  return (
    <>
      <Flex
        sx={{
          w: "100%",
          justifyContent: "center",
          py: 1,
          bg: "brand-dark",
        }}
      >
        <Text fontSize="12px" color="white" fontWeight={700}>
          This product is in beta.
        </Text>
      </Flex>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        maxW="80vw"
        mx="auto"
        py={8}
      >
        <Flex alignItems="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Flex>
        <HStack spacing={4} sx={{ display: ["none", "none", "flex"] }}>
          <RouterLink to="/home">
            <Button variant="brand">Download Report</Button>
          </RouterLink>
        </HStack>
      </Flex>
    </>
  );
};

export default ReportHeader;
