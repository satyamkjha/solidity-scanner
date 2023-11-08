import React, { useRef, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Image,
  VStack,
  SkeletonText,
  Skeleton,
  HStack,
  Box,
  useMediaQuery,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

import { isInStartViewport } from "common/functions";

export default function ProductSlides() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  const [number, setNumber] = useState(0);

  const data = [
    {
      heading: "Enhance Your Security Posture",
      imgAlt: "Keep track of the bugs in your project",
      text: `Upload your code or provide a repository link, set up automated scans for updates, and monitor the evolution of your code quality.`,
      imgUrl: "landing/product_slides/slide_1_desktop.svg",
      mobileImgUrl: "landing/product_slides/slide_1_mobile.svg",
      numberColorLinearGradient:
        "linear-gradient(151deg, #20DAF1 7.73%, #83F1FF 85.99%), #FFF",
      lightColor: "rgba(32, 218, 241, 0.17)",
    },
    {
      heading: "Wide Protocol Support",
      imgAlt: "Supported Protocols",
      text: `We specialize in Smart Contract Security Audits with seamless support for Ethereum, Polygon, Avalanche, Binance, and more. Access the world's fastest, most precise, and affordable smart contract vulnerability analysis platform.`,
      imgUrl: "landing/product_slides/slide_2_desktop.svg",
      mobileImgUrl: "landing/product_slides/slide_2_mobile.svg",
      numberColorLinearGradient:
        "linear-gradient(150deg, #98FF67 15.68%, rgba(82, 255, 0, 0.56) 119.33%), #FFF",
      lightColor: "#A4FF7960",
    },
    {
      heading: "AI-Driven Pro Features",
      imgAlt: "Customize and silence issues and set your own rules",
      text: `Effortlessly upload your code, configure automated scans upon updates, and track code quality trends with AI insights.`,
      imgUrl: "landing/product_slides/slide_3_desktop.svg",
      mobileImgUrl: "landing/product_slides/slide_3_mobile.svg",
      numberColorLinearGradient:
        "linear-gradient(151deg, #F90 7.73%, #FFBB54 85.99%), #FFF",
      lightColor: "#FFB34250",
    },
    {
      heading: "Publish & Share Security Reports",
      imgAlt: "Publish reports and share your security score",
      text: `Easily share your progress with the community through easily publishable reports. Investors can rely on report summaries for confidence. Technical details are available in the full report.`,
      imgUrl: "landing/product_slides/slide_4_desktop.svg",
      mobileImgUrl: "landing/product_slides/slide_4_mobile.svg",
      numberColorLinearGradient:
        "linear-gradient(151deg, #ED6CA5 7.73%, #FF9EC9 85.99%), #FFF",
      lightColor: "#F788B940",
    },
    {
      heading: "Seamless Workflow Integrations",
      imgAlt: "Seamless Workflow Integrations",
      text: `Seamlessly connect your GitHub repositories and Slack workspace for real-time alerts. Configure triggers for automated scans on updates and monitor code quality trends with AI insights. Revolutionize security practices and gain unparalleled codebase insights.`,
      imgUrl: "landing/product_slides/slide_5_desktop.svg",
      mobileImgUrl: "landing/product_slides/slide_5_mobile.svg",
      numberColorLinearGradient:
        "linear-gradient(150deg, #98FF67 15.68%, rgba(82, 255, 0, 0.56) 119.33%), #FFF",
      lightColor: "#A4FF7960",
    },
  ];

  return (
    <Flex
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      mb={10}
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      h="fit-content"
      pl={[0, 0, 10]}
      pr={[0, 0, 10]}
    >
      <Heading
        width="90%"
        maxW="1300px"
        as="h2"
        fontSize="3xl"
        fontWeight={700}
        my={5}
      >
        Empowering{" "}
        <Box as="span" sx={{ color: "accent" }}>
          Smart Contract Security
        </Box>{" "}
        with Cutting-Edge Features
      </Heading>
      <Text maxW="1000px" color="subtle" fontSize={["lg", "lg", "xl"]} mb={5}>
        Our AI powered tool is packed with a diverse set of robust features
        designed to cater the unique requirements of Smart Contract
        Vulnerability Detection across organizations of all sizes in the web3
        ecosystem.
      </Text>
      <Flex
        justifyContent="flex-start"
        flexDir="row"
        alignItems="flex-start"
        w="100%"
        px={[5, 5, 10]}
        py={20}
      >
        <HStack
          w={["70%", "75%"]}
          h="fit-content"
          justifyContent="center"
          alignItems="center"
          position="sticky"
          top={"150px"}
          display={["none", "none", "none", "flex"]}
        >
          <Flex
            justifyContent="center"
            flexDir="row"
            alignItems="center"
            w="90%"
            p={0}
            borderRadius={10}
            background={`linear-gradient(180deg, ${data[number].lightColor} 0%, rgba(237, 252, 254, 0.00) 100%)`}
          >
            <Image
              src={`${assetsURL}${data[number].imgUrl}`}
              alt={""}
              borderRadius={5}
              width="100%"
            />
          </Flex>
          <VStack justifyContent="center" alignItems="center" w="10%">
            <Image
              src={`${assetsURL}common/lineUp.svg`}
              height="156px"
              alt={""}
            />
            <Flex
              width="50px"
              height="50px"
              background={data[number].lightColor}
              borderRadius="25px"
              justifyContent="center"
              alignItems="center"
            >
              <Flex
                width="40px"
                height="40px"
                background={data[number].numberColorLinearGradient}
                borderRadius="23px"
                justifyContent="center"
                alignItems="center"
              >
                <Heading color="#FFFFFF" fontSize="2xl">
                  {number + 1}
                </Heading>
              </Flex>
            </Flex>
            <Image
              // boxShadow="5px 5px 15px 15px #88888840"
              src={`${assetsURL}common/lineDown.svg`}
              height="156px"
              alt={""}
            />
          </VStack>
        </HStack>
        <VStack
          justifyContent="flex-start"
          alignItems={isLargerThan1000 ? "flex-start" : "center"}
          w={["100%", "100%", "100%", "30%", "25%"]}
          mt={[0, 0, 0, 0, 20]}
          mb={[0, 0, 0, 0, 36]}
          py={[0, 0, 0, 16, 32]}
          spacing={16}
        >
          {data.map((item, index) => (
            <SlideDescription
              key={index}
              number={index}
              header={item.heading}
              description={item.text}
              lightColor={item.lightColor}
              imgUrl={item.imgUrl}
              mobileImgUrl={item.mobileImgUrl}
              setNumber={setNumber}
              numberColorLinearGradient={item.numberColorLinearGradient}
            />
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
}

const SlideDescription: React.FC<{
  header: string;
  description: string;
  lightColor: string;
  imgUrl: string;
  mobileImgUrl: string;
  number: number;
  numberColorLinearGradient: string;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  header,
  description,
  number,
  setNumber,
  lightColor,
  imgUrl,
  mobileImgUrl,
  numberColorLinearGradient,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const element = document.getElementById("public_layout");

  const assetsURL = getAssetsURL();
  const [isVisible, setIsVisible] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(70);

  const [stopAnimation] = useMediaQuery("(max-width: 600px)");

  const setOffset = () => {
    const slide = document.getElementById(`slide-${number}`);
    if (slide) {
      const elementRect = slide.getBoundingClientRect();
      if (elementRect.bottom < 0) {
        setAnimationOffset(-70);
      } else {
        setAnimationOffset(70);
      }
    }
  };

  const checkInview = () => {
    setOffset();
    if (ref.current && isInStartViewport(ref.current, number)) {
      setNumber(number);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (element) {
      element.addEventListener("scroll", checkInview);
    }

    return () => {
      element?.removeEventListener("scroll", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack
      ref={ref}
      id={`slide-${number}`}
      w="100%"
      h="fit-content"
      minH="500px"
      spacing={7}
      justifyContent="center"
      alignItems={["center", "center", "center", "flex-start"]}
      opacity={stopAnimation || isVisible ? 1 : 0}
      transform={
        stopAnimation
          ? "none"
          : `translateY(${isVisible ? 0 : animationOffset}px)`
      }
      transition={
        stopAnimation ? "none" : "opacity 0.5s ease, transform 0.5s ease-out"
      }
    >
      <Image
        display={["block", "block", "none"]}
        src={`${assetsURL}${mobileImgUrl}`}
        height="auto"
        width="100%"
      />

      <Flex
        justifyContent="center"
        flexDir="row"
        alignItems="center"
        w="90%"
        p={0}
        borderRadius={10}
        background={`linear-gradient(180deg, ${lightColor} 0%, rgba(237, 252, 254, 0.00) 100%)`}
      >
        <Image
          display={["none", "none", "block", "none"]}
          src={`${assetsURL}${imgUrl}`}
          height="auto"
          width="90%"
        />
      </Flex>

      <Box
        w="100%"
        position="relative"
        padding="10"
        display={["none", "none", "block", "none"]}
      >
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Flex
            width="50px"
            height="50px"
            background={lightColor}
            borderRadius="25px"
            justifyContent="center"
            alignItems="center"
          >
            <Flex
              width="40px"
              height="40px"
              background={numberColorLinearGradient}
              borderRadius="23px"
              justifyContent="center"
              alignItems="center"
            >
              <Heading color="#FFFFFF" fontSize="2xl">
                {number + 1}
              </Heading>
            </Flex>
          </Flex>
        </AbsoluteCenter>
      </Box>

      <Heading
        textAlign={["center", "center", "center", "left"]}
        w="100%"
        as="h2"
        fontSize={["xl", "xl", "xl", "3xl"]}
      >
        {header}
      </Heading>
      <Text
        fontSize={["sm", "sm", "sm", "md"]}
        w="80%"
        color="subtle"
        mb={8}
        textAlign={["center", "center", "center", "left"]}
      >
        {description}
      </Text>
    </VStack>
  );
};

export function OverviewSkeleton() {
  const count = 5;
  return (
    <>
      {Array.from({ length: count - 1 }, (_, index) => index + 1).map(
        (item, index) => (
          <Flex
            key={index}
            alignItems={"center"}
            justifyContent={"center"}
            py={[5, 5, 10]}
            px={[0, 0, 0, 24]}
            w="100%"
            flexDir={
              index % 2 === 0
                ? ["column", "column", "column", "row"]
                : ["column", "column", "column", "row-reverse"]
            }
          >
            <Skeleton
              startColor="lightgray"
              endColor="#eeeeee"
              borderRadius={"50%"}
              w={["250px", "250px", "250px", "500px"]}
              h={["250px", "250px", "250px", "500px"]}
              mx={[0, 0, 0, 24]}
              mt={[10, 10, 10, 0]}
            />
            <VStack
              w={["100%", "100%", "100%", "40%"]}
              spacing={[5, 5, 5, 10]}
              mt={[10, 10, 10, 0]}
            >
              <SkeletonText
                startColor="lightgray"
                endColor="#eeeeee"
                noOfLines={1}
                skeletonHeight="7"
                w={"100%"}
              />
              <SkeletonText
                startColor="lightgray"
                endColor="#eeeeee"
                noOfLines={7}
                spacing="3"
                skeletonHeight="2"
                w={"100%"}
              />
            </VStack>
          </Flex>
        )
      )}
    </>
  );
}
