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
        flexDirection={["column", "column", "row"]}
        justifyContent="space-between"
      >
        <Flex
          flexDirection="row"
          alignItems={"flex-start"}
          width={["100%", "100%", "100%"]}
        >
          <Logo />
          <Flex
            width={["100%", "100%", "33%"]}
            flexWrap="wrap"
            my={[4, 0]}
            mx={[0, 20]}
            pt={[10, 10, 0]}
            textAlign="left"
          >
            <Link
              as={RouterLink}
              to="/pricing"
              variant="brand"
              w="50%"
              mb={4}
              fontWeight="600"
            >
              Pricing
            </Link>
            <Link
              as={RouterLink}
              to="/terms-of-service"
              variant="brand"
              w="50%"
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
              w="50%"
              mb={4}
              fontWeight="600"
            >
              Privacy Policy
            </Link>
          </Flex>
        </Flex>
        <Flex
          width={["100%", "100%", "40%"]}
          justifyContent="flex-end"
          alignItems={"center"}
        >
          <Link mx={5} href="https://blog.solidityscan.com/" isExternal>
            <MediumIcon size={50} />
          </Link>
          <Link mx={5} href="https://discord.com/invite/9HhV4hGENw" isExternal>
            <DiscordIcon size={50} />
          </Link>
          <Link mx={5} href="https://t.me/solidityscan" isExternal>
            <TelegramIcon size={50} />
          </Link>
          <Link
            mx={5}
            href="https://www.instagram.com/solidityscan/"
            isExternal
          >
            <InstagramIcon size={50} />
          </Link>
          <Link mx={5} href="https://twitter.com/solidityscan" isExternal>
            <TwiterIcon size={50} />
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
