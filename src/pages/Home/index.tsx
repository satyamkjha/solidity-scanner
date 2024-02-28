import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { useOverview } from "hooks/useOverview";
import Loader from "components/styled-components/Loader";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getAssetsURL, getRecentQuickScan } from "helpers/helperFunction";
import VulnerabilityDistribution from "components/vulnDistribution";
import { useHistory } from "react-router-dom";
import { capitalize, importScan } from "common/functions";
import { BiPlug } from "react-icons/bi";
import { Profile } from "common/types";
import RecentScansList from "./RecentScansList";
import PlanCycleInfo from "pages/Billing/components/PlanCycleInfo";
import { useUserRole } from "hooks/useUserRole";
import { AddProject } from "components/common/AddProject";
import ImportScanModal from "components/modals/ImportScanModal";
import InsufficientLocModal from "components/modals/InsufficientLocModal";

const OverviewData: React.FC<{
  heading: number;
  subHeading: string;
  imgName: string;
}> = ({ heading, subHeading, imgName }) => {
  const assetsURL = getAssetsURL();

  return (
    <VStack
      borderRadius={10}
      bg="bg.subtle"
      h="100%"
      w="48%"
      p={2}
      align="center"
      spacing={1}
    >
      <Text sx={{ fontSize: "2xl", fontWeight: 700 }}>{heading}</Text>
      <Image
        height="46px"
        width="46px"
        src={`${assetsURL}common/${imgName}.svg`}
      />
      <Text
        sx={{
          fontSize: "sm",
          fontWeight: 600,
          lineHeight: "2",
          textAlign: "center",
          color: "gray.500",
        }}
      >
        {subHeading}
      </Text>
    </VStack>
  );
};

const AddProjectBox: React.FC<{ profileData: Profile }> = ({ profileData }) => {
  const [changeView] = useMediaQuery("(min-width: 550px)");

  return (
    <Flex
      width="100%"
      h={changeView ? "120px" : "fit-content"}
      borderRadius={10}
      border="1px solid #52FF00"
      flexDir={changeView ? "row" : "column"}
      justifyContent={changeView ? "space-between" : "flex-start"}
      alignItems={"center"}
      p={5}
      bg="white"
    >
      <VStack
        textAlign={changeView ? "left" : "center"}
        alignItems="flex-start"
        mb={changeView ? 0 : 5}
        w={changeView ? "calc(100% - 220px)" : "100%"}
      >
        <Text
          sx={{
            fontSize: ["lg", "lg", "xl"],
            fontWeight: 600,
            w: "100%",
          }}
        >
          Add Project
        </Text>
        <Text
          sx={{
            color: "subtle",
            mb: 2,
            fontSize: "sm",
          }}
        >
          Start your project's security journey effortlessly by linking to code
          repositories, contract addresses, or uploading your Solidity files.
        </Text>
      </VStack>
      <AddProject profileData={profileData} />
    </Flex>
  );
};

