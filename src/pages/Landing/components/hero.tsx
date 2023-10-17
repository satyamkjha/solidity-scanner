import React from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";
import Lottie from "lottie-react";
import ssIconAnimation from "./heroIllustration.json";
import { Link } from "react-router-dom";

export const LandingHero: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1000px)");

  return (
    <Flex
      as="section"
      w="100%"
      textAlign={["center", "left"]}
      py={20}
      px={[0, 0, 0, 20]}
      display={["flex"]}
      flexDirection={isDesktopView ? "row" : "column"}
      alignItems={"center"}
      justifyContent={isDesktopView ? "space-between" : "flex-start"}
    >
      <Box
        w={isDesktopView ? "65%" : "90%"}
        px={[0, 0, 10]}
        mt={0}
        textAlign={isDesktopView ? "left" : "center"}
        justifyContent="center"
        h="100%"
        display={"flex"}
        maxW="900px"
        flexDir="column"
        alignItems={isDesktopView ? "flex-start" : "center"}
      >
        <Heading
          as="h1"
          color="white"
          fontWeight={800}
          fontSize={["3xl", "5xl"]}
        >
          Smart Contracts, Smarter Security with AI.
        </Heading>
        <Heading
          as="h1"
          color="white"
          fontWeight={800}
          fontSize={["3xl", "5xl"]}
          mb={8}
        >
          <Box
            as="span"
            sx={{
              background:
                "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Scan...",
                2000, // wait 1s before replacing "Mice" with "Hamsters"
                "Fix...",
                2000,
                "Publish...",
                2000,
              ]}
              className="type-cursor-animation"
              wrapper="span"
              speed={50}
              cursor={true}
              // style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </Box>
        </Heading>
        <Text fontSize={["lg", "xl", "2xl"]} color="subtle" mb={8}>
          An advanced smart contract scanning tool designed to uncover
          vulnerabilities and proactively address risks within your code.
        </Text>
        <Flex
          justifyContent={"flex-start"}
          alignItems="flex-start"
          display={["none", "none", "flex"]}
          flexDir={["column", "column", "row"]}
          flexWrap={"wrap"}
          rowGap={10}
          mt={10}
          maxW="600px"
        >
          <Link to="/signup">
            <Button variant="brand" fontSize={"16px"} py={7} w="250px">
              Signup For Free Trial
            </Button>
          </Link>
          <Link to="/quickscan">
            <Button
              ml={[0, 0, 5]}
              mt={[5, 5, 0]}
              variant="cta-outline"
              w="250px"
            >
              Run A QuickScan
            </Button>
          </Link>
          <a
            href="https://www.producthunt.com/posts/solidityscan?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-solidityscan"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=381735&theme=light&period=monthly&topic_id=267"
              alt="SolidityScan - The&#0032;ultimate&#0032;EVM&#0032;compatible&#0032;smart&#0032;contract&#0032;analysis&#0032;tool | Product Hunt"
              style={{
                width: "250px",
                height: "54px",
              }}
            />
          </a>
        </Flex>
      </Box>
      <Box
        mt={isDesktopView ? 0 : 20}
        w={isDesktopView ? "35%" : "100%"}
        display={["flex"]}
        flexDirection="column"
        alignItems={isDesktopView ? "flex-start" : "center"}
      >
        <Lottie
          style={{
            height: "auto",
            width: "100%",
          }}
          animationData={ssIconAnimation}
        />
      </Box>
      <Flex
        justifyContent={"flex-start"}
        alignItems="center"
        display={["flex", "flex", "none"]}
        flexDir={"column"}
        mt={20}
        w="90%"
        rowGap={5}
      >
        <Link to="/signup">
          <Button
            variant="brand"
            fontSize={"16px"}
            py={7}
            minW="200px"
            w="250px"
          >
            Signup For Free Trial
          </Button>
        </Link>
        <Link to="/quickscan">
          <Button ml={[0, 0, 5]} variant="cta-outline" minW="200px" w="250px">
            Run A QuickScan
          </Button>
        </Link>
        <a
          href="https://www.producthunt.com/posts/solidityscan?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-solidityscan"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=381735&theme=light&period=monthly&topic_id=267"
            alt="SolidityScan - The&#0032;ultimate&#0032;EVM&#0032;compatible&#0032;smart&#0032;contract&#0032;analysis&#0032;tool | Product Hunt"
            style={{
              width: "250px",
              height: "54px",
            }}
          />
        </a>
      </Flex>
    </Flex>
  );
};
