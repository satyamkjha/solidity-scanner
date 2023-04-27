import {
  Heading,
  Text,
  Button,
  GridItem,
  HStack,
  Switch,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Plan } from "common/types";
import { CurlyArrowBlue } from "components/icons";
import * as React from "react";
import { useState } from "react";

export interface PricingCardData {
  features: string[];
  name: string;
  price?: string;
  nonfeatures?: string[];
}

interface PricingCardProps {
  globalDuration: "monthly" | "yearly" | "on-demand";
  plan: string;
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
}

export const PricingCard = (props: PricingCardProps) => {
  const { globalDuration, plan, pricingDetails } = props;
  const [duration, setDuration] = useState<"monthly" | "yearly" | "on-demand">(
    globalDuration
  );

  React.useEffect(() => {
    setDuration(globalDuration);
  }, [globalDuration]);

  return (
    <GridItem
      sx={{
        w: "100%",
        h: "800px",
        display: "flex",
        flexDir: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Flex
        sx={{
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
          bg: "#FFFFFF",
          w: "100%",
          maxWidth: "450px",
          h: "800px",
          p: 7,
          borderRadius: 20,
          display: "flex",
          flexDir: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          mb={8}
        >
          <Image
            width="50px"
            height="50px"
            src={`/pricing/${plan}-heading.svg`}
          />
          <Text fontSize="3xl" fontWeight={500}>
            {pricingDetails[duration][plan].name}
          </Text>
        </HStack>
        <Text
          height="140px"
          mb={5}
          w="100%"
          textAlign={"left"}
          fontSize="lg"
          fontWeight={300}
        >
          {pricingDetails[duration][plan].description}
        </Text>
        <Flex
          flexDir="column"
          w="100%"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          h="200px"
        >
          <Flex
            flexDir="row"
            w="100%"
            justifyContent={"flex-start"}
            alignItems={"flex-end"}
            mb={3}
          >
            <Heading fontSize="4xl" lineHeight="title" fontWeight={900}>
              {`$ ${pricingDetails[duration][plan].amount}`}
            </Heading>
            <Text fontSize="4xl" fontWeight={300}>
              /
            </Text>
            <Text mb={2} fontSize="lg" fontWeight={300}>
              {duration}
            </Text>
          </Flex>
          {duration !== "on-demand" && (
            <Flex
              flexDir={"row"}
              position={"relative"}
              alignItems={"flex-start"}
              justifyContent="flex-start"
              width="250px"
            >
              <Text
                color={duration === "monthly" ? "#000000" : "gray.400"}
                fontSize="sm"
                fontWeight={300}
              >
                Pay Monthly
              </Text>
              <Switch
                mx={5}
                size="lg"
                variant={duration === "yearly" ? "accent" : "brand"}
                isChecked={duration === "yearly"}
                onChange={() => {
                  if (duration === "monthly") {
                    setDuration("yearly");
                  } else {
                    setDuration("monthly");
                  }
                }}
              />
              <Text
                color={duration === "yearly" ? "#000000" : "gray.400"}
                fontSize="sm"
                fontWeight={300}
              >
                Pay Yearly
              </Text>
              {duration === "yearly" && (
                <Flex
                  flexDir={"column"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  position={"absolute"}
                  top={"20px"}
                  right={"-10px"}
                >
                  <Box>
                    <CurlyArrowBlue size={50} />
                  </Box>
                  <Text fontSize={"md"} color="#3300FF" fontWeight={900}>
                    You save
                  </Text>
                  <Heading fontSize={"xl"} color="#3300FF">
                    $999
                  </Heading>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>

        <Text
          fontSize="md"
          mb={3}
          color="gray.400"
          fontWeight={300}
          width="100%"
        >
          No of Scans
        </Text>
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          mb={10}
          spacing={2}
        >
          <Image width="30px" height="30px" src="/pricing/coin.svg" />
          <Text fontSize="2xl" fontWeight={900}>
            {pricingDetails[duration][plan].scan_count}
          </Text>
          <Text fontSize="2xl" fontWeight={400}>
            Scans
          </Text>
        </HStack>
        <Text
          fontSize="md"
          mb={3}
          color="gray.400"
          fontWeight={300}
          width="100%"
        >
          Vulnerability Detectors coverage
        </Text>
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          mb={10}
          spacing={2}
        >
          <Image width="30px" height="30px" src="/icons/detectorIcon.svg" />
          <Text fontSize="2xl" fontWeight={400}>
            All Detectors
          </Text>
        </HStack>
        <Button
          width="200px"
          mx="auto"
          py={6}
          alignContent={"center"}
          variant="gray-outline"
        >
          Choose Plan
        </Button>
      </Flex>
    </GridItem>
  );
};
