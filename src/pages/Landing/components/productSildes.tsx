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
      heading: "See your security posture evolve",
      imgAlt: "Keep track of the bugs in your project",
      text: `Upload specific contract code or provide code repositories link and
        we’ll take care of the rest. Set triggers to automatically run scans
        when developers make updates, and see trends on how your code
        quality has improved`,
      imgUrl: "landing/carousel/Screenshot_2.png",
      mobileImgUrl: "mobileScreen.png",
      numberColorLinearGradient:
        "linear-gradient(151deg, #20DAF1 7.73%, #83F1FF 85.99%), #FFF",
      lightColor: "rgba(32, 218, 241, 0.17)",
    },
    {
      heading: "Supported Protocols",
      imgAlt: "Supported Protocols",
      text: `With tremendous growth across the Blockchain spectrum, there is a
        wide variety of Protocol options for builders to choose from. In our
        endeavor to retain the pinnacle in the Smart Contract Security Audit
        Scan space, SolidityScan boasts of providing seamless support for
        Ethereum, Polygon, Avalanche, Binance, Fantom, Cronos, Celo, and
        many more. Inviting all buidlers to subscribe to the world's
        fastest, most accurate, and secure smart contract vulnerability
        analysis and auditing platform at the most affordable price.`,
      imgUrl: "landing/carousel/Screenshot_3.png",
      mobileImgUrl: "mobileScreen.png",
      numberColorLinearGradient:
        "linear-gradient(150deg, #98FF67 15.68%, rgba(82, 255, 0, 0.56) 119.33%), #FFF",
      lightColor: "#A4FF7960",
    },
    {
      heading: "Awesome Features for Pro Users",
      imgAlt: "Customize and silence issues and set your own rules",
      text: `Seamlessly upload your specific contract code or share code repositories link, and our AI-powered solution will handle the rest. Set intelligent triggers to automatically initiate scans whenever developers make updates while observing the trends that highlight the progressive enhancement of your code quality. Embrace the power of AI to revolutionize your security practices and unlock unprecedented insights into your codebase.`,
      imgUrl: "landing/carousel/Screenshot_4.png",
      mobileImgUrl: "mobileScreen.png",
      numberColorLinearGradient:
        "linear-gradient(151deg, #F90 7.73%, #FFBB54 85.99%), #FFF",
      lightColor: "#FFB34250",
    },
    {
      heading: "Publish reports & share your security report",
      imgAlt: "Publish reports and share your security score",
      text: `Share and validate your progress with the community with easily
      publishable reports. Your community and investors can use the report
      summary and be confident of your contracts' security. For the more
      technical minded, you can add the full bug reports available in the
      report too.`,
      imgUrl: "landing/carousel/Screenshot_5.png",
      mobileImgUrl: "mobileScreen.png",
      numberColorLinearGradient:
        "linear-gradient(151deg, #ED6CA5 7.73%, #FF9EC9 85.99%), #FFF",
      lightColor: "#F788B940",
    },
    {
      heading: "Seamlessly Connected Workflows",
      imgAlt: "Seamlessly Connected Workflows",
      text: `Seamlessly upload your specific contract code or share code repositories link, and our AI-powered solution will handle the rest. Set intelligent triggers to automatically initiate scans whenever developers make updates while observing the trends that highlight the progressive enhancement of your code quality. Embrace the power of AI to revolutionize your security practices and unlock unprecedented insights into your codebase.`,
      imgUrl: "landing/carousel/Screenshot_6.png",
      mobileImgUrl: "mobileScreen.png",
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
        maxW="700px"
        as="h2"
        fontSize="3xl"
        fontWeight={800}
        my={5}
      >
        Lorem ipsum dolor sit amet consectetur. Ipsum quis quisque{" "}
        <Box as="span" sx={{ color: "accent" }}>
          luctus senectus sagittis
        </Box>
      </Heading>
      <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={5}>
        Lorem ipsum dolor sit amet consectetur. At velit duis mattis
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
            <Image src={`${"lineUp.svg"}`} height="156px" alt={""} />
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
              src={`${"lineDown.svg"}`}
              height="156px"
              alt={""}
            />
          </VStack>
        </HStack>
        <VStack
          justifyContent="flex-start"
          alignItems={isLargerThan1000 ? "flex-start" : "center"}
          w={["100%", "100%", "100%", "30%", "25%"]}
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

  const checkInview = () => {
    if (ref.current && isInStartViewport(ref.current)) {
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
      element?.removeEventListener("scroll", checkInview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  return (
    <VStack
      ref={ref}
      w="100%"
      h="fit-content"
      minH="600px"
      spacing={7}
      justifyContent="center"
      alignItems={isLargerThan1000 ? "flex-start" : "center"}
      opacity={isVisible ? 1 : 0}
      // transform={`translateY(${isVisible ? 0 : 0}px)`}
      transition="opacity 0.5s ease, transform 0.5s ease"
    >
      <Image
        display={["block", "block", "none"]}
        // src={`${assetsURL}${mobileImgUrl}`}
        src="mobileScreen.png"
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
