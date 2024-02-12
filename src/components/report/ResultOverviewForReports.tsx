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

const ResultOverviewReports: React.FC<{
  type?: "project" | "block";
  scanReport: any;
  projectDetails: any;
  theme?: string;
  download: boolean;
}> = ({
  type = "block",
  scanReport,
  projectDetails,
  download,
  theme = "dark",
}) => {
  const assetsUrl = getAssetsURL();

  return (
    <VStack w="100%" spacing={download ? 10 : [2, 3, 10]}>
      <Flex
        w="100%"
        justifyContent={["flex-start"]}
        alignItems={"center"}
        flexDir={"row"}
      >
        <Flex
          w={download ? "60px" : ["22px", "30px", "60px"]}
          h={download ? "60px" : ["22px", "30px", "60px"]}
          backgroundColor={theme === "light" ? "white" : "#272727"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"row"}
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
              width={download ? "50px" : ["20px", "25px", "50px"]}
            />
          }
        </Flex>
        <VStack
          ml={3}
          alignItems={"flex-start"}
          w={"calc(100% - 60px)"}
          spacing={0}
          textAlign={"left"}
          color={theme === "light" ? "#171717" : "white"}
        >
          <Text
            w="100%"
            overflowWrap="break-word"
            fontWeight={600}
            fontSize={download ? "lg" : ["xs", "sm", "lg"]}
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
              <Text
                whiteSpace="nowrap"
                fontWeight={300}
                fontSize={download ? "md" : ["9px", "12px", "md"]}
              >
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
                mx={download ? 5 : [1, 2, 5]}
                h={download ? 7 : [3, 4, 7]}
                borderColor="gray.200"
                orientation="vertical"
                display={"block"}
              />
              <Text
                whiteSpace="nowrap"
                color="gray.400"
                fontWeight={300}
                fontSize={download ? "sm" : ["9px", "xs", "sm"]}
                mr={2}
                cursor="pointer"
                onClick={() =>
                  window.open(projectDetails.contract_url, "_blank")
                }
              >
                {`View on ${sentenceCapitalize(
                  projectDetails.contract_platform || " "
                )}`}
                <ExternalLinkIcon ml={download ? 2 : [0, 1, 2]} />
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
                fontSize={download ? "sm" : ["xs", "xs", "sm"]}
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
                <ExternalLinkIcon ml={download ? 2 : [0, 1, 2]} />
              </Link>
            </Flex>
          )}
        </VStack>
      </Flex>
      <Flex
        w="100%"
        justifyContent={"space-between"}
        alignItems="center"
        flexDir={"row"}
      >
        <HStack
          bgColor={theme === "light" ? "#FBFBFB" : "#272727"}
          color={theme === "light" ? "#000000" : "white"}
          w={"32%"}
          spacing={download ? 2 : [0, 0, 2]}
          borderRadius={5}
          p={download ? 3 : [0, 1, 3]}
        >
          <Flex
            bgColor={theme === "light" ? "#F8F8F8" : "#272727"}
            justifyContent="center"
            alignItems="center"
            height={download ? "45px" : ["20px", "25px", "45px"]}
            width={download ? "45px" : ["20px", "25px", "45px"]}
            mr={download ? 2 : [1, 1, 2]}
          >
            <Image
              src={`${assetsUrl}quickscan/qs_security_score.svg`}
              height={download ? "30px" : ["14px", "18px", "30px"]}
              width={download ? "30px" : ["14px", "18px", "30px"]}
            />
          </Flex>
          <VStack
            alignItems="flex-start"
            w={
              download
                ? "calc(100% - 40px)"
                : [
                    "calc(100% - 40px)",
                    "calc(100% - 40px)",
                    "calc(100% - 40px)",
                  ]
            }
            spacing={0}
          >
            <Text
              color="gray.400"
              fontSize={download ? "sm" : ["9px", "11px", "sm"]}
              fontWeight={300}
            >
              Security Score
            </Text>
            <HStack spacing={0}>
              <Text
                fontSize={download ? "lg" : ["xs", "sm", "lg"]}
                fontWeight={600}
              >
                {scanReport.score_v2}
              </Text>
              <Text
                fontSize={download ? "sm" : ["xs", "xs", "sm"]}
                fontWeight={400}
              >
                /100
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack
          bgColor={theme === "light" ? "#FBFBFB" : "#272727"}
          color={theme === "light" ? "#000000" : "white"}
          w={"32%"}
          mt={0}
          borderRadius={5}
          p={download ? 3 : [0, 1, 3]}
        >
          <Flex
            padding={download ? 2 : [1, 1, 2]}
            bgColor={theme === "light" ? "#F8F8F8" : "#272727"}
            justifyContent="center"
            alignItems="center"
            height={download ? "45px" : ["20px", "25px", "45px"]}
            width={download ? "45px" : ["20px", "25px", "45px"]}
            mr={download ? 2 : [1, 1, 2]}
          >
            <Image
              src={`${assetsUrl}quickscan/qs_scan_duration.svg`}
              height={download ? "40px" : ["16px", "20px", "40px"]}
              width={download ? "40px" : ["16px", "20px", "40px"]}
            />
          </Flex>
          <VStack
            alignItems="flex-start"
            w={
              download
                ? "calc(100% - 40px)"
                : [
                    "calc(100% - 40px)",
                    "calc(100% - 40px)",
                    "calc(100% - 40px)",
                  ]
            }
            spacing={0}
          >
            <Text
              color="gray.400"
              fontSize={download ? "sm" : ["9px", "11px", "sm"]}
              fontWeight={300}
            >
              Scan duration
            </Text>
            <Text
              fontSize={download ? "lg" : ["xs", "sm", "lg"]}
              fontWeight={600}
            >
              {scanReport.scan_time_taken} secs
            </Text>
          </VStack>
        </HStack>
        <HStack
          bgColor={theme === "light" ? "#FBFBFB" : "#272727"}
          color={theme === "light" ? "#000000" : "white"}
          w={"32%"}
          borderRadius={5}
          p={download ? 3 : [0, 1, 3]}
        >
          <Flex
            padding={download ? 2 : [0, 0, 2]}
            bgColor={theme === "light" ? "#F8F8F8" : "#272727"}
            justifyContent="center"
            alignItems="center"
            height={download ? "45px" : ["20px", "25px", "45px"]}
            width={download ? "45px" : ["20px", "25px", "45px"]}
            mr={download ? 2 : [1, 1, 2]}
          >
            <Image
              src={`${assetsUrl}quickscan/qs_loc.svg`}
              height={download ? "40px" : ["16px", "20px", "40px"]}
              width={download ? "40px" : ["16px", "20px", "40px"]}
            />
          </Flex>
          <VStack
            alignItems="flex-start"
            w={
              download
                ? "calc(100% - 40px)"
                : [
                    "calc(100% - 40px)",
                    "calc(100% - 40px)",
                    "calc(100% - 40px)",
                  ]
            }
            spacing={0}
          >
            <Text
              color="gray.400"
              fontSize={download ? "sm" : ["9px", "11px", "sm"]}
              fontWeight={300}
            >
              Lines of code
            </Text>
            <Text
              fontSize={download ? "lg" : ["xs", "sm", "lg"]}
              fontWeight={600}
            >
              {scanReport.lines_analyzed_count}
            </Text>
          </VStack>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default ResultOverviewReports;
