import React from "react";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import { User, File, Work, Smile } from "components/icons";

export default function ProductNumbers() {
  return (
    <Box
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      my={8}
      px={[0, 0, 0, 24]}
    >
      <Flex
        sx={{
          w: ["100%"],
          mb: 10,
          mt: 20,
          flexDir: "column",
          alignItems: "center",
        }}
        color="#69C85A"
      >
        <Smile size={50} />
        <Heading as="h5" fontSize="4xl" my={4}>
          28,50,000,000+
        </Heading>
        <Text fontSize="md">
          Direct financial losses due to hacks and exploits
        </Text>
      </Flex>
      <Flex sx={{ w: ["100%", "80%"], flexWrap: "wrap", mx: "auto" }} py={10}>
        <Flex
          sx={{
            w: ["100%", "100%", "33%"],
            mb: 10,
            flexDir: "column",
            alignItems: "center",
          }}
          color="#7737FF"
        >
          <User size={36} />
          <Heading fontSize="3xl" my={4}>
            120 +
          </Heading>
          <Text>Code patterns detected</Text>
        </Flex>
        <Flex
          sx={{
            w: ["100%", "100%", "33%"],
            mb: 10,
            flexDir: "column",
            alignItems: "center",
          }}
          color="#FB5392"
        >
          <File size={36} />
          <Heading fontSize="3xl" my={4}>
            16,000,000+
          </Heading>
          <Text>Line of code scanned</Text>
        </Flex>
        <Flex
          sx={{
            w: ["100%", "100%", "33%"],
            mb: 10,
            flexDir: "column",
            alignItems: "center",
          }}
          color="#FF9900"
        >
          <Work size={36} />
          <Heading fontSize="3xl" my={4}>
            2.2B $
          </Heading>
          <Text>Worth of contracts secured</Text>
        </Flex>
        {/* <Flex
              sx={{
                w: ["100%", "100%", "50%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#69C85A"
            >
              <Smile size={36} />
              <Heading fontSize="3xl" my={4}>
                275,000+
              </Heading>
              <Text>Positive reviews</Text>
            </Flex> */}
      </Flex>
    </Box>
  );
}
