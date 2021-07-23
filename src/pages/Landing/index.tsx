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
  Link as ChakraLink,
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
import ImageCarousel from "./components/carousel";

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
          py={36}
        >
          <Box w={["100%", "100%", "50%"]} px={[0, 0, 10]} py={10}>
            <Heading fontSize={["3xl", "4xl"]} mb={8}>
              Get you smart contracts audited by a smarter tool
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <Link to="/signup">
              <Button variant="brand" w="200px">
                Signup For Free
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
            Scan.{" "}
            <Box
              as="span"
              sx={{
                background:
                  "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mx: 4,
              }}
            >
              Fix.
            </Box>{" "}
            Deploy.
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
                Schedule scans
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
                100+ vulnerability checks
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
              See your security posture evolve
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Upload specific contract code or provide code repositories link
              and we’ll take care of the rest. Set triggers to automatically run
              scans when developers make updates, and see trends on how your
              code quality has improved.
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
              src="/landing-image03.jpg"
              alt="Product screenshot"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Integrate with the services already love
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Using Slack/ Microsoft teams or JIRA? Built-in integrations with
              most of the popular tools to automatically send out alerts or
              raise issue tickets, so your team sees everything in one place.
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
              src="/landing-image04.jpg"
              alt="Product screenshot"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Built by us, for your contracts:
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Customise issues, silence specific issues or add your own rules to
              trigger alerts for. Request for assistance with issue remediation
              or get a manual audit from a team of experts.
            </Text>
          </Box>
        </Flex>

        {/* Section 4 */}
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={8}>
          <Heading fontSize="3xl" mb={4}>
            Fully automated smart contract audit system <br /> to help{" "}
            <Box as="span" sx={{ color: "accent" }}>
              secure your poducts faster
            </Box>
          </Heading>
          <Text color="subtle" fontSize="xl" mb={4}>
            Focus on what matters most, our robots handle the rest ☕️
          </Text>
          <ImageCarousel />
          {/* <Image
            src="/landing-image05.jpg"
            transform="translateX(10%)"
            py={10}
            width={["70vw", "50vw"]}
            mx="auto"
          /> */}
        </Box>
        {/* Section 5 */}
        <Box
          sx={{
            w: "100%",
            backgroundImage: 'url("/pattern.jpg")',
            borderRadius: 20,
            overflow: "hidden",
            mb: 10,
          }}
        >
          <Flex
            sx={{
              px: 10,
              py: 20,
              w: "100%",
              bg: "rgba(82, 255, 0, 0.06)",
              flexDir: "column",
              alignItems: "center",
            }}
          >
            <Heading fontSize="3xl" mb={4} textAlign="center">
              Request for a{" "}
              <Box as="span" sx={{ color: "accent" }}>
                manual audit
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize="xl" mb={4} textAlign="center">
              Tak to our team of security experts for help on securing your
              products
            </Text>
            <ChakraLink target="_blank" href="mailto:info@solidityscan.com">
              <Button variant="brand" mt={8}>
                Request audit
              </Button>
            </ChakraLink>
          </Flex>
        </Box>
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={8}>
          <Flex
            sx={{
              w: ["100%"],
              mb: 10,
              mt: 20,
              flexDir: "column",
              alignItems: "center",
            }}
            color="#69C85A"
          >
            <Smile size={50} />
            <Heading fontSize="4xl" my={4}>
              28,50,000,000+
            </Heading>
            <Text fontSize="md">
              Direct financial losses due to hacks and exploits
            </Text>
          </Flex>
          <Flex
            sx={{ w: ["100%", "80%"], flexWrap: "wrap", mx: "auto" }}
            py={10}
          >
            <Flex
              sx={{
                w: ["100%", "100%", "33%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#7737FF"
            >
              <User size={36} />
              <Heading fontSize="3xl" my={4}>
                140 +
              </Heading>
              <Text>Code patterns detected</Text>
            </Flex>
            <Flex
              sx={{
                w: ["100%", "100%", "33%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#FB5392"
            >
              <File size={36} />
              <Heading fontSize="3xl" my={4}>
                16,000,000+
              </Heading>
              <Text>Line of code scanned</Text>
            </Flex>
            <Flex
              sx={{
                w: ["100%", "100%", "33%"],
                mb: 10,
                flexDir: "column",
                alignItems: "center",
              }}
              color="#FF9900"
            >
              <Work size={36} />
              <Heading fontSize="3xl" my={4}>
                2.4M $
              </Heading>
              <Text>Worth of contracts secured</Text>
            </Flex>
            {/* <Flex
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
            </Flex> */}
          </Flex>
        </Box>
        {/* Section 6 */}
        <Box
          sx={{
            w: "100%",
            backgroundImage: 'url("/pattern.jpg")',
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
              flexDir: ["column", "column", "row"],
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                w: ["100%", "70%"],
              }}
            >
              <Heading
                fontSize="3xl"
                lineHeight="1.4"
                mb={4}
                textAlign={["center", "center", "left"]}
              >
                Start securing your
                <br />
                <Box as="span" sx={{ color: "accent" }}>
                  contracts
                </Box>{" "}
                today
              </Heading>
              <Text color="accent" textAlign={["center", "center", "left"]}>
                Have more questions? Talk to our team and get a demo now.
              </Text>
            </Box>
            <Box
              sx={{
                w: ["100%", "30%"],
              }}
            >
              <Link to="/signup">
                <Button variant="brand" w="100%" my={10}>
                  Signup For Free
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
