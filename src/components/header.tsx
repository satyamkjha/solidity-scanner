import {
  Flex,
  Link,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  IconButton,
  Button,
  Image,
  useMediaQuery,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Auth from "helpers/auth";
import { useQueryClient } from "react-query";
import { logout } from "common/functions";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import ContactUs from "components/modals/contactus";

export const Header: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => {
  const history = useHistory();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [isDesktopView] = useMediaQuery("(min-width: 1250px)");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();

  const menuItemBgColor = theme === "dark" ? "#00000040" : "#FFFFFF";
  const borderColor = theme === "dark" ? "#262626" : "#26262620";
  const linkVariant = theme === "dark" ? "subtle" : "navigation";

  return (
    <Flex
      as="header"
      flexDir="column"
      alignItems="center"
      justifyContent="justify-content"
      width="100%"
      px={5}
    >
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        width={["100%", "95%"]}
        py={5}
      >
        <Image
          sx={{
            width: "250px",
            height: "50px",
            cursor: "pointer",
          }}
          onClick={() => history.push("/")}
          src={`${assetsURL}logo/solidityscan_${
            theme === "dark" ? "white" : "black"
          }.svg`}
        />
        {isDesktopView ? (
          <HStack ml={16} spacing={7}>
            <Link
              as={RouterLink}
              to="/pricing"
              variant={linkVariant}
              fontWeight="600"
            >
              Pricing
            </Link>
            <Link
              onClick={() => window.open("/quickscan", "_self")}
              variant={linkVariant}
              fontWeight="600"
            >
              QuickScan
            </Link>
            <Link
              as={RouterLink}
              to="/detectors"
              variant={linkVariant}
              fontWeight="600"
            >
              Detectors
            </Link>
            <Link
              as={RouterLink}
              to="/web3hackhub"
              variant={linkVariant}
              fontWeight="600"
            >
              Web3 HackHub
            </Link>
            <Menu matchWidth>
              <MenuButton
                px={4}
                py={2}
                border={"none"}
                borderRadius="md"
                width="110px"
                borderWidth="1px"
                fontWeight="600"
                color={theme === "dark" ? "gray.400" : "#000"}
                _hover={{ color: theme === "dark" ? "gray.400" : "#000" }}
                _active={{ color: theme === "dark" ? "gray.400" : "#000" }}
                _focus={{ boxShadow: "outline" }}
              >
                Blogs <ChevronDownIcon fontSize="xl" ml={1} />
              </MenuButton>
              <MenuList
                bgColor={theme === "dark" ? "#00000060" : "#FFFFFF"}
                borderRadius={10}
                borderColor={borderColor}
                zIndex={100}
              >
                <MenuItem
                  _hover={{
                    bgColor: menuItemBgColor,
                  }}
                  _focus={{
                    bgColor: menuItemBgColor,
                  }}
                  px={5}
                >
                  <Link
                    onClick={() => {
                      window.open("https://blog.solidityscan.com/", "_blank");
                    }}
                    variant={linkVariant}
                    fontWeight="600"
                    w="100%"
                    h="100%"
                    p={0}
                  >
                    Blogs
                  </Link>
                </MenuItem>
                <MenuDivider borderColor={borderColor} />
                <MenuItem
                  _hover={{
                    bgColor: menuItemBgColor,
                  }}
                  _focus={{
                    bgColor: menuItemBgColor,
                  }}
                  px={5}
                >
                  <Link
                    onClick={() => {
                      window.open(
                        "https://solidityscan.com/discover/",
                        "_blank"
                      );
                    }}
                    variant={linkVariant}
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
          <Box as={"div"} mr="2">
            <Menu autoSelect={false} offset={[0, -40]}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                fontSize={"2xl"}
              />
              <MenuList position="relative" zIndex={900} w={"250px"} pt="0">
                <MenuItem
                  p={4}
                  background="linear-gradient(269.8deg, #F9F9F9 0.83%, rgba(249, 249, 249, 0) 114.35%)"
                >
                  <CloseIcon ml={"auto"} color={"#B0B7C3"} onClick={onClose} />
                </MenuItem>
                {Auth.isUserAuthenticated() && (
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
                    Web3 HackHub
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() => {
                      window.open("https://docs.solidityscan.com/", "_blank");
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
                      window.open("https://blog.solidityscan.com/", "_blank");
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
        )}

        <HStack spacing={4} sx={{ display: isDesktopView ? "flex" : "none" }}>
          <Button
            variant={theme === "dark" ? "white-ghost" : "ghost"}
            width="160px"
            onClick={onOpen}
            p={6}
          >
            Contact Us
          </Button>
          <ContactUs isOpen={isOpen} onClose={onClose} />
          {!Auth.isUserAuthenticated() ? (
            <RouterLink to="/signin">
              <Button variant="brand" width="160px">
                Sign In
              </Button>
            </RouterLink>
          ) : (
            <Button
              variant="brand"
              onClick={() => window.open("/home", "_self")}
            >
              Go to Dashboard
            </Button>
          )}
        </HStack>
      </Flex>
      <Divider
        borderWidth={"1px"}
        mb={5}
        borderColor={borderColor}
        width={["100%", "95%"]}
      />
    </Flex>
  );
};
