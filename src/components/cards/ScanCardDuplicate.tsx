import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  Progress,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useToast,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { LogoIcon } from "components/icons";
import Score from "components/score";
import VulnerabilityDistribution from "components/vulnDistribution";
import API from "helpers/api";
import { ScanObj } from "common/types";
import { timeSince } from "common/functions";
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { API_PATH } from "helpers/routeManager";
import {
  snakeToNormal,
  getTrimmedScanMessage,
  getAssetsURL,
  getProjectType,
  getContractBlockChainLogoUrl,
} from "helpers/helperFunction";
import { scanStatesLabel } from "common/values";

const ScanCardDuplicate: React.FC<{
  scan: ScanObj;
  // setIconCounter: Dispatch<SetStateAction<number>>;
  updateScanList: (project_id: string) => void;
  isViewer: boolean;
  scanIdsInScanning: string[];
  scanInProgress: {
    scanId: string;
    scanStatus: string;
  }[];
  // ssIconAnimation: any;
}> = ({
  scan,
  // setIconCounter,
  updateScanList,
  isViewer,
  scanIdsInScanning,
  scanInProgress,
  // ssIconAnimation,
}) => {
  const {
    project_name,
    scan_id,
    contract_address,
    contractname,
    contract_platform,
    multi_file_scan_status,
    scan_status,
    multi_file_scan_summary,
    project_id,
  } = scan.scan_details;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const toast = useToast();
  const assetsURL = getAssetsURL();
  const history = useHistory();
  const [hover, setHover] = useState(false);

  const deleteProject = async () => {
    const url =
      scan.scan_type === "project"
        ? API_PATH.API_DELETE_PROJECT
        : API_PATH.API_DELETE_BLOCK;
    const { data } = await API.delete(url, {
      data: {
        project_ids: [project_id],
      },
    });
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      toast({
        title: data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
    onClose();
    updateScanList(scan_id);
  };

  const [scanStatus, setScanStatus] = useState("");

  useEffect(() => {
    if (
      scanInProgress &&
      scanIdsInScanning &&
      scanIdsInScanning.includes(scan.scan_id)
    ) {
      const scanObj = scanInProgress.find(
        (item) => item.scanId === scan.scan_id
      );
      if (scanObj) setScanStatus(scanObj.scanStatus);
      else setScanStatus("initialised");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanIdsInScanning, scanInProgress]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex
      sx={{
        cursor:
          multi_file_scan_status === "scan_done" ? "pointer" : "not-allowed",
        flexDir: "column",
        justifyContent: "space-between",
        h: "260px",
        borderRadius: 15,
        bg: "white",
        transition: "0.3s box-shadow",
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.05)",
        _hover: {
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
      maxWidth={["auto", "auto", "400px"]}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      boxSizing={"border-box"}
      w={["100%", "100%", "45%", "31%", "31%", "23%"]}
      onClick={() => {
        if (multi_file_scan_status === "scan_done") {
          history.push(`/${scan.scan_type}s/${project_id}/${scan_id}`);
        }
      }}
    >
      <Flex
        mt={4}
        w="100%"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box ml={4} w="70%">
          <Text isTruncated>{project_name || contract_address}</Text>
          <Text sx={{ fontSize: "xs", color: "subtle" }}>
            Last scanned{" "}
            {timeSince(new Date(`${scan.scan_details.scan_init_time}+0000`))}
          </Text>
        </Box>
        <HStack mr={hover ? 2 : 9} alignItems="flex-start">
          <Image
            mx={0}
            src={`${assetsURL}${
              scan.scan_type === "project"
                ? `icons/integrations/${getProjectType(
                    scan.scan_details.project_url || ""
                  )}`
                : getContractBlockChainLogoUrl(
                    scan.scan_details.contract_platform || "",
                    scan.scan_details.contract_chain || ""
                  )
            }.svg`}
            alt={contract_platform}
            h={"40px"}
            w={"40px"}
            // onLoad={() => setIconCounter((currentCount) => currentCount + 1)}
          />
          {hover && !isViewer && (
            <Menu placement={"bottom-end"}>
              <MenuButton
                zIndex={10}
                as={IconButton}
                w={5}
                minW={5}
                backgroundColor="#FFFFFF"
                _hover={{ backgroundColor: "#FFFFFF" }}
                _active={{ backgroundColor: "#FFFFFF" }}
                icon={<BsThreeDotsVertical />}
                aria-label="Options"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <MenuList
                sx={{
                  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                <MenuItem
                  _focus={{ backgroundColor: "#FFFFFF" }}
                  _hover={{ backgroundColor: "#FFFFFF" }}
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                >
                  Delete Project
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
      {multi_file_scan_status === "scan_done" ? (
        <Flex width={"95%"} flexDir="column" height="fit-content" py={5}>
          <Flex
            width={"100%"}
            flexDir="row"
            justifyContent={"flex-start"}
            height="fit-content"
            ml={2}
            mb={7}
          >
            <Score
              score={
                multi_file_scan_summary?.score_v2 ||
                (parseFloat(multi_file_scan_summary?.score) * 20)
                  .toFixed(2)
                  .toString() ||
                "0"
              }
            />
          </Flex>
          <VulnerabilityDistribution
            issueSeverityDistribution={{
              critical:
                multi_file_scan_summary?.issue_severity_distribution
                  ?.critical || 0,
              high:
                multi_file_scan_summary?.issue_severity_distribution?.high || 0,
              medium:
                multi_file_scan_summary?.issue_severity_distribution?.medium ||
                0,
              low:
                multi_file_scan_summary?.issue_severity_distribution?.low || 0,
              informational:
                multi_file_scan_summary?.issue_severity_distribution
                  ?.informational || 0,
              gas:
                multi_file_scan_summary?.issue_severity_distribution.gas || 0,
            }}
            view={"scans"}
          />
        </Flex>
      ) : ["scanning", "initialised", "downloaded"].includes(scan_status) ? (
        <Box mb={10} p={5} w="100%">
          <Flex
            sx={{
              display: "inline-flex",

              alignItems: "center",

              mb: 2,
              borderRadius: 15,
            }}
          >
            {/* {ssIconAnimation && (
                <Lottie
                  style={{
                    height: "30px",
                    width: "30px",
                  }}
                  animationData={ssIconAnimation}
                />
              )} */}
            <LogoIcon size={15} />
            <Text mx={2} fontSize="sm">
              {scanStatesLabel[scanStatus] || scanStatesLabel["scanning"]}
            </Text>
          </Flex>
          <Progress value={20} isIndeterminate size="xs" />
        </Box>
      ) : (
        <Box
          sx={{
            p: 3,
            m: 3,
            h: "fit-content",
            borderRadius: 5,
            backgroundColor: "#FCFCFF",
          }}
        >
          <HStack mb={2}>
            <WarningIcon color="#FF5630" />
            <Heading sx={{ fontSize: "sm", color: "#FF5630" }}>
              {scan_status.length > 25
                ? getTrimmedScanMessage(scan_status)
                : snakeToNormal(scan_status)}
            </Heading>
          </HStack>
          <Text sx={{ fontSize: "xs", color: "#4E5D78" }}>
            {scan_status.length > 25
              ? scan_status
              : scan.scan_details.scan_message ||
                "This scan has failed, lost credit will be reimbursed in a few minutes. Please contact support"}
          </Text>
        </Box>
      )}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <Box as="span" sx={{ fontWeight: 600 }}>
                {project_name || contractname}
              </Box>{" "}
              project ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef} py={6}>
                No, My bad
              </Button>
              <Button variant="brand" onClick={deleteProject} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default ScanCardDuplicate;
