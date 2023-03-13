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
  Stack,
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
import Infographics from "components/infographics";
import SignupBox from "components/signupBox";
import UserTestimonial from "./components/testimonial";

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
      <Container maxW={["95vw", "95vw", "90vw", "100vw"]} color="black">
        {/* Section 1 */}
        <Flex
          as="section"
          w="100%"
          my={0}
          textAlign={["center", "left"]}
          py={24}
          px={[0, 0, 0, 24]}
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
          <Box
            w={["100%", "100%", "100%", "50%"]}
            px={[0, 0, 10]}
            py={5}
            justifyContent="center"
            display={"flex"}
            flexDir="column"
            alignItems={["center", "center", "center", "flex-start"]}
          >
            <Heading as="h1" fontSize={["3xl", "4xl"]} mb={8}>
              Get your smart contracts audited by a smarter tool
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <Flex
              justifyContent={"flex-start"}
              alignItems="flex-start"
              flexDir={["column", "row"]}
            >
              <Link to="/signup">
                <Button variant="brand" fontSize={"16px"} py={7} w="200px">
                  Signup For Free Trial
                </Button>
              </Link>
              <Link to="/quickscan">
                <Button ml={[0, 5]} mt={[5, 0]} variant="cta-outline" w="200px">
                  Run QuickScan Once
                </Button>
              </Link>
            </Flex>
            <a
              href="https://www.producthunt.com/posts/solidityscan?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-solidityscan"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=381735&theme=light"
                alt="SolidityScan - The&#0032;Ultimate&#0032;EVM&#0032;Compatible&#0032;Smart&#0032;Contract&#0032;Analysis&#0032;Tool&#0033; | Product Hunt"
                style={{ width: "250px", height: "54px", marginTop: "50px" }}
              />
            </a>
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
        <Box
          w="100%"
          as="section"
          sx={{ textAlign: "center" }}
          my={[4, 8]}
          px={[0, 0, 0, 24]}
        >
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
          <Infographics />
        </Box>

        <Flex
          as="section"
          w="100%"
          my={0}
          textAlign={["center", "left"]}
          py={24}
          px={[0, 0, 0, 24]}
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

        <Flex
          as="section"
          w="100%"
          my={0}
          textAlign={["center", "left"]}
          py={[5, 5, 10, 20]}
          px={[0, 0, 0, 24]}
          backgroundImage={"url(/background/pattern_mask.png)"}
          display={["flex"]}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            borderColor={"#3300FF"}
            width="100%"
            height={["180px", "260px", "340px", "450px", "580px", "650px"]}
            borderRadius={["5px"]}
          >
            <iframe
              style={{
                width: "100%",
                height: "100%",
              }}
              src="https://www.youtube.com/embed/psu3GTKS_us"
              title="SolidityScan by CredShields - Intro"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Box>
        </Flex>
        {/* Section 3 */}
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={[5, 5, 10]}
          px={[0, 0, 0, 24]}
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
          px={[0, 0, 0, 24]}
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
          px={[0, 0, 0, 24]}
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
          px={[0, 0, 0, 24]}
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

            <Button
              onClick={() =>
                window.open(
                  "https://solidityscan.com/published-report/project/d393242670c81938",
                  "_blank"
                )
              }
              variant={"cta-outline"}
            >
              View Audit Reports
            </Button>
          </Box>
        </Flex>
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={[5, 5, 10]}
          px={[0, 0, 0, 24]}
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
          as="section"
          sx={{ textAlign: "center" }}
          my={28}
          px={[0, 0, 0, 24]}
        >
          <Heading fontSize="3xl" mb={10}>
            What People are Saying about us
          </Heading>
          {/* <Text color="subtle" fontSize="xl" mb={4}>
            Meet the experts behind the scenes. We are always excited to talk
            about anything in crypto.
          </Text> */}
          <UserTestimonial />
        </Box>
        <Box
          w="100%"
          as="section"
          sx={{ textAlign: "center" }}
          my={24}
          px={[0, 0, 0, 24]}
        >
          <Heading fontSize="3xl" mb={5}>
            Meet the Founders
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
          px={[0, 0, 0, 24]}
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
          mx={[0, 0, 0, 24]}
          sx={{
            w: ["100%", "100%", "100%", "85%"],
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
        <Box
          w="100%"
          as="section"
          sx={{ textAlign: "center" }}
          my={8}
          px={[0, 0, 0, 24]}
        >
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
        <SignupBox />
      </Container>
      <Footer />
      <ManualAuditForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}
