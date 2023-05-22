import React from "react";

import { Button, Flex, Text } from "@chakra-ui/react";
import { TrialWallIcon } from "./icons";
import { Link } from "react-router-dom";

export const UpgradePackage: React.FC<{
  heading?: string;
  text?: string;
}> = ({
  heading = "Upgrade to use this feature",
  text = "Upgrade from the trial plan to use this feature and much more.",
}) => {
  return (
    <Flex
      w="100%"
      h="100%"
      position="absolute"
      sx={{
        backdropFilter: "blur(6px)",
      }}
      bg="rgba(255,255,255,0.3)"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <TrialWallIcon />
      <Text
        textAlign={"center"}
        w={"80%"}
        fontWeight={700}
        fontSize="md"
        color="black"
        mb={4}
        mt={10}
      >
        {heading}
      </Text>

      <Text
        textAlign={"center"}
        w={"80%"}
        fontWeight={300}
        fontSize="sm"
        color="black"
        mb={8}
      >
        {text}
      </Text>

      <Link to="/billing">
        <Button mt={4} variant="brand" width="250px">
          Upgrade
        </Button>
      </Link>
    </Flex>
  );
};

export default UpgradePackage;
