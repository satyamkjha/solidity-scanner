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
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import Auth from "helpers/auth";
import { useHistory } from "react-router-dom";

export const PricingCard: React.FC<{
  globalDuration: "monthly" | "yearly" | "on-demand";
  plan: string;
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
  selectedPlan: string;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  globalDuration,
  plan,
  pricingDetails,
  selectedPlan,
  setSelectedPlan,
}) => {
  const [duration, setDuration] = useState<"monthly" | "yearly" | "on-demand">(
    globalDuration
  );
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const mouse = selectedPlan === plan;

  React.useEffect(() => {
    setDuration(globalDuration);
  }, [globalDuration]);

  const history = useHistory();

  return (
    <GridItem
      sx={{
        w: "100%",
        h: "fit-content",
      }}
      alignSelf={"end"}
      display="flex"
      flexDir="column"
      alignItems={"flex-end"}
      justifyContent="flex-end"
      onClick={() => setSelectedPlan(plan)}
      onMouseOver={() => setSelectedPlan(plan)}
      onMouseLeave={() => setSelectedPlan("")}
    >
      <Flex
        h="80px"
        flexDir="row"
        alignItems={"flex-start"}
        justifyContent="center"
        backgroundColor="#3300FF"
        color="#FFFFFF"
        py={2}
        opacity={mouse ? 1 : 0}
        w="60%"
        borderRadius={20}
      >
        {plan === "on-demand"
          ? "Pay as you Go"
          : plan === "beginner"
          ? "Good Starter Plan"
          : `Save upto ${pricingDetails[duration][plan].discount}`}
      </Flex>
      <Flex
        sx={{
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
          bg: "#FFFFFF",
          w: "100%",
          h: mouse ? "750px" : "700px",
          transition: "height 0.25s",
          border: mouse ? "3px solid  #3300FF" : "none",
          py: 7,
          borderRadius: 20,
          backgroundColor: "#FFFFFF",
          background: `url('${assetsURL}pricing/card_bg_${
            mouse ? "blue" : "grey"
          }.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDir: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          mt: -10,
        }}
      >
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="space-between"
          mb={8}
          pl={7}
        >
          <HStack justifyContent="flex-start">
            <Image
              width="50px"
              height="50px"
              src={`${assetsURL}pricing/${plan}-heading.svg`}
            />
            <Text fontSize="3xl" fontWeight={500}>
              {sentenceCapitalize(pricingDetails[duration][plan].name)}
            </Text>
          </HStack>
          {plan === "pro" && (
            <Image src={`${assetsURL}pricing/popular-badge.svg`} />
          )}
        </HStack>
        <Text
          height="140px"
          mb={5}
          w="100%"
          textAlign={"left"}
          fontSize="lg"
          fontWeight={300}
          px={7}
        >
          {pricingDetails[duration][plan].description}
        </Text>
        <Flex
          flexDir="column"
          w="100%"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          h="200px"
          px={7}
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
          px={7}
        >
          No of Scans
        </Text>
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          mb={10}
          spacing={2}
          px={7}
        >
          <Image
            width="30px"
            height="30px"
            src={`${assetsURL}pricing/coin.svg`}
          />
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
          px={7}
        >
          Vulnerability Detectors coverage
        </Text>
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          mb={10}
          spacing={2}
          px={7}
        >
          <Image
            width="30px"
            height="30px"
            src={`${assetsURL}icons/detectorIcon.svg`}
          />
          <Text fontSize="2xl" fontWeight={400}>
            All Detectors
          </Text>
        </HStack>
        <Button
          width="200px"
          mx="auto"
          py={6}
          alignContent={"center"}
          variant={mouse ? "brand" : "gray-outline"}
          onClick={() => {
            if (Auth.isUserAuthenticated()) {
              history.push("/billing");
            } else {
              history.push("/signin");
            }
          }}
        >
          {mouse ? "Select" : "Choose"} Plan
        </Button>
      </Flex>
    </GridItem>
  );
};
