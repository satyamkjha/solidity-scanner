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
  useDisclosure,
} from "@chakra-ui/react";
import { Plan } from "common/types";
import { CurlyArrowBlue, CheckBadge } from "components/icons";
import * as React from "react";
import { useState } from "react";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import Auth from "helpers/auth";
import { useHistory } from "react-router-dom";
import { useConfig } from "hooks/useConfig";
import PricingDetailsList from "./PricingDetailsList";
import PaymentModal from "pages/Billing/components/PaymentModal";

export const PricingCard: React.FC<{
  page: "billing" | "pricing";
  globalDuration: "monthly" | "yearly" | "ondemand";
  plan: string;
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
  currentPackage?: string;
  selectedPlan: string;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  page,
  globalDuration,
  plan,
  pricingDetails,
  currentPackage,
  selectedPlan,
  setSelectedPlan,
}) => {
  const [duration, setDuration] = useState<"monthly" | "yearly" | "ondemand">(
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
      {currentPackage === plan ? (
        <Flex
          h="80px"
          flexDir="row"
          fontWeight={600}
          alignItems={"flex-start"}
          justifyContent="flex-start"
          backgroundColor="brand-dark"
          py={2}
          px={4}
          ml={"auto"}
          w="100%"
          borderRadius={20}
        >
          <CheckBadge />
          <Text ml={2}>Currently Subscribed</Text>
        </Flex>
      ) : (
        <Flex
          h="80px"
          flexDir="row"
          alignItems={"flex-start"}
          justifyContent="center"
          backgroundColor="#3300FF"
          color="#FFFFFF"
          py={2}
          opacity={mouse ? 1 : 0}
          ml={"auto"}
          w="60%"
          borderRadius={20}
        >
          {JSON.parse(pricingDetails[duration][plan].discount).banner}
        </Flex>
      )}
      <Flex
        sx={{
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
          bg: "#FFFFFF",
          w: "100%",
          border:
            currentPackage === plan
              ? "3px solid  #38CB89"
              : "3px solid  #FFFFFF",
          py: 4,
          borderRadius: 20,
          backgroundColor: "#FFFFFF",
          backgroundImage: `url('${assetsURL}pricing/card_bg_${
            mouse ? "blue" : "grey"
          }.png')`,
          transition: "background-image 0.5s ease-in-out",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDir: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          mt: -10,
          _hover: {
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.4)",
            border:
              currentPackage === plan
                ? "3px solid  #38CB89"
                : "3px solid  #3300FF",
          },
        }}
      >
        <Flex
          width="100%"
          alignItems={"center"}
          mb={3}
          pl={page === "pricing" ? 7 : 4}
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
            <Image
              w="50%"
              ml={"auto"}
              mr={"-3px"}
              src={`${assetsURL}pricing/popular-badge.svg`}
            />
          )}
        </Flex>
        <Text
          height="100px"
          w="100%"
          textAlign={"left"}
          fontSize="sm"
          fontWeight={300}
          px={page === "pricing" ? 7 : 4}
        >
          {pricingDetails[duration][plan].description}
        </Text>

        <Flex
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          position={"relative"}
          h="120px"
          w="100%"
          px={page === "pricing" ? 7 : 4}
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
          {duration !== "ondemand" && (
            <>
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
              </Flex>
              {duration === "yearly" && (
                <Flex
                  flexDir={"column"}
                  position={"absolute"}
                  top={"70px"}
                  left={32}
                >
                  <Flex ml={4}>
                    <CurlyArrowBlue size={50} />
                  </Flex>
                  <Flex alignItems="flex-end" mt={-1} ml={-2}>
                    <Text fontSize={"xs"} color="#3300FF" fontWeight={900}>
                      You Save&nbsp;
                    </Text>
                    <Heading fontSize={"lg"} color="#3300FF">
                      $
                      {parseFloat(
                        JSON.parse(pricingDetails[duration][plan].discount)
                          .amount
                      ).toFixed(2)}
                    </Heading>
                  </Flex>
                </Flex>
              )}
            </>
          )}
        </Flex>
        <Flex
          w="100%"
          flexDir={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <PricingDetailsList
            plan={pricingDetails[duration][plan]}
            page={page}
          />
        </Flex>

        {currentPackage === plan ? (
          <Box h={"50px"} mt={6}></Box>
        ) : (
          <Button
            w="200px"
            h={"50px"}
            mt={6}
            alignContent={"center"}
            variant={mouse ? "brand" : "gray-outline"}
            onClick={() => {
              if (page === "billing") {
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
        )}
      </Flex>
      {isOpen && (
        <PaymentModal
          globalDuration={duration}
          selectedPlan={plan}
          pricingDetails={pricingDetails}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </GridItem>
  );
};
