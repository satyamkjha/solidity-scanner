import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Flex, HStack, Button, Link, Text } from "@chakra-ui/react";
import { Logo } from "components/icons";

import Auth from "helpers/auth";

export const Header: React.FC = () => {
  return (
    <>
      {/* <Flex
        sx={{
          w: "100%",
          justifyContent: "center",
          py: 1,
          bg: "brand-dark",
        }}
      >
        <Text fontSize="12px" color="white" fontWeight={700}>
          This product is in beta.
        </Text>
      </Flex> */}
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
            <Link
              as={RouterLink}
              to="/pricing"
              variant="brand"
              fontWeight="600"
            >
              Pricing
            </Link>
          </HStack>
        </Flex>
        <HStack spacing={4} sx={{ display: ["none", "none", "flex"] }}>
          {!Auth.isUserAuthenticated() ? (
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
    </>
  );
};

export default Header;
