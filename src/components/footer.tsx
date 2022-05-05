import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Flex, Container, Link, Image } from "@chakra-ui/react";

import { Logo } from "components/icons";
export const Footer: React.FC = () => {
  const history = useHistory();

  return (
    <Container maxW="80vw" my={20}>
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
          {/* <Image
              src="/facebook-social.svg"
              alt="Facebook"
              mx={3}
              onClick={()=> window.open('https://www.instagram.com/credshields/', '_blank')}
          /> */}
          <Image
            src="/discord-social.svg"
            alt="Instagram"
            onClick={() =>
              window.open("https://discord.com/invite/9HhV4hGENw", "_blank")
            }
            mx={3}
          />
          <Image
            src="/telegram-social.svg"
            alt="Instagram"
            onClick={() => window.open("https://t.me/solidityscan", "_blank")}
            mx={3}
          />
          <Image
            src="/instagram-social.svg"
            alt="Instagram"
            onClick={() =>
              window.open("https://www.instagram.com/credshields/", "_blank")
            }
            mx={3}
          />
          <Image
            src="/twitter-social.svg"
            alt="Twitter"
            mx={3}
            onClick={() =>
              window.open("https://twitter.com/CredShields", "_blank")
            }
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
