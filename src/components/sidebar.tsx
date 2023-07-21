import React, { ReactElement, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  Icon,
  HStack,
  Heading,
  useDisclosure,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  LogoIcon,
  HomeMenuIcon,
  ProjectsMenuIcon,
  BlockMenuIcon,
  IntegrationMenuIcon,
  BillingMenuIcon,
  CredshieldsIcon,
  UserGuideIcon,
  PrivateApiMenuIcon,
  OrganisationIcon,
} from "components/icons";

import {
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
} from "common/constants";

import { useProfile } from "hooks/useProfile";
import ManualAuditForm from "./manualAuditForm";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useConfig } from "hooks/useConfig";
import { getAssetsURL, getFeatureGateConfig } from "helpers/helperFunction";

const Sidebar: React.FC<{
  isCollapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isCollapsed, setCollapsed, setShowSidebar }) => {
  const { data: profileData } = useProfile();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [transitionDone, setTransitionDone] = useState(true);
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const isOwner =
    profileData?.organizations.length > 0
      ? profileData?.organizations[0].role === "owner"
      : false;

  const isAdmin =
    profileData?.organizations.length > 0
      ? profileData?.organizations[0].role === "admin"
      : false;

  return (
    <Flex
      sx={{
        width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        height: "calc(100vh)",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "border",
        bg: "white",
        flexDir: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        transition: "width 0.6s ease",
      }}
    >
      <Flex
        width="100%"
        justifyContent="center"
        pt={8}
        position="relative"
        // overflow="hidden"
      >
        <Box position="absolute" width={isCollapsed ? "40px" : "100%"}>
          {isCollapsed ? (
            <VStack spacing={8}>
              <LogoIcon size={40} />
              <Button
                w="33px"
                h="33px"
                borderRadius={"10px"}
                bgColor={"#ECECEC"}
                onClick={() => {
                  setTransitionDone(false);
                  setCollapsed(!isCollapsed);
                  setTimeout(() => {
                    setTransitionDone(true);
                  }, 600);
                }}
              >
                <Icon as={ArrowForwardIcon} fontSize="xl" color="gray.500" />{" "}
              </Button>
            </VStack>
          ) : (
            <HStack justifyContent="flex-end">
              <HStack mr={8}>
                <LogoIcon size={30} />
                <Box>
                  <Heading
                    fontSize={["lg", "lg", "lg"]}
                    fontWeight={700}
                    color="black"
                  >
                    SolidityScan
                  </Heading>
                  {profileData &&
                    (profileData.current_package === "expired" ? (
                      <Text
                        fontSize="12px"
                        sx={{
                          color: "red.500",
                          bg: "high-subtle",
                          px: 3,
                          borderRadius: 20,
                          w: "74px",
                        }}
                      >
                        EXPIRED
                      </Text>
                    ) : (
                      <Text fontSize="13px">
                        {profileData.current_package.toUpperCase()}
                      </Text>
                    ))}
                </Box>
              </HStack>
              <Flex justifyContent="end">
                <Button
                  w="33px"
                  h="33px"
                  borderRadius={"10px 0 0 10px"}
                  bgColor={"#ECECEC"}
                  onClick={() => {
                    if (isDesktopView) {
                      setCollapsed(!isCollapsed);
                    } else {
                      setShowSidebar(false);
                    }
                  }}
                >
                  <Icon as={ArrowBackIcon} fontSize="xl" color="gray.500" />{" "}
                </Button>
              </Flex>
            </HStack>
          )}
        </Box>
      </Flex>
      {profileData && (
        <Flex
          sx={{ width: "100%", justifyContent: "flex-end" }}
          pt={["28", "28", "28", "24", "28"]}
          pb={["3", "3", "3", "3", "4"]}
        >
          <Box sx={{ width: "85%" }}>
            {/* <Text
            sx={{
              color: "subtle",
              ml: 3,
              mb: 4,
              fontSize: "xs",
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            PAGES
          </Text> */}

            <SidebarItem
              to="/home"
              label="Home"
              icon={<HomeMenuIcon size={16} />}
              isCollapsed={isCollapsed}
              transitionDone={transitionDone}
            />
            <SidebarItem
              to="/projects"
              label="Projects"
              icon={<ProjectsMenuIcon size={16} />}
              isCollapsed={isCollapsed}
              transitionDone={transitionDone}
            />
            <SidebarItem
              to="/blocks"
              label="Verified Contracts"
              icon={<BlockMenuIcon size={16} />}
              isCollapsed={isCollapsed}
              transitionDone={transitionDone}
            />
            {isOwner && (
              <SidebarItem
                to="/integrations"
                label="Integrations"
                icon={<IntegrationMenuIcon size={24} />}
                isCollapsed={isCollapsed}
                transitionDone={transitionDone}
              />
            )}
            {getFeatureGateConfig().private_api_enabled && (
              <SidebarItem
                to="/private-api"
                label="Private API"
                icon={<PrivateApiMenuIcon size={24} />}
                isCollapsed={isCollapsed}
                transitionDone={transitionDone}
              />
            )}
            {isOwner && (
              <SidebarItem
                to={`/billing`}
                label="Billing"
                icon={<BillingMenuIcon size={24} />}
                isCollapsed={isCollapsed}
                transitionDone={transitionDone}
              />
            )}
            {(isOwner || isAdmin) && (
              <SidebarItem
                to={`/organisation`}
                label="Organisation"
                icon={<OrganisationIcon />}
                isCollapsed={isCollapsed}
                transitionDone={transitionDone}
              />
            )}
            <Flex
              sx={{
                width: "100%",
                alignItems: "center",
                borderLeftRadius: "15px",
                transition: "0.3s background-color",
                cursor: "pointer",
              }}
              p={[2.5, 2.5, 2.5, 2.5, 3]}
              my={[2, 2, 2, 2, 3]}
              onClick={() => {
                window.open("https://docs.solidityscan.com/", "_blank");
              }}
            >
              {React.cloneElement(<UserGuideIcon size={24} />)}
              {!isCollapsed && transitionDone && (
                <Text ml={2} fontSize="sm">
                  {"User Guide"}
                </Text>
              )}
            </Flex>
          </Box>
        </Flex>
      )}
      <Flex
        width="100%"
        height={["185px", "185px", "185px", "205px"]}
        justifyContent="center"
        p={5}
        visibility={isCollapsed ? "hidden" : "visible"}
      >
        <Box
          width="92%"
          height={"100%"}
          p={[3, 3, 3, 4]}
          pl={5}
          bgImage={`url('${assetsURL}background/manualAuditbg.svg')`}
          bgSize="cover"
          borderRadius="15px"
          boxShadow="0px 2px 23px rgba(0, 0, 0, 0.11)"
        >
          <CredshieldsIcon size={90} />
          <Button mt={[5, 5, 5, 7]} px={5} variant="dark" onClick={onOpen}>
            <Text fontSize="xs"> Request manual audit</Text>
          </Button>
        </Box>
      </Flex>
      <ManualAuditForm isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

type SidebarItemProps = {
  to: string;
  label: string;
  icon: ReactElement;
  isCollapsed: boolean;
  transitionDone: boolean;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  label,
  icon,
  isCollapsed,
  transitionDone,
}) => {
  const match = useRouteMatch({
    path: to,
  });
  const active = !!match;
  return (
    <Link to={to}>
      <Flex
        sx={{
          width: "100%",
          alignItems: "center",
          borderLeftRadius: "15px",
          transition: "0.3s background-color",
          background: active ? "rgba(47, 248, 107, 0.1)" : "transparent",
        }}
        p={[2.5, 2.5, 2.5, 2.5, 3]}
        my={2}
      >
        {React.cloneElement(icon, { active })}

        {!isCollapsed && transitionDone && (
          <Text ml={2} fontSize="sm" whiteSpace={"nowrap"}>
            {label}
          </Text>
        )}
      </Flex>
    </Link>
  );
};

export default Sidebar;
