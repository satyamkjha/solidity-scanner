import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import { Logo } from "components/icons";
import Auth from "helpers/auth";

export default function PaymentSucess() {
  const { status } = useParams<{ status: string }>();

  useEffect(() => {
    setInterval(() => {
      window.close();
    }, 5000);
  }, []);

  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        maxW="80vw"
        mx="auto"
        h="20vh"
      >
        <Flex alignItems="center">
          <Logo />
        </Flex>
      </Flex>
      <Container
        h="60vh"
        maxW="60vw"
        justifyContent={"center"}
        alignItems={"center"}
        color="black"
      >
        <Flex
          h="60vh"
          justifyContent={"center"}
          alignItems={"center"}
          color="black"
        >
          <Box
            sx={{
              w: "100%",
              backgroundColor:
                status === "success"
                  ? "#66d393"
                  : status === "failure"
                  ? "#ED4337"
                  : "",
              borderRadius: 20,
              overflow: "hidden",
              mb: 10,
            }}
          >
            <Flex
              sx={{
                px: [2, 2, 10],
                py: [8, 8, 20],
                w: "100%",
                bg: "rgba(82, 255, 0, 0.06)",
                flexDir: "column",
                alignItems: "center",
              }}
            >
              <Heading
                fontSize="3xl"
                lineHeight="1.4"
                mb={4}
                color="white"
                textAlign={["center", "center", "left"]}
              >
                Payment {status}
              </Heading>
              <Text color="white" textAlign={["center", "center", "left"]}>
                {status === "success"
                  ? "Congratulations. Your Payment has been sucessfully made."
                  : "Sorry. There was an error while making this transaction."}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
