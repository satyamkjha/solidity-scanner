import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const ErrorAlert: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <Alert
      width="100%"
      p={3}
      borderWidth={1}
      background="red.50"
      borderColor="red.500"
      status="error"
      borderRadius={10}
      fontSize={"xs"}
      fontWeight={300}
    >
      <AlertIcon />
      {msg}
    </Alert>
  );
};

export default ErrorAlert;
