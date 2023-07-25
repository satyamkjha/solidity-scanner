import {
  Flex,
  Image,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { SeverityIcon } from "components/icons";
import React from "react";
import { formattedDate } from "common/functions";
import { getAssetsURL } from "helpers/helperFunction";
import { attackMethodColor } from "common/values";

const HackCard: React.FC<{ hackData: any }> = ({ hackData }) => {
  const assetsURL = getAssetsURL();
  const nonIntegerPattern = /[^0-9$]/;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDir="column"
      w={["100%", "100%", "50%", "calc(33.33% - 15px)"]}
      maxW={["550px"]}
      minW={["0px", "300px"]}
      height="250px"
      borderRadius="25px"
      mr={"15px"}
      mb={"15px"}
      p={7}
      background={"#FFFFFF"}
    >
      <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          height="fit-content"
        >
          <Heading mb={3} fontSize="lg">
            {hackData.target}
          </Heading>
          <HStack maxW={"40%"}>
            <SeverityIcon
              variant={attackMethodColor[hackData.attacked_method] || "low"}
            />
            <Text fontSize="sm" textAlign="right">
              {hackData.attacked_method}
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="xs" color="#78909C">
          Total Loss
        </Text>
        <HStack mt={5} w={["100%", "100%", "80%"]} flexWrap="wrap">
          <HStack mr={3}>
            <Tooltip label={hackData.chain}>
              <Image
                mr={0}
                src={`${assetsURL}blockscan/${hackData.chain.toLowerCase()}.svg`}
                alt={"Unknown"}
                h={"26px"}
                w={"26px"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `${assetsURL}blockscan/other.svg`;
                }}
              />
            </Tooltip>
            <Heading mb={3} fontSize="lg">
              {nonIntegerPattern.test(hackData.amount)
                ? hackData.amount
                : "$ " + Number(hackData.amount).toLocaleString()}
            </Heading>
          </HStack>
        </HStack>
      </VStack>

      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        height="fit-content"
      >
        <Text color="#78909C">{formattedDate(new Date(hackData.date))}</Text>
        {hackData.reference && hackData.reference !== "-" && (
          <Link
            variant="text"
            color="#3300FF"
            href={hackData.reference.split(",")[0]}
            target={"_blank"}
          >
            Learn More
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default HackCard;
