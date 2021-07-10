import React from "react";
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
            Transparent, no-frills and no-hidden, standard pricing for all.
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
                price: "$1000",
                name: "Individual Researcher",
                features: [
                  "Monitor upto 3 projects",
                  "Unlimited rescans",
                  "Access to all existing templates",
                ],
              }}
              button={
                <ActionButton variant="outline" borderWidth="2px">
                  Buy now
                </ActionButton>
              }
            />
            <PricingCard
              zIndex={1}
              isPopular
              transform={{ lg: "scale(1.05)" }}
              data={{
                price: "$5000",
                name: "Enterprise",
                features: [
                  "Monitor upto 10 projects",
                  "Unlimited rescans",
                  "Access to all existing templates",
                  "Integrate with all popular tools and platforms",
                  "Add custom scan templates and set priorities for issues",
                  "Access to white glove services from our team",
                ],
              }}
              button={<ActionButton>Buy now</ActionButton>}
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
                <Link target="_blank" href="mailto:info@solidityscan.com">
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
