import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Text,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  FormControl,
  FormLabel,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import API from "helpers/api";
import { useSupportedChains } from "hooks/useSupportedPlatforms";
import {
  getFeatureGateConfig,
  checkContractAddress,
} from "helpers/helperFunction";
import Select from "react-select";
import { API_PATH } from "helpers/routeManager";
import { Profile } from "common/types";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { customStylesForReactSelect } from "common/stylesForCustomSelect";
import Loader from "components/styled-components/Loader";
import { useUserRole } from "hooks/useUserRole";
import { contractChain, platforms } from "common/values";

const ContractForm: React.FC<{
  profileData: Profile;
}> = ({ profileData }) => {
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
  const toast = useToast();
  const history = useHistory();
  const { data: supportedChains } = useSupportedChains();

  const platform_supported = getFeatureGateConfig().platform_supported;

  const onSubmit = async () => {
    if (platform !== "buildbear" && !checkContractAddress(contractAddress)) {
      toast({
        title: "Contract Adddress not Valid",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
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
                history.push("/scans");
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

  const role: string = useUserRole();
  let isViewer = role === "viewer";

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
      opacity={isViewer ? 0.5 : 1}
    >
      <Text
        w="100%"
        sx={{
          fontSize: ["xl", "xl", "2xl"],
          fontWeight: 600,
          textAlign: "left",
          mb: 4,
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
      <Divider color="gray.700" borderWidth="1px" mb={3} />
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
                disabled={isViewer}
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </InputGroup>
          </VStack>
          <FormControl id="contract_platform">
            <FormLabel fontSize="sm">Contract platform</FormLabel>
            <Select
              formatOptionLabel={FormatOptionLabelWithImage}
              options={platforms.map((item) => {
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
              isDisabled={isViewer}
              value={platforms.find((item) => platform === item.value)}
              styles={customStylesForReactSelect}
              onChange={(newValue: any) => {
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
                  disabled={isViewer}
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
                isDisabled={platform === "" || isViewer}
                options={chainList}
                value={chain}
                placeholder="Select Contract Chain"
                styles={customStylesForReactSelect}
                onChange={(newValue: any) => {
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
            spinner={<Loader color={"#3300FF"} size={25} />}
            isDisabled={
              profileData?.credits === 0 ||
              isViewer ||
              contractAddress.length < 1
            }
          >
            Start Scan
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default ContractForm;
