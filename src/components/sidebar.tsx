import React, { ReactElement } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Flex, Box, Text } from "@chakra-ui/react";
import {
  Logo,
  HomeMenuIcon,
  ProjectsMenuIcon,
  IntegrationMenuIcon,
  BillingMenuIcon,
} from "components/icons";

import { SIDEBAR_WIDTH } from "common/constants";

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100vh",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "border",
        bg: "white",
      }}
    >
      <Flex width="100%" justifyContent="center" py={8}>
        <Logo />
      </Flex>
      <Flex sx={{ width: "100%", mt: 20, justifyContent: "flex-end" }}>
        <Box sx={{ width: "85%" }}>
          <Text sx={{ color: "subtle", ml: 3, mb: 4, fontSize: "xs" }}>
            PAGES
          </Text>
          <SidebarItem
            to="/home"
            label="Home"
            icon={<HomeMenuIcon size={16} />}
          />
          <SidebarItem
            to="/projects"
            label="Projects"
            icon={<ProjectsMenuIcon size={16} />}
          />
          <SidebarItem
            to="/integrations"
            label="Integrations"
            icon={<IntegrationMenuIcon size={24} />}
          />
          <SidebarItem
            to="/billing"
            label="Billing"
            icon={<BillingMenuIcon size={24} />}
          />
        </Box>
      </Flex>
    </Box>
  );
};

type SidebarItemProps = {
  to: string;
  label: string;
  icon: ReactElement;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  label,
  icon,
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
        <Text ml={2} fontSize="sm">
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

export default Sidebar;
