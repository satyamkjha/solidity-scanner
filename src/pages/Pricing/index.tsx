import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
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
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import { PricingCard } from "./components/pricingCard";
import { useState } from "react";
import ContactUs from "components/contactus";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { usePricingPlans } from "hooks/usePricingPlans";
import { Plan } from "common/types";
import Auth from "helpers/auth";

export default function PricingPage() {
  const [tab, setTab] = useState<string>("weekly");
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: plans } = usePricingPlans();

  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <>
      <Header />
      <Container maxW="100vw" color="black">
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
              px={10}
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
                justifyContent={"flex-end"}
                alignContent={"center"}
                mb={"70px"}
                mt={"90px"}
                w={"18vw"}
              >
                <Box
                  as="div"
                  py={"36px"}
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
                  py={"35px"}
                  px={"25px"}
                  display="flex"
                  flexDirection="row"
                  borderTopLeftRadius={"xl"}
                  border="2px solid #D6D6D6"
                  borderRightWidth={0}
                  borderBottomWidth={0}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/coin.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={"300"}
                    >
                      Scan Credit
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"35px"}
                  px={"25px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="2px solid #D6D6D6"
                  backgroundColor={"#FAFAFB"}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/score-icon.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={"300"}
                    >
                      Vulnerability Score
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"36px"}
                  px={"25px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="2px solid #D6D6D6"
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/github.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={"300"}
                    >
                      Private Github
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"35px"}
                  px={"25px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="2px solid #D6D6D6"
                  backgroundColor={"#FAFAFB"}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/report.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={"300"}
                    >
                      Generate Report
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"36px"}
                  px={"15px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="2px solid #D6D6D6"
                  borderBottom="2px solid #D6D6D6"
                  borderBottomLeftRadius={"xl"}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/publish.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={"300"}
                    >
                      Publishable Reports
                    </Text>
                  </HStack>
                </Box>
              </Flex>
              <SimpleGrid
                columns={6}
                maxW="7xl"
                justifyItems="center"
                alignItems="center"
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
          </ScaleFade>
        )}
      </Container>
      <ContactUs isOpen={isOpen} onClose={onClose} />
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

  return (
    <Flex
      as={"div"}
      onMouseOver={() => setSelectedPlan(plan)}
      onMouseLeave={() => setSelectedPlan("")}
      flexDirection="column"
      justifyContent={"flex-start"}
      alignContent={"flex-start"}
      overflow={"hidden"}
      width={mouse ? "13vw" : "11vw"}
      mb={"70px"}
      mt={"90px"}
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
        py={"25px"}
        px={"15px"}
        display="flex"
        flexDirection="column"
        borderBottom="2px solid #D6D6D6"
      >
        <Text
          fontSize="sm"
          textAlign="center"
          lineHeight="title"
          fontWeight={"300"}
        >
          {/* {plan === 'trial' ? 'Free' : plan === 'starter' ? ''} */}
        </Text>
        <Text
          fontSize="lg"
          textAlign="center"
          lineHeight="title"
          fontWeight={"300"}
        >
          {planData.name}
        </Text>
        <Heading
          fontSize="2xl"
          textAlign="center"
          lineHeight="title"
          fontWeight={900}
        >
          {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
        </Heading>
      </Box>
      <Box
        as="div"
        py={"40px"}
        px={"25px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
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
        py={"40px"}
        px={"25px"}
        display="flex"
        flexDirection="row"
        backgroundColor={"#FAFAFB"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HiCheckCircle size={30} color={successColor} />
      </Box>
      <Box
        as="div"
        py={"40px"}
        px={"25px"}
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
        py={"40px"}
        px={"25px"}
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
        py={"40px"}
        px={"25px"}
        display="flex"
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {planData.publishable_report ? (
          <HiCheckCircle size={30} color={successColor} />
        ) : (
          <HiXCircle size={30} color={greyColor} />
        )}{" "}
      </Box>
    </Flex>
  );
};
