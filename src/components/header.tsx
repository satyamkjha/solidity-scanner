import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import {
  Flex,
  HStack,
  Button,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "components/icons";

import Auth from "helpers/auth";
import ContactUs from "./contactus";

export const Header: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

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
        maxW="75vw"
        mx="auto"
        py={4}
      >
        <Flex alignItems="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <HStack ml={20} spacing={8}>
            <Link
              as={RouterLink}
              to="/pricing"
              variant="brand"
              fontWeight="600"
            >
              Pricing
            </Link>
            <Link
              onClick={() => {
                window.open("https://docs.solidityscan.com/", "_blank");
              }}
              variant="brand"
              fontWeight="600"
            >
              Docs
            </Link>
            <Link
              onClick={() => {
                window.open("https://credshields.medium.com/", "_blank");
              }}
              variant="brand"
              fontWeight="600"
            >
              Blog
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
              <Button variant="brand" onClick={onOpen}>
                Contact Us
              </Button>
            </>
          ) : (
            <>
              <RouterLink to="/home">
                <Button variant="ghost" p={6}>
                  Go to Dashboard
                </Button>
              </RouterLink>
              <Button variant="brand" onClick={onOpen}>
                Contact Us
              </Button>
            </>
          )}
        </HStack>
      </Flex>
      <ContactUs isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
