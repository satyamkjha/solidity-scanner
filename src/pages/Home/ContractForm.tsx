import React, { useState, useRef } from "react";
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
  VStack,
  useToast,
  Box,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import API from "helpers/api";
import { useSupportedChains } from "hooks/useSupportedPlatforms";
import { checkContractAddress, getAssetsURL } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import { Profile } from "common/types";
import Loader from "components/styled-components/Loader";
import { useUserRole } from "hooks/useUserRole";
import { infographicsData } from "common/values";
import { AddProjectFormInfographics } from "./AddProjectFormInfographics";
import { BlockchainSelector } from "components/common/BlockchainSelector";
import { useWebSocket } from "hooks/useWebhookData";
import { useConfig } from "hooks/useConfig";
import InsufficientLocModal from "components/modals/scans/InsufficientLocModal";
import ProjectsExceededModal from "components/modals/scans/ProjectsExceededModal";

const ContractForm: React.FC<{
  profileData: Profile;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  changeView: boolean;
  onClose: any;
}> = ({ step, setStep, profileData, changeView, onClose }) => {
  const config: any = useConfig();
  const contractAddressRef = useRef<HTMLInputElement>(null);
  const [contractAddress, setContractAddress] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [platform, setPlatform] = React.useState("");
  const [chain, setChain] = React.useState<{
    label: string;
    value: string;
    icon: string;
    website: string;
  } | null>(null);

  const [isDesktopView] = useMediaQuery("(min-width: 1920px)");
  const { sendMessage } = useWebSocket();
  const queryClient = useQueryClient();
  const toast = useToast();
  const history = useHistory();
  const { data: supportedChains } = useSupportedChains();
  const [blockchainSelectorError, setBlockchainSelectorError] = useState("");
  const assetsURL = getAssetsURL();

  const { isOpen, onClose: closeModal, onOpen } = useDisclosure();
  const [projectsExceededModal, setProjectsExceededModal] = useState(false);
  const minLOCReq = process.env.REACT_APP_MIN_LOC_REQ;

  const onSubmit = async () => {
    if (profileData.current_package === "trial") {
      if (profileData.trial_projects_remaining === 0) {
        setProjectsExceededModal(true);
        return;
      }
    } else if (
      profileData.credit_system === "loc" &&
      profileData.loc_remaining < parseInt(minLOCReq || "10")
    ) {
      onOpen();
      return;
    }
    if (config && config.REACT_APP_FEATURE_GATE_CONFIG.websockets_enabled) {
      try {
        if (
          platform !== "buildbear" &&
          !checkContractAddress(contractAddress)
        ) {
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
                sendMessage({
                  type: "block_scan_initiate",
                  body: req,
                });
                queryClient.invalidateQueries("profile");
                history.push("/projects");
                setIsLoading(false);
                onClose();
              }
            } else {
              setIsLoading(false);
            }
          },
          (err) => {
            setIsLoading(false);
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (
          platform !== "buildbear" &&
          !checkContractAddress(contractAddress)
        ) {
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
                    onClose();
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
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onSelectorClose = () => {
    if (contractAddressRef && contractAddressRef.current) {
      contractAddressRef.current.focus();
    }
  };

  const { role } = useUserRole();
  let isViewer = role === "viewer";

  return (
    <Flex
      flexDir="column"
      px={2}
      w="100%"
      h={["90vh", "90vh", "78vh"]}
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
              imgUrl={`${assetsURL}homepage_infographics/block.svg`}
              instructions={infographicsData["block"]}
            />
          </Box>
        ) : step === 1 ? (
          <>
            {supportedChains && (
              <Stack spacing={6} mt={5} width={"100%"}>
                <BlockchainSelector
                  onSelectorClose={onSelectorClose}
                  menuPlacement="bottom-start"
                  view="homepage"
                  theme="light"
                  chain={chain}
                  node_id={nodeId}
                  setNodeId={setNodeId}
                  setChain={setChain}
                  setPlatform={setPlatform}
                  platform={platform}
                  blockchainSelectorError={blockchainSelectorError}
                  setBlockchainSelectorError={setBlockchainSelectorError}
                />
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
                      ref={contractAddressRef}
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
          ((profileData.credit_system === "loc"
            ? false
            : profileData?.credits === 0) ||
            isViewer ||
            contractAddress.length < 1)
        }
      >
        {step === 1 ? "Start Scan" : "Proceed"}
      </Button>
      {isOpen && (
        <InsufficientLocModal
          open={isOpen}
          closeModal={closeModal}
          scanDetails={{
            contract_address: contractAddress,
            contract_platform: platform,
            contract_chain: chain?.value,
            loc: "insufficient",
            scan_type: "block",
          }}
        />
      )}
      {projectsExceededModal && (
        <ProjectsExceededModal
          open={projectsExceededModal}
          closeModal={() => setProjectsExceededModal(false)}
          scanDetails={{
            contract_address: contractAddress,
            contract_platform: platform,
            contract_chain: chain?.value,
            scan_type: "block",
          }}
        />
      )}
    </Flex>
  );
};

export default ContractForm;
