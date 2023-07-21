import React from "react";
import { Flex, Text, Heading } from "@chakra-ui/react";
import { shortenNumber } from "common/functions";

const HackCummulativeData: React.FC<{ filteredData: any }> = ({
  filteredData,
}) => {
  const headingData = [
    {
      title: "The total amount hacked ",
      data: filteredData.amount
        ? `$${shortenNumber(filteredData.amount)}`
        : "0",
    },
    { title: "Number of hacks", data: filteredData.no_of_attacks },
  ];

  return (
    <Flex
      sx={{
        mt: 7,
        px: [3, 3, 0],
        w: "fit-content",
        justifyContent: "flex-start",
        flexDir: "row",
        flexWrap: ["wrap", "wrap", "nowrap"],
      }}
    >
      {headingData.map((item) => (
        <Flex
          sx={{
            flexDir: "column",
            alignItems: "flex-start",
            w: ["50%", "50%", "fit-content"],
            mr: 28,
          }}
        >
          <Text color={"#D9D9D9"} fontSize="sm" fontWeight={400}>
            {item.title}
          </Text>
          <Heading
            as="h1"
            color="#FFFFFF"
            mt={2}
            fontSize={["3xl", "4xl"]}
            mb={8}
          >
            {item.data}
          </Heading>
        </Flex>
      ))}
    </Flex>
  );
};

export default HackCummulativeData;
