import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUser, BiPowerOff } from "react-icons/bi";

import Sidebar from "components/sidebar";
import { ProfileIconOne, ProjectIcon } from "components/icons";

import { useProfile } from "hooks/useProfile";

import {
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
} from "common/constants";
import API from "helpers/api";
import Auth from "helpers/auth";

const Layout: React.FC = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { data: profileData } = useProfile();

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) {
      // inside click
      return;
    }
    // outside click
    setShowSidebar(false);
  };

  const logout = async () => {
    await API.get("api-logout");
    Auth.deauthenticateUser();
    history.push("/signin");
  };

  useEffect(() => {
    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <>
      <Flex
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
      </Flex>
      <Flex
        sx={{
          width: "100%",
          color: "black",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            display: ["block", "block", "none"],
            width: isSidebarCollapsed
              ? SIDEBAR_WIDTH_COLLAPSED
              : SIDEBAR_WIDTH_EXPANDED,
            height: "calc(100vh - 26px)",
            transform: showSidebar
              ? "translate3d(0px,0px,0px)"
              : "translate3d(-280px,0,0px)",
            transition: "0.1s transform ease-out",
            boxShadow: "rgba(0, 0, 0, 0.20) 2px 8px 20px",
            zIndex: 10,
          }}
          ref={ref}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </Box>
        <Box sx={{ display: ["none", "none", "block"] }}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </Box>
        <Box
          sx={{
            width: [
              "100%",
              "100%",
              `calc(100% - ${
                isSidebarCollapsed
                  ? SIDEBAR_WIDTH_COLLAPSED
                  : SIDEBAR_WIDTH_EXPANDED
              })`,
            ],
            height: "calc(100vh - 26px)",
            overflowY: "scroll",
          }}
        >
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
            sx={{
              width: "100%",
              p: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Flex sx={{ width: "100%", alignItems: "center" }}>
              <Icon
                as={GiHamburgerMenu}
                sx={{
                  cursor: "pointer",
                  color: "gray.400",
                  fontSize: "24px",
                  mr: 4,
                  display: ["block", "block", "none"],
                  transition: "0.2s color",
                }}
                _hover={{
                  color: "gray.500",
                }}
                onClick={() => setShowSidebar(!showSidebar)}
              />
              {profileData && (
                <Text fontWeight={600} fontSize="2xl">
                  <Box as="span" role="img" aria-label="wave" mr={2}>
                    👋
                  </Box>{" "}
                  Hi {profileData?.name}
                  {/* <Box as="span" ml={4} color="subtle" fontSize="sm">
                  CREDITS: {profileData?.credits}
                </Box> */}
                </Text>
              )}

              {profileData && (
                <Flex ml={20} sx={{ display: ["none", "none", "flex"] }}>
                  <ProjectIcon size={37} />
                  <Text fontWeight={600} fontSize="2xl" ml={4}>
                    {profileData.projects_remaining.toLocaleString("en-US", {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                    <Box as="span" ml={2} color="subtle" fontSize="sm">
                      Remaining Projects
                    </Box>
                  </Text>
                </Flex>
              )}
            </Flex>

            {/* <Button
            variant="outline"
            size="sm"
            color="gray.600"
            px={4}
            borderRadius={10}
            onClick={() => logout()}
          >
            <Icon as={FiLogOut} mr={2} />
            Logout
          </Button> */}
            <Menu>
              <MenuButton
                as={Button}
                variant="unstyled"
                borderRadius="100%"
                border="2px solid"
                borderColor="brand-dark"
                overflow="hidden"
                mr={4}
              >
                <ProfileIconOne size={40} />
              </MenuButton>
              <MenuList
                p={4}
                borderWidth="0px"
                boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
                borderRadius="15px"
              >
                <MenuItem
                  borderBottom="1px solid"
                  borderColor="border"
                  py={2}
                  onClick={() => history.push("/profile")}
                  borderTopRadius="10px"
                >
                  <Icon as={BiUser} mr={3} color="gray.500" />
                  Profile
                </MenuItem>
                <MenuItem
                  py={2}
                  borderBottomRadius="10px"
                  onClick={() => logout()}
                >
                  <Icon as={BiPowerOff} mr={3} color="gray.500" />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Box px={4}>{children}</Box>
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
