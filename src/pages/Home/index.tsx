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
} from "@chakra-ui/react";
import { FaFileCode } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import {
  BlockCredit,
  ProjectIcon,
  ScanErrorIcon,
  SolidityFileIcon,
  UploadIcon,
} from "components/icons";
import API from "helpers/api";
import { useOverview } from "hooks/useOverview";
import { useProfile } from "hooks/useProfile";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { useSupportedChains } from "hooks/useSupportedPlatforms";
import { sentenceCapitalize } from "helpers/helperFunction";
import { useDropzone } from "react-dropzone";
import { url } from "inspector";
import Select from "react-select";
import { resolve } from "dns";
import { rejects } from "assert";

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

  const githubUrlRegex =
    /(http(s)?)(:(\/\/))((github.com)(\/)[\w@\:\-~]+(\/)[\w@\:\-~]+)(\.git)?/;

  const onSubmit = async ({
    project_url,
    project_name,
  }: ApplicationFormData) => {
    if (project_name.length === 0) {
      setNameError("Please enter a Project Name of less than 50 characters.");
      return;
    }
    if (project_name.length > 50) {
      setNameError("Project Name cannot exceed to more than 50 characters.");
      return;
    }
    let filteredUrlInput = githubUrlRegex.exec(project_url);
    if (!filteredUrlInput) {
      setLinkError("Please enter a valid Github repository link");
      return;
    }
    const filteredUrl = filteredUrlInput[0];

    setNameError(null);
    setLinkError(null);
    await API.post("/api-project-scan/", {
      project_url: filteredUrl,
      ...(project_name && project_name !== "" && { project_name }),
      project_type: "new",
      project_visibility: visibility ? "private" : "public",
    });
    queryClient.invalidateQueries("scans");
    queryClient.invalidateQueries("profile");

    history.push("/projects");
  };

  const [nameError, setNameError] = useState<null | string>(null);
  const [linkError, setLinkError] = useState<null | string>(null);

  const isGithubIntegrated =
    profileData?._integrations?.github?.status === "successful";
  return (
    <>
      {profileData && (
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

          <Text sx={{ color: "subtle", textAlign: "left", mb: 4 }}>
            Provide the address of your GitHub repository. Your results will
            appear in the “Projects” section.
          </Text>
          <Text sx={{ color: "subtle", textAlign: "left", mb: 2 }}>
            NOTE: Please verify the following to avoid scan failure:
          </Text>
          <Text
            sx={{ color: "subtle", textAlign: "left", mb: 2, fontSize: "sm" }}
          >
            1. Ensure the link is to a GitHub repository containing Solidity
            (.sol) files. It is recommended to use the HTTPS GitHub (.git)
            cloning link of the repository.
          </Text>
          <Text
            sx={{ color: "subtle", textAlign: "left", mb: 6, fontSize: "sm" }}
          >
            2. Verify if the repository is public, for private repositories,
            please integrate your GitHub from the Integrations tab.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Stack spacing={6} my={8} width={"100%"}>
              <VStack alignItems={"flex-start"}>
                <Text mb={0} fontSize="sm">
                  Project name
                </Text>
                <InputGroup alignItems="center">
                  <InputLeftElement
                    height="48px"
                    children={<Icon as={AiOutlineProject} color="gray.300" />}
                  />
                  <Input
                    placeholder="Project name"
                    variant={nameError ? "error" : "brand"}
                    size="lg"
                    {...register("project_name")}
                  />
                </InputGroup>
                <Text mb={0} color="#FF2400" fontSize="sm">
                  {nameError}
                </Text>
              </VStack>
              <VStack mb={5} alignItems={"flex-start"}>
                <Text mb={0} fontSize="sm">
                  Link to the Github repository
                </Text>
                <InputGroup alignItems="center" mb={4}>
                  <InputLeftElement
                    height="48px"
                    children={<Icon as={FaFileCode} color="gray.300" />}
                  />
                  <Input
                    isRequired
                    type="url"
                    placeholder="https://github.com/yourproject/project.git"
                    variant={linkError ? "error" : "brand"}
                    size="lg"
                    {...register("project_url", { required: true })}
                  />
                </InputGroup>
                <Text mb={0} color="#FF2400" fontSize="sm">
                  {linkError}
                </Text>
              </VStack>

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
                // isDisabled={
                //   // profileData.actions_supported
                //   //   ? !profileData.actions_supported.github_public
                //   //   : !isGithubIntegrated && visibility
                // }
                isLoading={formState.isSubmitting}
              >
                Start Scan
              </Button>
            </Stack>
          </form>
        </>
      )}
    </>
  );
};

