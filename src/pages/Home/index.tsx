import React, { useEffect, useState, useMemo } from "react";
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
  Switch,
  HStack,
  Link,
  useToast,
  VStack,
  Progress,
  CloseButton,
  FormErrorMessage,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FaFileCode } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import {
  BlockCredit,
  ProjectIcon,
  SolidityFileIcon,
  UploadIcon,
} from "components/icons";
import API from "helpers/api";
import { useOverview } from "hooks/useOverview";
import { useProfile } from "hooks/useProfile";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { useSupportedChains } from "hooks/useSupportedPlatforms";
import { getFeatureGateConfig } from "helpers/helperFunction";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { API_PATH } from "helpers/routeManager";
import ConfigSettings from "components/projectConfigSettings";
import InfoSettings from "components/projectInfoSettings";
import FolderSettings from "components/projectFolderSettings";

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
              <Tab width="50%">Verified Contracts</Tab>
              <Tab width="50%">Upload Contract</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ApplicationForm />
              </TabPanel>
              <TabPanel>
                <ContractForm />
              </TabPanel>
              <TabPanel>
                <UploadForm />
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
              <VulnerabilityProgress
                label="Gas"
                variant="gas"
                count={data.overview.issue_count_gas}
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

const ApplicationForm: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: profileData } = useProfile();
  const history = useHistory();

  const githubUrlRegex =
    /(http(s)?)(:(\/\/))((github.com)(\/)[\w@\:\-~]+(\/)[\w@\:\-~]+)(\.git)?/;

  // const onSubmit = async ({
  //   project_url,
  //   project_name,
  // }: ApplicationFormData) => {
  //   if (project_name.length === 0) {
  //     setNameError("Please enter a Project Name of less than 50 characters.");
  //     return;
  //   }
  //   if (project_name.length > 50) {
  //     setNameError("Project Name cannot exceed to more than 50 characters.");
  //     return;
  //   }
  //   let filteredUrlInput = githubUrlRegex.exec(project_url);
  //   if (!filteredUrlInput) {
  //     setLinkError("Please enter a valid Github repository link");
  //     return;
  //   }
  //   const filteredUrl = filteredUrlInput[0];
  //   setNameError(null);
  //   setLinkError(null);
  //   const responseData = await API.post(API_PATH.API_PROJECT_SCAN, {
  //     project_url: filteredUrl,
  //     ...(project_name && project_name !== "" && { project_name }),
  //     project_type: "new",
  //     project_visibility: visibility ? "private" : "public",
  //   });
  //   if (responseData.status === 200) {
  //     if (responseData.data.status === "success") {
  //       queryClient.invalidateQueries("scans");
  //       queryClient.invalidateQueries("profile");
  //       history.push("/projects");
  //     }
  //   }
  // };

  const [projectName, setProjectName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [githubSync, setGithubSync] = useState(false);
  const [nameError, setNameError] = useState<null | string>(null);
  const [linkError, setLinkError] = useState<null | string>(null);
  const [step, setStep] = useState(1);
  const isGithubIntegrated =
    profileData?._integrations?.github?.status === "successful";

  return (
    <Flex flexDir="column" justifyContent={"flex-start"} alignItems="center">
      {profileData && (
        <Flex
          flexDir="column"
          backgroundColor="#FCFCFC"
          px={7}
          py={5}
          borderRadius={20}
          border="1px solid #ECECEC"
        >
          <HStack w="100%" justifyContent="space-between" mb={4}>
            <Text
              sx={{
                fontSize: ["xl", "xl", "2xl"],
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              {step === 1
                ? "Project Information"
                : step === 2
                ? "Project Folders"
                : step === 3
                ? "Project Settings"
                : ""}
            </Text>
            <HStack justifyContent={"flex-end"} spacing={[0, 0, 5]}>
              <Image
                height="60px"
                width="60px"
                src={`/common/step_${step}.svg`}
              />
              <Text
                sx={{
                  fontSize: ["md", "md", "lg"],
                  fontWeight: 700,

                  textAlign: "center",
                }}
              >
                {`Step ${step}/3`}
              </Text>
            </HStack>
          </HStack>

          <Text
            sx={{ color: "subtle", fontSize: "md", textAlign: "left", mb: 4 }}
          >
            Provide a link to Git or Subversion repository. See link examples
            and additional restrictions in the User Guide (section Starting a
            scan from UI) available on the{" "}
            <Box
              onClick={() =>
                window.open("https://docs.solidityscan.com/", "_blank")
              }
              cursor="pointer"
              color="#3300FF"
              as="span"
            >
              User Guide{" "}
            </Box>
            page.
          </Text>
          <Divider color="gray.700" borderWidth="1px" />
          {step === 1 ? (
            <InfoSettings
              nameError={nameError}
              linkError={linkError}
              visibility={visibility}
              projectName={projectName}
              githubLink={githubLink}
              isGithubIntegrated={isGithubIntegrated}
              setProjectName={setProjectName}
              setGithubLink={setGithubLink}
              setVisibility={setVisibility}
            />
          ) : step === 2 ? (
            <FolderSettings />
          ) : step === 3 ? (
            <ConfigSettings
              githubSync={githubSync}
              setGithubSync={setGithubSync}
              isGithubIntegrated={isGithubIntegrated}
            />
          ) : (
            <></>
          )}
        </Flex>
      )}
      <Flex
        w="100%"
        flexDir={["column", "column", "column", "row"]}
        alignItems="center"
        justifyContent={["flex-start", "flex-start", "flex-start", "flex-end"]}
        py={3}
      >
        {step > 1 && (
          <Button
            type="submit"
            width={["100%", "100%", "100%", "200px"]}
            variant="accent-outline"
            mr={[0, 0, 0, 5]}
            mb={[3, 3, 3, 0]}
            py={6}
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
            isDisabled={profileData?.credits === 0}
          >
            Prev
          </Button>
        )}
        <Button
          type="submit"
          variant="brand"
          width={["100%", "100%", "100%", "200px"]}
          onClick={() => {
            if (step < 3) {
              setStep(step + 1);
            }
          }}
          isDisabled={profileData?.credits === 0}
        >
          {step > 2 ? "Start Scan" : "Next"}
        </Button>
      </Flex>
    </Flex>
  );
};

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
  icon: string;
}> = ({ value, label, icon }) => (
  <div id={value} style={{ display: "flex", flexDirection: "row" }}>
    {icon !== "" && (
      <Image h={"20px"} w={"20px"} mr={3} src={`/blockscan/${icon}.svg`} />
    )}
    <div>{label}</div>
  </div>
);

const ContractForm: React.FC = () => {
  const contractChain: {
    [key: string]: {
      label: string;
      value: string;
      icon: string;
      isDisabled: boolean;
    }[];
  } = {
    etherscan: [
      {
        value: "mainnet",
        label: "Ethereum Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "sepolia",
        label: "Sepolia Testnet",
        icon: "",
        isDisabled: false,
      },
      { value: "goerli", label: "Goerli Testnet", icon: "", isDisabled: false },
    ],
    optimism: [
      {
        value: "mainnet",
        label: "Optimism Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "goerli",
        label: "Optimism Goerli Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    bscscan: [
      { value: "mainnet", label: "Bsc Mainnet", icon: "", isDisabled: false },
      { value: "testnet", label: "Bsc Testnet", icon: "", isDisabled: false },
    ],
    polygonscan: [
      {
        value: "mainnet",
        label: "Polygon Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Polygon Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    avalanche: [
      {
        value: "mainnet",
        label: "Avalanche Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Avalanche Fuji Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    fantom: [
      { value: "mainnet", label: "FTM Mainnet", icon: "", isDisabled: false },
      { value: "testnet", label: "FTM Testnet", icon: "", isDisabled: false },
    ],
    cronos: [
      {
        value: "mainnet",
        label: "Cronos Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Cronos Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    celo: [
      { value: "mainnet", label: "Celo Mainnet", icon: "", isDisabled: false },
      {
        value: "testnet",
        label: "Alfajores Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    aurora: [
      {
        value: "mainnet",
        label: "Aurora Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "testnet",
        label: "Aurora Testnet",
        icon: "",
        isDisabled: false,
      },
    ],
    arbiscan: [
      {
        value: "mainnet",
        label: "Arbiscan Mainnet",
        icon: "",
        isDisabled: false,
      },
      {
        value: "goerli",
        label: "Arbiscan Goerli",
        icon: "",
        isDisabled: false,
      },
    ],
    reefscan: [
      {
        value: "mainnet",
        label: "ReefScan Mainnet",
        icon: "",
        isDisabled: false,
      },
      // { value: "testnet", label: "ReefScan Testnet", icon: "" },
    ],
    xdc: [
      {
        value: "mainnet",
        label: "XDC Mainnet",
        icon: "",
        isDisabled: false,
      },
    ],
  };

  const options = [
    {
      value: "etherscan",
      icon: "etherscan",
      label: "Ethereum - (etherscan.io)",
      isDisabled: true,
    },
    {
      value: "bscscan",
      icon: "bscscan",
      label: "Binance - (bscscan.com)",
      isDisabled: true,
    },
    {
      value: "avalanche",
      icon: "avalanche",
      label: "Avalanche C-Chain - (snowtrace.io)",
      isDisabled: true,
    },
    {
      value: "polygonscan",
      icon: "polygonscan",
      label: "Polygon - (polygonscan.com)",
      isDisabled: true,
    },
    {
      value: "fantom",
      icon: "fantom",
      label: "Fantom - (ftmscan.com)",
      isDisabled: true,
    },
    {
      value: "cronos",
      icon: "cronos",
      label: "Cronos - (cronoscan.com)",
      isDisabled: true,
    },
    {
      value: "arbiscan",
      icon: "arbiscan",
      label: "Arbiscan - (arbiscan.io)",
      isDisabled: true,
    },
    {
      value: "celo",
      icon: "celo",
      label: "Celo - (celoscan.io)",
      isDisabled: true,
    },
    {
      value: "aurora",
      icon: "aurora",
      label: "Aurora - (aurorascan.dev)",
      isDisabled: true,
    },
    {
      value: "reefscan",
      icon: "reefscan",
      label: "ReefScan - (reefscan.com)",
      isDisabled: true,
    },
    {
      value: "optimism",
      icon: "optimism",
      label: "Optimism - (optimism.io)",
      isDisabled: true,
    },
    {
      value: "buildbear",
      icon: "buildbear",
      label: "Buildbear - (buildbear.io)",
      isDisabled: true,
    },
    {
      value: "xdc",
      icon: "xdc",
      label: "XDC - (blockchain.io)",
      isDisabled: true,
    },
  ];

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      opacity: state.isDisabled ? 0.5 : 1,
      backgroundColor: state.isDisabled
        ? "#ECECEC"
        : state.isSelected
        ? "#FFFFFF"
        : state.isFocused
        ? "#E6E6E6"
        : "#FFFFFF",
      color: "#000000",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuColor,
      borderRadius: 10,
      border: "0px solid #ffffff",
      overflowY: "hidden",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      padding: 5,
      borderRadius: 15,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const [contractAddress, setContractAddress] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [platform, setPlatform] = React.useState("");
  const [chain, setChain] = React.useState<{
    label: string;
    value: string;
    icon: string;
  } | null>(null);
  const [chainList, setChainList] = React.useState<
    { label: string; value: string; icon: string }[]
  >(contractChain["etherscan"]);
  const queryClient = useQueryClient();

  const history = useHistory();
  const { data: profileData } = useProfile();
  const { data: supportedChains } = useSupportedChains();

  const platform_supported = getFeatureGateConfig().platform_supported;

  const onSubmit = async () => {
    let req = {};
    if (platform === "buildbear") {
      req = {
        contract_address: contractAddress,
        contract_platform: platform,
        node_id: nodeId,
      };
    } else {
      req = {
        contract_address: contractAddress,
        contract_platform: platform,
        contract_chain: chain?.value,
      };
    }
    setIsLoading(true);
    API.post<{
      contract_verified: boolean;
      message: string;
      status: string;
    }>(API_PATH.API_GET_CONTRACT_STATUS, req).then(
      async (res) => {
        if (res.data) {
          if (res.data.contract_verified) {
            const responseData = await API.post(
              API_PATH.API_START_SCAN_BLOCK,
              req
            );
            setIsLoading(false);
            if (responseData.status === 200) {
              if (responseData.data.status === "success") {
                queryClient.invalidateQueries("scans");
                queryClient.invalidateQueries("profile");
                history.push("/blocks");
              }
            }
          }
        } else {
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
      }
    );
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
      <Text sx={{ color: "subtle", textAlign: "left", mb: 4 }}>
        Provide the address of your smart contract deployed on the supported EVM
        chains. Your results will appear in the "Verified Contracts" tab.
      </Text>
      <Text sx={{ color: "subtle", textAlign: "left", mb: 2 }}>
        NOTE: Please follow the constraints below to avoid scan failure:
      </Text>
      <Text sx={{ color: "subtle", textAlign: "left", mb: 2, fontSize: "sm" }}>
        1. Navigate to the explorer of the particular blockchain (Ethereum -
        Etherscan.io).
      </Text>
      <Text sx={{ color: "subtle", textAlign: "left", mb: 6, fontSize: "sm" }}>
        2. Use the search bar to get your smart contract and check if the source
        code is verified in the "Contract" tab of the selected explorer.
      </Text>
      {supportedChains && (
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
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </InputGroup>
          </VStack>
          <FormControl id="contract_platform">
            <FormLabel fontSize="sm">Contract platform</FormLabel>
            <Select
              formatOptionLabel={formatOptionLabel}
              options={options.map((item) => {
                for (const chain in supportedChains) {
                  if (
                    chain === item.value &&
                    platform_supported.includes(chain)
                  ) {
                    return {
                      value: item.value,
                      icon: item.icon,
                      label: item.label,
                      isDisabled: !item.isDisabled,
                    };
                  }
                }
                return item;
              })}
              placeholder="Select Contract Platform"
              isSearchable={true}
              value={options.find((item) => platform === item.value)}
              styles={customStyles}
              onChange={(newValue) => {
                if (newValue) {
                  setPlatform(newValue.value);
                  if (supportedChains) {
                    setChainList(contractChain[newValue.value]);
                    setChain(null);
                  }
                }
              }}
            />
          </FormControl>

          {platform === "buildbear" ? (
            <VStack alignItems={"flex-start"}>
              <Text mb={0} fontSize="sm">
                Node ID
              </Text>

              <InputGroup mt={0} alignItems="center">
                <InputLeftElement
                  height="48px"
                  children={<Icon as={AiOutlineProject} color="gray.300" />}
                />
                <Input
                  isRequired
                  placeholder="Node ID"
                  variant="brand"
                  size="lg"
                  value={nodeId}
                  onChange={(e) => setNodeId(e.target.value)}
                />
              </InputGroup>
            </VStack>
          ) : (
            <FormControl id="contract_chain">
              <FormLabel fontSize="sm">Contract Chain</FormLabel>
              <Select
                formatOptionLabel={formatOptionLabel}
                isSearchable={false}
                isDisabled={platform === ""}
                options={chainList}
                value={chain}
                placeholder="Select Contract Chain"
                styles={customStyles}
                onChange={(newValue) => {
                  if (newValue) {
                    setChain(newValue);
                  }
                }}
              />
            </FormControl>
          )}

          <Button
            type="submit"
            variant="brand"
            onClick={onSubmit}
            isLoading={isLoading}
            isDisabled={profileData?.credits === 0}
          >
            Start Scan
          </Button>
        </Stack>
      )}
    </>
  );
};

const UploadForm: React.FC = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { data: profileData } = useProfile();

  let count: number = 0;

  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [urlList, setUrlList] = useState<
    { url: string; name: string; file: File }[]
  >([]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ maxFiles: 5 });

  let baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    borderWidth: 2,
    borderRadius: "20px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#ffffff",
    color: "#000000",
    outline: "none",
    width: "100%",
    marginTop: "20px",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(error ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, error]
  );

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      firstCheck();
    }
  }, [acceptedFiles]);

  const firstCheck = () => {
    let flag = true;
    acceptedFiles.forEach((files) => {
      if (!checkFileExt(files.name)) {
        setErrorMsg(
          "You can only upload solidity files with .sol extension for scanning."
        );
        setError(true);
        flag = false;
        return;
      }
    });
    if (flag) {
      setStep(1);
      getPreassignedURLList();
      setErrorMsg(null);
      setError(false);
    }
  };

  const getPreassignedURLList = async () => {
    let results = await acceptedFiles.map(async (file) => {
      return getPreassignedURL(file.name, file);
    });
    Promise.all(results).then((res) => {
      if (res.length === acceptedFiles.length) setUrlList([...res]);
    });
  };

  const uploadFiles = async () => {
    let results: any[] = [];
    urlList.forEach((item) => {
      results.push(
        new Promise((resolve, reject) => {
          postDataToS3(item.file, item.url).then(
            (res) => {
              resolve(res);
            },
            () => {
              postDataToS3(item.file, item.url).then(
                (res) => {
                  resolve(res);
                },
                () => {
                  reject(false);
                }
              );
            }
          );
        })
      );
    });
    Promise.all(results).then(
      (res) => {
        let count = 0;
        res.forEach((item) => {
          if (item) count++;
        });
        if (count === acceptedFiles.length) {
          setStep(2);
        } else {
          setStep(0);
        }
      },
      () => {
        setStep(0);
      }
    );
  };

  useEffect(() => {
    if (urlList.length === acceptedFiles.length && urlList.length > 0) {
      uploadFiles();
    }
  }, [urlList]);

  const checkFileExt = (fileName: string) => {
    let fileExt = fileName.split(".");
    if (fileExt[fileExt.length - 1] === "sol") {
      return true;
    }
    return false;
  };

  const getPreassignedURL = async (fileName: string, file: File) => {
    const { data } = await API.get<{ status: string; result: { url: string } }>(
      `${API_PATH.API_GET_PREASSIGNED_URL}?file_name=${fileName}`
    );
    return {
      url: data.result.url,
      name: fileName,
      file: file,
    };
  };

  const postDataToS3 = async (fileData: File, urlString: string) => {
    const { status } = await API.put(urlString, fileData, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    if (status === 200) {
      return true;
    }
    return false;
  };

  const startFileScan = async () => {
    let urlData = urlList.map((item) => item.url);
    await API.post(API_PATH.API_PROJECT_SCAN, {
      file_urls: urlData,
      project_name: name,
      project_visibility: "public",
      project_type: "new",
    });
    history.push("/projects");
  };

  return (
    <>
      {profileData && (
        <>
          <Text
            sx={{
              fontSize: "2xl",
              fontWeight: 600,
              mt: 6,
              textAlign: "center",
            }}
          >
            Upload contract
          </Text>

          <Text sx={{ color: "subtle", textAlign: "left", mb: 4 }}>
            Upload your Solidity files (.sol extension) as a project. Utilize
            the “Project Name” field to refer to your scan results in the
            “Projects” section.
          </Text>
          <Text sx={{ color: "subtle", textAlign: "left", mb: 2 }}>
            NOTE: Please follow the constraints below to avoid scan failure:
          </Text>
          <Text
            sx={{ color: "subtle", textAlign: "left", mb: 2, fontSize: "sm" }}
          >
            1. Files to be uploaded should be Solidity(.sol) files, preferably
            compiled successfully. Incorrect syntax might render incorrect
            results.
          </Text>
          <Text
            sx={{ color: "subtle", textAlign: "left", mb: 6, fontSize: "sm" }}
          >
            2. A Maximum number of files that can be uploaded is 5 and file size
            cannot exceed 5MB.
          </Text>

          <Flex
            flexDir={"column"}
            justifyContent={"flex-start"}
            alignItems="flex-start"
            my={8}
            width={"100%"}
          >
            <VStack alignItems={"flex-start"} width="100%">
              <Text mb={0} fontSize="sm">
                Project Name
              </Text>

              <InputGroup mt={0} alignItems="center">
                <InputLeftElement
                  height="48px"
                  children={<Icon as={AiOutlineProject} color="gray.300" />}
                />
                <Input
                  isRequired
                  placeholder="Enter Project Name"
                  variant="brand"
                  size="lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </VStack>

            {step === 0 ? (
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {/* {error ? (
                  <>
                    <ScanErrorIcon size={80} />
                    <p style={{ marginTop: "20px" }}>
                      {errorMsg}. Please
                      <span
                        onClick={() => setError(false)}
                        style={{ color: "#3300FF" }}
                      >
                        {" "}
                        try again
                      </span>
                    </p>
                  </>
                ) : (
                  <> */}
                <UploadIcon size={80} />
                <p style={{ marginTop: "20px" }}>
                  Drag and drop or{" "}
                  <span style={{ color: "#3300FF" }}> Browse</span> to upload
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    marginBottom: "20px",
                    color: "#D3D3D3",
                  }}
                >
                  You can upload upto 5 files with extension ".sol" whose size
                  must not exceed above 5 MB
                </p>
                <p style={{ fontSize: "15px", color: "#FF2400" }}>{errorMsg}</p>
                {/* </>
                )} */}
              </div>
            ) : step === 1 ? (
              <Box
                sx={{ w: "100%", borderRadius: "20px", p: 10, my: 2 }}
                justifyContent="flex-start"
                alignItems={"flex-start"}
                background={"#FFFFFF"}
                border={"1.5px dashed #D6D6D6"}
              >
                <HStack justify={"space-between"}>
                  <HStack align={"flex-end"} my={4}>
                    <SolidityFileIcon size={25} />
                    <Text fontSize={"14px"}>{acceptedFiles[0].name}</Text>
                    <Text fontSize={"15px"}>|</Text>
                    <Text fontSize={"10px"} color={"gray.500"}>
                      0{acceptedFiles.length} files
                    </Text>
                  </HStack>
                  <CloseButton
                    onClick={() => {
                      setStep(0);
                      setUrlList([]);
                    }}
                  />
                </HStack>
                <Progress variant={"blue"} size="xs" isIndeterminate />
                <HStack mt={4} justify={"space-between"}>
                  <Text color={"gray.500"}>Uploading...</Text>
                  <Spinner color={"gray.500"} />
                </HStack>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    w: "100%",
                    borderRadius: "20px",
                    px: 20,
                    pt: 2,
                    pb: 10,
                    my: 2,
                  }}
                  justifyContent="flex-start"
                  alignItems={"flex-start"}
                  background={"#FFFFFF"}
                  border={"1.5px dashed #D6D6D6"}
                  maxH="300px"
                  overflowY={"scroll"}
                >
                  <VStack h="fit-content" spacing={2} width="100%">
                    <HStack width="100%" justify={"flex-end"}>
                      <CloseButton
                        onClick={() => {
                          setStep(0);
                          setUrlList([]);
                        }}
                      />
                    </HStack>
                    <HStack>
                      <ProjectIcon size={30} />
                      <Text>{name}</Text>
                    </HStack>
                    <Text fontSize={"10px"} color={"gray.500"}>
                      0{acceptedFiles.length} files
                    </Text>
                    {acceptedFiles.map((file) => (
                      <Box
                        width={"100%"}
                        justifyContent={"center"}
                        alignItems="center"
                        textAlign={"center"}
                        fontSize="13px"
                        borderRadius={4}
                        color="gray.500"
                        backgroundColor="#F8FAFC"
                        py={3}
                      >
                        {file.name}
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </>
            )}

            <Button
              type="submit"
              variant="brand"
              mt={4}
              w="100%"
              disabled={
                step < 2 ||
                name === "" ||
                (profileData.actions_supported &&
                  !profileData.actions_supported.file_scan)
              }
              onClick={startFileScan}
            >
              Start Scan
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};

export default Home;
