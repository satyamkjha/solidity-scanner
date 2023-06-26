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
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { useQueryClient } from "react-query";
import { onLogout } from "common/functions";

export const Header: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const history = useHistory();
  const queryClient = useQueryClient();

  const logout = async () => {
    await API.get(API_PATH.API_LOGOUT);
    onLogout(history, queryClient);
  };

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
        py={1}
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
                as={RouterLink}
                to="/pricing"
                variant="brand"
                fontWeight="600"
              >
                Quickscan
              </Link>
              <Link
                as={RouterLink}
                to="/detectors"
                variant="brand"
                fontWeight="600"
              >
                What we Detect
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
                <Menu autoSelect={false} offset={[0, -40]}>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    fontSize={"2xl"}
                  />
                  <MenuList w={"250px"} pt="0">
                    <MenuItem
                      p={4}
                      background="linear-gradient(269.8deg, #F9F9F9 0.83%, rgba(249, 249, 249, 0) 114.35%)"
                    >
                      <CloseIcon
                        ml={"auto"}
                        color={"#B0B7C3"}
                        onClick={onClose}
                      />
                    </MenuItem>
                    {Auth.isUserAuthenticated() && (
                      <>
                        <MenuItem>
                          <Link
                            as={RouterLink}
                            to="/home"
                            variant="ghost"
                            fontWeight="400"
                            w={"100%"}
                            p={1}
                            ml={3}
                          >
                            Go to Dashboard
                          </Link>
                        </MenuItem>
                      </>
                    )}
                    <MenuItem>
                      <Link
                        as={RouterLink}
                        to="/pricing"
                        variant="ghost"
                        fontWeight="400"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Pricing
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        as={RouterLink}
                        to="/detectors"
                        variant="ghost"
                        fontWeight="400"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        What we Detect
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
                        variant="ghost"
                        fontWeight="400"
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
                        variant="ghost"
                        fontWeight="400"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Blog
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        onClick={onOpen}
                        variant="ghost"
                        fontWeight="400"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Contact Us
                      </Link>
                    </MenuItem>
                    {!Auth.isUserAuthenticated() ? (
                      <MenuItem mt={20}>
                        <RouterLink to="/signin">
                          <Button variant="brand" p={6} ml={4} w="100%">
                            Sign In
                          </Button>
                        </RouterLink>
                      </MenuItem>
                    ) : (
                      <MenuItem mt={20}>
                        <Link
                          onClick={logout}
                          variant="ghost"
                          fontWeight="400"
                          w={"100%"}
                          p={1}
                          ml={3}
                        >
                          Sign Out
                        </Link>
                      </MenuItem>
                    )}
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
