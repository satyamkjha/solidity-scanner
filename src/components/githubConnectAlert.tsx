import React from "react";
import { Alert, AlertIcon, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const GithubConnectAlert: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <Alert borderRadius={20} status="warning" fontSize="14px">
      <AlertIcon />
      {msg}
      <Link
        as={RouterLink}
        to="/integrations"
        variant="brand"
        fontWeight="600"
        ml={1}
      >
        Connect
      </Link>
    </Alert>
  );
};

export default GithubConnectAlert;
