import {
  Flex,
  Heading,
  HStack,
  Box,
  Text,
  Image,
  Link,
  VStack,
} from "@chakra-ui/react";
import { Report } from "common/types";
import { monthNames } from "common/values";
import { Logo, ReportCoverDots } from "components/icons";
import { getAssetsURL } from "helpers/helperFunction";
import React from "react";

const CoverPageContainer: React.FC<{
  d: Date;
  summary_report: Report;
  isPublicReport: boolean;
}> = ({ d, summary_report, isPublicReport }) => {
  const assetsURL = getAssetsURL();
  return (
    <Flex p={0} w="100%" h="100%" bg="#010101" position={"relative"}>
      <Box
        position={"absolute"}
        w="100%"
        h="100%"
        bg={
          "linear-gradient(90deg, #000000 -13.81%, rgba(0, 0, 0, 0.73) 35.37%, rgba(0, 0, 0, 0) 93.5%)"
        }
        zIndex={1}
      ></Box>
      <Box w="100%" h="100%" bg={"black"} color={"white"} position={"relative"}>
        <Flex
          as="div"
          w="100%"
          h={"100%"}
          alignItems="flex-start"
          justifyContent={["space-between"]}
          flexDir={"row"}
          py={10}
          px={16}
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          backgroundImage={`url('${assetsURL}report/report_cover.svg')`}
          position={"relative"}
        >
          <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"column"}
            width={"100%"}
            h={"100%"}
            zIndex={1}
          >
            <HStack justifyContent={"flex-start"} spacing={4}>
              <Logo fill={"white"} />
            </HStack>
            <Text
              fontSize="2xl"
              fontWeight={400}
              color={"subtle"}
              mt={[10, 10, 10, 20]}
              mb={3}
            >
              Security Assessment
            </Text>
            <Heading fontSize={["3xl", "4xl"]} fontWeight={700} mb={3}>
              {summary_report.project_summary_report.project_name ||
                summary_report.project_summary_report.contract_name}
            </Heading>
            <Text fontSize="xl" mb={20} fontWeight={500}>
              {`${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`}
            </Text>
            <Box w="100%" h={"auto"}>
              <Text
                fontWeight={400}
                fontSize={"sm"}
                width={"60%"}
                color={"subtle"}
                mb={10}
              >
                This security assessment report was prepared by
                SolidityScan.com, a cloud-based Smart Contract Scanner.
              </Text>
              <ReportCoverDots />
            </Box>
            {isPublicReport && (
              <Flex mt={"auto"} alignItems={"center"}>
                <Image
                  src={
                    summary_report.project_summary_report.report_type ===
                    "self_published"
                      ? `${assetsURL}report/user-fill.svg`
                      : `${assetsURL}report/verified-fill.svg`
                  }
                />
                <VStack alignItems={"flex-start"} w={"60%"} spacing={1} ml={4}>
                  <Text fontSize={"lg"}>
                    {summary_report.project_summary_report.report_type ===
                    "self_published"
                      ? "Self-published"
                      : "Verified Report"}
                  </Text>
                  <Text fontSize={"sm"} fontWeight={400}>
                    {summary_report.project_summary_report.report_type ===
                    "self_published"
                      ? "This audit report was Self-published by the user."
                      : "This audit report has been verified by the SolidityScan team."}{" "}
                    To learn more about our published reports{" "}
                    <Link
                      href="https://docs.solidityscan.com/report/"
                      isExternal
                      color={"accent"}
                    >
                      click here
                    </Link>
                    .
                  </Text>
                </VStack>
              </Flex>
            )}
          </Flex>
          {isPublicReport && (
            <Image
              display={["block"]}
              height={[250]}
              width={[250]}
              src={
                summary_report.project_summary_report.report_type ===
                "self_published"
                  ? `${assetsURL}report/self_published_badge.svg`
                  : `${assetsURL}report/verified_report_badge.svg`
              }
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default CoverPageContainer;
