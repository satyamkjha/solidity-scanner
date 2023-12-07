import React from "react";
import { Alert, AlertIcon, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const GithubConnectAlert: React.FC<{ msg: string }> = ({ msg }) => {
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
        <span>
          <Link
            as={RouterLink}
            to="/integrations"
            variant="brand"
            fontWeight="600"
            ml={1}
          >
            Connect
          </Link>
        </span>
      </Text>
    </Alert>
  );
};

export default GithubConnectAlert;
