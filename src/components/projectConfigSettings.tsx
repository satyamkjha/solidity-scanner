import { VStack, Text, Switch, HStack } from "@chakra-ui/react";
import React from "react";
import GithubConnectAlert from "./githubConnectAlert";

const ConfigSettings: React.FC<{
  githubSync: boolean;
  setGithubSync: React.Dispatch<React.SetStateAction<boolean>>;
  isGithubIntegrated: boolean;
}> = ({ githubSync, setGithubSync, isGithubIntegrated }) => {
  return (
    <VStack
      spacing={3}
      pt={3}
      width={"100%"}
      justifyContent="flex-start"
      alignItems={"flex-start"}
      minHeight="400px"
      height={["fit-content", "fit-content", "fit-content", "40vh"]}
    >
      <Text
        sx={{
          fontSize: "lg",
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        Turn on Github Synchronisation
      </Text>
      <Text
        sx={{
          color: "subtle",
          fontSize: "sm",
          textAlign: "left",
        }}
      >
        Provide a link to Git or Subversion repository. See link examples and
        additional restrictions in the User Guide (section Starting a scan from
        UI) available on the{" "}
      </Text>
      <Switch
        size="lg"
        variant="brand"
        onChange={() => setGithubSync(!githubSync)}
      />
      {!isGithubIntegrated && githubSync && <GithubConnectAlert />}
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
        Provide a link to Git or Subversion repository. See link examples and
        additional restrictions in the User Guide (section Starting a scan from
        UI) available on the{" "}
      </Text>
      <HStack spacing={5}>
        <Switch isDisabled={true} size="lg" variant="brand" />
        <Text color="gray.500">Coming Soon</Text>
      </HStack>
    </VStack>
  );
};

export default ConfigSettings;