const Home: React.FC = () => {
  const { data } = useOverview();
  const { profileData } = useUserRole();
  const assetsURL = getAssetsURL();
  const history = useHistory();

  const [isDesktopView, changeVulnDistributionView] = useMediaQuery([
    "(min-width: 1100px)",
    "(min-width: 450px)",
  ]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [open, setOpen] = useState(false);
  const [importData, setImportData] = useState<any>();

  useEffect(() => {
    if (profileData) {
      const import_scan_details = getRecentQuickScan();
      if (import_scan_details && import_scan_details.loc !== null) {
        if (profileData.current_package === "trial") {
          importQuickScan(import_scan_details);
        } else {
          setImportData(import_scan_details);
          if (profileData.credit_system === "loc") {
            if (profileData.loc_remaining > import_scan_details.loc) {
              onOpen();
            } else {
              setOpen(true);
            }
          }
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const importQuickScan = async (import_scan_details: any) => {
    await importScan(import_scan_details);
    history.push("/projects");
  };

  const onImportPopupClose = () => {
    localStorage.removeItem("recent_scan_details");
    onClose();
  };

  const onInsufficientLocPopupClose = () => {
    localStorage.removeItem("recent_scan_details");
    setOpen(false);
  };

  return (
    <Flex
      sx={{
        width: "100%",
        height: "100%",
        flexDir: isDesktopView ? "row" : "column",
      }}
    >
      {data && profileData ? (
        <>
          <Flex
            sx={{
              w: isDesktopView ? "70%" : "100%",
              h: "fit-content",
              flexDir: "column",
              alignItems: "center",
              borderRadius: "20px",
              p: 4,
              mx: [0, 0, 2],
            }}
          >
            <AddProjectBox profileData={profileData} />
            <Flex
              width="100%"
              h={["fit-content", "fit-content", "150px"]}
              my={4}
              flexDir={["column", "column", "row"]}
              justifyContent={["flex-start", "flex-start", "space-between"]}
              alignItems={"center"}
            >
              <HStack
                h="100%"
                w={["100%", "100%", "260px"]}
                justify="space-between"
                spacing={0}
              >
                <OverviewData
                  heading={data.overview.total_lines_scanner}
                  subHeading={"Lines of code scanned"}
                  imgName={"lines_of_code"}
                />
                <OverviewData
                  heading={data.overview.total_projects_monitored}
                  subHeading={"Projects monitored"}
                  imgName={"monitored_projects"}
                />
              </HStack>
              <VStack
                h="100%"
                w={["100%", "100%", "calc(100% - 270px)"]}
                bg="bg.subtle"
                justify="space-between"
                borderRadius={10}
                mt={[4, 4, 0]}
                py={2}
                px={4}
              >
                <Flex
                  flexDirection={changeVulnDistributionView ? "row" : "column"}
                  justify={
                    changeVulnDistributionView ? "space-between" : "flex-start"
                  }
                  alignItems="center"
                  w="100%"
                  h="fit-content"
                >
                  <Text
                    sx={{
                      fontSize: "sm",
                      fontWeight: 600,
                      textAlign: "center",
                      color: "gray.500",
                    }}
                  >
                    Total Vulnerabilities
                  </Text>
                  <Text
                    my={changeVulnDistributionView ? 0 : 2}
                    sx={{ fontSize: "2xl", fontWeight: 700 }}
                  >
                    {data.overview.issue_count_total}
                  </Text>
                </Flex>
                <VulnerabilityDistribution
                  view="home"
                  size={changeVulnDistributionView ? "large" : "small"}
                  issueSeverityDistribution={{
                    critical: data.overview.issue_count_critical,
                    high: data.overview.issue_count_high,
                    medium: data.overview.issue_count_medium,
                    low: data.overview.issue_count_low,
                    informational: data.overview.issue_count_informational,
                    gas: data.overview.issue_count_gas,
                  }}
                />
              </VStack>
            </Flex>
            <RecentScansList />
          </Flex>
          <Flex
            sx={{
              w: isDesktopView ? "30%" : "100%",
              flexDir: "column",
              alignItems: ["center", "center", "center", "flex-start"],
            }}
            justifyContent="flex-start"
            mr={4}
            mt={3}
            px={isDesktopView ? 0 : 5}
          >
            <PlanCycleInfo
              planName={profileData.current_package}
              packageRechargeDate={profileData.package_recharge_date}
              packageValidity={profileData.package_validity}
              packageName={profileData.current_package}
              subscription={profileData.subscription}
            />
            <Flex
              justifyContent="flex-start"
              alignItems="center"
              p={3}
              flexDirection="column"
              bgColor="bg.subtle"
              w="100%"
              borderRadius={10}
              mt={5}
            >
              <HStack
                px={3}
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <Text
                  sx={{
                    fontSize: "md",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "gray.500",
                  }}
                >
                  Integrations
                </Text>

                <Button
                  variant="ghost"
                  color="accent"
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => history.push("/integrations")}
                >
                  View All
                </Button>
              </HStack>
              {profileData &&
                Object.keys(profileData._integrations).map((item) => (
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    p={5}
                    borderRadius={10}
                    bg="white"
                    mt={4}
                  >
                    <HStack spacing={2}>
                      <Image
                        height="35px"
                        width="35px"
                        src={`${assetsURL}icons/integrations/${item}.svg`}
                      />
                      <Text
                        sx={{
                          fontSize: "md",
                          fontWeight: 600,
                        }}
                      >
                        {capitalize(item)}
                      </Text>
                    </HStack>
                    {item === "jira" ? (
                      <Button
                        size="sm"
                        fontSize="sm"
                        variant="label"
                        color="#1DAAE2"
                        bgColor="#E7F8FF"
                      >
                        Coming Soon
                      </Button>
                    ) : profileData._integrations[item].status ===
                      "successful" ? (
                      <Button
                        size="sm"
                        fontSize="sm"
                        leftIcon={<BiPlug />}
                        variant="l abel"
                        color="#2C991A"
                        bgColor="#F0FFF5"
                      >
                        Connected
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        fontSize="sm"
                        variant="label"
                        color="#4E5D78"
                        onClick={() => history.push("/integrations")}
                      >
                        Connect
                      </Button>
                    )}
                  </HStack>
                ))}
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex
          sx={{
            w: "100%",
            h: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Flex>
      )}

      {importData ? (
        <ImportScanModal
          isOpen={isOpen}
          onClose={onImportPopupClose}
          scanDetails={importData}
          profileData={profileData}
        />
      ) : null}
      {importData ? (
        <InsufficientLocModal
          open={open}
          closeModal={onInsufficientLocPopupClose}
          scanDetails={{ ...importData, scan_type: "block" }}
          profileData={profileData}
        />
      ) : null}
    </Flex>
  );
};

export default Home;
