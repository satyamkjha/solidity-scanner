import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export const SignupBox: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const history = useHistory();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Box
      mx={[0, 0, 0, 24]}
      sx={{
        w: ["100%", "100%", "100%", "85%"],
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
            Start securing your
            <br />
            <Box as="span" sx={{ color: "accent" }}>
              contracts
            </Box>{" "}
            today
          </Heading>
          <Text color="accent" textAlign={["center", "center", "left"]}>
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
