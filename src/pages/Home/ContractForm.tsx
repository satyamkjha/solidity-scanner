import React, { useEffect, useState, useMemo } from "react";
import { useQueryClient } from "react-query";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { getRepoTree } from "hooks/getRepoTree";
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
import { getFeatureGateConfig, getAssetsURL } from "helpers/helperFunction";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { API_PATH } from "helpers/routeManager";
import ConfigSettings from "components/projectConfigSettings";
import InfoSettings from "components/projectInfoSettings";
import FolderSettings from "components/projectFolderSettings";
import { TreeItem, TreeItemUP } from "common/types";
import {
  getSkipFilePaths,
  restructureRepoTree,
  updateCheckedValue,
} from "helpers/fileStructure";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { customStylesForReactSelect } from "common/stylesForCustomSelect";

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
      label: "XDC - (xdc.blocksscan.io)",
      isDisabled: true,
    },
  ];

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
                queryClient.invalidateQueries("scan_list");
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
    <Flex
      flexDir="column"
      backgroundColor="#FCFCFC"
      px={7}
      py={5}
      justifyContent={"flex-start"}
      alignItems="center"
      borderRadius={20}
      border="1px solid #ECECEC"
    >
      <Text
        w="100%"
        sx={{
          fontSize: "xl",
          fontWeight: 600,
          textAlign: "left",
          mb: 2,
        }}
      >
        Load contract
      </Text>
      <Text
        w="100%"
        sx={{ fontSize: "sm", color: "subtle", textAlign: "left", mb: 4 }}
      >
        Provide the address of your smart contract deployed on the supported EVM
        chains. Your results will appear in the "Verified Contracts" tab.
      </Text>
      <Text
        w="100%"
        sx={{ fontSize: "sm", color: "subtle", textAlign: "left", mb: 2 }}
      >
        NOTE: Please follow the constraints below to avoid scan failure:
      </Text>
      <Text
        w="100%"
        sx={{ color: "subtle", textAlign: "left", mb: 2, fontSize: "xs" }}
      >
        1. Navigate to the explorer of the particular blockchain (Ethereum -
        Etherscan.io).
      </Text>
      <Text
        w="100%"
        sx={{ color: "subtle", textAlign: "left", mb: 4, fontSize: "xs" }}
      >
        2. Use the search bar to get your smart contract and check if the source
        code is verified in the "Contract" tab of the selected explorer.
      </Text>
      {supportedChains && (
        <Stack spacing={6} my={0} width={"100%"}>
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
              formatOptionLabel={FormatOptionLabelWithImage}
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
              styles={customStylesForReactSelect}
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
                formatOptionLabel={FormatOptionLabelWithImage}
                isSearchable={false}
                isDisabled={platform === ""}
                options={chainList}
                value={chain}
                placeholder="Select Contract Chain"
                styles={customStylesForReactSelect}
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
    </Flex>
  );
};

export default ContractForm;
