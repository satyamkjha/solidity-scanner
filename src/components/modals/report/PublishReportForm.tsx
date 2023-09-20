import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Icon,
  Button,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Switch as SwitchComp,
  useMediaQuery,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { AiOutlineProject } from "react-icons/ai";
import { FaInternetExplorer, FaBuilding, FaEnvelope } from "react-icons/fa";
import { Scan } from "common/types";
import { formattedDate } from "common/functions";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const PublishReportForm: React.FC<{
  type: "project" | "block";
  reportType: "self_published" | "verified" | "assisted" | undefined;
  projectId: string;
  lastTimeUpdate: string;
  scanData: {
    scan_report: Scan;
    is_latest_scan: boolean;
    webhook_enabled?: boolean;
  };
  onPublishReport: any;
}> = ({
  type,
  reportType,
  projectId,
  lastTimeUpdate,
  scanData,
  onPublishReport,
}) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  const assetsURL = getAssetsURL();

  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [commitHash, setCommitHash] = useState("");

  const [datePublished, setDatePublished] = useState("");

  const [pubName, setPubName] = useState("");
  const [nameSwitch, setNameSwitch] = useState(true);
  const [pubOrg, setPubOrg] = useState("");
  const [orgSwitch, setOrgSwitch] = useState(true);
  const [pubWeb, setPubWeb] = useState("");
  const [webSwitch, setWebSwitch] = useState(true);
  const [pubEmail, setPubEmail] = useState("");
  const [emailSwitch, setEmailSwitch] = useState(true);
  const [publishInfoSwitch, setPublishInfoSwitch] = useState(true);

  useEffect(() => {
    if (scanData) {
      if (scanData.scan_report.reporting_status === "report_generated") {
        if (type === "project") {
          setProjectName(scanData.scan_report.project_name);
          setRepoUrl(scanData.scan_report.project_url);
        } else {
        }

        const d = new Date();
        setDatePublished(formattedDate(d, "long"));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanData]);

  const publishReport = async () => {
    const { data } = await API.post(API_PATH.API_PUBLISH_REPORT, {
      project_type: type,
      project_id: projectId,
      report_id: scanData?.scan_report.latest_report_id,
      report_type: reportType,
      additional_details: {
        report_owner: {
          value: pubName,
          is_public: isDesktopView ? nameSwitch : publishInfoSwitch,
        },
        website: {
          value: pubWeb,
          is_public: isDesktopView ? webSwitch : publishInfoSwitch,
        },
        organization: {
          value: pubOrg,
          is_public: isDesktopView ? orgSwitch : publishInfoSwitch,
        },
        contact_email: {
          value: pubEmail,
          is_public: isDesktopView ? emailSwitch : publishInfoSwitch,
        },
      },
    });

    if (data.status === "success") {
      onPublishReport(data.status);
    }
  };

  return (
    <HStack w={"100%"} spacing={10} alignItems={"flex-start"}>
      <Flex w={"50%"} flexDir={"column"}>
        <VStack zIndex={"10"} w={["100%"]} spacing={6}>
          {!isDesktopView && (
            <HStack my={6}>
              <Text>Private</Text>
              <SwitchComp
                isChecked={publishInfoSwitch}
                onChange={() => {
                  setPublishInfoSwitch(!publishInfoSwitch);
                }}
                size="lg"
                variant="brand"
              />
              <Text>Public</Text>
            </HStack>
          )}
          <HStack
            alignItems="center"
            spacing={3}
            px={5}
            w={"100%"}
            bgColor={"white"}
            border={"2px solid #EDF2F7"}
            borderRadius={"16px"}
            _hover={{
              borderColor: "#52FF00",
              boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
            }}
          >
            <InputGroup alignItems="center">
              <InputLeftElement
                height="48px"
                children={<Icon as={AiOutlineProject} color="gray.300" />}
              />
              <Input
                isRequired
                type="text"
                placeholder="Publisher's name"
                border={"0px solid #FFFFFF"}
                _focus={{
                  border: "0px solid #FFFFFF",
                }}
                fontSize={"15px"}
                fontWeight={500}
                size="lg"
                value={pubName}
                onChange={(e) => {
                  setPubName(e.target.value);
                }}
              />
            </InputGroup>
            {isDesktopView && (
              <>
                <SwitchComp
                  isChecked={nameSwitch}
                  onChange={() => {
                    setNameSwitch(!nameSwitch);
                  }}
                  size="lg"
                  variant={nameSwitch ? "brand" : "disabled"}
                />
              </>
            )}
          </HStack>

          <HStack
            alignItems="center"
            spacing={3}
            px={5}
            w={"100%"}
            bgColor={"white"}
            border={"2px solid #EDF2F7"}
            borderRadius={"16px"}
            _hover={{
              borderColor: "#52FF00",
              boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
            }}
          >
            <InputGroup alignItems="center">
              <InputLeftElement
                height="48px"
                children={<Icon as={FaEnvelope} color="gray.300" />}
              />
              <Input
                isRequired
                type="email"
                placeholder="Publisher's Email"
                size="lg"
                border={"0px solid #FFFFFF"}
                _focus={{
                  border: "0px solid #FFFFFF",
                }}
                fontSize={"15px"}
                fontWeight={500}
                value={pubEmail}
                onChange={(e) => {
                  setPubEmail(e.target.value);
                }}
              />
            </InputGroup>
            {isDesktopView && (
              <>
                <SwitchComp
                  isChecked={emailSwitch}
                  onChange={() => {
                    setEmailSwitch(!emailSwitch);
                  }}
                  size="lg"
                  variant={emailSwitch ? "brand" : "disabled"}
                />
              </>
            )}
          </HStack>

          <HStack
            alignItems="center"
            spacing={3}
            px={5}
            w={"100%"}
            bgColor={"white"}
            border={"2px solid #EDF2F7"}
            borderRadius={"16px"}
            _hover={{
              borderColor: "#52FF00",
              boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
            }}
          >
            <InputGroup alignItems="center">
              <InputLeftElement
                height="48px"
                children={<Icon as={FaInternetExplorer} color="gray.300" />}
              />
              <Input
                isRequired
                type="url"
                placeholder="Link to the Publisher's Website"
                _focus={{
                  border: "0px solid #FFFFFF",
                }}
                border={"0px solid #FFFFFF"}
                fontSize={"15px"}
                fontWeight={500}
                size="lg"
                value={pubWeb}
                onChange={(e) => {
                  setPubWeb(e.target.value);
                }}
              />
            </InputGroup>
            {isDesktopView && (
              <>
                <SwitchComp
                  isChecked={webSwitch}
                  onChange={() => {
                    setWebSwitch(!webSwitch);
                  }}
                  size="lg"
                  variant={webSwitch ? "brand" : "disabled"}
                />
              </>
            )}
          </HStack>

          <HStack
            alignItems="center"
            spacing={3}
            px={5}
            w={"100%"}
            bgColor={"white"}
            border={"2px solid #EDF2F7"}
            borderRadius={"16px"}
            _hover={{
              borderColor: "#52FF00",
              boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
            }}
          >
            <InputGroup alignItems="center">
              <InputLeftElement
                height="48px"
                children={<Icon as={FaBuilding} color="gray.300" />}
              />
              <Input
                isRequired
                type="text"
                placeholder="Publisher's Organization"
                size="lg"
                border={"0px solid #FFFFFF"}
                _focus={{
                  border: "0px solid #FFFFFF",
                }}
                fontSize={"15px"}
                fontWeight={500}
                value={pubOrg}
                onChange={(e) => {
                  setPubOrg(e.target.value);
                }}
              />
            </InputGroup>
            {isDesktopView && (
              <>
                <SwitchComp
                  isChecked={orgSwitch}
                  onChange={() => {
                    setOrgSwitch(!orgSwitch);
                  }}
                  size="lg"
                  variant={orgSwitch ? "brand" : "disabled"}
                />
              </>
            )}
          </HStack>
        </VStack>

        <Button w={"220px"} variant={"brand"} onClick={publishReport}>
          Proceed to Pay
        </Button>
      </Flex>

      <Flex w={"50%"} flexDir={"column"} bg={"#FAFAFA"} px={6} py={8}>
        {type === "block" ? (
          <>
            <Box>
              <Text color={"#B0B7C3"}>Contract Name</Text>
              <Text fontWeight={600}>{scanData?.scan_report.contractname}</Text>
            </Box>
            <Box mt={4}>
              <Text color={"#B0B7C3"}>Contract Address</Text>
              <Text fontWeight={600}>
                {scanData?.scan_report.contract_address}
              </Text>
            </Box>
            <Box mt={4}>
              <Text color={"#B0B7C3"}>Contract Platform</Text>
              <Text fontWeight={600}>
                {scanData?.scan_report.contract_platform}
              </Text>
            </Box>
            <Box mt={4}>
              <Text color={"#B0B7C3"}>Contract Chain</Text>
              <Text fontWeight={600}>
                {scanData?.scan_report.contract_chain}
              </Text>
            </Box>
            <Box mt={4}>
              <Text color={"#B0B7C3"}>Contract URL</Text>
              <Text fontWeight={600}>{scanData?.scan_report.contract_url}</Text>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Text color={"#B0B7C3"}>Project Name</Text>
              <Text fontWeight={600}>{projectName}</Text>
            </Box>
            <Box mt={4}>
              <Text color={"#B0B7C3"}>Link to the repository</Text>
              <Text fontWeight={600}>{repoUrl}</Text>
            </Box>
          </>
        )}
        <Box mt={4}>
          <Text color={"#B0B7C3"}>Latest Report Update</Text>
          <Text fontWeight={600}>{lastTimeUpdate}</Text>
        </Box>
        <Box mt={4}>
          <Text color={"#B0B7C3"}>Date Published</Text>
          <Text fontWeight={600}>{datePublished}</Text>
        </Box>
      </Flex>
    </HStack>
  );
};

export default PublishReportForm;
