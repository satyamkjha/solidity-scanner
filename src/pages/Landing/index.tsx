import React from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";

import {
  CreditCard,
  Growth,
  Integration,
  User,
  File,
  Work,
  Smile,
} from "components/icons";

import Header from "components/header";
import Footer from "components/footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Container maxW="80vw" color="black">
        {/* Section 1 */}
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          my={[10, 10, 0]}
          textAlign={["center", "left"]}
        >
          <Box w={["100%", "100%", "50%"]} px={[0, 0, 10]} py={10}>
            <Heading fontSize={["3xl", "4xl"]} mb={8}>
              Get your Smart Contracts audited by an AI tool.
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Change the way you manage your tasks with our revolutionary
              project management technology.
            </Text>
            <Link to="/signup">
              <Button variant="brand" w="200px">
                Get Started
              </Button>
            </Link>
          </Box>
          <Box w="50%" display={["none", "none", "flex"]}>
            <Image src="/landing-image01.jpg" alt="Product screenshot" />
          </Box>
        </Flex>
        {/* Section 2 */}
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={8}>
          <Heading fontSize="3xl" mb={4}>
            Get more done in{" "}
            <Box as="span" sx={{ color: "accent" }}>
              less time
            </Box>
          </Heading>
          <Text color="subtle" fontSize="xl" mb={4}>
            Simple, fast, effortlessly.
          </Text>
          <Flex
            sx={{
              w: "70%",
              justifyContent: "space-between",
              my: 20,
              color: "#00006D",
              mx: "auto",
              flexDir: ["column", "column", "row"],
            }}
          >
            <Flex
              sx={{
                flexDir: ["column", "column", "row"],

                alignItems: "center",
                mb: [8, 8, 0],
              }}
            >
              <CreditCard size={48} />{" "}
              <Text fontSize="sm" ml="2" fontWeight={600}>
                Transparent Pricing
              </Text>
            </Flex>
            <Flex
              sx={{
                flexDir: ["column", "column", "row"],

                alignItems: "center",
                mb: [8, 8, 0],
              }}
            >
              <Integration size={48} />{" "}
              <Text fontSize="sm" ml="2" fontWeight={600}>
                Easy Integrations
              </Text>
            </Flex>{" "}
            <Flex
              sx={{
                flexDir: ["column", "column", "row"],

                alignItems: "center",
                mb: [8, 8, 0],
              }}
            >
              <Growth size={48} />{" "}
              <Text fontSize="sm" ml="2" fontWeight={600}>
                Superb Efficiency
              </Text>
            </Flex>
          </Flex>
        </Box>
        {/* Section 3 */}
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={10}
          flexDir={["column", "column", "row"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing-image02.jpg"
              alt="Product screenshot"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Revolutionize your workflow
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              We have designed our app for increased efficiency and it will help
              you to start getting more things done.
            </Text>
          </Box>
        </Flex>
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={10}
          flexDir={["column", "column", "row-reverse"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing-image02.jpg"
              alt="Product screenshot"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Revolutionize your workflow
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              We have designed our app for increased efficiency and it will help
              you to start getting more things done.
            </Text>
          </Box>
        </Flex>
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={10}
          flexDir={["column", "column", "row"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing-image02.jpg"
              alt="Product screenshot"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Revolutionize your workflow
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              We have designed our app for increased efficiency and it will help
              you to start getting more things done.
            </Text>
          </Box>
        </Flex>

        {/* Section 4 */}
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={8}>
          <Heading fontSize="3xl" mb={4}>
            Fully reinvented smart contract audit system <br /> to help you{" "}
            <Box as="span" sx={{ color: "accent" }}>
              secure poducts faster
            </Box>
          </Heading>
          <Text color="subtle" fontSize="xl" mb={4}>
            Focus on what matters most, our robots handle the rest ☕️
          </Text>
          <Image
            src="/landing-image03.jpg"
            transform="translateX(10%)"
            py={10}
            width={["70vw", "50vw"]}
            mx="auto"
          />
        </Box>
        {/* Section 5 */}
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={8}>
          <Heading fontSize="3xl" mb={4}>
            Completely{" "}
            <Box as="span" sx={{ color: "accent" }}>
              free to use
            </Box>{" "}
            <br /> with useful premium features
          </Heading>
          <Text color="subtle" fontSize="xl" mb={4}>
            Focus on what matters most, our robots handle the rest ☕️
          </Text>
          <Flex
            sx={{ w: ["100%", "80%"], flexWrap: "wrap", mx: "auto" }}
            py={10}
          >
            <Flex
              sx={{
                w: ["100%", "100%", "50%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#7737FF"
            >
              <User size={36} />
              <Heading fontSize="3xl" my={4}>
                3,000,000+
              </Heading>
              <Text>Daily active users</Text>
            </Flex>
            <Flex
              sx={{
                w: ["100%", "100%", "50%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#FB5392"
            >
              <File size={36} />
              <Heading fontSize="3xl" my={4}>
                10,090,000+
              </Heading>
              <Text>Tasks completed</Text>
            </Flex>
            <Flex
              sx={{
                w: ["100%", "100%", "50%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#FF9900"
            >
              <Work size={36} />
              <Heading fontSize="3xl" my={4}>
                12,500+
              </Heading>
              <Text>Companies using our software</Text>
            </Flex>
            <Flex
              sx={{
                w: ["100%", "100%", "50%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#69C85A"
            >
              <Smile size={36} />
              <Heading fontSize="3xl" my={4}>
                275,000+
              </Heading>
              <Text>Positive reviews</Text>
            </Flex>
          </Flex>
        </Box>
        {/* Section 6 */}
        <Flex
          sx={{
            w: "100%",
            alignItems: "center",
            px: 10,
            py: 20,
            backgroundImage: 'url("/pattern.jpg")',
            borderRadius: 20,
            overflow: "hidden",
            mb: 10,
            flexDir: ["column", "column", "row"],
          }}
        >
          <Box
            sx={{
              w: ["100%", "70%"],
            }}
          >
            <Heading fontSize="3xl" lineHeight="1.4" mb={4}>
              Risk-free 30 day trial to
              <br />
              <Box as="span" sx={{ color: "accent" }}>
                level up
              </Box>{" "}
              your team’s productivity.
            </Heading>
            <Text color="accent">
              Get started now and take advantage of our 30 day free trial today.{" "}
            </Text>
          </Box>
          <Box
            sx={{
              w: ["100%", "30%"],
            }}
          >
            <Link to="/signup">
              <Button variant="brand" w="100%" my={10}>
                Get Started
              </Button>
            </Link>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
