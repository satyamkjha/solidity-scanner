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
    <Container maxW="90vw" my={20}>
      <Flex
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems={"flex-start"}
          width={["100%", "100%", "50%", "33%"]}
        >
          <Logo />
        </Flex>
        <Flex
          width={["80%", "80%", "50%", "100%"]}
          mt={["2"]}>
          <Flex
            width={["100%", "100%", "100%", "50%"]}
            flexWrap={["nowrap", "nowrap", "nowrap", "wrap"]}
            flexDirection={["column", "column", "column", "row"]}
            mt={[4]}
            ml={[0, 0, 10, 10]}
            p={2}
            textAlign="left"
          >
            <Link
              as={RouterLink}
              to="/pricing"
              variant="brand"
              w={["auto", "auto", "auto", "50%"]}
              mb={4}
              fontWeight="600"
            >
              Pricing
            </Link>
            <Link
              as={RouterLink}
              to="/terms-of-service"
              variant="brand"
              w={["auto", "auto", "auto", "50%"]}
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
              w={["auto", "auto", "auto", "50%"]}
              mb={4}
              fontWeight="600"
            >
              Privacy Policy
            </Link>
          </Flex>
          <Flex
            width={["auto", "100%", "100%", "40%"]}
            justifyContent="center"
            alignItems="center"
            my={[4, 4, 4, 0]}
            ml={[0, 0, 0, 10]}
            flexDirection={["column", "column", "column", "row"]}
          >
            <Link mx={[2, 2, 5]} p={[2, 2, 2, 0]} href="https://blog.solidityscan.com/" isExternal>
              <MediumIcon size={50} />
            </Link>
            <Link mx={[2, 2, 5]} p={[2, 2, 2, 0]} href="https://discord.com/invite/9HhV4hGENw" isExternal>
              <DiscordIcon size={50} />
            </Link>
            <Link mx={[2, 2, 5]} p={[2, 2, 2, 0]} href="https://t.me/solidityscan" isExternal>
              <TelegramIcon size={50} />
            </Link>
            <Link
              mx={[2, 2, 5]}
              p={[2, 2, 2, 0]}
              href="https://www.instagram.com/solidityscan/"
              isExternal
            >
              <InstagramIcon size={50} />
            </Link>
            <Link mx={[2, 2, 5]} p={[2, 2, 2, 0]} href="https://twitter.com/solidityscan" isExternal>
              <TwiterIcon size={50} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
