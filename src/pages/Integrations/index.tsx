import React, { ReactElement, useState, memo } from "react";
import { useQueryClient } from "react-query";
import { Flex, Box, Text, Button, Icon, VStack } from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import {
  SlackIcon,
  JiraIcon,
  GithubIcon,
  BitbucketIcon,
  GitlabIcon,
} from "components/icons";
import OauthHelper from "components/oauthHelper";
import { getCookie } from "common/functions";
import {
  JIRA_CLIENT_ID,
  JIRA_SCOPE,
  SLACK_CLIENT_ID,
  SLACK_SCOPE,
  BITBUCKET_CLIENT_ID,
  GITLAB_CLIENT_ID,
  GITLAB_SCOPES,
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
const SLACK_URL = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=${SLACK_SCOPE}&state=${getCookie(
  "csrftoken"
)}`;
const BITBUCKET_URL = `https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=${getCookie(
  "csrftoken"
)}`;
const GITLAB_URL = `https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${getCookie(
  "csrftoken"
)}&scope=${GITLAB_SCOPES}`;
const Integrations: React.FC<{ profileData?: Profile }> = ({ profileData }) => {
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
      <Text sx={{ color: "subtle", fontWeight: 600 }}>INTEGRATIONS</Text>

      {!profileData && <Loader width={"100%"} height={"70vh"} />}

      {profileData && (
        <VStack spacing={4} my={4}>
          <IntegrationChannel
            title="GitHub"
            description="Connect your GitHub account to automatically create issues and scan for vulnerabilities in your private repositories."
            icon={<GithubIcon size={63} />}
            allowed={profileData._integrations.github.allowed}
            status={profileData._integrations.github.status}
            url={GITHUB_URL}
            providerUrlChecker="github.com"
          />
          <IntegrationChannel
            title="Bitbucket"
            description="Connect your Bitbucket account to automatically create issues and scan for vulnerabilities in your private repositories."
            icon={<BitbucketIcon size={57} />}
            allowed={profileData._integrations.bitbucket.allowed}
            status={profileData._integrations.bitbucket.status}
            url={BITBUCKET_URL}
            providerUrlChecker="bitbucket.org"
          />
          <IntegrationChannel
            title="GitLab"
            description="Connect your GitLab account to automatically create issues and scan for vulnerabilities in your private repositories."
            icon={<GitlabIcon size={60} />}
            allowed={profileData._integrations.gitlab.allowed}
            status={profileData._integrations.gitlab.status}
            url={GITLAB_URL}
            providerUrlChecker="gitlab.com"
          />
          <IntegrationChannel
            title="Slack"
            description="Integrate Slack to receive real-time vulnerability updates directly within your Slack workspace."
            icon={<SlackIcon size={73} />}
            allowed={profileData._integrations.slack.allowed}
            status={profileData._integrations.slack.status}
            url={SLACK_URL}
            providerUrlChecker="slack.com"
          />
          <IntegrationChannel
            title="JIRA"
            description="Connect JIRA to export vulnerability data for further analysis and management."
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
      await API.post(`${API_PATH.API_AUTHENTICATE_INTEGRATIONS}`, {
        code,
        provider: title.toLowerCase(),
      });
      setLoading(false);
      queryClient.invalidateQueries("profile");
    } catch (e) {
      setLoading(false);
    }
  };

  const onDisconnect = async () => {
    try {
      setLoading(true);
      await API.delete(`${API_PATH.API_DELETE_INTEGRATIONS}`, {
        data: { provider: title.toLowerCase() },
      });
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
            <Text fontSize="13px" fontWeight="400" opacity={0.8} maxW="800px">
              {description}
            </Text>
            {["GitHub"].includes(title) && status === "failed" && (
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
        ) : title === "JIRA" ? (
          <Button
            color="#1DAAE2"
            bgColor="#E7F8FF"
            fontSize="15px"
            py={6}
            width="250px"
          >
            Coming Soon
          </Button>
        ) : (
          <Button
            colorScheme="whiteAlpha"
            color={"black"}
            fontSize="15px"
            py={6}
            onClick={() => {
              if (title !== "JIRA") history.push("/billing");
            }}
            border="2px solid #2FF86B"
            width="250px"
          >
            <Icon as={BiLockAlt} mr={2} fontSize="18px" />
            Upgrade
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
