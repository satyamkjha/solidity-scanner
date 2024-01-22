import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  Divider,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const InNewsSection: React.FC = () => {
  const data: {
    imgLink: string;
    articleLink: string;
    articleHeading: string;
    articlePara: string;
  }[] = [
    {
      imgLink: "landing/news_and_media/news_1.png",
      articleLink:
        "https://yourstory.com/the-decrypting-story/funding-blockchain-startup-credshields-web3-security",
      articleHeading:
        "[FUNDING ALERT] BLOCKCHAIN STARTUP CREDSHIELDS RAISES $500K FUNDS FROM BOOSTVC",
      articlePara:
        "Blockchain startup ﻿CredShields﻿ on Thursday said it raised $500,000 from BoostVC as part of its 2022 acceleration cohort. With the capital raised, the startup will use it to expand its team and enhance product growth and user acquisition.Read more at: https://yourstory.com/the-decrypting-story/funding-blockchain-startup-credshields-web3-security",
    },

    {
      imgLink: "landing/news_and_media/news_2.png",
      articleLink:
        "https://blog.reef.io/solidityscan-the-smart-contract-security-audit-tool-built-for-next-gen-dapps-will-be-integrated-into-reefscan/",
      articleHeading:
        "SolidityScan, the smart contract security audit tool built for next-gen dApps, will be integrated into ReefScan.",
      articlePara:
        "We are thrilled to announce that developers building on ReefChain will be able to utilize SolidityScan, the enterprise grade suite of security tools built by CredShields, to evaluate their smart contracts and mitigate any existing risks before deploying them on the mainnet. Security is of prime importance in the Web3.0 industry. With more and more blockchain enthusiasts and investors deciding to invest in various DeFi farms, hackers are always on the look-out for exploiting vulnerabilities in smart contracts to steal investor funds and sensitive information. News reports of smart contract hacks make headlines in the cryptosphere every other day.",
    },
    {
      imgLink: "landing/news_and_media/news_3.png",
      articleLink:
        "https://www.blog.blockscout.com/solidityscan-blockscout-making-smart-contracts-more-secure/",
      articleHeading:
        "SolidityScan + Blockscout: Making smart contracts more secure",
      articlePara:
        "Blockscout makes it easy to verify and interact with blockchain contracts. Anyone, anywhere can deploy and verify a contract, then start interacting with it immediately. This freedom is essential to web3 and open blockchains, but also can bring up issues when a contract contains bugs, poorly written code, code that can be exploited, or in extreme cases, malicious code intended to steal funds. Ideally, contracts are audited by autonomous 3rd party firms that work with teams to identify and address any vulnerabilities. This is essential for contracts managing large amounts of funds or contracts with minting functionality for valuable tokens. However, auditing firms are expensive, and often have months-long backlogs.",
    },
    {
      imgLink: "landing/news_and_media/news_4.png",
      articleLink:
        "https://in.investing.com/news/xdc-network-and-solidityscan-forge-powerful-partnership-to-strengthen-blockchain-security-3721367",
      articleHeading:
        "XDC Network and SolidityScan Forge Powerful Partnership to Strengthen Blockchain Security",
      articlePara:
        "XDC Network, a leading blockchain platform is delighted to announce its strategic partnership with SolidityScan, a prominent blockchain security firm. This partnership sets the stage for a dynamic collaboration aimed at bolstering security measures and fostering innovation within the blockchain ecosystem. By combining their respective strengths and expertise, SolidityScan and XDC Network are poised to make significant strides in enhancing the security of blockchain technologies. The partnership seeks to leverage SolidityScan’s cutting-edge security solutions and XDC Network’s robust blockchain platform to provide developers and users with a more secure and reliable environment.",
    },
  ];

  return (
    <Flex
      as="section"
      w={"100%"}
      alignItems="center"
      textAlign={["center", "center"]}
      flexDir="column"
    >
      <Heading
        width="100%"
        maxW="1000px"
        textAlign="center"
        as="h2"
        fontSize="3xl"
        fontWeight={700}
        my={5}
        mx={[5, 5, 10]}
      >
        IN THE{" "}
        <Box as="span" sx={{ color: "accent" }}>
          NEWS
        </Box>
      </Heading>
      <Text
        maxW="1000px"
        textAlign="center"
        color="subtle"
        mx={[5, 5, 10]}
        fontSize={["lg", "lg", "xl"]}
        mb={5}
      >
        Explore the Buzz Surrounding Our Innovative Solution
      </Text>
      <Box
        display={"flex"}
        // flexDir="column"
        alignItems="center"
        justifyContent={"flex-start"}
        w={"90%"}
        px={[0, 0, 0]}
        py={10}
        my={10}
        borderRadius={20}
        background={"#FFFFFF"}
      >
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              style={{
                width: "fit-content",
                height: "fit-content",
                opacity: 1,
              }}
            >
              <ArticleComp key={index} {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

const ArticleComp: React.FC<{
  imgLink: string;
  articleLink: string;
  articleHeading: string;
  articlePara: string;
}> = ({ articleLink, articleHeading, articlePara, imgLink }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      width={"90vw"}
      maxW="400px"
      height="fit-content"
      borderRadius="25px"
      background={"#FAFBFC"}
    >
      <Image
        src={`${assetsURL}${imgLink}`}
        width="100%"
        height={["200px", "200px", "220px"]}
        borderTopLeftRadius="25px"
        borderTopRightRadius="25px"
      />
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        flexDir={"column"}
        p={5}
        borderBottomLeftRadius="25px"
        borderBottomRightRadius="25px"
        width="100%"
        height={"400px"}
        textAlign="left"
        background={"#FAFBFC"}
      >
        <VStack spacing={3}>
          <Text fontSize="lg" fontWeight={700}>
            {articleHeading}
          </Text>
          <Text fontSize="sm" noOfLines={8}>
            {articlePara}
          </Text>
          <Divider borderWidth={2} />
        </VStack>
        <Button
          onClick={() => window.open(articleLink, "_blank")}
          fontSize="16px"
          py={6}
          px={10}
          w="95%"
          mt={3}
          variant="cta-outline"
        >
          Read Full Article
        </Button>
      </Flex>
    </Flex>
  );
};
