import React from "react";

import { Button, Flex, Text, Box, VStack } from "@chakra-ui/react";
import { TrialWallIcon } from "./icons";
import { Link } from "react-router-dom";

export const UpgradePackageV2: React.FC<{
  heading?: string;
  text?: string;
  iconSize?: number;
  footer?: React.RefAttributes<HTMLElement>;
}> = ({
  heading = "Upgrade to use this feature",
  text = "Upgrade from the trial plan to use this feature and much more.",
  iconSize = 120,
  footer,
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
      <Flex
        maxW={"80%"}
        px={10}
        py={8}
        alignItems={"center"}
        background={
          "linear-gradient(91.77deg, rgba(202, 190, 255, 0.31) 0.5%, rgba(168, 230, 255, 0.31) 101.79%)"
        }
        borderRadius={"10px"}
        flexDir={["column", "column", "column", "row"]}
      >
        <TrialWallIcon size={iconSize} />
        <VStack
          ml={[0, 0, 0, 10]}
          my={[10, 10, 10, 0]}
          alignItems={["center", "center", "center", "flex-start"]}
        >
          <Text
            textAlign={["center", "center", "center", "left"]}
            fontWeight={700}
            fontSize="lg"
            color="black"
          >
            {heading}
          </Text>
          <Text
            textAlign={["center", "center", "center", "left"]}
            w={["100%", "100%", "100%", "80%"]}
            fontWeight={300}
            fontSize="sm"
            color="detail"
          >
            {text}
          </Text>
        </VStack>
        <Link to="/billing">
          <Button mt={2} mb={4} variant="brand" width="200px">
            Upgrade
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default UpgradePackageV2;
