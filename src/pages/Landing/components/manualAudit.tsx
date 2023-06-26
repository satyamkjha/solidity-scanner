import React from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  useDisclosure,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import ManualAuditForm from "components/manualAuditForm";
import { useConfig } from "hooks/useConfig";

export default function ManualAudit() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      mx={[0, 0, 0, "auto"]}
      my={[0, 0, 0, 4]}
      alignSelf={"center"}
      sx={{
        w: ["100%", "100%", "100%", "85%"],
        backgroundImage: `url('${assetsURL}background/pattern.png')`,
        borderRadius: 20,
        overflow: "hidden",
        mb: 10,
      }}
    >
      <Flex
        sx={{
          px: 10,
          py: [10, 20],
          w: "100%",
          bg: "rgba(82, 255, 0, 0.06)",
          flexDir: "column",
          alignItems: "center",
        }}
      >
        <Heading as="h1" fontSize="3xl" mb={4} textAlign="center">
          Request for a{" "}
          <Box as="span" sx={{ color: "accent" }}>
            manual audit
          </Box>{" "}
        </Heading>
        <Text
          color="subtle"
          fontSize={["lg", "lg", "xl"]}
          mb={4}
          textAlign="center"
        >
          Talk to our team of security experts for help on securing your Smart
          Contracts
        </Text>
        <Button variant="brand" onClick={onOpen} mt={8} px={10} fontSize="md">
          Request audit
        </Button>
      </Flex>
      <ManualAuditForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export function ManualAuditSkeleton() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      py={24}
      px={[0, 0, 0, 24]}
      my={10}
      w="100%"
      flexDir={"column"}
    >
      <SkeletonText
        startColor="lightgray"
        endColor="#eeeeee"
        noOfLines={[4, 4, 2]}
        spacing="4"
        skeletonHeight="5"
        w={["100%", "100%", "60%"]}
      />
      <Skeleton
        w={"180px"}
        h={"50px"}
        mt={16}
        startColor="lightgray"
        endColor="#eeeeee"
        borderRadius={"15px"}
      ></Skeleton>
    </Flex>
  );
}
