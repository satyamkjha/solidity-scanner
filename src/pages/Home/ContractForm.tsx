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
  useToast,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import API from "helpers/api";
import { useSupportedChains } from "hooks/useSupportedPlatforms";
import {
  getFeatureGateConfig,
  checkContractAddress,
  getAssetsURL,
} from "helpers/helperFunction";
import Select from "react-select";
import { API_PATH } from "helpers/routeManager";
import { Profile } from "common/types";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { customStylesForReactSelect } from "common/stylesForCustomSelect";
import Loader from "components/styled-components/Loader";
import { useUserRole } from "hooks/useUserRole";
import { contractChain, platforms, infographicsData } from "common/values";
import { AddProjectFormInfographics } from "./AddProjectFormInfographics";

const ContractForm: React.FC<{
  profileData: Profile;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  changeView: boolean;
}> = ({ step, setStep, profileData, changeView }) => {
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
  const [isDesktopView] = useMediaQuery("(min-width: 1920px)");

  const queryClient = useQueryClient();
  const toast = useToast();
  const history = useHistory();
  const { data: supportedChains } = useSupportedChains();

  const platform_supported = getFeatureGateConfig().platform_supported;
  const assetsURL = getAssetsURL();
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
                queryClient.invalidateQueries([
                  "all_scans",
                  {
                    pageNo: 1,
                    perPageCount: isDesktopView ? 20 : 12,
                  },
                ]);
                queryClient.invalidateQueries("scan_list");
                queryClient.invalidateQueries("profile");
                history.push("/projects");
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

  const { role } = useUserRole();
  let isViewer = role === "viewer";

  return (
    <Flex
      flexDir="column"
      px={2}
      h={["90vh", "90vh", "75vh"]}
      justifyContent={"space-between"}
      alignItems="center"
      borderRadius={20}
      opacity={isViewer ? 0.5 : 1}
    >
      <Flex
        flexDir="column"
        justifyContent="flex-start"
        alignItems="center"
        w="100%"
        h="calc(100% - 80px)"
      >
        <Text
          w="100%"
          sx={{
            fontSize: ["xl", "xl", "2xl"],
            fontWeight: 600,
            textAlign: changeView ? "left" : "center",
            mb: 4,
          }}
        >
          Load contract
        </Text>
        {step !== 0 && (
          <>
            <Text
              w="100%"
              sx={{ fontSize: "sm", color: "subtle", textAlign: "left", mb: 2 }}
            >
              Provide the address of your smart contract deployed on the
              supported EVM chains.
            </Text>
            <Text
              sx={{
                fontSize: "sm",
                color: "subtle",
                textAlign: "left",
                mb: 4,
              }}
            >
              For further instructions on how to start a scan please watch our
              tutorials available on{" "}
              <Box
                as="span"
                color="accent"
                onClick={() =>
                  window.open("https://docs.solidityscan.com/", "_blank")
                }
              >
                {" "}
                docs.solidityscan.com
              </Box>
              .
            </Text>
          </>
        )}

        {step === 0 ? (
          <Box w="100%" h="calc(100% - 50px)">
            <AddProjectFormInfographics
              imgUrl={`${assetsURL}homepage_infographics/verified_contract.svg`}
              instructions={infographicsData["verified_contract"]}
            />
          </Box>
        ) : step === 1 ? (
          <>
            {supportedChains && (
              <Stack spacing={6} mt={5} width={"100%"}>
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
                        children={
                          <Icon as={AiOutlineProject} color="gray.300" />
                        }
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
              </Stack>
            )}
          </>
        ) : (
          <></>
        )}
      </Flex>
      <Button
        w="100%"
        type="submit"
        variant="brand"
        onClick={() => {
          if (step === 0) {
            setStep(1);
          } else {
            onSubmit();
          }
        }}
        isLoading={isLoading}
        spinner={<Loader color={"#3300FF"} size={25} />}
        isDisabled={
          step === 1 &&
          (profileData?.credits === 0 || isViewer || contractAddress.length < 1)
        }
      >
        {step === 1 ? "Start Scan" : "Proceed"}
      </Button>
    </Flex>
  );
};

export default ContractForm;
