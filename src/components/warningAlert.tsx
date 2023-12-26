import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const WarningAlert: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <Alert
      width="100%"
      p={3}
      borderWidth={1}
      background="yellow.600"
      borderColor="yellow.900"
      status="warning"
      borderRadius={10}
      fontSize={"xs"}
      fontWeight={300}
    >
      <AlertIcon />
      {msg}
    </Alert>
  );
};

export default WarningAlert;
