import React, { ReactElement, useState, memo } from "react";
import { useQueryClient } from "react-query";
import { Flex, Box, Text, Button, Icon, VStack } from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import { SlackIcon, JiraIcon, GithubIcon } from "components/icons";
import OauthHelper from "components/oauthHelper";
import { getCookie } from "common/functions";
import {
  JIRA_CLIENT_ID,
  JIRA_SCOPE,
  SLACK_CLIENT_ID,
  SLACK_SCOPE,
} from "common/constants";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import { Profile } from "common/types";
import { useHistory } from "react-router-dom";
const REDIRECT_URI =
  process.env.REACT_APP_ENVIRONMENT === "prod"
    ? "https://solidityscan.com/integrations/"
    : "https://develop.solidityscan.com/integrations/";
const JIRA_URL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${JIRA_CLIENT_ID}&scope=${JIRA_SCOPE}&redirect_uri=${REDIRECT_URI}&state=${getCookie(
  "csrftoken"
)}&response_type=code&prompt=consent`;
const GITHUB_URL = `https://github.com/apps/${
  process.env.REACT_APP_GITHUB_APP_NAME
}/installations/new?state=${getCookie("csrftoken")}`;
const SLACK_URL = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=${SLACK_SCOPE}&user_scope=&redirect_uri=${REDIRECT_URI}&state=${getCookie(
  "csrftoken"
)}`;
const Integrations: React.FC<{ profileData: Profile }> = ({ profileData }) => {
  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: 8,
        mx: [0, 0, 4],
        my: 4,
        minH: "78vh",
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

      {!profileData && <Loader width={"100%"} height={"70vh"} />}

      {profileData && (
        <VStack spacing={8} my={16}>
          <IntegrationChannel
            title="GitHub"
            description="Connect you GitHub to directly create issues for vulnerabilities in your repo"
            icon={<GithubIcon size={63} />}
            allowed={profileData._integrations.github.allowed}
            status={profileData._integrations.github.status}
            url={GITHUB_URL}
            providerUrlChecker="github.com"
          />
          <IntegrationChannel
            title="Slack"
            description="Connect slack to receive updates about vulnerabilities directly to slack"
            icon={<SlackIcon size={73} />}
            allowed={profileData._integrations.slack.allowed}
            status={profileData._integrations.slack.status}
            url={SLACK_URL}
            providerUrlChecker="slack.com"
          />
          <IntegrationChannel
            title="JIRA"
            description="Connect JIRA to export vulnerabilities"
            icon={<JiraIcon size={73} />}
            allowed={profileData._integrations.jira.allowed}
            status={profileData._integrations.jira.status}
            url={JIRA_URL}
            providerUrlChecker="atlassian.com"
          />
        </VStack>
      )}
    </Box>
  );
};

