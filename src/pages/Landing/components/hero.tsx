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
          flexWrap={"wrap"}
          rowGap={10}
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
            {/* <svg width="250" height="54" viewBox="0 0 250 54" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-130.000000, -73.000000)">
                  <g transform="translate(130.000000, 73.000000)">
                    <rect
                      stroke="#FF6154"
                      stroke-width="1"
                      fill="#FFFFFF00"
                      x="0.5"
                      y="0.5"
                      width="249"
                      height="53"
                      rx="10"
                    />
                    <text
                      font-family="Helvetica-Bold, Helvetica"
                      font-size="9"
                      font-weight="bold"
                      fill="#FF6154"
                    >
                      <tspan x="53" y="20">
                        #1 PRODUCT OF THE MONTH
                      </tspan>
                    </text>
                    <text
                      font-family="Helvetica-Bold, Helvetica"
                      font-size="16"
                      font-weight="bold"
                      fill="#FF6154"
                    >
                      <tspan x="52" y="40">
                        Developer Tools
                      </tspan>
                    </text>
                    false
                    <g transform="translate(11.000000, 12.000000)">
                      <path
                        d="M31,15.5 C31,24.0603917 24.0603917,31 15.5,31 C6.93960833,31 0,24.0603917 0,15.5 C0,6.93960833 6.93960833,0 15.5,0 C24.0603917,0 31,6.93960833 31,15.5"
                        fill="#FF6154"
                      />
                      <path
                        d="M17.4329412,15.9558824 L17.4329412,15.9560115 L13.0929412,15.9560115 L13.0929412,11.3060115 L17.4329412,11.3060115 L17.4329412,11.3058824 C18.7018806,11.3058824 19.7305882,12.3468365 19.7305882,13.6308824 C19.7305882,14.9149282 18.7018806,15.9558824 17.4329412,15.9558824 M17.4329412,8.20588235 L17.4329412,8.20601152 L10.0294118,8.20588235 L10.0294118,23.7058824 L13.0929412,23.7058824 L13.0929412,19.0560115 L17.4329412,19.0560115 L17.4329412,19.0558824 C20.3938424,19.0558824 22.7941176,16.6270324 22.7941176,13.6308824 C22.7941176,10.6347324 20.3938424,8.20588235 17.4329412,8.20588235"
                        fill="#FFFFFF"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg> */}
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
          {/* <svg width="250" height="54" viewBox="0 0 250 54" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-130.000000, -73.000000)">
                <g transform="translate(130.000000, 73.000000)">
                  <rect
                    stroke="#FF6154"
                    stroke-width="1"
                    fill="#FFFFFF00"
                    x="0.5"
                    y="0.5"
                    width="249"
                    height="53"
                    rx="10"
                  />
                  <text
                    font-family="Helvetica-Bold, Helvetica"
                    font-size="9"
                    font-weight="bold"
                    fill="#FF6154"
                  >
                    <tspan x="53" y="20">
                      #1 PRODUCT OF THE MONTH
                    </tspan>
                  </text>
                  <text
                    font-family="Helvetica-Bold, Helvetica"
                    font-size="16"
                    font-weight="bold"
                    fill="#FF6154"
                  >
                    <tspan x="52" y="40">
                      Developer Tools
                    </tspan>
                  </text>
                  false
                  <g transform="translate(11.000000, 12.000000)">
                    <path
                      d="M31,15.5 C31,24.0603917 24.0603917,31 15.5,31 C6.93960833,31 0,24.0603917 0,15.5 C0,6.93960833 6.93960833,0 15.5,0 C24.0603917,0 31,6.93960833 31,15.5"
                      fill="#FF6154"
                    />
                    <path
                      d="M17.4329412,15.9558824 L17.4329412,15.9560115 L13.0929412,15.9560115 L13.0929412,11.3060115 L17.4329412,11.3060115 L17.4329412,11.3058824 C18.7018806,11.3058824 19.7305882,12.3468365 19.7305882,13.6308824 C19.7305882,14.9149282 18.7018806,15.9558824 17.4329412,15.9558824 M17.4329412,8.20588235 L17.4329412,8.20601152 L10.0294118,8.20588235 L10.0294118,23.7058824 L13.0929412,23.7058824 L13.0929412,19.0560115 L17.4329412,19.0560115 L17.4329412,19.0558824 C20.3938424,19.0558824 22.7941176,16.6270324 22.7941176,13.6308824 C22.7941176,10.6347324 20.3938424,8.20588235 17.4329412,8.20588235"
                      fill="#FFFFFF"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg> */}
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=381735&theme=light&period=monthly&topic_id=267"
            alt="SolidityScan - The&#0032;ultimate&#0032;EVM&#0032;compatible&#0032;smart&#0032;contract&#0032;analysis&#0032;tool | Product Hunt"
            style={{
              width: "250px",
              height: "54px",
              marginTop: "30px",
            }}
          />
        </a>
      </Flex>
    </Flex>
  );
};
