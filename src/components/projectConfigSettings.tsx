import { VStack, Text, Switch, HStack, Spinner } from "@chakra-ui/react";
import React from "react";
import GithubConnectAlert from "./githubConnectAlert";
import Loader from "./styled-components/Loader";

const ConfigSettings: React.FC<{
  githubSync: boolean;
  onToggleFunction: () => Promise<void>;
  isGithubIntegrated: boolean;
  isLoading?: boolean;
  view: "github_app" | "detailed_result" | "scan_history";
}> = ({
  githubSync,
  onToggleFunction,
  isGithubIntegrated,
  view,
  isLoading,
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
      height={[
        "fit-content",
        "fit-content",
        "fit-content",
        view === "github_app" ? "50vh" : "fit-content",
      ]}
    >
      <Text
        sx={{
          fontSize: "lg",
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        Enable GitHub Actions
      </Text>
      <Text
        sx={{
          color: "subtle",
          fontSize: "sm",
          textAlign: "left",
        }}
      >
        Trigger automatic scans via Github actions
      </Text>
      <HStack spacing={5}>
        <Switch
          size="lg"
          variant="brand"
          isDisabled={isLoading}
          isChecked={githubSync}
          onChange={() => {
            if (isGithubIntegrated) {
              onToggleFunction();
            } else {
              setConnectAlert(!connectAlert);
            }
          }}
        />
        {isLoading && <Loader size={25} />}
      </HStack>
      {!isGithubIntegrated && connectAlert && (
        <GithubConnectAlert msg="You need to connect your GitHub to enable webhooks" />
      )}
      <Text
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
      </HStack>
    </VStack>
  );
};

export default ConfigSettings;
