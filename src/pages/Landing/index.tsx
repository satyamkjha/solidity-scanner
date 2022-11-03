import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link as ChakraLink,
  useDisclosure,
  HStack,
  VStack,
} from "@chakra-ui/react";

import {
  ScheduleScan,
  VulnCheck,
  Integration,
  User,
  File,
  Work,
  Smile,
  PublishReport,
} from "components/icons";

import Header from "components/header";
import Footer from "components/footer";
import ImageCarousel from "./components/carousel";
import ContactUs from "components/contactus";

export default function LandingPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
  }, []);

  const teamsData = {
    line1: [
      {
        name: "Shashank",
        designation: "Co-Founder & CEO",
        imgUrl: "/shashank.jpeg",
        linkedinUrl: "https://www.linkedin.com/in/shashank-in/",
        twitterUrl: "https://twitter.com/cyberboyIndi",
      },
      {
        name: "Indranil Roy",
        designation: "CTO & Co-Founder",
        imgUrl: "/indranil.jpeg",
        linkedinUrl: "https://www.linkedin.com/in/itsmeroy2012/",
        twitterUrl: "https://twitter.com/itsmeroy2012",
      },
    ],
    line2: [
      {
        name: "Aditya D.",
        designation: "Research Team Lead",
        imgUrl: "/aditya.jpeg",
        linkedinUrl: "https://www.linkedin.com/in/ad17ya/",
        twitterUrl: "https://twitter.com/zombie007o",
      },
      {
        name: "Ayush Tripathi",
        designation: "Lead Backend Engineer",
        imgUrl: "/ayush.jpeg",
        linkedinUrl: "https://www.linkedin.com/in/ayush-tripathi51/",
        twitterUrl: "https://twitter.com/TripathiAyush5",
      },
      {
        name: "Satyam Kumar Jha",
        designation: "Frontend Engineer",
        imgUrl: "/satyam.jpg",
        linkedinUrl: "https://www.linkedin.com/in/satyamkjha/",
        twitterUrl: "",
      },
    ],
    line3: [
      {
        name: "Sankalp Pandey",
        designation: "Growth Lead",
        imgUrl: "/sankalp.jpeg",
        linkedinUrl: "https://www.linkedin.com/in/sky007/",
        twitterUrl: "https://twitter.com/SKY_Sankalp",
      },
      {
        name: "Siddharth Neekher",
        designation: "UI/UX Designer",
        imgUrl: "/siddarth.jpeg",
        linkedinUrl: "https://www.linkedin.com/in/siddharth-neekher-340519117/",
        twitterUrl: "https://twitter.com/sidartdigital",
      },
    ],
  };

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
          py={24}
        >
          <Box w={["100%", "100%", "45%"]} px={[0, 0, 10]} py={10}>
            <Heading fontSize={["3xl", "4xl"]} mb={8}>
              Get your smart contracts audited by a smarter tool
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <Link to="/signup">
              <Button variant="brand" w="200px">
                Signup For Free Trial
              </Button>
            </Link>
          </Box>
          <Box
            w="55%"
            display={["none", "none", "flex"]}
            flexDirection="column"
            alignItems={"flex-end"}
          >
            <Image
              marginTop={"-60px"}
              src="/landing-image01.png"
              transform="translateX(20px)"
              zIndex={"10"}
              alt={"Run scans for your smat contracts"}
            />
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
            Publish.
          </Heading>
          <Text color="subtle" fontSize="xl" mb={4}>
            Simple, fast, effortless.
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
                flexDir: "column",
                alignItems: "center",
                mb: [8, 8, 0],
              }}
            >
              <ScheduleScan size={140} />
              <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
                Initiate Scans
              </Text>
            </Flex>
            <Flex
              sx={{
                flexDir: "column",
                alignItems: "center",
                mb: [8, 8, 0],
              }}
            >
              <PublishReport size={140} />
              <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
                Publish Reports
              </Text>
            </Flex>
            <Flex
              sx={{
                flexDir: "column",
                alignItems: "center",
                mb: [8, 8, 0],
              }}
            >
              <VulnCheck size={140} />
              <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
                100+ Vulnerability Checks
              </Text>
            </Flex>
            <Flex
              sx={{
                flexDir: "column",
                alignItems: "center",
                mb: [8, 8, 0],
              }}
            >
              <Integration size={140} />
              <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
                Easy Integrations
              </Text>
            </Flex>{" "}
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
              alt="Keep track of the bugs in your project"
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
              alt="Integrate with Microsoft Teams, Slack and Jira"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Integrate with the services you already love
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
              alt="Customize and silence issues and set your own rules"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Built by us, for your contracts:
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Customize issues, silence specific issues or add your own rules to
              trigger alerts for. Request for assistance with issue remediation
              or get a manual audit from a team of security experts.
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
              src="/landing-image06.jpg"
              alt="Publish reports and share your security score"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={10}>
            <Heading fontSize="3xl" mb={8}>
              Publish reports and share your security score
            </Heading>
            <Text fontSize="xl" color="subtle" mb={8}>
              Share and validate your progress with the community with easily
              publishable reports. Your community and investors can use the
              report summary and be confident of your contracts' security. For
              the more technical minded, you can add the full bug reports
              available in the report too.
            </Text>
          </Box>
        </Flex>
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={24}>
          <Heading fontSize="3xl" mb={4}>
            Our Team
          </Heading>
          <Text color="subtle" fontSize="xl" mb={4}>
            Meet the experts behind the scenes. We are always excited to talk
            about anything in crypto.
          </Text>
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            py={10}
            my={10}
            flexDir={["column", "column", "row"]}
            justifyContent={"center"}
          >
            {teamsData.line1.map((data) => (
              <Flex
                as="div"
                alignItems="center"
                flexDir={["row", "row", "row"]}
                justifyContent={"flex-start"}
                mx={10}
              >
                <VStack spacing={0}>
                  <Box
                    height={"200px"}
                    mb={"-195px"}
                    zIndex={10}
                    width="200px"
                    borderRadius={"50%"}
                    backgroundImage={`url(${data.imgUrl})`}
                    backgroundSize="contain"
                    backgroundPosition={"center"}
                  />
                  <Box
                    height={"200px"}
                    width="200px"
                    borderRadius={"50%"}
                    background={
                      "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
                    }
                  />

                  <Text
                    marginTop={"15px !important"}
                    textAlign={"left"}
                    fontSize="xl"
                  >
                    {data.name}
                  </Text>
                  <Text
                    textAlign={"left"}
                    color={"gray.400"}
                    fontSize="xl"
                    fontWeight={500}
                  >
                    {data.designation}
                  </Text>
                  <HStack marginTop={"15px !important"} spacing={5}>
                    <Image
                      onClick={() => {
                        window.open(data.linkedinUrl, "_blank");
                      }}
                      src="/socials/linkedin.svg"
                      height={"30px"}
                      width={"30px"}
                      alt={"Linkedin"}
                    />
                    <Image
                      onClick={() => {
                        window.open(data.twitterUrl, "_blank");
                      }}
                      src="/socials/twitter.svg"
                      height={"30px"}
                      width={"30px"}
                      borderRadius={"5px"}
                      alt={"Twitter"}
                    />
                  </HStack>
                </VStack>
              </Flex>
            ))}
          </Flex>
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            py={10}
            my={10}
            flexDir={["column", "column", "row"]}
            justifyContent={"center"}
          >
            {teamsData.line2.map((data) => (
              <Flex
                as="div"
                alignItems="center"
                flexDir={["row", "row", "row"]}
                justifyContent={"flex-start"}
                mx={10}
              >
                <VStack spacing={0}>
                  <Box
                    height={"200px"}
                    mb={"-195px"}
                    zIndex={10}
                    width="200px"
                    borderRadius={"50%"}
                    backgroundImage={`url(${data.imgUrl})`}
                    backgroundSize="contain"
                    backgroundPosition={"center"}
                  />
                  <Box
                    height={"200px"}
                    width="200px"
                    borderRadius={"50%"}
                    background={
                      "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
                    }
                  />

                  <Text
                    marginTop={"15px !important"}
                    textAlign={"left"}
                    fontSize="xl"
                  >
                    {data.name}
                  </Text>
                  <Text
                    textAlign={"left"}
                    color={"gray.400"}
                    fontSize="xl"
                    fontWeight={500}
                  >
                    {data.designation}
                  </Text>
                  <HStack marginTop={"15px !important"} spacing={5}>
                    <Image
                      onClick={() => {
                        window.open(data.linkedinUrl, "_blank");
                      }}
                      src="/socials/linkedin.svg"
                      height={"30px"}
                      width={"30px"}
                      alt={"Linkedin"}
                    />
                    <Image
                      onClick={() => {
                        window.open(data.twitterUrl, "_blank");
                      }}
                      src="/socials/twitter.svg"
                      height={"30px"}
                      width={"30px"}
                      borderRadius={"5px"}
                      alt={"Twitter"}
                    />
                  </HStack>
                </VStack>
              </Flex>
            ))}
          </Flex>
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            py={10}
            my={10}
            flexDir={["column", "column", "row"]}
            justifyContent={"center"}
          >
            {teamsData.line3.map((data) => (
              <Flex
                as="div"
                alignItems="center"
                flexDir={["row", "row", "row"]}
                justifyContent={"flex-start"}
                mx={10}
              >
                <VStack spacing={0}>
                  <Box
                    height={"200px"}
                    mb={"-195px"}
                    zIndex={10}
                    width="200px"
                    borderRadius={"50%"}
                    backgroundImage={`url(${data.imgUrl})`}
                    backgroundSize="contain"
                    backgroundPosition={"center"}
                  />
                  <Box
                    height={"200px"}
                    width="200px"
                    borderRadius={"50%"}
                    background={
                      "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
                    }
                  />

                  <Text
                    marginTop={"15px !important"}
                    textAlign={"left"}
                    fontSize="xl"
                  >
                    {data.name}
                  </Text>
                  <Text
                    textAlign={"left"}
                    color={"gray.400"}
                    fontSize="xl"
                    fontWeight={500}
                  >
                    {data.designation}
                  </Text>
                  <HStack marginTop={"15px !important"} spacing={5}>
                    <Image
                      onClick={() => {
                        window.open(data.linkedinUrl, "_blank");
                      }}
                      src="/socials/linkedin.svg"
                      height={"30px"}
                      width={"30px"}
                      alt={"Linkedin"}
                    />
                    <Image
                      onClick={() => {
                        window.open(data.twitterUrl, "_blank");
                      }}
                      src="/socials/twitter.svg"
                      height={"30px"}
                      width={"30px"}
                      borderRadius={"5px"}
                      alt={"Twitter"}
                    />
                  </HStack>
                </VStack>
              </Flex>
            ))}
          </Flex>
        </Box>

        {/* Section 4 */}
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={8} mt={24}>
          <Heading fontSize="3xl" mb={4}>
            Fully automated smart contract audit system <br /> to help{" "}
            <Box as="span" sx={{ color: "accent" }}>
              secure your products faster
            </Box>
          </Heading>
          <Text color="subtle" fontSize="xl" mb={4}>
            Focus on what matters most, our robots handle the rest ☕️
          </Text>
          <ImageCarousel />
        </Box>
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
              Talk to our team of security experts for help on securing your
              Smart Contracts
            </Text>
            <Button variant="brand" onClick={onOpen} mt={8}>
              Request audit
            </Button>
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
                100 +
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
                  Signup For Free Trial
                </Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Container>
      <Footer />
      <ContactUs isOpen={isOpen} onClose={onClose} />
    </>
  );
}
