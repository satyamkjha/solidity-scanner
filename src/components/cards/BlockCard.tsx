import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button, 
  Progress,
  Tooltip,
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
} from "helpers/helperFunction";
import { scanStatesLabel } from "common/values";

const BlockCard: React.FC<{
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
    _updated,
    contract_address,
    contractname,
    contract_platform,
    multi_file_scan_status,
    multi_file_scan_summary,
    project_id,
  } = scan.scan_details;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const toast = useToast();
  const assetsURL = getAssetsURL();
  const history = useHistory();
  const [hover, setHover] = useState(false);

  const deleteProject = async () => {
    const { data } = await API.delete(API_PATH.API_DELETE_BLOCK, {
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
      maxWidth="500px"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      my={4}
      mx={4}
      boxSizing={"border-box"}
      w={["90%", "95%", "45%", "320px"]}
      onClick={() => {
        if (multi_file_scan_status === "scan_done") {
          history.push(`/blocks/${scan_id}/${project_id}`);
        }
      }}
    >
      <HStack
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        py={5}
      >
        <Box w="80%" px={5}>
          <Tooltip label={contractname} fontSize="md" placement="top-start">
            <Text sx={{ w: "100%", color: "subtle" }} isTruncated>
              {contractname}
            </Text>
          </Tooltip>
          <Text sx={{ w: "100%" }} isTruncated>
            {project_name || contract_address}
          </Text>
          <Text sx={{ fontSize: "xs", color: "subtle" }}>
            Last scanned {timeSince(new Date(_updated))}
          </Text>
        </Box>
        {hover && !isViewer && (
          <Menu placement={"bottom-end"}>
            <MenuButton
              zIndex={10}
              as={IconButton}
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
      {multi_file_scan_status === "scan_done" ? (
        <Flex
          width={"100%"}
          flexDir="column"
          height="fit-content"
          px={3}
          py={5}
        >
          <Flex
            width={"100%"}
            flexDir="row"
            justifyContent={"space-between"}
            height="fit-content"
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
            <Image
              mx={3}
              src={`${assetsURL}blockscan/${contract_platform}.svg`}
              alt={contract_platform}
              h={"40px"}
              w={"40px"}
              // onLoad={() => setIconCounter((currentCount) => currentCount + 1)}
            />
          </Flex>
          <VulnerabilityDistribution
            critical={
              multi_file_scan_summary?.issue_severity_distribution?.critical ||
              0
            }
            high={
              multi_file_scan_summary?.issue_severity_distribution?.high || 0
            }
            medium={
              multi_file_scan_summary?.issue_severity_distribution?.medium || 0
            }
            low={multi_file_scan_summary?.issue_severity_distribution?.low || 0}
            informational={
              multi_file_scan_summary?.issue_severity_distribution
                ?.informational || 0
            }
            gas={multi_file_scan_summary?.issue_severity_distribution.gas || 0}
          />
        </Flex>
      ) : multi_file_scan_status === "scanning" ||
        multi_file_scan_status === "initialised" ? (
        <Box p={5} w="100%">
          <Flex
            sx={{
              display: "inline-flex",
              bg: "bg.subtle",
              alignItems: "center",
              p: 2,
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
              {multi_file_scan_status.length > 25
                ? getTrimmedScanMessage(multi_file_scan_status)
                : snakeToNormal(multi_file_scan_status)}
            </Heading>
          </HStack>
          <Text sx={{ fontSize: "xs", color: "#4E5D78" }}>
            {multi_file_scan_status.length > 25
              ? multi_file_scan_status
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

export default BlockCard;
