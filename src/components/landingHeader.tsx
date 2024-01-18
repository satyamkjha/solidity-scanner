import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import {
  Flex,
  HStack,
  Button,
  Link,
  useDisclosure,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  MenuDivider,
} from "@chakra-ui/react";
import { Logo } from "components/icons";
import Auth from "helpers/auth";
import ContactUs from "./modals/contactus";
import { CloseIcon, HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useQueryClient } from "react-query";
import { logout } from "common/functions";

export const Header: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const history = useHistory();
  const queryClient = useQueryClient();

  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        maxW={["95vw", "95vw", "100vw"]}
        mx={0}
        py={3}
      >
        <Flex alignItems="center" width={["100%", "100%", "100%", "auto"]}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          {isDesktopView ? (
            <HStack ml={16} spacing={8}>
              <Link
                as={RouterLink}
                to="/pricing"
                variant="navigation"
                fontWeight="600"
              >
                Pricing
              </Link>
              <Link
                as={RouterLink}
                to="/quickscan"
                variant="navigation"
                fontWeight="600"
              >
                QuickScan
              </Link>
              <Link
                as={RouterLink}
                to="/detectors"
                variant="navigation"
                fontWeight="600"
              >
                Detectors
              </Link>
              <Link
                as={RouterLink}
                to="/web3hackhub"
                variant="navigation"
                fontWeight="600"
              >
                Web3 HackBoard
              </Link>
              <Menu>
                <MenuButton
                  px={2}
                  py={2}
                  border={"none"}
                  borderRadius="md"
                  borderWidth="1px"
                  fontWeight="600"
                  _hover={{ color: "#3300FF" }}
                  _active={{ color: "#3300FF" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  Blogs <ChevronDownIcon fontSize="xl" ml={1} />
                </MenuButton>
                <MenuList zIndex={100}>
                  <MenuItem>
                    <Link
                      onClick={() => {
                        window.open("https://blog.solidityscan.com/", "_blank");
                      }}
                      variant="navigation"
                      fontWeight="600"
                      w="100%"
                      h="100%"
                      p={0}
                    >
                      Blogs
                    </Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Link
                      onClick={() => {
                        window.open(
                          "https://solidityscan.com/discover/",
                          "_blank"
                        );
                      }}
                      variant="navigation"
                      fontWeight="600"
                      w="100%"
                      h="100%"
                      p={0}
                    >
                      Discover
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
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
                        to="/quickscan"
                        variant="ghost"
                        fontWeight="400"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Quickscan
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
                        as={RouterLink}
                        to="/web3hackhub"
                        variant="ghost"
                        fontWeight="400"
                        w={"100%"}
                        p={1}
                        ml={3}
                      >
                        Web3 HackBoard
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
                    <MenuItem>
                      <Link
                        onClick={() => {
                          window.open(
                            "https://solidityscan.com/discover/",
                            "_blank"
                          );
                        }}
                        variant="ghost"
                        fontWeight="400"
                        p={1}
                        ml={3}
                      >
                        Discover
                      </Link>
                    </MenuItem>
                    <MenuItem>
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
                        Blogs
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
                          onClick={() => logout(history, queryClient)}
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
