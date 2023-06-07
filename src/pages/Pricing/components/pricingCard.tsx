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
  useDisclosure,
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
import PaymentModal from "pages/Billing/PaymentModal";
import PricingDetailsList from "./PricingDetailsList";

export const PricingCard: React.FC<{
  page: "billing" | "pricing";
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
  page,
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

  const { isOpen, onClose, onOpen } = useDisclosure();

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
        {pricingDetails[duration][plan].discount?.banner}
      </Flex>
      <Flex
        sx={{
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
          bg: "#FFFFFF",
          w: "100%",
          h: mouse ? "750px" : "700px",
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
            my={1}
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
              mt={2}
              flexDir={"row"}
              position={"relative"}
              alignItems={"flex-start"}
              justifyContent="flex-start"
            >
              <Text
                color={duration === "monthly" ? "#000000" : "#7F7F7F"}
                fontSize="sm"
                fontWeight={300}
              >
                Monthly
              </Text>
              <Switch
                mx={4}
                size="md"
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
                color={duration === "yearly" ? "#000000" : "#7F7F7F"}
                fontSize="sm"
                fontWeight={300}
              >
                Yearly
              </Text>
              {duration === "yearly" && (
                <Flex
                  flexDir={"column"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  position={"absolute"}
                  top={6}
                  right={"-60px"}
                >
                  <CurlyArrowBlue size={50} />
                  <Flex align="center">
                    <Text fontSize={"sm"} color="#3300FF" fontWeight={900}>
                      You Save&nbsp;
                    </Text>
                    <Heading fontSize={"xl"} color="#3300FF">
                      $ {pricingDetails[duration][plan].discount?.amount}.00
                    </Heading>
                  </Flex>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
        <Flex
          w="100%"
          flexDir={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <PricingDetailsList
            selectedPackage={plan}
            plan={pricingDetails[duration][plan]}
          />
        </Flex>

        <Button
          width="200px"
          mx="auto"
          py={6}
          alignContent={"center"}
          variant={mouse ? "brand" : "gray-outline"}
          onClick={() => {
            if ((page = "billing")) {
              onOpen();
            } else {
              if (Auth.isUserAuthenticated()) {
                history.push("/billing");
              } else {
                history.push("/signin");
              }
            }
          }}
        >
          {mouse ? "Select Plan" : "Choose Plan"}
        </Button>
      </Flex>
      <PaymentModal
        globalDuration={duration}
        selectedPlan={plan}
        pricingDetails={pricingDetails}
        isOpen={isOpen}
        onClose={onClose}
      />
    </GridItem>
  );
};
