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
  Link,
  ScaleFade,
  useDisclosure,
  HStack,
  Image,
  Heading,
  ListIcon,
  Fade,
  VStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import { PricingCard } from "./components/pricingCard";
import { useState } from "react";
import ContactUs from "components/contactus";
import { HiCheckCircle, HiXCircle, HiInformationCircle } from "react-icons/hi";
import { usePricingPlans } from "hooks/usePricingPlans";
import { Plan } from "common/types";
import Auth from "helpers/auth";
import { FaLeaf } from "react-icons/fa";
import { PublishReportInfo } from "components/infoModal";

export default function PricingPage() {
  const [tab, setTab] = useState<string>("weekly");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: plans } = usePricingPlans();
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

  return (
    <>
      <Header />
      <Container maxW="100vw" color="black" alignItems={"center"}>
        <Flex
          maxW="7xl"
          mx="auto"
          flexDirection="column"
          alignItems="center"
          py={7}
          px={4}
          background="rgba(82, 255, 0, 0.04)"
          backgroundImage="url(./pattern.png)"
          borderRadius="3xl"
        >
          <Text
            fontSize="4xl"
            fontWeight="700"
            my={1}
            color="#323B4B"
            textAlign="center"
            lineHeight="title"
          >
            Pricing
          </Text>
          <Text
            color="#323B4B"
            width={["100%", "50%"]}
            lineHeight="title"
            fontWeight="500"
            textAlign="center"
            fontSize="lg"
            fontFamily="Inter"
            my={3}
          >
            Signup for a trial and get two scans free.
          </Text>
          {/* <Flex
            flexDirection="row"
            alignItems="center"
            mt={7}
            px={2}
            py={2}
            background="#FFFFFF"
            borderRadius="full"
            maxW="85vw"
          > */}
          {/* <ActionButton
              onClick={() => setTab("weekly")}
              fontSize="lg"
              py={1}
              px={10}
              borderRadius="full"
              mr={1}
              variant={tab === "weekly" ? "brand" : "ghost"}
            >
              Weekly
            </ActionButton> */}
          {/* <ActionButton
              onClick={() => setTab("monthly")}
              fontSize="lg"
              py={1}
              px={10}
              borderRadius="full"
              mx={1}
              variant={tab === "monthly" ? "brand" : "ghost"}
            >
              Monthly
            </ActionButton> */}
          {/* <ActionButton
              onClick={() => setTab("yearly")}
              fontSize="lg"
              py={1}
              px={10}
              borderRadius="full"
              ml={1}
              variant={tab === "yearly" ? "brand" : "ghost"}
            >
              Yearly
            </ActionButton> */}
          {/* </Flex> */}
        </Flex>

        {plans && (
          <ScaleFade initialScale={0.9} in={tab === "weekly"}>
            <Box
              w={"100%"}
              as="section"
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box
                w={"90vw"}
                as="section"
                py="14"
                display="flex"
                flexDirection="row"
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Flex
                  as={"div"}
                  flexDirection="column"
                  justifyContent={"flex-start"}
                  alignContent={"center"}
                  mb={"100px"}
                  w={"18vw"}
                >
                  <Box
                    as="div"
                    h={"120px"}
                    alignItems="center"
                    px={"100px"}
                    display="flex"
                    flexDirection="row"
                  >
                    <Text
                      fontSize="2xl"
                      fontWeight="700"
                      my={1}
                      textAlign="center"
                      lineHeight="title"
                    >
                      Packages
                    </Text>
                  </Box>
                  <Box
                    as="div"
                    h={"169px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderTopLeftRadius={"xl"}
                    border="2px solid #D6D6D6"
                    borderRightWidth={0}
                    borderBottomWidth={0}
                  >
                    <HStack spacing={1}>
                      <VStack spacing={1} align={"left"}>
                        <Text
                          ml={15}
                          fontSize="md"
                          textAlign="center"
                          lineHeight="title"
                        >
                          Choose the subscription that suits you best
                        </Text>
                        {/* <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Publish your reports to a public url
                        </Text> */}
                      </VStack>
                    </HStack>
                  </Box>
                  <Box
                    as="div"
                    h={"120px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderLeft="2px solid #D6D6D6"
                    backgroundColor={"#FAFAFB"}
                  >
                    <HStack spacing={1}>
                      <Image
                        src="/pricing/coin.svg"
                        h={"30px"}
                        w={"30px"}
                        mx="auto"
                        mr={4}
                      />
                      <VStack spacing={1} align={"left"}>
                        <Text fontSize="md" textAlign="left" lineHeight="title">
                          Scan Credit
                        </Text>
                        <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Use allotted credits to scan your solidity source code
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <Box
                    as="div"
                    h={"120px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderLeft="2px solid #D6D6D6"
                  >
                    <HStack spacing={1}>
                      <Image
                        src="/pricing/score-icon.svg"
                        h={"30px"}
                        w={"30px"}
                        mx="auto"
                        mr={4}
                      />
                      <VStack spacing={1} align={"left"}>
                        <Text fontSize="md" textAlign="left" lineHeight="title">
                          Security Score
                        </Text>
                        <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Get a security score tagged to all your scans
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <Box
                    as="div"
                    h={"120px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderLeft="2px solid #D6D6D6"
                    backgroundColor={"#FAFAFB"}
                  >
                    <HStack spacing={1}>
                      <Image
                        src="/pricing/result-icon.svg"
                        h={"30px"}
                        w={"30px"}
                        mx="auto"
                        mr={4}
                      />
                      <VStack spacing={1} align={"left"}>
                        <HStack>
                          <Text
                            fontSize="md"
                            textAlign="left"
                            lineHeight="title"
                          >
                            Detailed Result
                          </Text>
                          <Popover>
                            <PopoverTrigger>
                              <HiInformationCircle color={"#808080"} />
                            </PopoverTrigger>
                            <PopoverContent p={5}>
                              <PopoverArrow />
                              <PopoverCloseButton />

                              <PopoverBody>
                                <Text
                                  fontSize="sm"
                                  textAlign="left"
                                  lineHeight="title"
                                  fontWeight={"300"}
                                  mb={4}
                                >
                                  We can help you find bugs in your code and
                                  provide you with the solution for it
                                </Text>
                                <Image src="/carousel/Screenshot 2.png" />
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </HStack>
                        <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Get a detailed explanation of the issues
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <Box
                    as="div"
                    h={"120px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderLeft="2px solid #D6D6D6"
                  >
                    <HStack spacing={1}>
                      <Image
                        src="/pricing/github.svg"
                        h={"30px"}
                        w={"30px"}
                        mx="auto"
                        mr={4}
                      />
                      <VStack spacing={1} align={"left"}>
                        <Text fontSize="md" textAlign="left" lineHeight="title">
                          Private Github
                        </Text>
                        <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Scan Private Github Repositories
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <Box
                    as="div"
                    h={"120px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderLeft="2px solid #D6D6D6"
                    backgroundColor={"#FAFAFB"}
                  >
                    <HStack spacing={1}>
                      <Image
                        src="/pricing/report.svg"
                        h={"30px"}
                        w={"30px"}
                        mx="auto"
                        mr={4}
                      />
                      <VStack spacing={1} align={"left"}>
                        <HStack>
                          <Text
                            fontSize="md"
                            textAlign="left"
                            lineHeight="title"
                          >
                            Generate Report
                          </Text>
                          <Popover>
                            <PopoverTrigger>
                              <HiInformationCircle color={"#808080"} />
                            </PopoverTrigger>
                            <PopoverContent p={5}>
                              <PopoverArrow />
                              <PopoverCloseButton />

                              <PopoverBody>
                                <Text
                                  fontSize="sm"
                                  textAlign="left"
                                  lineHeight="title"
                                  fontWeight={"300"}
                                  mb={4}
                                >
                                  Generate a detailed report for the scan
                                </Text>
                                <Image src="/carousel/Screenshot 5.png" />
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </HStack>
                        <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Generate Report for the scans that you have completed
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <Box
                    as="div"
                    h={"120px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderLeft="2px solid #D6D6D6"
                  >
                    <HStack spacing={1}>
                      <Image
                        src="/pricing/publish.svg"
                        h={"30px"}
                        w={"30px"}
                        mx="auto"
                        mr={4}
                      />
                      <VStack spacing={1} align={"left"}>
                        <HStack>
                          <Text
                            fontSize="md"
                            textAlign="left"
                            lineHeight="title"
                          >
                            Publish Reports
                          </Text>
                          <Popover>
                            <PopoverTrigger>
                              <HiInformationCircle color={"#808080"} />
                            </PopoverTrigger>
                            <PopoverContent p={5}>
                              <PopoverArrow />
                              <PopoverCloseButton />

                              <PopoverBody>
                                <Text
                                  fontSize="sm"
                                  textAlign="left"
                                  lineHeight="title"
                                  fontWeight={"300"}
                                  mb={4}
                                >
                                  You can publish a detailed report of the scan
                                  conducted and then share it across your team
                                  or organization using a public URL.
                                </Text>
                                <Image src="/carousel/Screenshot 5.png" />
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </HStack>
                        <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Publish your reports to a public url
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <Box
                    as="div"
                    h={"120px"}
                    px={"20px"}
                    display="flex"
                    flexDirection="row"
                    borderLeft="2px solid #D6D6D6"
                    borderBottom="2px solid #D6D6D6"
                    borderBottomLeftRadius={"xl"}
                    backgroundColor={"#FAFAFB"}
                  >
                    <HStack spacing={1}>
                      <Image
                        src="/pricing/support-icon.svg"
                        h={"30px"}
                        w={"30px"}
                        mx="auto"
                        mr={4}
                      />
                      <VStack spacing={1} align={"left"}>
                        <HStack>
                          <Text
                            fontSize="md"
                            textAlign="left"
                            lineHeight="title"
                          >
                            White Glove Services
                          </Text>
                          {/* <Popover>
                            <PopoverTrigger>
                              <HiInformationCircle color={"#808080"} />
                            </PopoverTrigger>
                            <PopoverContent p={5}>
                              <PopoverArrow />
                              <PopoverCloseButton />

                              <PopoverBody>
                                <Text
                                  fontSize="sm"
                                  textAlign="left"
                                  lineHeight="title"
                                  fontWeight={"300"}
                                  mb={4}
                                >
                                  You can publish a detailed report of the scan
                                  conducted and then share it across your team
                                  or organization using a public URL.
                                </Text>
                                <Image src="/carousel/Screenshot 5.png" />
                              </PopoverBody>
                            </PopoverContent>
                          </Popover> */}
                        </HStack>
                        <Text
                          fontSize="xs"
                          textAlign="left"
                          lineHeight="title"
                          fontWeight={"300"}
                        >
                          Verify your results and reports by web3 security
                          experts
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Flex>
                <SimpleGrid
                  columns={6}
                  maxW="7xl"
                  justifyItems="center"
                  alignItems="flex-start"
                  w={"72vw"}
                >
                  {Object.keys(plans.monthly).map((plan) => (
                    <PricingColumn
                      plan={plan}
                      planData={plans.monthly[plan]}
                      setSelectedPlan={setSelectedPlan}
                      selectedPlan={selectedPlan}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            </Box>
          </ScaleFade>
        )}
      </Container>
      <ContactUs isOpen={isOpen} onClose={onClose} />
      <PublishReportInfo
        isOpen={openPublish}
        onClose={() => {
          setOpenPublish(false);
        }}
      />
      <Footer />
    </>
  );
}

export const ActionButton = (props: ButtonProps) => (
  <Button
    variant="brand"
    size="lg"
    w="full"
    fontWeight="extrabold"
    py={{ md: "8" }}
    {...props}
  />
);

export const PricingColumn: React.FC<{
  plan: string;
  planData: Plan;
  selectedPlan: string;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
}> = ({ plan, planData, selectedPlan, setSelectedPlan }) => {
  const successColor = "#289F4C";
  const greyColor = "#808080";

  const history = useHistory();
  const mouse = selectedPlan === plan;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex
      as={"div"}
      onMouseOver={() => setSelectedPlan(plan)}
      onMouseLeave={() => setSelectedPlan("")}
      flexDirection="column"
      justifyContent={"flex-start"}
      alignContent={"flex-start"}
      overflow={"hidden"}
      width={mouse ? "14vw" : "12vw"}
      mb={mouse ? "0px" : "100px"}
      border={`2px solid ${mouse ? "#3E15F4" : "#D6D6D6"}`}
      _notLast={{
        borderRightWidth: mouse ? "2px" : "0px",
      }}
      _last={{
        borderTopRightRadius: mouse ? "24px" : "12px",
        borderBottomRightRadius: mouse ? "24px" : "12px",
      }}
      _first={{
        borderTopLeftRadius: mouse ? "24px" : "12px",
        borderBottomLeftRadius: mouse ? "24px" : "0px",
      }}
      borderRadius={mouse ? "24px" : "0px"}
      zIndex={mouse ? 10 : 0}
      background={mouse ? "#FFFFFF" : ""}
    >
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        justifyContent="center"
        display="flex"
        flexDirection="column"
        borderBottom="2px solid #D6D6D6"
      >
        <Text
          fontSize="sm"
          textAlign="center"
          lineHeight="title"
          fontWeight={"300"}
        ></Text>
        <Text fontSize="md" textAlign="center" lineHeight="title">
          {planData.name}
        </Text>
        <Heading
          fontSize="xl"
          textAlign="center"
          lineHeight="title"
          fontWeight={900}
        >
          {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
        </Heading>
      </Box>
      <Box
        as="div"
        h={"165px"}
        px={"10px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          fontSize="xs"
          textAlign="center"
          lineHeight="title"
          fontWeight={"300"}
        >
          {planData.description}
        </Text>
      </Box>
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"#FAFAFB"}
      >
        <Text
          fontSize="lg"
          textAlign="center"
          lineHeight="title"
          fontWeight={"300"}
        >
          {planData.scan_count}
        </Text>
      </Box>
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HiCheckCircle size={30} color={successColor} />
      </Box>
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"#FAFAFB"}
      >
        {planData.name !== "Trial" ? (
          <HiCheckCircle size={30} color={successColor} />
        ) : (
          <HiXCircle size={30} color={greyColor} />
        )}{" "}
      </Box>
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {planData.github ? (
          <HiCheckCircle size={30} color={successColor} />
        ) : (
          <HiXCircle size={30} color={greyColor} />
        )}{" "}
      </Box>
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"#FAFAFB"}
      >
        {planData.report ? (
          <HiCheckCircle size={30} color={successColor} />
        ) : (
          <HiXCircle size={30} color={greyColor} />
        )}{" "}
      </Box>
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {planData.publishable_report ? (
          <HiCheckCircle size={30} color={successColor} />
        ) : (
          <HiXCircle size={30} color={greyColor} />
        )}{" "}
      </Box>
      <Box
        as="div"
        h={"120px"}
        px={"15px"}
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"#FAFAFB"}
      >
        {plan === "custom" ? (
          <HiCheckCircle size={30} color={successColor} />
        ) : (
          <HiXCircle size={30} color={greyColor} />
        )}{" "}
      </Box>
      {mouse && (
        <Box
          as="div"
          h={"100px"}
          px={"15px"}
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"#FAFAFB"}
        >
          <Button
            variant={"brand"}
            my={5}
            onClick={() => {
              if (plan === "custom") {
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
            {plan === "custom"
              ? "Contact Us"
              : Auth.isUserAuthenticated()
              ? "Choose"
              : "Get Started"}
          </Button>
        </Box>
      )}

      <ContactUs isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
