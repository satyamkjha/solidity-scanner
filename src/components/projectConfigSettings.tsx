import { VStack, Text, Switch } from "@chakra-ui/react";
import React from "react";

const ConfigSettings: React.FC = () => {
  return (
    <VStack
      mt={8}
      spacing={3}
      justifyContent="flex-start"
      alignItems={"flex-start"}
    >
      <Text
        sx={{
          fontSize: "lg",
          fontWeight: 500,
          textAlign: "center",
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
      <Switch size="lg" variant="brand" />
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
      <Switch size="lg" variant="brand" />
    </VStack>
  );
};

export default ConfigSettings;
