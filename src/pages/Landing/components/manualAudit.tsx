import React from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import ManualAuditForm from "components/manualAuditForm";

export default function ManualAudit() {
  const assetsURL = getAssetsURL();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      mx={[0, 0, 0, 24]}
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
        <Button variant="brand" onClick={onOpen} mt={8}>
          Request audit
        </Button>
      </Flex>
      <ManualAuditForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
