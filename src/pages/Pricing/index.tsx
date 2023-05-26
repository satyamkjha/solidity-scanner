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
import Auth from "helpers/auth";
import { usePricingPlans } from "hooks/usePricingPlans";
import CustomPlanCard from "./components/customPlanCard";
import PricingTable from "./components/pricingTable";
import { CurlyArrowDown, CurlyArrowUp } from "components/icons";
import { getAssetsURL } from "helpers/helperFunction";
import { pricing_table_data } from "common/values";

const PricingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const location = useLocation();
  const history = useHistory();

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

  const { data: pricingDetails, isLoading } = usePricingPlans();

  const assetsURL = getAssetsURL();

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
                py={"60px"}
                h={["1100px", "1000px", "800px", "720px", "720px"]}
                backgroundColor="#FFFFFF"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                background={[
                  `url('${assetsURL}pricing/pricing_bg_xs.jpg')`,
                  `url('${assetsURL}pricing/pricing_bg_sm.jpg')`,
                  `url('${assetsURL}pricing/pricing_bg_md.jpg')`,
                  `url('${assetsURL}pricing/pricing_bg_lg.jpg')`,
                  `url('${assetsURL}pricing/pricing_bg_xl.jpg')`,
                ]}
              >
                <Heading
                  color={"white"}
                  fontSize={["3xl", "3xl", "4xl", "4xl", "5xl"]}
                  mb={7}
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
                  my={8}
                  textAlign="center"
                  fontSize={["md", "lg", "xl"]}
                  color="#2FF86B"
                  fontWeight={700}
                >
                  Try our trial version now and get two free scans upon signing
                  up!
                </Text>
                <Button
                  width="200px"
                  onClick={() => history.push("/signin")}
                  variant="brand"
                >
                  Start Free Trial
                </Button>
                <Flex
                  flexDir={"row"}
                  position={"relative"}
                  py={10}
                  alignItems={["flex-start", "flex-start", "flex-end"]}
                  justifyContent="center"
                  height={["100px", "100px", "140px"]}
                  width="300px"
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
                  {duration === "yearly" && (
                    <Flex
                      flexDir={"column"}
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                      position={"absolute"}
                      top={["70px", "70px", "-30px"]}
                      right={["150px", "70px", "-100px"]}
                    >
                      <Box display={["block", "block", "none"]}>
                        <CurlyArrowUp size={50} />
                      </Box>
                      <Text
                        fontSize={"md"}
                        ml={[-10, -10, 10]}
                        color="gray.200"
                        fontWeight={900}
                      >
                        Just pay for
                      </Text>
                      <Heading
                        ml={[-10, -10, 10]}
                        fontSize={"md"}
                        color="#FFFFFF"
                      >
                        10 MONTHS
                      </Heading>
                      <Box display={["none", "none", "block"]}>
                        <CurlyArrowDown size={70} />
                      </Box>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex
                w={["95%", "95%", "95%", "95%", "90%"]}
                flexDir={"column"}
                maxW="1920px"
                h={["fit-content", "fit-content", "fit-content", "850px"]}
                alignItems={"center"}
                justifyContent="flex-end"
                backgroundColor="#FFFFFF00"
                mt={"-300px"}
              >
                <Grid
                  backgroundColor="#FFFFFF00"
                  w="100%"
                  h="fit-content"
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(4, 1fr)",
                    "repeat(4, 1fr)",
                  ]}
                  gap={6}
                >
                  {Object.keys(pricingDetails.pricing_data["on-demand"]).map(
                    (plan) => {
                      if (plan !== "custom" && plan !== "trial")
                        return (
                          <PricingCard
                            globalDuration={"on-demand"}
                            plan={plan}
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
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
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                            pricingDetails={pricingDetails.pricing_data}
                          />
                        );
                    })}
                </Grid>
              </Flex>
              <CustomPlanCard />
              <PricingTable
                pricing_data={pricingDetails.pricing_data}
                pricing_table_data={pricing_table_data}
              />
              <Box
                display={"flex"}
                flexDir="column"
                alignItems="center"
                justifyContent={"flex-start"}
                textAlign="center"
                w={"90%"}
                maxW="1920px"
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
};

export default PricingPage;
