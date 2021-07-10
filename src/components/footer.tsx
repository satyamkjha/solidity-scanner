import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Container, Link } from "@chakra-ui/react";

import { Logo } from "components/icons";
export const Footer: React.FC = () => {
  return (
    <Container maxW="80vw" my={20}>
      <Flex
        flexDirection={["column", "column", "row"]}
        justifyContent="space-between"
      >
        <Flex flexDirection="column" width={["100%", "100%", "33%"]}>
          <Logo />
        </Flex>
        <Flex
          width={["100%", "100%", "33%"]}
          flexWrap="wrap"
          my={[4, 0]}
          pt={[10, 10, 0]}
          textAlign="center"
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
    </Container>
  );
};

export default Footer;
