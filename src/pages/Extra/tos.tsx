import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";

export default function TOSPage() {
  return (
    <>
      <Header />
      <Container maxW="80vw" color="black">
        <Box py={20} minH="80vh">
          <Text>TOS</Text>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
