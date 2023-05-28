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
  VStack,
} from "@chakra-ui/react";
import { Plan } from "common/types";
import { CurlyArrowBlue } from "components/icons";
import * as React from "react";
import { useState } from "react";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import Auth from "helpers/auth";
import { useHistory } from "react-router-dom";
import { useConfig } from "hooks/useConfig";
import { pricing_card_description_data } from "common/values";

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
          h: mouse ? "800px" : "750px",
          transition: "height 0.5s",
          border: mouse ? "3px solid  #3300FF" : "none",
          py: 4,
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
          mb={3}
          pl={7}
        >
          <HStack justifyContent="flex-start">
            <Image
              width="35px"
              height="35px"
              src={`${assetsURL}pricing/${plan}-heading.svg`}
            />
            <Text fontSize="2xl" fontWeight={500}>
              {sentenceCapitalize(pricingDetails[duration][plan].name)}
            </Text>
          </HStack>
          {plan === "pro" && (
            <Image src={`${assetsURL}pricing/popular-badge.svg`} />
          )}
        </HStack>
        <Text
          height="150px"
          w="100%"
          textAlign={"left"}
          fontSize="sm"
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
            mb={1}
          >
            <Heading fontSize="2xl" lineHeight="title" fontWeight={900}>
              {`$ ${pricingDetails[duration][plan].amount}`}
            </Heading>
            <Text fontSize="2xl" fontWeight={300}>
              /
            </Text>
            <Text mb={1} fontSize="md" fontWeight={300}>
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
          fontSize="sm"
          mb={1}
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
          mb={5}
          spacing={2}
          px={7}
        >
          <Image
            width="20px"
            height="20px"
            src={`${assetsURL}pricing/coin.svg`}
          />
          <Text fontSize="lg" fontWeight={900}>
            {pricingDetails[duration][plan].scan_count}
          </Text>
          <Text fontSize="lg" fontWeight={400}>
            Scans
          </Text>
        </HStack>
        {pricing_card_description_data.map((item) => (
          <VStack
            width="100%"
            pl={7}
            alignItems={"flex-start"}
            mb={4}
            spacing={0}
            opacity={
              item.key === "detector"
                ? 1
                : item.key === "github" || item.key === "actions"
                ? pricingDetails[duration][plan].github
                  ? 1
                  : 0.5
                : item.key === "report" || item.key === "private"
                ? pricingDetails[duration][plan].publishable_report
                  ? 1
                  : 0.5
                : 0.5
            }
          >
            <Text
              fontSize="sm"
              color="gray.400"
              textAlign={"left"}
              fontWeight={300}
              width="100%"
            >
              {item.description}
            </Text>
            <HStack
              width="100%"
              alignItems={"center"}
              justifyContent="flex-start"
              spacing={2}
            >
              <Image
                width="20px"
                height="20px"
                src={`${assetsURL}${item.icon}`}
              />
              <Text fontSize="lg" fontWeight={400}>
                {item.title}
              </Text>
            </HStack>
          </VStack>
        ))}

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
          {mouse ? "Buy Now" : "Choose Plan"}
        </Button>
      </Flex>
    </GridItem>
  );
};
