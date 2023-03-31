import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Flex, Container, Link, Image } from "@chakra-ui/react";

import {
  DiscordIcon,
  InstagramIcon,
  Logo,
  MediumIcon,
  TelegramIcon,
  TwiterIcon,
} from "components/icons";
export const Footer: React.FC = () => {
  return (
    <Container maxW={["100vw", "100vw", "90vw"]} my={20}>
      <Flex
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems={"flex-start"}
          width={["100%", "100%", "100%", "33%"]}
        >
          <Logo />
        </Flex>
        <Flex
          width={["100%", "100%", "100%", "67%"]}
          mt={["2"]}
          flexDirection="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Flex
            width={["50%", "50%", "70%", "60%"]}
            flexWrap={["nowrap", "nowrap", "wrap"]}
            flexDirection={["column", "column", "row"]}
            mt={[4]}
            p={2}
            textAlign="left"
          >
            <Link
              as={RouterLink}
              to="/pricing"
              variant="brand"
              w={["auto", "auto", "50%"]}
              mb={4}
              fontWeight="600"
            >
              Pricing
            </Link>
            <Link
              as={RouterLink}
              to="/detectors"
              variant="brand"
              w={["auto", "auto", "50%"]}
              mb={4}
              fontWeight="600"
            >
              What we Detect
            </Link>
            <Link
              as={RouterLink}
              to="/terms-of-service"
              variant="brand"
              w={["auto", "auto", "50%"]}
              mb={4}
              fontWeight="600"
            >
              Terms of Service
            </Link>
            {/* <Link
              as={RouterLink}
              to="/faq"
              variant="brand"
              w="50%"
              mb={4}
              fontWeight="600"
            >
              FAQ
            </Link> */}
            <Link
              as={RouterLink}
              to="/privacy-policy"
              variant="brand"
              w={["auto", "auto", "50%"]}
              mb={4}
              fontWeight="600"
            >
              Privacy Policy
            </Link>
          </Flex>
          <Flex
            width={["50%", "50%", "30%", "40%"]}
            flexWrap={"wrap"}
            justifyContent={["flex-start"]}
            alignItems="center"
            flexDirection={["row"]}
          >
            <Link m={2} href="https://blog.solidityscan.com/" isExternal>
              <MediumIcon size={40} />
            </Link>
            <Link m={2} href="https://discord.com/invite/9HhV4hGENw" isExternal>
              <DiscordIcon size={40} />
            </Link>
            <Link m={2} href="https://t.me/solidityscan" isExternal>
              <TelegramIcon size={40} />
            </Link>
            <Link
              m={2}
              href="https://www.instagram.com/solidityscan/"
              isExternal
            >
              <InstagramIcon size={40} />
            </Link>
            <Link m={2} href="https://twitter.com/solidityscan" isExternal>
              <TwiterIcon size={45} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
