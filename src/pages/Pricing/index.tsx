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
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import { PricingCard } from "./components/pricingCard";

export default function PricingPage() {
  return (
    <>
      <Header />
      <Container maxW="80vw" color="black">
        <Flex flexDirection="column" alignItems="center" pt={5} px={4}>
          <Text
            fontSize="3xl"
            fontWeight="600"
            my={1}
            textAlign="center"
            lineHeight="title"
          >
            Pricing
          </Text>
          <Text
            width={["100%", "50%"]}
            lineHeight="title"
            textAlign="center"
            fontSize="sm"
            fontWeight={2}
            my={3}
          >
            Signup for a trial and get two scans free.
          </Text>
        </Flex>
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
                  <ActionButton variant="outline" borderWidth="2px">
                    Contact us
                  </ActionButton>
                </Link>
              }
            />
          </SimpleGrid>
        </Box>
      </Container>
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
