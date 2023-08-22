import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
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
  Link,
  Image,
  HStack,
  Divider,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUser, BiPowerOff } from "react-icons/bi";
import { getAssetsURL } from "helpers/helperFunction";
import Sidebar from "components/sidebar";
import { ProfileIconOne } from "components/icons";
import { useProfile } from "hooks/useProfile";
import {
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
} from "common/constants";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import { useQueryClient } from "react-query";
import { onLogout } from "common/functions";
import { sentenceCapitalize } from "helpers/helperFunction";
import { useUserOrgProfile } from "hooks/useUserOrgProfile";
import { signInWithCustomToken, User, onAuthStateChanged } from "firebase/auth";
import { auth } from "helpers/firebase";

const MotionFlex = motion(Flex);

const Layout: React.FC = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const [firebaseToken, setFirebaseToken] = useState(
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY5MjcwMzAyMywiZXhwIjoxNjkyNzA2NjIzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1hMnpuMkBzb2xpZGl0eS1zY2FuLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstYTJ6bjJAc29saWRpdHktc2Nhbi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6ImFiY0BnbWFpbC5jb20ifQ.OJlm9tmVse-iwJnoUKJEi12tpXvtf6MjF_Z9ORMwgLBL2tXCrbRF2v1UO51hAFHpmL0OIrOHtMs90gBvDY7ZetyS_piKFX3aorbCICMtapk7ZCTpDiJhasp8MzHJogFuvzW6fegJ3ppEFbIFFK8dvIj4lVTdEcp4DWnHcSdc4yVdg9AP92_UrgRZxJ9EOIvYfkH_4Zqca9ihq-BSeU3OQJdbl3oSADmAmAUaTYD8qFZha35aW_rDW_WVa_C4srUUX9E7IEBQcxF6efojz-J-AoyNGJC7pL2A52TS50Ss3JM0ImMZ4LBZMGOp-CMbDcjeoozPpAs6ODezTYrum8m97A"
  );
  const [firebaseUser, setFirebaseUser] = useState<User>();
  const { data: profileData } = useProfile();
  const { data: orgProfile } = useUserOrgProfile(
    profileData?.logged_in_via === "org_login"
  );

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) {
      // inside click
      return;
    }
    // outside click
    setShowSidebar(false);
  };

  const logout = async () => {
    const { data } = await API.get<{ message: string; status: string }>(
      API_PATH.API_LOGOUT
    );
    if (data.status === "success") {
      onLogout(history, queryClient);
    }
  };

  const getFirebaseToken = async () => {
    const { data } = await API.get<{ token: string }>(
      API_PATH.API_CREATE_FIREBASE_TOKEN
    );
    if (data && data.token) setFirebaseToken(data.token);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setFirebaseToken(idTokenResult.token);
      } else {
        getFirebaseToken();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (firebaseToken && !auth.currentUser) {
      signInWithCustomToken(auth, firebaseToken)
        .then((userCredential) => {
          setFirebaseUser(userCredential.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebaseToken]);

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
    <Box as="div" height="100vh">
      {profileData && (
        <>
          {profileData.current_package === "expired" ? (
            <MotionFlex
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              sx={{
                w: "100%",
                alignItems: "center",
                justifyContent: "center",
                py: 1,
                bg: "red.500",
              }}
            >
              <Text fontSize="12px" color="white" fontWeight={700}>
                Your package has expired. To renew your package
              </Text>
              <Link
                as={RouterLink}
                to="/billing"
                color="white"
                textDecor="underline"
                fontWeight="700"
                fontSize="12px"
                ml="3px"
                mt="1px"
              >
                click here.
              </Link>
            </MotionFlex>
          ) : (
            // <MotionFlex
            //   initial={{ height: 0 }}
            //   animate={{ height: "auto" }}
            //   sx={{
            //     w: "100%",
            //     justifyContent: "center",
            //     py: 1,
            //     bg: "brand-dark",
            //   }}
            // >
            //   <Text fontSize="12px" color="white" fontWeight={700}>
            //     This product is in beta.
            //   </Text>
            // </MotionFlex>
            <></>
          )}
        </>
      )}
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
            display: ["block", "block", "block", "none"],
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
            setShowSidebar={setShowSidebar}
          />
        </Box>
        <Box sx={{ display: ["none", "none", "none", "block"] }}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            setShowSidebar={setShowSidebar}
          />
        </Box>
        <Box
          id="pageScroll"
          sx={{
            width: [
              "100%",
              "100%",
              "100%",
              `calc(100% - ${SIDEBAR_WIDTH_COLLAPSED})`,
            ],
            height: "calc(100vh)",
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
            w="100%"
            sx={{
              px: 8,
              py: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Flex
              width="90%"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <HStack width={["100%", "100%", "60%", "50%", "60%"]}>
                <Icon
                  as={GiHamburgerMenu}
                  sx={{
                    cursor: "pointer",
                    color: "gray.400",
                    fontSize: "24px",
                    mr: 4,
                    display: ["block", "block", "block", "none"],
                    transition: "0.2s color",
                  }}
                  _hover={{
                    color: "gray.500",
                  }}
                  onClick={() => setShowSidebar(!showSidebar)}
                />
                {profileData && (
                  <Text
                    fontWeight={600}
                    width={["80%"]}
                    isTruncated
                    fontSize={["xl", "xl", "2xl"]}
                  >
                    <Box as="span" role="img" aria-label="wave" mr={2}>
                      👋
                    </Box>{" "}
                    Hi {profileData?.name}
                  </Text>
                )}
              </HStack>

              {profileData && (
                <Flex ml={20} sx={{ display: ["none", "none", "flex"] }}>
                  <Image src={`${assetsURL}pricing/coin.svg`} mx="auto" />
                  <Text fontWeight={600} fontSize="2xl" ml={4}>
                    {profileData.credits.toLocaleString("en-US", {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                    <Box as="span" ml={2} color="subtle" fontSize="sm">
                      Scan Credits
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
            {profileData && (
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
                  width="250px"
                  borderWidth="0px"
                  boxShadow="0px 4px 20px rgba(0, 0, 0, 0.35)"
                  borderRadius="15px"
                >
                  {profileData.logged_in_via === "org_login" &&
                    orgProfile &&
                    orgProfile.user_organization && (
                      <VStack
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        mb={7}
                      >
                        <Heading fontSize="md">
                          {orgProfile.user_organization?.org_name}
                        </Heading>
                        <Heading fontSize="sm" fontWeight={300}>
                          {sentenceCapitalize(
                            orgProfile.user_organization.role
                          )}
                        </Heading>
                        <Divider />
                      </VStack>
                    )}

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
            )}
          </Flex>
          <Box width={"100%"}>{children}</Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
