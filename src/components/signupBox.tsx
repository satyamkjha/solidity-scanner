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

export const SignupBox: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const history = useHistory()

  return (
    <Box
      sx={{
        w: "100%",
        backgroundImage: "url(/background/pattern.png)",
        borderRadius: 20,
        overflow: "hidden",
        mb: 10,
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
            w: ["100%", "70%"],
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
            w: ["100%", "30%"],
          }}
        >
          
            <Button onClick={() => history.push("/signup")} variant="brand" w="100%" my={10}>
              Signup For Free Trial
            </Button>
        
        </Box>
      </Flex>
    </Box>
  );
};

export default SignupBox;