type IntegrationChannelProps = {
  title: string;
  description: string;
  disabled?: boolean;
  icon?: ReactElement;
  extra?: ReactElement;
  allowed: boolean;
  status: string;
  url: string;
  providerUrlChecker: string;
};
const IntegrationChannel: React.FC<IntegrationChannelProps> = ({
  title,
  description,
  icon,
  allowed,
  status,
  url,
  providerUrlChecker,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const history = useHistory();
  const onSuccess = async (code: string) => {
    try {
      setLoading(true);
      await API.post(
        `${API_PATH.API_AUTHENTICATE_INTEGRATIONS}${title.toLowerCase()}/`,
        {
          code,
        }
      );
      setLoading(false);
      queryClient.invalidateQueries("profile");
    } catch (e) {
      setLoading(false);
    }
  };

  const onDisconnect = async () => {
    try {
      setLoading(true);
      await API.post(
        `${API_PATH.API_DELETE_INTEGRATIONS}${title.toLowerCase()}/`,
        {}
      );
      await queryClient.refetchQueries("profile");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Box width="100%" bg="white" borderRadius="5px" p={5}>
      <Flex
        width={"100%"}
        justifyContent={["flex-start", "flex-start", "space-between"]}
        alignItems={["flex-start", "flex-start", "center"]}
        key={title}
        flexDir={["column", "column", "row"]}
        transition="0.2s opacity"
        {...props}
      >
        <Flex
          w={["100%", "100%", "60%"]}
          justifyContent={"flex-start"}
          alignItems="center"
          mb={[5, 5, 0]}
        >
          <Box w={["20%", "15%"]} mr={4}>
            {icon}
          </Box>
          <Box w={["80%", "85%"]} ml={4}>
            <Text fontWeight="600" fontSize="16px">
              {title}
            </Text>
            <Text fontSize="13px" fontWeight="400" opacity={0.8} maxW="500px">
              {description}
            </Text>
            {title === "GitHub" && status === "failed" && (
              <Flex alignItems="center" mt={1}>
                <Icon
                  mr={1}
                  fontSize="12px"
                  as={AiOutlineWarning}
                  color="yellow.400"
                />
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  opacity={0.8}
                  color="subtle"
                  maxW="500px"
                >
                  Please uninstall the app from github before reconnecting
                </Text>
              </Flex>
            )}
          </Box>
        </Flex>
        {allowed ? (
          <>
            {status === "not integrated" ? (
              <OauthHelper
                onSuccess={onSuccess}
                onFailure={(message) => console.log(message)}
                url={url}
                providerUrlChecker={providerUrlChecker}
                loading={loading}
                variant="new"
              />
            ) : (
              <Button
                colorScheme="gray"
                width="250px"
                py={6}
                onClick={onDisconnect}
                isLoading={loading}
                spinner={<Loader color={"#3300FF"} size={25} />}
              >
                Disconnect
              </Button>
            )}
          </>
        ) : (
          <Button
            colorScheme="whiteAlpha"
            color="black"
            fontSize="15px"
            py={6}
            onClick={() => {
              if (title !== "JIRA") history.push("/billing");
            }}
            border="2px solid #2FF86B"
            width="250px"
          >
            {title !== "JIRA" && <Icon as={BiLockAlt} mr={2} fontSize="18px" />}
            {title === "JIRA" ? "Coming Soon" : "Upgrade"}
          </Button>
        )}
      </Flex>
      {status && status !== "not integrated" && (
        <Box width="100%" pl="7vw" py={3}>
          <Flex alignItems="center">
            {status === "successful" && (
              <Flex
                alignItems="center"
                bg="#F0FFF5"
                py={2}
                px={6}
                borderRadius="44px"
                fontSize="14px"
                color="#2C991A"
                fontWeight={600}
              >
                <PlugIcon size={11} />
                <Text ml={2}>Connected</Text>
              </Flex>
            )}
            {status === "failed" && (
              <>
                <Flex
                  alignItems="center"
                  bg="#FFEDE9"
                  py={2}
                  px={6}
                  borderRadius="44px"
                  fontSize="14px"
                  color="#FF5630"
                  fontWeight={600}
                  mr={2}
                >
                  Expired
                </Flex>
                <OauthHelper
                  onSuccess={onSuccess}
                  onFailure={(message) => console.log(message)}
                  url={url}
                  providerUrlChecker={providerUrlChecker}
                  loading={loading}
                  variant="reconnect"
                />
              </>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

const PlugIcon: React.FC<{ size: number }> = memo(({ size }) => {
  return (
    <svg
      width={size}
      height={(21 / 14) * size}
      viewBox="0 0 14 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7.217h11.043v2.913A5.522 5.522 0 111 10.13V7.217z"
        stroke="#2C991A"
        strokeWidth={2}
      />
      <path
        d="M3 6.522V1.94M10 6.522V1.94"
        stroke="#2C991A"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M6.523 20.676V16" stroke="#2C991A" strokeWidth={2} />
    </svg>
  );
});

export default Integrations;
