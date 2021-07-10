import React, { ReactElement } from "react";
import { Flex, Box, Text, Icon, Button, VStack } from "@chakra-ui/react";
import { SiSlack, SiJira, SiGithub } from "react-icons/si";
import { SlackIcon, JiraIcon } from "components/icons";

const Integrations: React.FC = () => {
  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: 8,
        mx: [0, 0, 4],
        my: 4,
        minH: "80vh",
      }}
    >
      <Flex
        sx={{
          w: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          my: 4,
        }}
      >
        <Text sx={{ color: "subtle", fontWeight: 600 }}>INTEGRATIONS</Text>
      </Flex>

      <VStack spacing={12} my={16}>
        <SettingItem
          title="Slack"
          description="Connect slack to receive updates about vulnerabilities directly to slack"
          icon={<SlackIcon size={40} />}
        >
          <Button variant="brand" minW="250px">
            Connect
          </Button>
        </SettingItem>

        <SettingItem
          title="JIRA"
          description="Connect JIRA to receive updates about vulnerabilities directly to slack"
          icon={<JiraIcon size={40} />}
        >
          <Button variant="brand" minW="250px">
            Connect
          </Button>
        </SettingItem>

        <SettingItem
          title="GitHub"
          description="Connect you GitHub to directly create issues for vulnerabilities in your repo"
          icon={
            <Icon as={SiGithub} fontSize="24px" mr={3} ml={1} color="black" />
          }
        >
          <Button variant="brand" minW="250px">
            Connect
          </Button>
        </SettingItem>
      </VStack>
    </Box>
  );
};

export type SettingItemProps = {
  title: string;
  description: string;
  disabled?: boolean;
  icon?: ReactElement;
};

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  disabled,
  icon,
  children,
  ...props
}) => {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      key={title}
      transition="0.2s opacity"
      opacity={disabled ? 0.4 : 1}
      {...props}
    >
      <Flex alignItems="center">
        {icon}
        <Box ml={8}>
          <Text fontWeight="600" fontSize="16px">
            {title}
          </Text>
          <Text fontSize="13px" fontWeight="400" opacity={0.8} maxW="500px">
            {description}
          </Text>
        </Box>
      </Flex>
      {children}
    </Flex>
  );
};

export default Integrations;
