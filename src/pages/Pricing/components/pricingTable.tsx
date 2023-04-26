import { Heading, Box, Text } from "@chakra-ui/react";
import React from "react";

const PricingTable = () => {
  return (
    <Box
      display={"flex"}
      flexDir="column"
      alignItems="center"
      justifyContent={"flex-start"}
      w={"95%"}
      textAlign="center"
      px={[0, 0, 10]}
      my={20}
      py={10}
      borderRadius={20}
      background={"#FFFFFF"}
    >
      <Heading as="h1" fontSize="3xl" mb={8}>
        Exploring SolidityScan's{" "}
        <Box as="span" color="#3300FF">
          Capabilities{" "}
        </Box>
        and{" "}
        <Box textDecoration="underline" as="span" color="#3300FF">
          Analysis Features{" "}
        </Box>
      </Heading>
      <Text
        color="subtle"
        width={["95%", "90%", "70%"]}
        fontSize={["lg", "lg", "xl"]}
        mb={4}
      >
        Lorem ipsum dolor sit amet consectetur. Lectus laoreet facilisis enim id
        risus nec urna enim. Elementum euismod tincidunt in nibh in lorem eget
        quisque. Eget euismod etiam tincidunt felis blandit nec.
      </Text>
    </Box>
  );
};

export default PricingTable;
