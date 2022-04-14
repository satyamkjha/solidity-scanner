import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  Flex,
  Box,
  Text,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Select,
  Switch,
  HStack,
  Link,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaFileCode } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { BlockCredit } from "components/icons";
import API from "helpers/api";
import { useOverview } from "hooks/useOverview";
import { useProfile } from "hooks/useProfile";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { useSupportedChains } from "hooks/useSupportedPlatforms";
import { sentenceCapitalize } from "helpers/helperFunction";

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
              <Tab width="50%">GitHub Application</Tab>
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
                <Text>Total Vulnerabilities Found</Text>
                <Text>{data.overview.issue_count_total}</Text>
              </Flex>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

type ApplicationFormData = {
  project_url: string;
  project_name: string;
};

const ApplicationForm: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: profileData } = useProfile();
  const [visibility, setVisibility] = useState(false);
  const { handleSubmit, register, formState } = useForm<ApplicationFormData>();
  const history = useHistory();
  const onSubmit = async ({
    project_url,
    project_name,
  }: ApplicationFormData) => {
    if (project_name.length < 51) {
      await API.post("/api-project-scan/", {
        project_url,
        ...(project_name && project_name !== "" && { project_name }),
        project_type: "new",
        project_visibility: visibility ? "private" : "public",
      });
      queryClient.invalidateQueries("scans");
      queryClient.invalidateQueries("profile");
      history.push("/projects");
    } else {
      toast({
        title: "Character Exceeded",
        description: "Project Name cannot exceed to more than 50 characters.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isGithubIntegrated =
    profileData?._integrations?.github?.status === "successful";
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
              placeholder="Project name"
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

          <HStack alignItems="center" spacing={6} fontSize="14px">
            <Text>Public</Text>
            <Switch
              size="lg"
              variant="brand"
              isChecked={visibility}
              onChange={() => setVisibility(!visibility)}
            />
            <Text>Private</Text>
          </HStack>

          {!isGithubIntegrated && visibility && (
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
          )}
          <Button
            type="submit"
            variant="brand"
            isDisabled={!isGithubIntegrated && visibility}
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
  const contractChain: { [key: string]: { label: string; value: string }[] } = {
    etherscan: [
      { value: "mainnet", label: "Ethereum Mainnet" },
      { value: "testnet", label: "Ropsten Testnet" },
      { value: "testnet", label: "Kovan Testnet" },
      { value: "testnet", label: "Rinkeby Testnet" },
      { value: "testnet", label: "Goerli Testnet" },
    ],
    bscscan: [
      { value: "mainnet", label: "Bsc Mainnet" },
      { value: "testnet", label: "Bsc Testnet" },
    ],
    polygonscan: [
      { value: "mainnet", label: "Polygon Mainnet" },
      { value: "testnet", label: "Polygon Testnet" },
    ],
    avalanche: [
      { value: "mainnet", label: "Avalanche Mainnet" },
      { value: "testnet", label: "Avalanche Fuji Testnet" },
    ],
    fantom: [
      { value: "mainnet", label: "FTM Mainnet" },
      { value: "testnet", label: "FTM Testnet" },
    ],
  };
  const [platform, setPlatform] = React.useState("etherscan");
  const [chain, setChain] = React.useState("");
  const [chainList, setChainList] = React.useState<
    { label: string; value: string }[]
  >(contractChain["etherscan"]);
  const queryClient = useQueryClient();
  const { handleSubmit, register, formState } = useForm<ContractFormData>();
  const history = useHistory();
  const { data: profileData } = useProfile();
  const { data: supportedChains } = useSupportedChains();

  const onSubmit = async ({ contract_address }: ContractFormData) => {
    await API.post("/api-start-scan-block/", {
      contract_address,
      contract_platform: platform,
      contract_chain: chain,
    });
    queryClient.invalidateQueries("scans");
    queryClient.invalidateQueries("profile");
    history.push("/blocks");
  };
  return (
    <>
      <Text
        sx={{
          fontSize: "2xl",
          fontWeight: 600,
          mt: 6,
          textAlign: "center",
        }}
      >
        Load contract
      </Text>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w="100%"
        py={4}
        my={4}
        bg={
          (profileData?.credits || 0) > 0
            ? "rgba(223, 255, 233, 0.5)"
            : "high-subtle"
        }
        border="1px solid"
        borderColor={(profileData?.credits || 0) > 0 ? "brand-dark" : "high"}
        borderRadius="25px"
      >
        <Flex alignItems="center">
          <BlockCredit />
          <Text fontSize="2xl" fontWeight="700" ml={2}>
            {profileData?.credits}
          </Text>
        </Flex>
        <Text
          sx={{
            color: (profileData?.credits || 0) > 0 ? "low" : "high",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Contract scan credits
        </Text>
      </Flex>

      <Text sx={{ color: "subtle", textAlign: "center", mb: 6 }}>
        Provide the address of your blockchain contract. See link examples and
        additional restrictions in the User Guide (section Starting a scan from
        UI) available on the User Guide page.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack spacing={6} my={8} width={"100%"}>
          <VStack alignItems={"flex-start"}>
            <Text mb={0} fontSize="sm">
              Contract address
            </Text>

            <InputGroup mt={0} alignItems="center">
              <InputLeftElement
                height="48px"
                children={<Icon as={AiOutlineProject} color="gray.300" />}
              />
              <Input
                isRequired
                placeholder="0x808ed7A75n133f64069318Sa0q173c71rre44414"
                variant="brand"
                size="lg"
                {...register("contract_address")}
              />
            </InputGroup>
          </VStack>

          <FormControl id="contract_platform">
            <FormLabel fontSize="sm">Contract platform</FormLabel>
            <Select
              placeholder="Select contract platform"
              value={platform}
              variant="brand"
              h={"48px"}
              disabled={supportedChains == null}
              isRequired
              onChange={(e) => {
                setPlatform(e.target.value);
                console.log(supportedChains);
                if (supportedChains) {
                  setChainList(contractChain[e.target.value]);
                  console.log(supportedChains[e.target.value]);
                }
              }}
            >
              <option value="etherscan">Ethereum</option>
              <option value="bscscan">Binance</option>
              <option value="polygonscan">Polygon</option>
              <option value="fantom">Fantom</option>
              <option value="avalanche">Avalanche C-Chain</option>
            </Select>
          </FormControl>

          <FormControl id="contract_chain">
            <FormLabel fontSize="sm">Contract platform</FormLabel>
            <Select
              placeholder="Select Platform Chain"
              value={chain}
              variant="brand"
              h={"48px"}
              disabled={supportedChains == null}
              isRequired
              onChange={(e) => {
                setChain(e.target.value);
              }}
            >
              {chainList?.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="brand"
            isLoading={formState.isSubmitting}
            isDisabled={profileData?.credits === 0}
          >
            Start Scan
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Home;
