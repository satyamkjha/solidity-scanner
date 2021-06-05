import React from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Text,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Progress,
} from "@chakra-ui/react";
import { FaFileCode } from "react-icons/fa";
import API from "helpers/api";

type FormData = {
  url: string;
};

const Home: React.FC = () => {
  const { handleSubmit, register, formState } = useForm<FormData>();

  const onSubmit = async ({ url }: FormData) => {
    console.log({ url });
    API.post("/test/", { test: "test" });
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Flex sx={{ width: "100%", flexDir: ["column", "column", "row"] }}>
        <Flex
          sx={{
            w: ["100%", "100%", "60%"],
            flexDir: "column",
            alignItems: "center",
            bg: "bg.subtle",
            borderRadius: "20px",
            p: 4,
            mx: [0, 0, 4],
            my: 4,
          }}
        >
          <Text sx={{ fontSize: "2xl", fontWeight: 600, my: 6 }}>
            Load application
          </Text>

          <Text sx={{ color: "subtle", textAlign: "center", mb: 6 }}>
            Provide a link to Git or Subversion repository, or application on
            Google Play. See link examples and additional restrictions in the
            User Guide (section Starting a scan from UI) available on the User
            Guide page.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Stack spacing={6} my={8} width={"100%"}>
              <InputGroup alignItems="center">
                <InputLeftElement
                  height="48px"
                  children={<Icon as={FaFileCode} color="gray.300" />}
                />
                <Input
                  isRequired
                  type="text"
                  placeholder="Application link/ Path to directory"
                  variant="brand"
                  size="lg"
                  {...register("url", { required: true })}
                />
              </InputGroup>

              <Button
                type="submit"
                variant="brand"
                isLoading={formState.isSubmitting}
              >
                Start Scan
              </Button>
            </Stack>
          </form>
        </Flex>

        <Box
          sx={{
            w: ["100%", "100%", "40%"],
            mx: [0, 0, 4],
            my: 4,
          }}
        >
          <Text sx={{ color: "subtle", fontSize: "sm", px: 4 }}>OVERVIEW</Text>
          <Box
            sx={{
              w: "100%",
              borderRadius: "20px",
              bg: "bg.subtle",
              p: 4,
              my: 2,
            }}
          >
            <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>2345</Text>
            <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
              Lines of code scanned
            </Text>
          </Box>
          <Box
            sx={{
              w: "100%",
              borderRadius: "20px",
              bg: "bg.subtle",
              p: 4,
              my: 2,
            }}
          >
            <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>0:00:02</Text>
            <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
              Scan Duration
            </Text>
          </Box>
          <Box
            sx={{
              w: "100%",
              borderRadius: "20px",
              bg: "bg.subtle",
              p: 4,
              my: 2,
            }}
          >
            <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>12</Text>
            <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
              Number of Scans
            </Text>
          </Box>
          <Box
            sx={{
              w: "100%",
              borderRadius: "20px",
              p: 4,
              my: 2,
            }}
          >
            <Flex
              sx={{
                w: "100%",
                justifyContent: "space-between",
                fontSize: "sm",
                fontWeight: 600,
                px: 4,
                my: 4,
              }}
            >
              <Text>Critical</Text>
              <Text>4</Text>
            </Flex>
            <Progress
              sx={{ my: 2, mx: 4 }}
              variant="critical"
              value={400 / 30}
              size="sm"
            />
            <Flex
              sx={{
                w: "100%",
                justifyContent: "space-between",
                fontSize: "sm",
                fontWeight: 600,
                px: 4,
                my: 4,
              }}
            >
              <Text>Medium</Text>
              <Text>10</Text>
            </Flex>
            <Progress
              sx={{ my: 2, mx: 4 }}
              variant="medium"
              value={1000 / 30}
              size="sm"
            />{" "}
            <Flex
              sx={{
                w: "100%",
                justifyContent: "space-between",
                fontSize: "sm",
                fontWeight: 600,
                px: 4,
                my: 4,
              }}
            >
              <Text>Low</Text>
              <Text>12</Text>
            </Flex>
            <Progress
              sx={{ my: 2, mx: 4 }}
              variant="low"
              value={1200 / 30}
              size="sm"
            />
            <Flex
              sx={{
                w: "100%",
                justifyContent: "space-between",
                fontSize: "sm",
                fontWeight: 600,
                px: 4,
                my: 4,
              }}
            >
              <Text>Total Vulnerabalities Found</Text>
              <Text>30</Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
