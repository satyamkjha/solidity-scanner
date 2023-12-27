import React from "react";
import { Alert, AlertIcon, Text } from "@chakra-ui/react";

const WarningAlert: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <Alert
      width="100%"
      p={3}
      borderWidth={1}
      background="#FFF8ED"
      borderColor="#FFC661"
      status="warning"
      borderRadius={10}
    >
      <AlertIcon />
      <Text fontSize={"xs"} fontWeight={300} color="#4E5D78">
        {msg}
      </Text>
    </Alert>
  );
};

export default WarningAlert;
