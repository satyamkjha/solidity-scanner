import { VStack, Text, Switch, HStack } from "@chakra-ui/react";
import React from "react";
import GithubConnectAlert from "./githubConnectAlert";
import Loader from "./styled-components/Loader";
import { OauthName } from "common/values";
import ErrorAlert from "./errorAlert";

const ConfigSettings: React.FC<{
  githubSync: boolean;
  onToggleFunction: () => Promise<void>;
  isOauthIntegrated: boolean;
  webhookCreatePermission?: boolean;
  isLoading?: boolean;
  view: "github_app" | "detailed_result" | "scan_history";
  formType: string;
}> = ({
  githubSync,
  onToggleFunction,
  isOauthIntegrated,
  view,
  isLoading,
  formType,
  webhookCreatePermission = true,
}) => {
  const [connectAlert, setConnectAlert] = React.useState(false);

  return (
    <VStack
      spacing={3}
      pt={3}
      width={"100%"}
      justifyContent="flex-start"
      alignItems={"flex-start"}
      minHeight={view === "github_app" ? "400px" : "200px"}
      height={"fit-content"}
    >
      <Text
        sx={{
          fontSize: "lg",
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        Enable {OauthName[formType]} Actions
      </Text>
      <Text
        sx={{
          color: "subtle",
          fontSize: "sm",
          textAlign: "left",
        }}
      >
        Trigger automatic scans via {OauthName[formType]} actions
      </Text>
      <HStack spacing={5}>
        <Switch
          size="lg"
          variant="brand"
          isDisabled={isLoading || !webhookCreatePermission}
          isChecked={githubSync}
          onChange={() => {
            if (isOauthIntegrated) {
              onToggleFunction();
            } else {
              setConnectAlert(!connectAlert);
            }
          }}
        />
        {isLoading && <Loader size={25} />}
      </HStack>
      {!isOauthIntegrated && connectAlert && (
        <GithubConnectAlert
          msg={`You need to connect your ${OauthName[formType]} to enable webhooks`}
        />
      )}
      {!webhookCreatePermission && (
        <ErrorAlert
          msg="You are not the owner of the repository for this project.
        To enable Git actions on the repository, ownership is required. Please ensure that you are logged in with the correct credentials or contact the repository owner to grant you the necessary permissions. "
        />
      )}
      {/* <Text
        sx={{
          fontSize: "lg",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        Turn on Slack Alerts
      </Text>
      <Text
        sx={{
          color: "subtle",
          fontSize: "sm",
          textAlign: "left",
        }}
      >
        Get scan results and alerts on your Slack channels
      </Text>
      <HStack spacing={5}>
        <Switch isDisabled={true} size="lg" variant="brand" />
        <Text color="gray.500">Coming Soon</Text>
      </HStack> */}
    </VStack>
  );
};

export default ConfigSettings;
