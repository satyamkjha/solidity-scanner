import { Flex, HStack, VStack, Button, Text, Image } from "@chakra-ui/react";
import React from "react";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import { LockIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

export const ReportPayWall: React.FC<{
  issue_count: number;
  issue_severity: string;
  showVulnerabilityTitle: boolean;
  download: boolean;
  isQSReport: boolean;
  onImportScan: () => void;
  onOpen: () => void;
}> = ({
  showVulnerabilityTitle,
  download,
  issue_count,
  issue_severity,
  isQSReport,
  onImportScan,
  onOpen,
}) => {
  const assetsURL = getAssetsURL();
  const history = useHistory();

  return (
    <Flex
      w="96%"
      left="2px"
      top={
        showVulnerabilityTitle
          ? download
            ? "270px"
            : ["150px", "190px", "270px"]
          : download
          ? "190px"
          : ["110px", "140px", "190px"]
      }
      h={["280px", "400px", "730px"]}
      position="absolute"
      sx={{
        backdropFilter: "blur(6px)",
      }}
      bg="rgba(255,255,255,0.3)"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Flex
        w="90%"
        borderRadius={10}
        p={[3, 4, 7]}
        flexDir={"column"}
        alignItems="center"
        justifyContent="flex-start"
        bg="linear-gradient(rgba(238, 235, 255, 1), rgba(229, 246, 255, 1))"
      >
        <HStack w="100%">
          <VStack
            alignItems={["center", "center", "flex-start"]}
            textAlign="left"
            w={["100%", "100%", "calc(100% - 200px)"]}
            spacing={[4, 4]}
          >
            <Text color="#000000" fontWeight={600} fontSize="md">
              {isQSReport
                ? issue_severity === "gas"
                  ? "Free Unlimited Gas Issues"
                  : "Reveal Detailed Vulnerabilities"
                : "Upgrade your Plan to view the full report"}
            </Text>
            <Text color="#000000" fontWeight={300} fontSize={["xs", "sm"]}>
              <b>
                {issue_count} {sentenceCapitalize(issue_severity)} Issues Found
              </b>
            </Text>
            <Text
              color="#000000"
              fontWeight={300}
              textAlign={["center", "center", "left"]}
              fontSize={["xs", "sm"]}
            >
              {isQSReport
                ? issue_severity === "gas"
                  ? "Sign up for a free trial and optimize your contracts for gas absolutely free!"
                  : "Make a one-time payment and get a detailed security report for your smart contract with security scores, bug descriptions & remediations directly in your inbox!"
                : "Please upgrade your plan to view all the issues in your report."}
            </Text>
            <Button
              leftIcon={issue_severity !== "gas" ? <LockIcon /> : undefined}
              variant="brand"
              w="90%"
              minWidth="200px"
              onClick={() => {
                if (isQSReport) {
                  if (issue_severity === "gas") {
                    history.push("/signup");
                    onImportScan();
                  } else {
                    onOpen();
                  }
                } else {
                  history.push("/billing");
                }
              }}
            >
              {isQSReport
                ? issue_severity === "gas"
                  ? "Signup for Free Trial"
                  : "Unlock report"
                : "Upgrade"}
            </Button>
          </VStack>
          <Image
            display={["none", "none", "block"]}
            height="200px"
            width="200px"
            style={{
              mixBlendMode: "hard-light",
            }}
            src={`${assetsURL}report/paywall.svg`}
          />
        </HStack>
        <Image
          display={["none", "none", "block"]}
          height="390px"
          width="auto"
          src={`${assetsURL}report/paywall_screenshot.svg`}
        />
      </Flex>
    </Flex>
  );
};
