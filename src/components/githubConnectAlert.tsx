import React from "react";
import { Alert, AlertIcon, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const GithubConnectAlert: React.FC = () => {
  return (
    <Alert status="warning" fontSize="14px">
      <AlertIcon />
      You need to connect your GitHub to start a private scan.
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
