import React from "react";
import {
  Box,
  Container,
  Button,
  Text,
  Flex,
  SimpleGrid,
  ButtonProps,
} from "@chakra-ui/react";

import { SiHive, SiMarketo, SiMicrosoft } from "react-icons/si";

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
                price: "$29",
                name: "Application UI",
                features: [
                  "All application UI components",
                  "Lifetime access",
                  "Use on unlimited projects",
                  "Free Updates",
                ],
              }}
              icon={SiMicrosoft}
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
                price: "$49",
                name: "Bundle",
                features: [
                  "All application UI components",
                  "Lifetime access",
                  "Use on unlimited projects",
                  "Use on unlimited projects",
                  "Free Updates",
                ],
              }}
              icon={SiHive}
              button={<ActionButton>Buy now</ActionButton>}
            />
            <PricingCard
              data={{
                price: "$29",
                name: "Marketing UI",
                features: [
                  "All application UI components",
                  "Lifetime access",
                  "Use on unlimited projects",
                  "Free Updates",
                ],
              }}
              icon={SiMarketo}
              button={
                <ActionButton variant="outline" borderWidth="2px">
                  Buy now
                </ActionButton>
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
