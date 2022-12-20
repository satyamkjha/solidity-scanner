import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { teamsData } from "common/values";

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
  useMediaQuery,
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
import ManualAuditForm from "components/manualAuditForm";

export default function LandingPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const location = useLocation();
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
  }, []);

  return (
    <>
      <Header />
      <Container maxW={["95vw", "95vw", "90vw", "80vw"]} color="black">
        {/* Section 1 */}
        <Flex
          as="section"
          w="100%"
          my={0}
          textAlign={["center", "left"]}
          py={24}
          display={["flex"]}
          flexDirection={["column", "column", "column", "row"]}
          alignItems={"center"}
          justifyContent={[
            "flex-start",
            "flex-start",
            "flex-start",
            "space-between",
          ]}
        >
          <Box w={["100%", "100%", "100%", "45%"]} px={[0, 0, 10]} py={10}>
            <Heading as="h1" fontSize={["3xl", "4xl"]} mb={8}>
              Get your smart contracts audited by a smarter tool
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
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
            w={["100%", "100%", "100%", "55%"]}
            display={["flex"]}
            flexDirection="column"
            alignItems={"flex-end"}
          >
            <Image
              marginTop={["0px", "0px", "0px", "-60px"]}
              src="/landing/landing-image01.png"
              transform="translateX(20px)"
              zIndex={"10"}
              alt={"Run scans for your smart contracts"}
            />
          </Box>
        </Flex>

        {/* Section 2 */}
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={[4, 8]}>
          <Heading as="h1" fontSize="3xl" mb={4}>
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
          <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
            Simple, fast, effortless.
          </Text>
          <Flex
            sx={{
              w: "70%",
              justifyContent: "space-between",
              my: [10, 10, 20],
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
              <ScheduleScan size={isDesktopView ? 140 : 100} />
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
              <PublishReport size={isDesktopView ? 140 : 100} />
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
              <VulnCheck size={isDesktopView ? 140 : 100} />
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
              <Integration size={isDesktopView ? 140 : 100} />
              <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
                Easy Integrations
              </Text>
            </Flex>{" "}
          </Flex>
        </Box>

        <Flex
          as="section"
          w="100%"
          my={0}
          textAlign={["center", "left"]}
          py={24}
          backgroundImage={"url(/background/pattern_mask.png)"}
          display={["flex"]}
          flexDirection={["column", "column", "column", "row"]}
          alignItems={"center"}
          justifyContent={[
            "flex-start",
            "flex-start",
            "flex-start",
            "space-between",
          ]}
        >
          <Box w={["100%", "100%", "100%", "45%"]} px={[0, 0, 10]} py={10}>
            <Heading wordBreak={"keep-all"} as="h1" fontSize={"3xl"} mb={8}>
              SolidityScan{" "}
              <Box
                as="span"
                sx={{
                  background:
                    "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                QuickScan
              </Box>
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
              An open to all quick scanning extension designed to view results
              in simple terms. Initiate a smart contract scan by selecting from
              a wide range of supported protocols and get a quick analysis
              report within seconds.
            </Text>
            <Link to="/quickscan">
              <Button variant="brand" w="200px">
                Run QuickScan
              </Button>
            </Link>
          </Box>
          <Box
            w={["100%", "100%", "100%", "55%"]}
            display={["flex"]}
            flexDirection="column"
            alignItems={"flex-end"}
          >
            <Image
              marginTop={["0px", "0px", "0px", "-60px"]}
              src="/landing/landing-image02.png"
              transform="translateX(20px)"
              zIndex={"10"}
              alt={"Run quick scans for your smart contracts"}
            />
          </Box>
        </Flex>

        {/* Section 3 */}
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={[5, 5, 10]}
          flexDir={["column", "column", "row"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing/landing-image03.jpeg"
              alt="Keep track of the bugs in your project"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={[5, 10]}>
            <Heading as="h2" fontSize="3xl" mb={8}>
              See your security posture evolve
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
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
          py={[5, 5, 10]}
          flexDir={["column", "column", "row-reverse"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing/landing-image04.jpeg"
              alt="Integrate with Microsoft Teams, Slack and Jira"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={[5, 10]}>
            <Heading as="h2" fontSize="3xl" mb={8}>
              Supported Protocols
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
              With tremendous growth across the Blockchain spectrum, there is a
              wide variety of Protocol options for builders to choose from. In
              our endeavor to retain the pinnacle in the Smart Contract Security
              Audit Scan space, SolidityScan boasts of providing seamless
              support for Ethereum, Polygon, Avalanche, Binance, Fantom, Cronos,
              Celo, and many more. Inviting all buidlers to subscribe to the
              world's fastest, most accurate, and secure smart contract
              vulnerability analysis and auditing platform at the most
              affordable price.
            </Text>
          </Box>
        </Flex>
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={[5, 5, 10]}
          flexDir={["column", "column", "row"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing/landing-image05.jpeg"
              alt="Customize and silence issues and set your own rules"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={[5, 10]}>
            <Heading as="h2" fontSize="3xl" mb={8}>
              Built by us, for your contracts:
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
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
          py={[5, 5, 10]}
          flexDir={["column", "column", "row-reverse"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing/landing-image06.jpeg"
              alt="Publish reports and share your security score"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={[5, 10]}>
            <Heading as="h2" fontSize="3xl" mb={8}>
              Publish reports and share your security score
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
              Share and validate your progress with the community with easily
              publishable reports. Your community and investors can use the
              report summary and be confident of your contracts' security. For
              the more technical minded, you can add the full bug reports
              available in the report too.
            </Text>
          </Box>
        </Flex>
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={[5, 5, 10]}
          flexDir={["column", "column", "row"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]}>
            <Image
              src="/landing/landing-image07.jpeg"
              alt="Integrate with Microsoft Teams, Slack and Jira"
              mx="auto"
              p={12}
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={[5, 10]}>
            <Heading as="h2" fontSize="3xl" mb={8}>
              Integrate with the services you already love
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
              Using Slack/ Microsoft teams or JIRA? Built-in integrations with
              most of the popular tools to automatically send out alerts or
              raise issue tickets, so your team sees everything in one place.
            </Text>
          </Box>
        </Flex>
        <Box
          w="100%"
          display={"flex"}
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="center"
          as="section"
          sx={{ textAlign: "center" }}
          my={30}
        >
          <Heading fontSize="3xl" mb={10}>
            What People are Saying about us
          </Heading>
          {/* <Text color="subtle" fontSize="xl" mb={4}>
            Meet the experts behind the scenes. We are always excited to talk
            about anything in crypto.
          </Text> */}
          {/* <UserTestimonial /> */}
          <Box
            width={["90%", "90%", "70%"]}
            boxShadow="0px 16px 32px rgba(0, 0, 0, 0.13)"
            borderRadius="15px"
            my={20}
          >
            <VStack>
              <Image
                mt={"-50px"}
                mb={"20px"}
                height={"120px"}
                width="120px"
                src="/testimonials/gregory.jpeg"
                borderRadius={"50%"}
              />
              <Text fontSize="lg" mt="10">
                Gregory Makodzeba
              </Text>
              <Text color="subtle" fontSize="md">
                Co-Founder at Soken
              </Text>
              <Box>
                <Text
                  padding={"10"}
                  fontSize={["sm", "sm", "lg"]}
                  fontStyle="italic"
                  fontWeight="400"
                >
                  Thanks to Solidity Scan team for building a comprehensive
                  vulnerability scanner for smart contracts that will help you
                  protect contracts from potential scams. It helps you not only
                  find bugs in source code, but conveniently manage reports with
                  the dashboard from your account. It is a nice tool not only
                  for investors to know about the security of the contract they
                  are investing in, but also for audit teams who conduct
                  security testing and want to expand their tools for contract
                  analysis.
                </Text>
              </Box>
            </VStack>
          </Box>
        </Box>
        <Box w="100%" as="section" sx={{ textAlign: "center" }} my={24}>
          <Heading fontSize="3xl" mb={5}>
            Our Team
          </Heading>
          <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={5}>
            Meet the experts behind the scenes. We are always excited to talk
            about anything in crypto.
          </Text>
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            py={10}
            my={[5, 5, 20]}
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
                my={[5, 5, 5, 0]}
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
          {/* <Flex
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
          </Flex> */}
        </Box>

        {/* Section 4 */}
        <Box
          w="100%"
          as="section"
          sx={{ textAlign: "center" }}
          mb={10}
          mt={[10, 10, 20]}
        >
          <Heading as="h2" fontSize="3xl" my={5}>
            Fully automated smart contract audit system <br /> to help{" "}
            <Box as="span" sx={{ color: "accent" }}>
              secure your products faster
            </Box>
          </Heading>
          <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
            Focus on what matters most, our robots handle the rest ☕️
          </Text>
          <ImageCarousel />
        </Box>
        <Box
          sx={{
            w: "100%",
            backgroundImage: 'url("/background/pattern.png")',
            borderRadius: 20,
            overflow: "hidden",
            mb: 10,
          }}
        >
          <Flex
            sx={{
              px: 10,
              py: [10, 20],
              w: "100%",
              bg: "rgba(82, 255, 0, 0.06)",
              flexDir: "column",
              alignItems: "center",
            }}
          >
            <Heading as="h1" fontSize="3xl" mb={4} textAlign="center">
              Request for a{" "}
              <Box as="span" sx={{ color: "accent" }}>
                manual audit
              </Box>{" "}
            </Heading>
            <Text
              color="subtle"
              fontSize={["lg", "lg", "xl"]}
              mb={4}
              textAlign="center"
            >
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
            <Heading as="h5" fontSize="4xl" my={4}>
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
            backgroundImage: "url(/background/pattern.png)",
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
                as="h2"
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
      <ManualAuditForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}
