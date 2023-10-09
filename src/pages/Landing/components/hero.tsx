import React, { useEffect } from "react";
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
      px={[0, 0, 0, 24]}
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
        maxW="700px"
        flexDir="column"
        alignItems={isDesktopView ? "flex-start" : "center"}
      >
        <Heading
          as="h1"
          color="white"
          fontWeight={800}
          fontSize={["3xl", "5xl"]}
          mb={8}
        >
          Get your smart contracts audited by a{" "}
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
                "Lorem ipsum Test",
                2000, // wait 1s before replacing "Mice" with "Hamsters"
                "Lorem ipsum Success One",
                2000,
                "Lorem ipsum Test Again",
                2000,
                "Lorem ipsum Success Again",
                2000,
              ]}
              wrapper="span"
              speed={50}
              cursor={true}
              // style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </Box>
        </Heading>
        <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
          Smart-contract scanning tool built to discover vulnerabilities &
          mitigate risks in your code.
        </Text>
        <Flex
          justifyContent={"flex-start"}
          alignItems="flex-start"
          display={["none", "none", "flex"]}
          flexDir={["column", "column", "row"]}
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
        </Flex>
      </Box>
      <Box
        mt={isDesktopView ? 0 : 20}
        w={isDesktopView ? "35%" : "100%"}
        display={["flex"]}
        flexDirection="column"
        alignItems={isDesktopView ? "flex-end" : "center"}
      >
        <Lottie
          style={{
            height: "500px",
            width: "400px",
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
      >
        <Link to="/signup">
          <Button
            variant="brand"
            fontSize={"16px"}
            py={7}
            minW="200px"
            w="70vw"
          >
            Signup For Free Trial
          </Button>
        </Link>
        <Link to="/quickscan">
          <Button
            ml={[0, 0, 5]}
            mt={[5, 5, 0]}
            variant="cta-outline"
            minW="200px"
            w="70vw"
          >
            Run A QuickScan
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
