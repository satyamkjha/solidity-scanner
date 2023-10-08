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
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import AOS from "aos";
import "aos/dist/aos.css";

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
    },
    {
      heading: "Built by us, for your contracts",
      imgAlt: "Customize and silence issues and set your own rules",
      text: `Customize issues, silence specific issues or add your own rules to
      trigger alerts for. Request for assistance with issue remediation or
      get a manual audit from a team of security experts.`,
      imgUrl: "landing/carousel/Screenshot_4.png",
      mobileImgUrl: "mobileScreen.png",
    },
    {
      heading: "Publish reports and share your security score",
      imgAlt: "Publish reports and share your security score",
      text: `Share and validate your progress with the community with easily
      publishable reports. Your community and investors can use the report
      summary and be confident of your contracts' security. For the more
      technical minded, you can add the full bug reports available in the
      report too.`,
      imgUrl: "landing/carousel/Screenshot_5.png",
      mobileImgUrl: "mobileScreen.png",
    },
    {
      heading: "Integrate with the services you already love",
      imgAlt: "Integrate with Microsoft Teams, Slack and Jira",
      text: `Using Slack/ Microsoft teams or JIRA? Built-in integrations with
      most of the popular tools to automatically send out alerts or raise
      issue tickets, so your team sees everything in one place.`,
      imgUrl: "landing/carousel/Screenshot_6.png",
      mobileImgUrl: "mobileScreen.png",
    },
  ];

  return (
    <Flex
      w="100%"
      as="section"
      sx={{ textAlign: "center" }}
      my={24}
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      h="fit-content"
      py={10}
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
        px={10}
        py={20}
      >
        {isLargerThan1000 && (
          <HStack
            w="70%"
            h="fit-content"
            justifyContent="center"
            alignItems="center"
            position="sticky"
            top={"150px"}
          >
            <Flex
              justifyContent="center"
              flexDir="row"
              alignItems="center"
              w="90%"
              p={0}
              borderRadius={10}
              background="linear-gradient(180deg, #EDFCFE 0%, rgba(237, 252, 254, 0.00) 100%)"
            >
              <Image
                // boxShadow="5px 5px 15px 15px #88888840"
                src={`${assetsURL}${data[number].imgUrl}`}
                alt={""}
                width="100%"
              />
            </Flex>
            <VStack justifyContent="center" alignItems="center" w="10%">
              <Image
                // boxShadow="5px 5px 15px 15px #88888840"
                src={`${"lineUp.svg"}`}
                height="156px"
                alt={""}
              />
              <Flex
                width="50px"
                height="50px"
                background="rgba(32, 218, 241, 0.17)"
                borderRadius="25px"
                justifyContent="center"
                alignItems="center"
              >
                <Flex
                  width="40px"
                  height="40px"
                  background="linear-gradient(151deg, #20DAF1 7.73%, #83F1FF 85.99%), #FFF"
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
        )}
        <VStack
          justifyContent="flex-start"
          alignItems={isLargerThan1000 ? "flex-start" : "center"}
          w={isLargerThan1000 ? "30%" : "100%"}
        >
          {data.map((item, index) => (
            <SlideDescription
              number={index}
              header={item.heading}
              description={item.text}
              setNumber={setNumber}
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
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
}> = ({ header, description, number, setNumber }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  function isInViewport(element: any) {
    var bounding = element.getBoundingClientRect();

    if (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      console.log("In the viewport! :)");
      return true;
    } else {
      console.log("Not in the viewport. :(");
      return false;
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    window.addEventListener(
      "scroll",
      () => console.log("askdhaklsd")
      // function (event) {
      //   if (isInViewport(ref.current)) {
      //     setNumber(number);
      //   }
      // },
    );
  }, []);

  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  return (
    <VStack
      w="100%"
      maxW="300px"
      h="fit-content"
      minH="700px"
      justifyContent="center"
      ref={ref}
      alignItems={isLargerThan1000 ? "flex-start" : "center"}
      data-aos={"fade-up"}
      data-aos-offset="500"
    >
      {!isLargerThan1000 && (
        <Image src="mobileScreen.png" height="500px" width="280px" />
      )}

      <Heading as="h2" fontSize={["xl", "xl", "xl", "3xl"]} mb={8}>
        {header}
      </Heading>
      <Text fontSize={["sm", "sm", "sm", "lg"]} color="subtle" mb={8}>
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
