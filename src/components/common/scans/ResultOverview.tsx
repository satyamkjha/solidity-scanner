import React from "react";
import {
  Flex,
  HStack,
  Text,
  Image,
  VStack,
  Divider,
  Link,
} from "@chakra-ui/react";
import {
  getAssetsURL,
  getContractBlockChainLogoUrl,
  getContractBlockchainId,
  getContractChainLabel,
  sentenceCapitalize,
  getProjectType,
} from "helpers/helperFunction";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { contractChain } from "common/values";

const ResultOverview: React.FC<{
  type?: "project" | "block";
  scanReport: any;
  projectDetails: any;
  spacing: number;
  theme?: string;
  page?: string;
}> = ({
  type = "block",
  scanReport,
  projectDetails,
  spacing,
  theme = "dark",
  page = "qs",
}) => {
  const assetsUrl = getAssetsURL();

  return (
    <VStack w="100%" spacing={spacing}>
      <Flex
        w="100%"
        justifyContent={["flex-start"]}
        alignItems={"center"}
        flexDir={page === "report" ? "row" : ["column", "column", "row"]}
      >
        <Flex
          w="60px"
          h="60px"
          backgroundColor={theme === "light" ? "white" : "#272727"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={page === "report" ? "row" : ["column", "column", "row"]}
        >
          {
            <Image
              src={
                type === "block"
                  ? `${assetsUrl}${getContractBlockChainLogoUrl(
                      projectDetails.contract_platform || "",
                      projectDetails.contract_chain || ""
                    )}.svg`
                  : `${assetsUrl}icons/integrations/${getProjectType(
                      projectDetails.project_url || ""
                    )}.svg`
              }
              width="50px"
            />
          }
        </Flex>
        <VStack
          ml={page === "report" ? 3 : 5}
          alignItems={
            page === "report"
              ? "flex-start"
              : ["center", "center", "flex-start"]
          }
          w={
            page === "report"
              ? "calc(100% - 60px)"
              : ["100%", "100%", "calc(100% - 60px)"]
          }
          spacing={0}
          textAlign={page === "report" ? "left" : ["center", "center", "left"]}
          color={theme === "light" ? "#171717" : "white"}
        >
          <Text
            w="100%"
            overflowWrap="break-word"
            fontWeight={600}
            fontSize="lg"
          >
            {type === "block"
              ? projectDetails.contract_address
              : projectDetails.project_name}
          </Text>
          {type === "block" ? (
            <Flex
              w="100%"
              justifyContent={["flex-start"]}
              alignItems={"center"}
              flexDir={["row"]}
            >
              <Text whiteSpace="nowrap" fontWeight={300} fontSize="md">
                {projectDetails.contract_platform === "buildbear"
                  ? "Buildbear"
                  : contractChain[
                      getContractBlockchainId(
                        projectDetails.contract_platform || "",
                        projectDetails.contract_chain || ""
                      )
                    ].blockchainName.toUpperCase()}{" "}
                {`(${getContractChainLabel(
                  projectDetails.contract_platform || "",
                  projectDetails.contract_chain || ""
                )})`}
              </Text>
              <Divider
                mx={5}
                h={7}
                borderColor="gray.200"
                orientation="vertical"
                display={["none", "none", "block"]}
              />
              <Text
                whiteSpace="nowrap"
                color="gray.400"
                fontWeight={300}
                fontSize="md"
                mr={2}
                cursor="pointer"
                onClick={() =>
                  window.open(projectDetails.contract_url, "_blank")
                }
              >
                {`View on ${sentenceCapitalize(
                  projectDetails.contract_platform || " "
                )}`}
                <ExternalLinkIcon ml={2} />
              </Text>
            </Flex>
          ) : (
            <Flex
              w="100%"
              justifyContent={["flex-start"]}
              alignItems={"center"}
              flexDir={["row"]}
              color={"#8A94A6"}
            >
              <Link
                href={
                  (projectDetails.project_url !== "File Scan" &&
                    projectDetails.project_url) ||
                  projectDetails.project_url
                }
                target={"_blank"}
                fontSize="sm"
                fontWeight={400}
                textDecoration={"none"}
              >
                {projectDetails.project_url === "File Scan"
                  ? "File Scan"
                  : "View on" +
                    " " +
                    sentenceCapitalize(
                      getProjectType(projectDetails.project_url)
                    )}
                <ExternalLinkIcon ml={2} />
              </Link>
            </Flex>
          )}
        </VStack>
      </Flex>
      <Flex
        w="100%"
        justifyContent={
          page === "report"
            ? "space-between"
            : ["flex-start", "flex-start", "space-between"]
        }
        alignItems="center"
        flexDir={page === "report" ? "row" : ["column", "column", "row"]}
      >
        <HStack
          bgColor={theme === "light" ? "#FBFBFB" : "#272727"}
          color={theme === "light" ? "#000000" : "white"}
          w={page === "report" ? "32%" : ["100%", "100%", "32%"]}
          borderRadius={5}
          p={3}
        >
          <Flex
            bgColor={theme === "light" ? "#F8F8F8" : "#272727"}
            justifyContent="center"
            alignItems="center"
            height="45px"
            width="45px"
            mr={2}
          >
            <Image
              src={`${assetsUrl}quickscan/qs_security_score.svg`}
              height="30px"
              width="30px"
            />
          </Flex>
          <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
            <Text color="gray.400" fontSize="sm" fontWeight={300}>
              Security Score
            </Text>
            <HStack spacing={0}>
              <Text fontSize="lg" fontWeight={600}>
                {scanReport.score_v2}
              </Text>
              <Text fontSize="sm" fontWeight={400}>
                /100
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack
          bgColor={theme === "light" ? "#FBFBFB" : "#272727"}
          color={theme === "light" ? "#000000" : "white"}
          w={page === "report" ? "32%" : ["100%", "100%", "32%"]}
          mt={[5, 5, 0]}
          borderRadius={5}
          p={3}
        >
          <Flex
            padding={2}
            bgColor={theme === "light" ? "#F8F8F8" : "#272727"}
            justifyContent="center"
            alignItems="center"
            height="45px"
            width="45px"
            mr={2}
          >
            <Image
              src={`${assetsUrl}quickscan/qs_scan_duration${
                theme === "light" ? "_light" : ""
              }.svg`}
              height="40px"
              width="40px"
            />
          </Flex>
          <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
            <Text color="gray.400" fontSize="sm" fontWeight={300}>
              Scan duration
            </Text>
            <Text fontSize="lg" fontWeight={600}>
              {scanReport.scan_time_taken} secs
            </Text>
          </VStack>
        </HStack>
        <HStack
          bgColor={theme === "light" ? "#FBFBFB" : "#272727"}
          color={theme === "light" ? "#000000" : "white"}
          w={page === "report" ? "32%" : ["100%", "100%", "32%"]}
          mt={[5, 5, 0]}
          borderRadius={5}
          p={3}
        >
          <Flex
            padding={2}
            bgColor={theme === "light" ? "#F8F8F8" : "#272727"}
            justifyContent="center"
            alignItems="center"
            height="45px"
            width="45px"
            mr={2}
          >
            <Image
              src={`${assetsUrl}quickscan/qs_loc${
                theme === "light" ? "_light" : ""
              }.svg`}
              height="40px"
              width="40px"
            />
          </Flex>
          <VStack alignItems="flex-start" w="calc(100% - 40px)" spacing={0}>
            <Text color="gray.400" fontSize="sm" fontWeight={300}>
              Lines of code
            </Text>
            <Text fontSize="lg" fontWeight={600}>
              {scanReport.lines_analyzed_count}
            </Text>
          </VStack>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default ResultOverview;
