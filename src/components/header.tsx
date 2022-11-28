import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import {
  Flex,
  HStack,
  Button,
  Link,
  Text,
  useDisclosure,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { Logo } from "components/icons";

import Auth from "helpers/auth";
import ContactUs from "./contactus";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

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
        maxW={["95vw", "95vw", "90vw"]}
        mx="auto"
        py={4}
      >
        <Flex alignItems="center" width={["100%", "100%", "100%", "auto"]}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          {isDesktopView ? (
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
                  window.open("https://blog.solidityscan.com/", "_blank");
                }}
                variant="brand"
                fontWeight="600"
              >
                Blog
              </Link>
            </HStack>
          ) : (
            <>
              <Flex w={"100%"} />
              <Box as={"div"} mr="2">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    fontSize={"2xl"}
                  />
                  <MenuList>
                    {!Auth.isUserAuthenticated() ? (
                      <>
                        <MenuItem>
                          <RouterLink to="/signin">
                            <Button variant="ghost" sx={{ p: 6 }}>
                              Sign In
                            </Button>
                          </RouterLink>
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          <RouterLink to="/home">
                            <Button variant="ghost">Go to Dashboard</Button>
                          </RouterLink>
                        </MenuItem>
                      </>
                    )}
                    <MenuItem>
                      <Link
                        as={RouterLink}
                        to="/pricing"
                        variant="brand"
                        fontWeight="600"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Pricing
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        onClick={() => {
                          window.open(
                            "https://docs.solidityscan.com/",
                            "_blank"
                          );
                        }}
                        variant="brand"
                        fontWeight="600"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Docs
                      </Link>
                    </MenuItem>
                    <MenuItem al>
                      <Link
                        onClick={() => {
                          window.open(
                            "https://blog.solidityscan.com/",
                            "_blank"
                          );
                        }}
                        variant="brand"
                        fontWeight="600"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Blog
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Button variant="brand" onClick={onOpen}>
                        Contact Us
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </>
          )}
        </Flex>
        <HStack spacing={4} sx={{ display: ["none", "none", "none", "flex"] }}>
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
