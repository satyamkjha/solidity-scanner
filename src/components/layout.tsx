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
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUser, BiPowerOff } from "react-icons/bi";
import { getAssetsURL, getFeatureGateConfig } from "helpers/helperFunction";
import Sidebar from "components/sidebar";
import { ProfileIconOne } from "components/icons";
import {
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
} from "common/constants";
import { useConfig } from "hooks/useConfig";
import { useQueryClient } from "react-query";
import { logout } from "common/functions";
import { sentenceCapitalize } from "helpers/helperFunction";
import { useUserOrgProfile } from "hooks/useUserOrgProfile";
import { useProfile } from "hooks/useProfile";
import { LOCHeader } from "./locHeader";
import { usePricingPlans } from "hooks/usePricingPlans";
import { PlanDataContainer } from "./planDataContainer";
import { CloseIcon } from "@chakra-ui/icons";
import DowntimeAlertModal from "./modals/DowntimeAlertModal";

const MotionFlex = motion(Flex);

const Layout: React.FC = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data: profileData, refetch: refetchProfile } = useProfile(true);

  const { data: orgProfile } = useUserOrgProfile(
    profileData?.logged_in_via === "org_login"
  );

  // const [isBannerOpen, setIsBannerOpen] = useState(true);

  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const { data: pricingPlans } = usePricingPlans();

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) {
      // inside click
      return;
    }
    // outside click
    setShowSidebar(false);
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

  const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {
  //   if (
  //     profileData &&
  //     getFeatureGateConfig().maintenance_data &&
  //     getFeatureGateConfig().maintenance_data.enabled
  //   ) {
  //     let maintenance = localStorage.getItem("maintenance_info");
  //     let maintenanceInfo;
  //     if (maintenance) {
  //       maintenanceInfo = JSON.parse(maintenance);
  //     }

  //     if (
  //       maintenanceInfo &&
  //       maintenanceInfo.emails &&
  //       maintenanceInfo.emails.includes(profileData.email)
  //     ) {
  //       var date1 = new Date(
  //         getFeatureGateConfig().maintenance_data.maintenance_start
  //       );
  //       var date2 = new Date(
  //         maintenanceInfo.maintenance_data.maintenance_start
  //       );
  //       if (date1 > date2) {
  //         localStorage.setItem(
  //           "maintenance_info",
  //           JSON.stringify({
  //             maintenance_data: getFeatureGateConfig().maintenance_data,
  //             emails: [profileData.email],
  //           })
  //         );
  //         setOpenModal(true);
  //       }
  //     } else {
  //       if (maintenanceInfo && maintenanceInfo.emails)
  //         localStorage.setItem(
  //           "maintenance_info",
  //           JSON.stringify({
  //             maintenance_data: getFeatureGateConfig().maintenance_data,
  //             emails: [...maintenanceInfo.emails, profileData.email],
  //           })
  //         );
  //       else {
  //         localStorage.setItem(
  //           "maintenance_info",
  //           JSON.stringify({
  //             maintenance_data: getFeatureGateConfig().maintenance_data,
  //             emails: [profileData.email],
  //           })
  //         );
  //       }
  //       setOpenModal(true);
  //     }
  //   }
  // }, [profileData]);

  useEffect(() => {
    if (
      profileData &&
      getFeatureGateConfig().maintenance_data &&
      getFeatureGateConfig().maintenance_data.enabled
    ) {
      let maintenance = localStorage.getItem("maintenance_info");
      let maintenanceInfo;
      if (maintenance) {
        maintenanceInfo = JSON.parse(maintenance);
      }

      if (maintenanceInfo) {
        var date1 = new Date(
          getFeatureGateConfig().maintenance_data.maintenance_start
        );
        var date2 = new Date(
          maintenanceInfo.maintenance_data.maintenance_start
        );
        if (date1 > date2) {
          localStorage.setItem(
            "maintenance_info",
            JSON.stringify({
              maintenance_data: getFeatureGateConfig().maintenance_data,
            })
          );
          setOpenModal(true);
        }
      } else {
        localStorage.setItem(
          "maintenance_info",
          JSON.stringify({
            maintenance_data: getFeatureGateConfig().maintenance_data,
          })
        );
        setOpenModal(true);
      }
    }
  }, [profileData]);

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as="div" height="100vh">
      {profileData && (
        <>
          {profileData.current_package === "expired" && (
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
              <HStack justifyContent="center" w="calc(100% - 30px)">
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
              </HStack>
              <CloseIcon
                mr="10px"
                cursor="pointer"
                fontSize="13px"
                color="white"
                onClick={() => setIsBannerOpen(false)}
              />
            </MotionFlex>
          )}
        </>
        // ) : (
        //   isBannerOpen && (
        //     <MotionFlex
        //       initial={{ height: 0 }}
        //       animate={{ height: "25px" }}
        //       sx={{
        //         w: "100%",
        //         justifyContent: "center",
        //         py: 1,
        //         bg: "brand-dark",
        //       }}
        //     >
        //       <HStack justifyContent="center" w="calc(100% - 30px)">
        //         <Text
        //           cursor="pointer"
        //           fontSize="12px"
        //           color="white"
        //           onClick={() =>
        //             window.open(
        //               "https://proofofsecurity.solidityscan.com/",
        //               "_blank"
        //             )
        //           }
        //           fontWeight={700}
        //         >
        //           Proof of Security Summit'23 - India
        //         </Text>
        //         <Text fontSize="12px" color="white" fontWeight={700}>
        //           |
        //         </Text>
        //         <Text
        //           cursor="pointer"
        //           fontSize="12px"
        //           color="white"
        //           fontWeight={700}
        //           onClick={() =>
        //             window.open("https://lu.ma/x3063d6n", "_blank")
        //           }
        //         >
        //           Register here
        //         </Text>
        //       </HStack>
        //       <CloseIcon
        //         mr="10px"
        //         cursor="pointer"
        //         fontSize="13px"
        //         color="white"
        //         onClick={() => setIsBannerOpen(false)}
        //       />
        //     </MotionFlex>
        //   )
        // )}
        //  </>
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
            height: "calc(100vh)",
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
            overflowX: "hidden",
          }}
        >
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
              <HStack width={["100%", "100%", "40%", "35%"]}>
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

              {profileData && profileData.credit_system === "scan_credit" ? (
                <HStack
                  border="1px solid #FFC661"
                  bgColor="#FFFCF7"
                  display={["none", "none", "flex"]}
                  borderRadius={20}
                  w="400px"
                  px={5}
                  cursor="pointer"
                  spacing={5}
                  onClick={() =>
                    history.push(getFeatureGateConfig().alert_link)
                  }
                >
                  <Image
                    w="34px"
                    h="34px"
                    src={`${assetsURL}icons/loudspeaker.svg`}
                  />
                  <Text fontSize="sm" color="#FFA403" fontWeight={600}>
                    {getFeatureGateConfig().alert_data}
                  </Text>
                </HStack>
              ) : null}

              {profileData && pricingPlans && (
                <Flex
                  w="300px"
                  ml={10}
                  sx={{ display: ["none", "none", "flex"] }}
                >
                  <LOCHeader
                    profileData={profileData}
                    pricingPlans={pricingPlans}
                  />
                </Flex>
              )}
            </Flex>

            {profileData && (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="unstyled"
                  borderRadius="100%"
                  border="2px solid"
                  sx={{
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.35) !important",
                  }}
                  borderColor="brand-dark"
                  overflow="hidden"
                  mr={4}
                >
                  <ProfileIconOne size={40} />
                </MenuButton>
                <MenuList
                  p={4}
                  zIndex={10}
                  width={["100%", "370px", "250px"]}
                  maxW="370px"
                  borderWidth="0px"
                  sx={{
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.35) !important",
                  }}
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

                  <Box
                    display={["flex", "flex", "none"]}
                    w="100%"
                    onClick={onToggle}
                  >
                    {profileData && pricingPlans && (
                      <LOCHeader
                        profileData={profileData}
                        pricingPlans={pricingPlans}
                      />
                    )}
                  </Box>
                  {profileData.credit_system === "loc" ? (
                    <Box w="100%" display={["flex", "flex", "none"]}>
                      <Collapse in={isOpen} animateOpacity>
                        <Box
                          mt={4}
                          w="100%"
                          bgColor="#F9F9F9"
                          borderRadius={10}
                        >
                          {profileData && pricingPlans && (
                            <PlanDataContainer
                              pricingPlans={pricingPlans}
                              profileData={profileData}
                            />
                          )}
                        </Box>
                      </Collapse>
                    </Box>
                  ) : null}

                  <Divider my={5} display={["flex", "flex", "none"]} />

                  <MenuItem
                    borderBottom="1px solid"
                    borderColor="border"
                    py={2}
                    onClick={() => history.push("/profile")}
                    borderTopRadius={["0xp", "0px", "10px"]}
                  >
                    <Icon as={BiUser} mr={3} color="gray.500" />
                    Profile
                  </MenuItem>
                  <MenuItem
                    py={2}
                    borderBottomRadius="10px"
                    onClick={() => logout(history, queryClient)}
                  >
                    <Icon as={BiPowerOff} mr={3} color="gray.500" />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Box width={"100%"} height="calc(100% - 100px)">
            {children}
          </Box>
        </Box>
      </Flex>
      {getFeatureGateConfig().maintenance_data && (
        <DowntimeAlertModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </Box>
  );
};

export default Layout;
