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

export const LandingHeader: React.FC = () => {
  const history = useHistory();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const [isDesktopView] = useMediaQuery("(min-width: 1350px)");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      maxW={"95vw"}
      width="90%"
      py={10}
    >
      <Image
        sx={{
          width: "250px",
          height: "50px",
        }}
        src={`${assetsURL}logo/solidityscan_white.svg`}
      />
      {isDesktopView ? (
        <HStack ml={16} spacing={7}>
          <Link as={RouterLink} to="/pricing" variant="subtle" fontWeight="600">
            Pricing
          </Link>
          <Link
            as={RouterLink}
            to="/quickscan"
            variant="subtle"
            fontWeight="600"
          >
            Quickscan
          </Link>
          <Link
            as={RouterLink}
            to="/detectors"
            variant="subtle"
            fontWeight="600"
          >
            Detectors
          </Link>
          <Link
            as={RouterLink}
            to="/hackboard"
            variant="subtle"
            fontWeight="600"
          >
            HackBoard
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
              color="gray.400"
              _hover={{ color: "gray.400" }}
              _active={{ color: "gray.400" }}
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
                    window.open("https://solidityscan.com/discover/", "_blank");
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
                  <CloseIcon ml={"auto"} color={"#B0B7C3"} onClick={onClose} />
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
                    to="/hackboard"
                    variant="ghost"
                    fontWeight="400"
                    w={"100%"}
                    p={1}
                    ml={3}
                  >
                    HackBoard
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
        </>
      )}

      <HStack spacing={4} sx={{ display: ["none", "none", "none", "flex"] }}>
        {!Auth.isUserAuthenticated() ? (
          <RouterLink to="/signin">
            <Button width="180px" variant="white-ghost" sx={{ p: 6 }}>
              Sign In
            </Button>
          </RouterLink>
        ) : (
          <RouterLink to="/home">
            <Button variant="white-ghost" p={6}>
              Go to Dashboard
            </Button>
          </RouterLink>
        )}
        <Button variant="brand" width="180px" onClick={onOpen}>
          Contact Us
        </Button>
        <ContactUs isOpen={isOpen} onClose={onClose} />
      </HStack>
    </Flex>
  );
};
