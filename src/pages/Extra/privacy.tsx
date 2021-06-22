import React from "react";
import { Container, Text, Box } from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <Container maxW="80vw" color="black">
        <Box py={20} minH="80vh">
          <Text>Privacy policy</Text>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
