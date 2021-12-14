import React, { ReactElement } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import {
  Flex,
  Box,
  Text,
  Button,
  Icon,
  HStack,
  Heading,
} from "@chakra-ui/react";
import {
  LogoIcon,
  HomeMenuIcon,
  ProjectsMenuIcon,
  BlockMenuIcon,
  IntegrationMenuIcon,
  BillingMenuIcon,
} from "components/icons";

import {
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
} from "common/constants";

import { useProfile } from "hooks/useProfile";

const Sidebar: React.FC<{
  isCollapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isCollapsed, setCollapsed }) => {
  const { data: profileData } = useProfile();

  return (
    <Flex
      sx={{
        width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        height: "calc(100vh - 28px)",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "border",
        bg: "white",
        flexDir: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        transition: "width 0.3s ease",
      }}
    >
      <Flex
        width="100%"
        justifyContent="center"
        pt={8}
        position="relative"
        // overflow="hidden"
      >
        <Box position="absolute" width={isCollapsed ? "40px" : "220px"}>
          {isCollapsed ? (
            <LogoIcon size={40} />
          ) : (
            <HStack>
              <LogoIcon size={40} />
              <Box>
                <Heading
                  fontSize={["xl", "xl", "2xl"]}
                  fontWeight={700}
                  color="black"
                >
                  Solidity Scan
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
          )}
        </Box>
      </Flex>
      <Flex sx={{ width: "100%", justifyContent: "flex-end", pt: 24, pb: 24 }}>
        <Box sx={{ width: "85%" }}>
          <Text
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
          </Text>

          <SidebarItem
            to="/home"
            label="Home"
            icon={<HomeMenuIcon size={16} />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            to="/projects"
            label="Projects"
            icon={<ProjectsMenuIcon size={16} />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            to="/blocks"
            label="Blocks"
            icon={<BlockMenuIcon size={16} />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            to="/integrations"
            label="Integrations"
            icon={<IntegrationMenuIcon size={24} />}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            to="/billing"
            label="Billing"
            icon={<BillingMenuIcon size={24} />}
            isCollapsed={isCollapsed}
          />
        </Box>
      </Flex>
      <Flex width="100%" justifyContent="center" pb={8} px={4}>
        <Button
          w="100%"
          onClick={() => {
            setCollapsed(!isCollapsed);
          }}
        >
          <Icon
            as={isCollapsed ? BsArrowsExpand : BsArrowsCollapse}
            fontSize="2xl"
            transform="rotate(90deg)"
            color="gray.500"
          />{" "}
        </Button>
      </Flex>
    </Flex>
  );
};

type SidebarItemProps = {
  to: string;
  label: string;
  icon: ReactElement;
  isCollapsed: boolean;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  label,
  icon,
  isCollapsed,
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
          p: 3,
          my: 3,
          borderLeftRadius: "15px",
          transition: "0.3s background-color",
          background: active ? "rgba(47, 248, 107, 0.1)" : "transparent",
        }}
      >
        {React.cloneElement(icon, { active })}
        {!isCollapsed && (
          <Text ml={2} fontSize="sm">
            {label}
          </Text>
        )}
      </Flex>
    </Link>
  );
};

export default Sidebar;
