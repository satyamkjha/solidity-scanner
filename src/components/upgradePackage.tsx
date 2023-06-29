import React from "react";

import { Button, Flex, Text } from "@chakra-ui/react";
import { TrialWallIcon } from "./icons";
import { Link } from "react-router-dom";

export const UpgradePackage: React.FC<{
  heading?: string;
  text?: string;
  iconSize?: number;
}> = ({
  heading = "Upgrade to use this feature",
  text = "Upgrade from the trial plan to use this feature and much more.",
  iconSize = 120,
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
      <Flex>
        <TrialWallIcon size={iconSize} />
      </Flex>
      <Text
        textAlign={"center"}
        w={"80%"}
        fontWeight={700}
        fontSize="md"
        color="black"
        mb={2}
        mt={8}
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
        <Button mt={2} variant="brand" width="250px">
          Upgrade
        </Button>
      </Link>
    </Flex>
  );
};

export default UpgradePackage;
