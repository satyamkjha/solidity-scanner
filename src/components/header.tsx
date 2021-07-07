import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Flex, HStack, Button, Link } from "@chakra-ui/react";
import { Logo } from "components/icons";

import Auth from "helpers/auth";

export const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      maxW="80vw"
      mx="auto"
      py={8}
    >
      <Flex alignItems="center">
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <HStack ml={10} spacing={8}>
          <Link as={RouterLink} to="/pricing" variant="brand" fontWeight="600">
            Pricing
          </Link>
          <Link as={RouterLink} to="/faq" variant="brand" fontWeight="600">
            FAQ
          </Link>
        </HStack>
      </Flex>
      <HStack spacing={4} sx={{ display: ["none", "none", "flex"] }}>
        {Auth.isUserAuthenticated ? (
          <>
            {" "}
            <RouterLink to="/signin">
              <Button variant="ghost" sx={{ p: 6 }}>
                Sign In
              </Button>
            </RouterLink>
            <RouterLink to="/signup">
              <Button variant="brand">Get Started</Button>
            </RouterLink>
          </>
        ) : (
          <RouterLink to="/home">
            <Button variant="brand">Go to dashboard</Button>
          </RouterLink>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;
