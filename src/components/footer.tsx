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
  const history = useHistory();

  return (
    <Container maxW="90vw" my={20}>
      <Flex
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          flexDirection="row"
          alignItems={"flex-start"}
          width={["100%", "100%", "50%", "33%"]}
        >
          <Logo />
        </Flex>
        <Flex
          width={["100%", "100%", "50%", "33%"]}
          flexWrap="wrap"
          my={[4, 0]}
          mx={[0, 20]}
          p={4}
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
        <Flex
          width={["auto", "100%", "40%"]}
          justifyContent="center"
          my={[4, 4, 0]}
        >
          <Link mx={[2, 2, 5]} href="https://blog.solidityscan.com/" isExternal>
            <MediumIcon size={50} />
          </Link>
          <Link mx={[2, 2, 5]} href="https://discord.com/invite/9HhV4hGENw" isExternal>
            <DiscordIcon size={50} />
          </Link>
          <Link mx={[2, 2, 5]} href="https://t.me/solidityscan" isExternal>
            <TelegramIcon size={50} />
          </Link>
          <Link
            mx={[2, 2, 5]}
            href="https://www.instagram.com/solidityscan/"
            isExternal
          >
            <InstagramIcon size={50} />
          </Link>
          <Link mx={[2, 2, 5]} href="https://twitter.com/solidityscan" isExternal>
            <TwiterIcon size={50} />
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