type ContractFormData = {
  // contract_name: string;
  contract_address: string;
  // contract_platform: string;
};

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
  icon: string;
}> = ({ label, icon }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    {icon !== "" && (
      <Image h={"20px"} w={"20px"} mr={3} src={`/blockscan/${icon}.svg`} />
    )}
    <div>{label}</div>
  </div>
);

const ContractForm: React.FC = () => {
  const contractChain: {
    [key: string]: { label: string; value: string; icon: string }[];
  } = {
    etherscan: [
      { value: "mainnet", label: "Ethereum Mainnet", icon: "" },
      { value: "ropsten", label: "Ropsten Testnet", icon: "" },
      { value: "kovan", label: "Kovan Testnet", icon: "" },
      { value: "rinkeby", label: "Rinkeby Testnet", icon: "" },
      { value: "goerli", label: "Goerli Testnet", icon: "" },
    ],
    bscscan: [
      { value: "mainnet", label: "Bsc Mainnet", icon: "" },
      { value: "testnet", label: "Bsc Testnet", icon: "" },
    ],
    polygonscan: [
      { value: "mainnet", label: "Polygon Mainnet", icon: "" },
      { value: "testnet", label: "Polygon Testnet", icon: "" },
    ],
    avalanche: [
      { value: "mainnet", label: "Avalanche Mainnet", icon: "" },
      { value: "testnet", label: "Avalanche Fuji Testnet", icon: "" },
    ],
    fantom: [
      { value: "mainnet", label: "FTM Mainnet", icon: "" },
      { value: "testnet", label: "FTM Testnet", icon: "" },
    ],
    cronos: [
      { value: "mainnet", label: "Cronos Mainnet", icon: "" },
      { value: "testnet", label: "Cronos Testnet", icon: "" },
    ],
    celo: [
      { value: "mainnet", label: "Celo Mainnet", icon: "" },
      { value: "testnet", label: "Alfajores Testnet", icon: "" },
    ],
    aurora: [
      { value: "mainnet", label: "Aurora Mainnet", icon: "" },
      { value: "testnet", label: "Aurora Testnet", icon: "" },
    ],
    arbiscan: [
      { value: "mainnet", label: "Arbiscan Mainnet", icon: "" },
      { value: "goerli", label: "Arbiscan Goerli", icon: "" },
    ],
    reefscan: [
      { value: "mainnet", label: "ReefScan Mainnet", icon: "" },
      // { value: "testnet", label: "ReefScan Testnet", icon: "" },
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

  const [platform, setPlatform] = React.useState("");
  const [chain, setChain] = React.useState("");
  const [chainList, setChainList] = React.useState<
    { label: string; value: string; icon: string }[]
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
                formatOptionLabel={formatOptionLabel}
                options={options.map((item) => {
                  for (const chain in supportedChains) {
                    if (chain === item.value) {
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
                styles={customStyles}
                onChange={(newValue) => {
                  if (newValue) {
                    // setAction(newValue.value)
                    setPlatform(newValue.value);
                    if (supportedChains) {
                      setChainList(contractChain[newValue.value]);
                    }
                  }
                }}
              />
            </FormControl>
            <FormControl id="contract_chain">
              <FormLabel fontSize="sm">Contract Chain</FormLabel>
              <Select
                formatOptionLabel={formatOptionLabel}
                isDisabled={platform === ""}
                options={chainList}
                placeholder="Select Contract Chain"
                styles={customStyles}
                onChange={(newValue) => {
                  if (newValue) {
                    setChain(newValue.value);
                  }
                }}
              />
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
    borderRadius: 5,
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
          let r = new FileReader();
          r.readAsBinaryString(item.file);
          r.onload = () => {
            if (r.result) {
              postDataToS3(r.result, item.url).then(
                (res) => {
                  resolve(res);
                },
                () => {
                  postDataToS3(r.result, item.url).then(
                    (res) => {
                      resolve(res);
                    },
                    () => {
                      reject(false);
                    }
                  );
                }
              );
            } else {
              reject(false);
            }
          };
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
      `/api-get-presigned-url/?file_name=${fileName}`
    );
    return {
      url: data.result.url,
      name: fileName,
      file: file,
    };
    // let r = new FileReader();
    // r.onload = async function () {
    //   if (r.result) {
    //     let uploadResult = await postDataToS3(r.result, data.result.url);
    //     if (!uploadResult) {
    //       return "failed";
    //     }
    //   }
    // };
    // r.readAsBinaryString(file);
  };

  const postDataToS3 = async (
    fileData: string | ArrayBuffer,
    urlString: string
  ) => {
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
    await API.post("/api-project-scan/", {
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
                  height="300px"
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
