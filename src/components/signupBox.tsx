import { Box, Button, Flex, Text, Heading, Divider } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const SignupBox: React.FC = () => {
  const history = useHistory();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Box
      mx={[5, 10, 10, 20]}
      sx={{
        w: "90%",
        maxW: "1200px",
        backgroundImage: `url(${assetsURL}background/pattern.png)`,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Flex
        sx={{
          px: [2, 2, 10],
          py: [8, 8, 20],
          w: "100%",
          bg: "rgba(82, 255, 0, 0.06)",
          flexDir: ["column", "column", "row"],
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            w: ["100%", "100%", "70%"],
          }}
        >
          <Heading
            as="h2"
            fontSize="3xl"
            lineHeight="1.4"
            mb={4}
            textAlign={["center", "center", "left"]}
          >
            Start securing your{" "}
            <Box as="span" sx={{ color: "accent" }}>
              contracts
            </Box>{" "}
            today
          </Heading>
          <Divider
            mt={10}
            mb={5}
            w="120px"
            border={"1px solid"}
            borderColor={"accent"}
            display={["none", "none", "block"]}
          />
          <Text
            color="accent"
            textAlign={["center", "center", "left"]}
            fontSize="lg"
          >
            Have more questions? Talk to our team and get a demo now.
          </Text>
        </Box>  
        <Box
          sx={{
            w: ["80%", "70%", "30%"],
          }}
        >
          <Button
            onClick={() => history.push("/signup")}
            variant="brand"
            w="100%"
            minWidth="200px"
            my={10}
          >
            Signup For Free Trial
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignupBox;
