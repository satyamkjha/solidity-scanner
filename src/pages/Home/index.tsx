import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
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
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import { FaFileCode } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";

import API from "helpers/api";
import { useOverview } from "hooks/useOverview";

const Home: React.FC = () => {
  const { data } = useOverview();

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
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList mb="1em">
              <Tab width="50%">Application</Tab>
              <Tab width="50%">Blockchain Contract</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ApplicationForm />
              </TabPanel>
              <TabPanel>
                <ContractForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        {!data && (
          <Flex
            sx={{
              w: ["100%", "100%", "40%"],
              mx: [0, 0, 4],
              my: 4,
              justifyContent: "center",
            }}
          >
            <Spinner mt={20} />
          </Flex>
        )}
        {data && (
          <Box
            sx={{
              w: ["100%", "100%", "40%"],
              mx: [0, 0, 4],
              my: 4,
            }}
          >
            <Text sx={{ color: "subtle", fontSize: "sm", px: 4 }}>
              OVERVIEW
            </Text>
            <Box
              sx={{
                w: "100%",
                borderRadius: "20px",
                bg: "bg.subtle",
                p: 4,
                my: 2,
              }}
            >
              <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>
                {data.overview.total_lines_scanner}
              </Text>
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
              <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>
                {data.overview.total_projects_monitored}
              </Text>
              <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
                Projects monitored
              </Text>
            </Box>
            {/* <Box
              sx={{
                w: "100%",
                borderRadius: "20px",
                bg: "bg.subtle",
                p: 4,
                my: 2,
              }}
            >
              <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>
                {data?.overview.total_issues_open}
              </Text>
              <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
                Open Issues
              </Text>
            </Box> */}
            <Box
              sx={{
                w: "100%",
                borderRadius: "20px",
                p: 4,
                my: 2,
              }}
            >
              <VulnerabilityProgress
                label="Critical"
                variant="critical"
                count={data.overview.issue_count_critical}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="High"
                variant="high"
                count={data.overview.issue_count_high}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="Medium"
                variant="medium"
                count={data.overview.issue_count_medium}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="Low"
                variant="low"
                count={data.overview.issue_count_low}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="Informational"
                variant="informational"
                count={data.overview.issue_count_informational}
                total={data.overview.issue_count_total}
              />
              <Flex
                sx={{
                  w: "100%",
                  justifyContent: "space-between",
                  fontSize: "md",
                  fontWeight: 600,
                  px: 4,
                  mt: 8,
                }}
              >
                <Text>Total Vulnerabalities Found</Text>
                <Text>{data.overview.issue_count_total}</Text>
              </Flex>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

type VulnerabilityProgressProps = {
  label: string;
  count: number;
  total: number;
  variant: string;
};
const VulnerabilityProgress = (props: VulnerabilityProgressProps) => {
  return (
    <>
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
        <Text>{props.label}</Text>
        <Text>{props.count}</Text>
      </Flex>
      <Progress
        sx={{ my: 2, mx: 4 }}
        variant={props.variant}
        value={(props.count * 100) / props.total}
        size="sm"
      />
    </>
  );
};

type ApplicationFormData = {
  project_url: string;
  project_name: string;
};

const ApplicationForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, register, formState } = useForm<ApplicationFormData>();
  const history = useHistory();
  const onSubmit = async ({
    project_url,
    project_name,
  }: ApplicationFormData) => {
    await API.post("/api-start-scan/", {
      project_url,
      ...(project_name && project_name !== "" && { project_name }),
    });
    queryClient.invalidateQueries("scans");
    history.push("/projects");
  };
  return (
    <>
      <Text
        sx={{
          fontSize: "2xl",
          fontWeight: 600,
          my: 6,
          textAlign: "center",
        }}
      >
        Load application
      </Text>

      <Text sx={{ color: "subtle", textAlign: "center", mb: 6 }}>
        Provide a link to a Git repository. See link examples and additional
        restrictions in the User Guide (section Starting a scan from UI)
        available on the User Guide page.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack spacing={6} my={8} width={"100%"}>
          <InputGroup alignItems="center">
            <InputLeftElement
              height="48px"
              children={<Icon as={AiOutlineProject} color="gray.300" />}
            />
            <Input
              placeholder="Project name (Optional)"
              variant="brand"
              size="lg"
              {...register("project_name")}
            />
          </InputGroup>
          <InputGroup alignItems="center" mb={4}>
            <InputLeftElement
              height="48px"
              children={<Icon as={FaFileCode} color="gray.300" />}
            />
            <Input
              isRequired
              type="url"
              placeholder="Link to the Github repository"
              variant="brand"
              size="lg"
              {...register("project_url", { required: true })}
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
    </>
  );
};

type ContractFormData = {
  // contract_name: string;
  contract_address: string;
  // contract_platform: string;
};

const ContractForm: React.FC = () => {
  const [platform, setPlatform] = React.useState("etherscan");
  const queryClient = useQueryClient();
  const { handleSubmit, register, formState } = useForm<ContractFormData>();
  const history = useHistory();
  const onSubmit = async ({ contract_address }: ContractFormData) => {
    await API.post("/api-start-scan-block/", {
      contract_address,
      contract_platform: platform,
    });
    queryClient.invalidateQueries("scans");
    history.push("/blocks");
  };
  return (
    <>
      <Text
        sx={{
          fontSize: "2xl",
          fontWeight: 600,
          my: 6,
          textAlign: "center",
        }}
      >
        Load contract
      </Text>

      <Text sx={{ color: "subtle", textAlign: "center", mb: 6 }}>
        Provide the address of your blockchain contract. See link examples and
        additional restrictions in the User Guide (section Starting a scan from
        UI) available on the User Guide page.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack spacing={6} my={8} width={"100%"}>
          <InputGroup alignItems="center">
            <InputLeftElement
              height="48px"
              children={<Icon as={AiOutlineProject} color="gray.300" />}
            />
            <Input
              isRequired
              placeholder="Contract address"
              variant="brand"
              size="lg"
              {...register("contract_address")}
            />
          </InputGroup>

          <FormControl id="contract_platform">
            <FormLabel fontSize="sm">Contract platform</FormLabel>
            <Select
              placeholder="Select contract platform"
              value={platform}
              isRequired
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="etherscan">Etherscan</option>
              <option value="binance">Binance</option>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="brand"
            isLoading={formState.isSubmitting}
          >
            Start Scan
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Home;
