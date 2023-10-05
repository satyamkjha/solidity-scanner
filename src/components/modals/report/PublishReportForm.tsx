import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Icon,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Switch as SwitchComp,
  useMediaQuery,
  Stack,
  Link,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import { FaInternetExplorer, FaBuilding, FaEnvelope } from "react-icons/fa";
import { Scan, Profile } from "common/types";
import { formattedDate } from "common/functions";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import StyledButton from "components/styled-components/StyledButton";

const PublishReportForm: React.FC<{
  type: "project" | "block";
  reportType: "self_published" | "verified" | "assisted" | undefined;
  projectId: string;
  profile: Profile;
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
  profile,
  lastTimeUpdate,
  scanData,
  onPublishReport,
}) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");

  const [next, setNext] = useState(false);
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
          scanData.scan_report.project_name &&
            setProjectName(scanData.scan_report.project_name);
          scanData.scan_report.project_url &&
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
    setIsLoading(true);
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
    setIsLoading(false);
    if (data.status === "success") {
      onPublishReport(data.status);
    }
  };

  return (
    <Stack
      w={"100%"}
      h={"100%"}
      spacing={10}
      alignItems={"flex-start"}
      direction={["column", "column", "column", "row"]}
    >
      <Flex
        w={["100%", "100%", "100%", "50%"]}
        h={"100%"}
        flexDir={"column"}
        alignItems={["center", "center", "center", "flex-start"]}
        display={[`${!next ? "none" : "flex"}`, null, null, "flex"]}
      >
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

        <StyledButton
          w={"220px"}
          mt={[10, 10, 10, "auto"]}
          variant={"brand"}
          isLoading={isLoading}
          onClick={publishReport}
        >
          {reportType === "self_published" &&
          ["pro", "custom"].includes(profile.current_package)
            ? "Publish Report"
            : "Proceed to Pay"}
        </StyledButton>
        <Link
          color={"accent"}
          mt={10}
          display={["flex", "flex", "flex", "none"]}
          onClick={() => setNext(false)}
        >
          Go Back
        </Link>
      </Flex>

      <Flex
        w={["100%", "100%", "100%", "50%"]}
        h={"100%"}
        flexDir={"column"}
        bg={"#FAFAFA"}
        borderRadius={"15px"}
        px={6}
        py={8}
        display={[`${next ? "none" : "flex"}`, null, null, "flex"]}
      >
        {type === "block" ? (
          <>
            <Box>
              <Text color={"#B0B7C3"} lineHeight={2}>
                Contract Name
              </Text>
              <Text fontWeight={600}>{scanData?.scan_report.contractname}</Text>
            </Box>
            <Box mt={5}>
              <Text color={"#B0B7C3"} lineHeight={2}>
                Contract Address
              </Text>
              <Text fontWeight={600}>
                {scanData?.scan_report.contract_address}
              </Text>
            </Box>
            <Box mt={5}>
              <Text color={"#B0B7C3"} lineHeight={2}>
                Contract Platform
              </Text>
              <Text fontWeight={600}>
                {scanData?.scan_report.contract_platform}
              </Text>
            </Box>
            <Box mt={5}>
              <Text color={"#B0B7C3"} lineHeight={2}>
                Contract Chain
              </Text>
              <Text fontWeight={600}>
                {scanData?.scan_report.contract_chain}
              </Text>
            </Box>
            <Box mt={5}>
              <Text color={"#B0B7C3"} lineHeight={2}>
                Contract URL
              </Text>
              <Text fontWeight={600}>{scanData?.scan_report.contract_url}</Text>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Text color={"#B0B7C3"} lineHeight={2}>
                Project Name
              </Text>
              <Text fontWeight={600}>{projectName}</Text>
            </Box>
            <Box mt={5}>
              <Text color={"#B0B7C3"} lineHeight={2}>
                Link to the repository
              </Text>
              <Text fontWeight={600}>{repoUrl}</Text>
            </Box>
          </>
        )}
        <Box mt={5}>
          <Text color={"#B0B7C3"} lineHeight={2}>
            Latest Report Update
          </Text>
          <Text fontWeight={600}>{lastTimeUpdate}</Text>
        </Box>
        <Box mt={5}>
          <Text color={"#B0B7C3"} lineHeight={2}>
            Date Published
          </Text>
          <Text fontWeight={600}>{datePublished}</Text>
        </Box>
        <StyledButton
          w={"220px"}
          mt={"auto"}
          variant={"brand"}
          display={["flex", "flex", "flex", "none"]}
          onClick={() => setNext(true)}
        >
          Proceed
        </StyledButton>
      </Flex>
    </Stack>
  );
};

export default PublishReportForm;
