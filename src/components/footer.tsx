import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Grid,
  Link,
  GridItem,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import { Logo } from "components/icons";
import { getAssetsURL } from "helpers/helperFunction";

export const Footer: React.FC = () => {
  const assetsURL = getAssetsURL();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const footerIcons: {
    imgUrl: string;
    link: string;
  }[] = [
    {
      imgUrl: "medium",
      link: "https://blog.solidityscan.com/",
    },
    {
      imgUrl: "telegram",
      link: "https://t.me/solidityscan",
    },
    {
      imgUrl: "discord",
      link: "https://discord.com/invite/9HhV4hGENw",
    },
    {
      imgUrl: "instagram",
      link: "https://www.instagram.com/solidityscan/",
    },
    {
      imgUrl: "twitter",
      link: "https://twitter.com/solidityscan",
    },
  ];

  return (
    <Flex
      mt={20}
      py={20}
      mx={[5, 5, 10, 20]}
      w="100%"
      flexDirection={["column", "column", "row", "row"]}
      justifyContent="space-between"
      alignItems="center"
      backgroundImage={`${assetsURL}background/footer_bg.svg`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="left"
    >
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems={"center"}
        width={["100%", "100%", "30%"]}
      >
        <Logo />
        {!isLargerThan768 && <FooterLinks />}
        <Flex
          width={"100%"}
          flexWrap={"wrap"}
          justifyContent={["center"]}
          alignItems="center"
          mt={10}
          flexDirection={["row"]}
        >
          {footerIcons.map((item, index) => (
            <Link key={index} m={2} href={item.link} isExternal>
              <Image
                src={`${assetsURL}icons/${item.imgUrl}.svg`}
                height="50px"
                width="50px"
              />
            </Link>
          ))}
        </Flex>
      </Flex>
      {isLargerThan768 && <FooterLinks />}
    </Flex>
  );
};

export default Footer;

export const FooterLinks: React.FC = () => {
  const footerLinks: {
    linkText: string;
    linkUrl: string;
    isExternal: boolean;
  }[] = [
    {
      linkText: "Pricing",
      linkUrl: "/pricing",
      isExternal: false,
    },
    {
      linkText: "Detectors",
      linkUrl: "/detectors",
      isExternal: false,
    },
    {
      linkText: "Quickscan",
      linkUrl: "/quickscan",
      isExternal: false,
    },
    {
      linkText: "Discover",
      linkUrl: "https://solidityscan.com/discover/",
      isExternal: true,
    },
    {
      linkText: "Terms of Service",
      linkUrl: "/terms-of-service",
      isExternal: false,
    },
    {
      linkText: " Privacy Policy",
      linkUrl: "/privacy-policy",
      isExternal: false,
    },
  ];

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
      width={["100%", "100%", "40%"]}
      maxW={["350px", "350px", "700px"]}
      mt={[4]}
      p={2}
      textAlign={["center", "center", "left"]}
      rowGap={3}
    >
      {footerLinks.map((item, index) => (
        <GridItem key={index} w="100%" maxW="350px">
          <Link
            as={item.isExternal ? undefined : RouterLink}
            to={item.isExternal ? "" : item.linkUrl}
            href={item.isExternal ? item.linkUrl : ""}
            variant="navigation"
            fontWeight="600"
          >
            {item.linkText}
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};
