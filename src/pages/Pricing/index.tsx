import React, { useEffect } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Button,
  Text,
  Flex,
  SimpleGrid,
  ButtonProps,
  ScaleFade,
  useDisclosure,
  HStack,
  Image,
  Heading,
  VStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Grid,
  GridItem,
  Switch,
} from "@chakra-ui/react";
import SignupBox from "components/signupBox";
import Infographics from "components/infographics";

import Header from "components/header";
import Footer from "components/footer";
import { PricingCard } from "./components/pricingCard";
import { useState } from "react";
import ContactUs from "components/contactus";
import { HiCheckCircle, HiXCircle, HiInformationCircle } from "react-icons/hi";
import { Plan } from "common/types";
import Auth from "helpers/auth";
import { FaLeaf } from "react-icons/fa";
import { PublishReportInfo } from "components/infoModal";
import { usePricingPlans } from "hooks/usePricingPlans";
import { SpinnerIcon } from "@chakra-ui/icons";
import CustomPlanCard from "./components/customPlanCard";
import PricingTable from "./components/pricingTable";
import { CurlyArrow } from "components/icons";

export default function PricingPage() {
  const [tab, setTab] = useState<string>("weekly");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openPublish, setOpenPublish] = useState(false);
  const location = useLocation();

  const [duration, setDuration] = useState<"monthly" | "yearly" | "on-demand">(
    "monthly"
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
  }, []);

  useEffect(() => {
    if (pricingDetails) {
      console.log(Object.keys(pricingDetails?.pricing_data[duration]));
    }
  }, [duration]);

  const { data: pricingDetails, isLoading } = usePricingPlans();

  return (
    <>
      <Header />
      {isLoading ? (
        <Box
          w={"100%"}
          h="60vh"
          as="section"
          display={[null, null, "flex"]}
          flexDirection="row"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner />{" "}
        </Box>
      ) : (
        pricingDetails && (
          <>
            <Flex
              w="100%"
              flexDir={"column"}
              alignItems={"center"}
              justifyContent="flex-start"
              p={0}
            >
              <Flex
                flexDir={"column"}
                justifyContent="flex-start"
                alignItems={"center"}
                w={"100%"}
                px={[5, 10, 10]}
                py={"100px"}
                h="1000px"
                backgroundColor="#FFFFFF"
                background={"url('/background/pricing_background.jpg')"}
                backgroundSize="cover"
                backgroundPosition={"center"}
                backgroundRepeat="no-repeat"
              >
                <Heading
                  color={"white"}
                  fontSize={["3xl", "3xl", "4xl", "4xl", "5xl"]}
                  mb={10}
                  textAlign="center"
                >
                  Choose the plan that{" "}
                  <Box
                    as="span"
                    sx={{
                      background:
                        "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    fits{" "}
                  </Box>
                  your{" "}
                  <Box
                    as="span"
                    sx={{
                      background:
                        "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    needs.
                  </Box>
                </Heading>
                <Text
                  w={["90%", "90%", "80%", "70%", "60%"]}
                  textAlign="center"
                  fontSize={["md", "lg", "xl"]}
                  color="#B0B7C3"
                  fontWeight={300}
                >
                  Enterprise Dealing in Crypto Development or Security with
                  Large Team Size. Get your scan results and reports vetted by
                  our security professionals
                </Text>
                <Text
                  w={["90%", "90%", "80%", "70%", "60%"]}
                  my={14}
                  textAlign="center"
                  fontSize={["md", "lg", "xl"]}
                  color="#2FF86B"
                  fontWeight={700}
                >
                  Try our trial version now and get two free scans upon signing
                  up!
                </Text>
                <Button width="200px" variant="brand">
                  Start Free Trial
                </Button>
                <Flex
                  flexDir={"row"}
                  position={"relative"}
                  alignItems={"flex-end"}
                  justifyContent="center"
                  pb={10}
                  spacing={5}
                  height="200px"
                  width="400px"
                >
                  <Text
                    color={duration === "monthly" ? "#FFFFFF" : "gray.400"}
                    fontSize="md"
                    fontWeight={300}
                  >
                    Pay Monthly
                  </Text>
                  <Switch
                    mx={5}
                    size="lg"
                    variant="brand"
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
                    color={duration === "yearly" ? "#FFFFFF" : "gray.400"}
                    fontSize="md"
                    fontWeight={300}
                  >
                    Pay Yearly
                  </Text>
                  <Flex
                    flexDir={"column"}
                    justifyItems={""}
                    position={"absolute"}
                    top="70px"
                    right={"0px"}
                  >
                    <CurlyArrow size={70} color={"#FFFFFF"} />
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                w="90%"
                flexDir={"column"}
                alignItems={"center"}
                justifyContent="flex-start"
                backgroundColor="#FFFFFF00"
                mt={"-150px"}
              >
                <Grid
                  backgroundColor="#FFFFFF00"
                  w="100%"
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={5}
                >
                  {Object.keys(pricingDetails.pricing_data["on-demand"]).map(
                    (plan) => {
                      if (plan !== "custom" && plan !== "trial")
                        return (
                          <PricingCard
                            globalDuration={"on-demand"}
                            plan={plan}
                            pricingDetails={pricingDetails.pricing_data}
                          />
                        );
                    }
                  )}
                  {Object.keys(pricingDetails.pricing_data[duration])
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((plan) => {
                      if (plan !== "custom" && plan !== "trial")
                        return (
                          <PricingCard
                            globalDuration={duration}
                            plan={plan}
                            pricingDetails={pricingDetails.pricing_data}
                          />
                        );
                    })}
                </Grid>
              </Flex>
              <CustomPlanCard />
              <PricingTable />
              <Box
                display={"flex"}
                flexDir="column"
                alignItems="center"
                justifyContent={"flex-start"}
                textAlign="center"
                w={"90%"}
                px={[0, 0, 10]}
                my={20}
                py={10}
                borderRadius={20}
                background={"#FFFFFF"}
              >
                <Heading as="h1" fontSize="3xl" mb={4}>
                  Why{" "}
                  <Box textDecoration="underline" as="span" color="#3300FF">
                    SolidityScan ?
                  </Box>{" "}
                </Heading>
                <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
                  Smart-contract scanning tool built to discover vulnerabilities
                  & mitigate risks in your code.
                </Text>
                <Infographics />
                <SignupBox />
              </Box>
            </Flex>
          </>
        )
      )}
      <Footer />
    </>
  );
}
