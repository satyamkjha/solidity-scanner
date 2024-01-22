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
      imgLink: "landing/news_and_media/news_1.svg",
      articleLink:
        "https://coindar.org/en/event/panther-protocol-to-participate-in-proof-of-security-summit-2023-in-bengaluru-on-december-5th-105643",
      articleHeading:
        "Panther Protocol to Participate in Proof of Security Summit 2023 in Bengaluru on December 5th",
      articlePara:
        "Panther Protocol’s сo-founder and CTO, Anish Mohammed, is scheduled to speak at the Proof of Security Summit 2023 taking place in Bangalore on December 5th.",
    },
    {
      imgLink: "landing/news_and_media/news_2.svg",
      articleLink: "https://bitcoinworld.co.in/security-summit2023/",
      articleHeading: "Proof of Security Summit’23 – India by SolidityScan",
      articlePara:
        "In the heart of India’s dynamic Silicon Valley, where innovation pulses through the streets and every corner tells a tale of technological prowess, Bangalore plays host to an event that promises to reshape the very foundation of Web3 Security. Welcome to the “Proof of Security – Summit’23 by SolidityScan,” ",
    },
    {
      imgLink: "landing/news_and_media/news_3.svg",
      articleLink: "https://www.binance.com/en-ZA/feed/post/1590367",
      articleHeading:
        "Proof of Security Summit ’23 in India: Web3 Security Revolution With SolidityScan",
      articlePara:
        "SolidityScan, the trailblazing Web3 security platform by CredShields, introduces a dynamic hybrid hackathon — Proof of Security Summit’23 — in December in ‘India’s Silicon Valley’ Bangalore. Happening alongside ETHIndia 2023, this event is set to immerse the attendees in the revolutionary landscape of Web3 Security.",
    },
    {
      imgLink: "landing/news_and_media/news_4.svg",
      articleLink:
        "https://www.digitaljournal.com/pr/news/binary-news-network/solidityscan-announces-proof-of-security-summit-23-india",
      articleHeading:
        "SolidityScan announces Proof of Security Summit’23 – India",
      articlePara:
        "India, 26th Nov 2023 – In the heart of India’s dynamic Silicon Valley, where innovation pulses through the streets and every corner tells a tale of technological prowess, Bangalore plays host to an event that promises to reshape the very foundation of Web3 Security. Welcome to the “Proof of Security – Summit’23 by SolidityScan,” a convergence of Web3 visionaries, thought leaders, and experts poised to revolutionise the Web3 Security landscape, all within the dynamic backdrop of ETH India 2023. As the sun sets over the Garden City, ushering in December, Bangalore’s vibrant energy seamlessly blends with the cutting-edge discussions and breakthroughs anticipated at this extraordinary Summit.",
    },
    {
      imgLink: "landing/news_and_media/news_5.svg",
      articleLink:
        "https://cryptobrowser.io/news/proof-of-security-summit23-india-by-solidityscan/",
      articleHeading: "Proof of Security Summit’23 - India by SolidityScan",
      articlePara:
        "In the heart of India's dynamic Silicon Valley, where innovation pulses through the streets and every corner tells a tale of technological prowess, Bangalore plays host to an event that promises to reshape the very foundation of Web3 Security. Welcome to the 'Proof of Security - Summit’23 by SolidityScan,' a convergence of Web3 visionaries, thought leaders, and experts poised to revolutionise the Web3 Security landscape, all within the dynamic backdrop of ETH India 2023. As the sun sets over the Garden City, ushering in December, Bangalore's vibrant energy seamlessly blends with the cutting-edge discussions and breakthroughs anticipated at this extraordinary Summit.",
    },
    {
      imgLink: "landing/news_and_media/news_6.svg",
      articleLink:
        "https://www.benzinga.com/pressreleases/23/11/35950659/solidityscan-announces-proof-of-security-summit23-india",
      articleHeading:
        "SolidityScan announces Proof of Security Summit'23 - India",
      articlePara: `India, 26th Nov 2023 - In the heart of India's dynamic Silicon Valley, where innovation pulses through the streets and every corner tells a tale of technological prowess, Bangalore plays host to an event that promises to reshape the very foundation of Web3 Security. Welcome to the "Proof of Security - Summit'23 by SolidityScan," a convergence of Web3 visionaries, thought leaders, and experts poised to revolutionise the Web3 Security landscape, all within the dynamic backdrop of ETH India 2023. As the sun sets over the Garden City, ushering in December, Bangalore's vibrant energy seamlessly blends with the cutting-edge discussions and breakthroughs anticipated at this extraordinary Summit.`,
    },
    {
      imgLink: `landing/news_and_media/news_7.svg`,
      articleLink: `https://www.coinlive.com/news/proof-of-security-summit-23`,
      articleHeading: `Proof of Security Summit’23`,
      articlePara: `In the heart of India's tech hub, Bangalore, the "Proof of Security - Summit’23 by SolidityScan'' is set to shape the Web3 Security landscape. It brings together Web3 experts and visionaries at ETH India 2023. The event fosters security discussions in developer and research circles, providing a vital platform for learning and collaboration among developers, security researchers, and Web3 enthusiasts to address ongoing security challenges.`,
    },
    {
      imgLink: `landing/news_and_media/news_8.svg`,
      articleLink: `https://www.cryptopolitan.com/proof-of-security-summit23-india-by-solidityscan/`,
      articleHeading: `PROOF OF SECURITY SUMMIT’23 – INDIA BY SOLIDITYSCAN`,
      articlePara: `In the heart of India’s dynamic Silicon Valley, where innovation pulses through the streets and every corner tells a tale of technological prowess, Bangalore plays host to an event that promises to reshape the very foundation of Web3 Security. Welcome to the “Proof of Security – Summit’23 by SolidityScan,” a convergence of Web3 visionaries, thought leaders, and experts poised to revolutionise the Web3 Security landscape, all within the dynamic backdrop of ETH India 2023. As the sun sets over the Garden City, ushering in December, Bangalore’s vibrant energy seamlessly blends with the cutting-edge discussions and breakthroughs anticipated at this extraordinary Summit.`,
    },
    {
      imgLink: `landing/news_and_media/news_9.svg`,
      articleLink: `https://www.businessworld.in/article/CredShields-Offering-Credibility-Providing-Protection/08-08-2023-486969/`,
      articleHeading: `CredShields: Offering Credibility, Providing Protection`,
      articlePara: `CredShields breaks down to Cred for 'Credibility' and Shields for 'Protection'. In this rapidly evolving world, the company is aiming to build next-gen security tools for Web 3.0. The rise in smart contract hacks, resulting in significant financial losses, has led to increased awareness and adoption of Web 3 security measures. However, due to the high demand for audits and a shortage of skilled talent, the cost of manual audits has surged.`,
    },
    {
      imgLink: `landing/news_and_media/news_10.svg`,
      articleLink: `https://vcworld.in/2023/07/22/bw-web-3-0-awards-indias-transformative-technocrats/`,
      articleHeading: `BW Web 3.0 Awards: India’s Transformative Technocrats BY VCWORLD BUREAU on JULY 22, 2023 • ( 0 )`,
      articlePara: `Web 3 is gaining traction among consumers, who are attracted to its promise of more security and control over their personal data. This shift has implications for businesses, as they will need to adapt their security measures to protect customer data on Web 3. Web 3 uses blockchain technology, which makes it more difficult to hack or steal data. Additionally, customers on Web 3 have more control over their data, as they can choose who to share it with. Businesses in Web 3 will need to be more transparent about how they collect and use customer data in order to build trust and loyalty.`,
    },
    {
      imgLink: "landing/news_and_media/news_11.svg",
      articleLink:
        "https://thenewscrypto.com/xdc-network-and-solidityscan-forge-powerful-partnership-to-strengthen-blockchain-security/",
      articleHeading:
        "XDC Network and SolidityScan Forge Powerful Partnership to Strengthen Blockchain Security",
      articlePara:
        "XDC Network, a leading blockchain platform is delighted to announce its strategic partnership with SolidityScan, a prominent blockchain security firm. This partnership sets the stage for a dynamic collaboration aimed at bolstering security measures and fostering innovation within the blockchain ecosystem. By combining their respective strengths and expertise, SolidityScan and XDC Network are poised to make significant strides in enhancing the security of blockchain technologies. The partnership seeks to leverage SolidityScan’s cutting-edge security solutions and XDC Network’s robust blockchain platform to provide developers and users with a more secure and reliable environment.",
    },

    {
      imgLink: "landing/news_and_media/news_12.svg",
      articleLink:
        "https://in.investing.com/news/xdc-network-and-solidityscan-forge-powerful-partnership-to-strengthen-blockchain-security-3721367",
      articleHeading:
        "XDC Network and SolidityScan Forge Powerful Partnership to Strengthen Blockchain Security",
      articlePara:
        "XDC Network, a leading blockchain platform is delighted to announce its strategic partnership with SolidityScan, a prominent blockchain security firm. This partnership sets the stage for a dynamic collaboration aimed at bolstering security measures and fostering innovation within the blockchain ecosystem. By combining their respective strengths and expertise, SolidityScan and XDC Network are poised to make significant strides in enhancing the security of blockchain technologies. The partnership seeks to leverage SolidityScan’s cutting-edge security solutions and XDC Network’s robust blockchain platform to provide developers and users with a more secure and reliable environment.",
    },
    {
      imgLink: "landing/news_and_media/news_13.svg",
      articleLink:
        "https://www.blog.blockscout.com/solidityscan-blockscout-making-smart-contracts-more-secure/",
      articleHeading:
        "SolidityScan + Blockscout: Making smart contracts more secure",
      articlePara:
        "Blockscout makes it easy to verify and interact with blockchain contracts. Anyone, anywhere can deploy and verify a contract, then start interacting with it immediately. This freedom is essential to web3 and open blockchains, but also can bring up issues when a contract contains bugs, poorly written code, code that can be exploited, or in extreme cases, malicious code intended to steal funds. Ideally, contracts are audited by autonomous 3rd party firms that work with teams to identify and address any vulnerabilities. This is essential for contracts managing large amounts of funds or contracts with minting functionality for valuable tokens. However, auditing firms are expensive, and often have months-long backlogs.",
    },
    {
      imgLink: "landing/news_and_media/news_14.svg",
      articleLink:
        "https://blog.reef.io/solidityscan-the-smart-contract-security-audit-tool-built-for-next-gen-dapps-will-be-integrated-into-reefscan/",
      articleHeading:
        "SolidityScan, the smart contract security audit tool built for next-gen dApps, will be integrated into ReefScan.",
      articlePara:
        "We are thrilled to announce that developers building on ReefChain will be able to utilize SolidityScan, the enterprise grade suite of security tools built by CredShields, to evaluate their smart contracts and mitigate any existing risks before deploying them on the mainnet. Security is of prime importance in the Web3.0 industry. With more and more blockchain enthusiasts and investors deciding to invest in various DeFi farms, hackers are always on the look-out for exploiting vulnerabilities in smart contracts to steal investor funds and sensitive information. News reports of smart contract hacks make headlines in the cryptosphere every other day.",
    },

    {
      imgLink: "landing/news_and_media/news_15.svg",
      articleLink:
        "https://yourstory.com/the-decrypting-story/funding-blockchain-startup-credshields-web3-security",
      articleHeading:
        "[FUNDING ALERT] BLOCKCHAIN STARTUP CREDSHIELDS RAISES $500K FUNDS FROM BOOSTVC",
      articlePara:
        "Blockchain startup ﻿CredShields﻿ on Thursday said it raised $500,000 from BoostVC as part of its 2022 acceleration cohort. With the capital raised, the startup will use it to expand its team and enhance product growth and user acquisition.Read more at: https://yourstory.com/the-decrypting-story/funding-blockchain-startup-credshields-web3-security.",
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
        In The{" "}
        <Box as="span" sx={{ color: "accent" }}>
          News
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
      maxW="350px"
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
        <VStack spacing={3} overflowY="hidden" overflowX="clip">
          <Text height={"80px"} fontSize="lg" noOfLines={3} fontWeight={700}>
            {articleHeading}
          </Text>
          <Text height={"170px"} fontSize="sm">
            {articlePara}
          </Text>
        </VStack>
        <VStack w="100%" mt={5} spacing={3} overflowY="hidden" overflowX="clip">
          <Divider borderWidth={2} />
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
        </VStack>
      </Flex>
    </Flex>
  );
};
