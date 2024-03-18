import { getAssetsURL } from "helpers/helperFunction";
import React, { useState, useContext, useEffect } from "react";
import { DetailResultContext } from "common/contexts";
import {
  Flex,
  VStack,
  Box,
  Text,
  Button,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import UpgradePackage from "components/upgradePackage";
import { DummyCode } from "./TrialWall";
import { RescanIcon } from "components/icons";
import ReScanTrialScanModal from "components/modals/scans/ReScanTrialScanModal";
import InsufficientLocModal from "components/modals/scans/InsufficientLocModal";
import { useUserRole } from "hooks/useUserRole";

export const RestartTrialScanView: React.FC<{
  type: "block" | "project";
  project_url?: string;
  contract_url?: string;
  contract_platform?: string;
  contract_address?: string;
  contract_chain?: string;
  project_name?: string;
}> = ({
  type,
  project_url,
  project_name,
  contract_url,
  contract_chain,
  contract_address,
  contract_platform,
}) => {
  const { profileData } = useUserRole();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const detailResultContextValue = useContext(DetailResultContext);
  const scanSummary = detailResultContextValue?.scanSummary;

  const onSubmit = () => {
    if (
      profileData &&
      scanSummary &&
      scanSummary.lines_analyzed_count > profileData?.loc_remaining
    ) {
      setOpen(true);
    } else {
      onOpen();
    }
  };

  return (
    <Flex
      w="100%"
      sx={{ flexDir: ["column", "column", "column"] }}
      position="relative"
      h="70vh"
      border="1px solid #DADADA"
      borderRadius={20}
      overflow="hidden"
    >
      <VStack
        borderRadius={20}
        w={"100%"}
        alignItems="flex-start"
        spacing={5}
        px={4}
      >
        <Box
          sx={{
            w: "100%",
            position: "sticky",
            top: 8,
          }}
        >
          <DummyCode />
        </Box>
      </VStack>

      <Flex
        w="100%"
        h="100%"
        borderRadius={20}
        position="absolute"
        sx={{
          backdropFilter: "blur(6px)",
        }}
        p={8}
        bg="rgba(255,255,255,0.3)"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          border="1px solid #DADADA"
          borderRadius={20}
        >
          <Flex
            w="100%"
            h="65%"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
          >
            <Text
              textAlign={"center"}
              fontWeight={700}
              fontSize="lg"
              color="black"
            >
              ReScan Project
            </Text>
            <Text
              mt={3}
              textAlign={"center"}
              w={["100%", "100%", "100%", "80%"]}
              fontWeight={300}
              fontSize="sm"
              color="detail"
            >
              This project was scanned during your trial period and only
              included gas optimization analysis To unlock the details of these
              vulnerabilities, consider rescanning your project.
            </Text>
            <Button onClick={onSubmit} mt={10} variant="brand" width="250px">
              Unlock Details
            </Button>
          </Flex>
          <Flex
            w="100%"
            h="35%"
            borderTop="1px solid #DADADA"
            alignItems="center"
            justifyContent="center"
            flexDir="row"
          >
            <VStack cursor="pointer" onClick={onSubmit} w="25%" spacing={2}>
              <RescanIcon size={80} />
              <Text
                fontFamily="monospace"
                textAlign={"center"}
                fontWeight={700}
                fontSize="md"
                color="#323B4B"
              >
                RESCAN
              </Text>
            </VStack>
            <Divider
              orientation="vertical"
              border="1px solid #DADADA"
              height="80%"
            />
            <VStack
              alignItems="flex-start"
              textAlign="left"
              w="75%"
              px={10}
              spacing={2}
            >
              <Text w={"100%"} fontWeight={700} fontSize="lg" color="black">
                Rescan Project
              </Text>
              <Text
                mt={3}
                w={"100%"}
                fontWeight={300}
                fontSize="sm"
                color="detail"
              >
                Rescan your project to leverage the full power of SolidityScan,
                your new plan provides comprehensive security analysis.
              </Text>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
      <ReScanTrialScanModal
        closeModal={onClose}
        open={isOpen}
        scanDetails={
          type === "project"
            ? {
                project_name,
                project_url,
                scan_type: type,
                loc: scanSummary?.lines_analyzed_count,
              }
            : {
                contract_url,
                contract_address,
                contract_chain,
                contract_platform,
                scan_type: type,
                loc: scanSummary?.lines_analyzed_count,
              }
        }
      />
      <InsufficientLocModal
        open={open}
        closeModal={() => setOpen(true)}
        scanDetails={
          type === "project"
            ? {
                project_name,
                project_url,
                scan_type: type,
                loc: scanSummary?.lines_analyzed_count,
              }
            : {
                contract_url,
                contract_address,
                contract_chain,
                contract_platform,
                scan_type: type,
                loc: scanSummary?.lines_analyzed_count,
              }
        }
      />
    </Flex>
  );
};
