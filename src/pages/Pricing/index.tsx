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

export default function PricingPage() {
  const [tab, setTab] = useState<string>("weekly");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openPublish, setOpenPublish] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
  }, []);

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
                <HStack
                  width="100%"
                  alignItems={"flex-start"}
                  justifyContent="center"
                  pt={14}
                  spacing={5}
                  height="300px"
                >
                  <Text color="#FFFFFF" fontSize="md" fontWeight={300}>
                    Pay Monthly
                  </Text>
                  <Switch size="lg" variant="brand" />
                  <Text fontSize="md" fontWeight={300}>
                    Pay Yearly
                  </Text>
                </HStack>
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
                  {Object.keys(pricingDetails.monthly).map((plan) => {
                    if (plan !== "custom" && plan !== "trial")
                      return (
                        <GridItem
                          sx={{
                            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
                            bg: "#FFFFFF",
                            w: "100%",
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
                              {pricingDetails.monthly[plan].name}
                            </Text>
                          </HStack>
                          <Text height="140px" fontSize="lg" fontWeight={300}>
                            {pricingDetails.monthly[plan].description}
                          </Text>
                          <Heading
                            fontSize="4xl"
                            textAlign="left"
                            lineHeight="title"
                            fontWeight={900}
                            mb={5}
                            width="100%"
                          >
                            {`$ ${pricingDetails.monthly[plan].amount}`}
                          </Heading>
                          <HStack
                            width="100%"
                            alignItems={"center"}
                            justifyContent="flex-start"
                            mb={20}
                          >
                            <Text fontSize="md" fontWeight={300}>
                              Monthly
                            </Text>
                            <Switch size="lg" variant="brand" />
                            <Text fontSize="md" fontWeight={300}>
                              Yearly
                            </Text>
                          </HStack>
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
                            <Image
                              width="30px"
                              height="30px"
                              src="/pricing/coin.svg"
                            />
                            <Text fontSize="2xl" fontWeight={900}>
                              {pricingDetails.monthly[plan].scan_count}
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
                            <Image
                              width="30px"
                              height="30px"
                              src="/icons/detectorIcon.svg"
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
                            variant="gray-outline"
                          >
                            Choose Plan
                          </Button>
                        </GridItem>
                      );
                  })}
                </Grid>
              </Flex>
              <Box
                display={"flex"}
                flexDir={["column", "column", "column", "row"]}
                alignItems="center"
                justifyContent={[
                  "flex-start",
                  "flex-start",
                  "flex-start",
                  "space-between",
                ]}
                w={"90%"}
                h={[
                  "fit-content",
                  "fit-content",
                  "fit-content",
                  "350px",
                  "300px",
                ]}
                mt={20}
                px={10}
                py={[10, 10, 10, 5]}
                borderRadius="25px"
                background={"url('/background/custom_plan_bg.png')"}
                backgroundSize="cover"
                backgroundPosition={"center"}
                backgroundRepeat="no-repeat"
              >
                <VStack
                  w={["100%", "90%", "90%", "60%"]}
                  mb={[10, 10, 10, 0]}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Heading
                    as="h1"
                    color="#B0B7C3"
                    fontFamily={"Inter"}
                    fontSize="3xl"
                    mb={8}
                  >
                    Try our{" "}
                    <Box
                      fontWeight={900}
                      fontFamily={"Poppins"}
                      as="span"
                      color="#FFFFFF"
                    >
                      Enterprise version{" "}
                    </Box>
                    now and get two free scans upon signing up!{" "}
                  </Heading>
                  <Text fontSize="xl" color="#B0B7C3" fontWeight={300}>
                    Enterprise Dealing in Crypto Development or Security with
                    Large Team Size. Get your scan results and reports vetted by
                    our security professionals
                  </Text>
                </VStack>
                <VStack
                  mt={[10, 10, 10, 0]}
                  w={["100%", "90%", "90%", "30%"]}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={7}
                  maxWidth="300px"
                >
                  <HStack
                    width="100%"
                    alignItems={"center"}
                    justifyContent="flex-start"
                    spacing={5}
                  >
                    <Image width="50px" height="50px" src="/pricing/coin.svg" />
                    <Heading fontSize="2xl" color="#FFFFFF" fontWeight={400}>
                      Unlimited Scans
                    </Heading>
                  </HStack>
                  <HStack
                    width="100%"
                    alignItems={"center"}
                    justifyContent="flex-start"
                    spacing={5}
                  >
                    <Image
                      width="50px"
                      height="50px"
                      src="/icons/detectorIcon.svg"
                    />
                    <Heading fontSize="2xl" color="#FFFFFF" fontWeight={400}>
                      All Detectors
                    </Heading>
                  </HStack>

                  <Button
                    width="100%"
                    py={6}
                    color="white"
                    mt={5}
                    variant="outline"
                  >
                    Contact Sales
                  </Button>
                </VStack>
              </Box>
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
                  Lorem ipsum dolor sit amet consectetur. Lectus laoreet
                  facilisis enim id risus nec urna enim. Elementum euismod
                  tincidunt in nibh in lorem eget quisque. Eget euismod etiam
                  tincidunt felis blandit nec.
                </Text>
              </Box>
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
