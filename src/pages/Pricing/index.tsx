import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import { PricingCard } from "./components/pricingCard";
import { useState } from "react";
import ContactUs from "components/contactus";

export default function PricingPage() {
  const [tab, setTab] = useState<string>("weekly");
  const { isOpen, onClose, onOpen } = useDisclosure();


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
          borderRadius="xl"
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
        {tab === "weekly" && (
          <ScaleFade initialScale={0.9} in={tab === "weekly"}>
            <Box as="section" py="14" px={{ base: "4", md: "8" }}>
              <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                spacing={{ base: "8", lg: "0" }}
                maxW="7xl"
                mx="auto"
                justifyItems="center"
                alignItems="center"
              >
                <PricingCard
                  data={{
                    price: "$99",
                    name: "Individual Researcher",
                    features: [
                      "Monitor upto 2 projects",
                      "Get 10 rescans per project",
                      "Get 10 credits for block scans",
                      "Add a new project with 10 scans at $50/month",
                      "Add 10 additional scans to an existing project at $5",
                      "Add credit for block scan at $8/credit",
                    ],
                  }}
                  button={
                    <RouterLink to="/signup">
                      <ActionButton variant="outline" borderWidth="2px">
                        Start Free Trial
                      </ActionButton>
                    </RouterLink>
                  }
                />
                <PricingCard
                  zIndex={1}
                  isPopular
                  transform={{ lg: "scale(1.05)" }}
                  data={{
                    price: "$499",
                    name: "Enterprise",
                    features: [
                      "Monitor upto 10 projects",
                      "Get 20 rescans per project",
                      "Get 50 credits for block scans",
                      "Add a new project with 20 scans at $50/month",
                      "Add 20 additional scans to an existing project at $5",
                      "Add credit for block scan at $5/credit",
                    ],
                  }}
                  button={
                    <RouterLink to="/signup">
                      <ActionButton>Start Free Trial</ActionButton>
                    </RouterLink>
                  }
                />
                <PricingCard
                  custom
                  data={{
                    name: "Custom Plan",
                    features: [
                      "Contact us in more custom features",
                      "Request our team for a manual audit",
                      "Get suggestions for issue remediation",
                    ],
                  }}
                  button={
                    <Flex flexDir="column" alignItems="center">
                        <ActionButton variant={'outline'}
                          onClick={onOpen}
                        >
                          Contact us
                        </ActionButton>
                      
                    </Flex>
                  }
                />
              </SimpleGrid>
            </Box>
          </ScaleFade>
        )}
        {tab === "monthly" && (
          <ScaleFade initialScale={0.9} in={tab === "monthly"}>
            <Box as="section" py="14" px={{ base: "4", md: "8" }}>
              <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                spacing={{ base: "8", lg: "0" }}
                maxW="7xl"
                mx="auto"
                justifyItems="center"
                alignItems="center"
              >
                <PricingCard
                  data={{
                    price: "$99",
                    name: "Individual Researcher",
                    features: [
                      "Monitor upto 2 projects",
                      "Get 10 rescans per project",
                      "Get 10 credits for block scans",
                      "Add a new project with 10 scans at $50/month",
                      "Add 10 additional scans to an existing project at $5",
                      "Add credit for block scan at $8/credit",
                    ],
                  }}
                  button={
                    <RouterLink to="/signup">
                      <ActionButton variant="outline" borderWidth="2px">
                        Start Free Trial
                      </ActionButton>
                    </RouterLink>
                  }
                />
                <PricingCard
                  zIndex={1}
                  isPopular
                  transform={{ lg: "scale(1.05)" }}
                  data={{
                    price: "$499",
                    name: "Enterprise",
                    features: [
                      "Monitor upto 10 projects",
                      "Get 20 rescans per project",
                      "Get 50 credits for block scans",
                      "Add a new project with 20 scans at $50/month",
                      "Add 20 additional scans to an existing project at $5",
                      "Add credit for block scan at $5/credit",
                    ],
                  }}
                  button={
                    <RouterLink to="/signup">
                      <ActionButton>Start Free Trial</ActionButton>
                    </RouterLink>
                  }
                />
                <PricingCard
                  custom
                  data={{
                    name: "Custom Plan",
                    features: [
                      "Contact us in more custom features",
                      "Request our team for a manual audit",
                      "Get suggestions for issue remediation",
                    ],
                  }}
                  button={
                      <ActionButton variant="outline" borderWidth="2px">
                        Contact us
                      </ActionButton>
                  }
                />
              </SimpleGrid>
            </Box>
          </ScaleFade>
        )}
        {tab === "yearly" && (
          <ScaleFade initialScale={0.9} in={tab === "yearly"}>
            <Box as="section" py="14" px={{ base: "4", md: "8" }}>
              <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                spacing={{ base: "8", lg: "0" }}
                maxW="7xl"
                mx="auto"
                justifyItems="center"
                alignItems="center"
              >
                <PricingCard
                  data={{
                    price: "$99",
                    name: "Individual Researcher",
                    features: [
                      "Monitor upto 2 projects",
                      "Get 10 rescans per project",
                      "Get 10 credits for block scans",
                      "Add a new project with 10 scans at $50/month",
                      "Add 10 additional scans to an existing project at $5",
                      "Add credit for block scan at $8/credit",
                    ],
                  }}
                  button={
                    <RouterLink to="/signup">
                      <ActionButton variant="outline" borderWidth="2px">
                        Start Free Trial
                      </ActionButton>
                    </RouterLink>
                  }
                />
                <PricingCard
                  zIndex={1}
                  isPopular
                  transform={{ lg: "scale(1.05)" }}
                  data={{
                    price: "$499",
                    name: "Enterprise",
                    features: [
                      "Monitor upto 10 projects",
                      "Get 20 rescans per project",
                      "Get 50 credits for block scans",
                      "Add a new project with 20 scans at $50/month",
                      "Add 20 additional scans to an existing project at $5",
                      "Add credit for block scan at $5/credit",
                    ],
                  }}
                  button={
                    <RouterLink to="/signup">
                      <ActionButton>Start Free Trial</ActionButton>
                    </RouterLink>
                  }
                />
                <PricingCard
                  custom
                  data={{
                    name: "Custom Plan",
                    features: [
                      "Contact us in more custom features",
                      "Request our team for a manual audit",
                      "Get suggestions for issue remediation",
                    ],
                  }}
                  button={
                    <Link target="_blank" href="mailto:info@credshields.com">
                      <ActionButton onClick={onOpen} variant="outline" borderWidth="2px">
                        Contact us
                      </ActionButton>
                    </Link>
                  }
                />
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
