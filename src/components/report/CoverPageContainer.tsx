import { Flex, Heading, HStack, Box, Text, Image } from "@chakra-ui/react";
import { Report } from "common/types";
import { monthNames } from "common/values";
import { Logo, ReportCoverDots } from "components/icons";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import React from "react";

const CoverPageContainer: React.FC<{
  d: Date;
  summary_report: Report;
  isPublicReport: boolean;
}> = ({ d, summary_report, isPublicReport }) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent={[
        "flex-start",
        "flex-start",
        "flex-start",
        "space-between",
      ]}
      flexDir={"row"}
      py={[4, 4, 4, 20]}
      pl={[6, 6, 6, 10]}
      marginTop={[6, 6, 6, "100px"]}
      marginBottom={[2, 2, 2, "400px"]}
      backgroundSize="cover"
      backgroundRepeat={"no-repeat"}
      backgroundImage={[
        null,
        null,
        null,
        `url('${assetsURL}report/report_cover.png')`,
      ]}
    >
      <Flex
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        width={["100%", "100%", "100%", "80%", "70%"]}
      >
        <Logo />
        <Text fontSize="2xl" color={"gray.400"} mt={[10, 10, 10, 20]} mb={5}>
          Security Assessment
        </Text>
        <Heading fontSize={["3xl", "4xl"]} mb={3}>
          {summary_report.project_summary_report.project_name}
        </Heading>
        <Text fontSize="xl" mb={20}>
          {`${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`}
        </Text>
        <Box w="100%" h={["50vh", "50vh", "50vh", "auto"]}>
          <Text
            fontSize="lg"
            width={["100%", "100%", "80%", "60%"]}
            color={"gray.300"}
            mb={10}
          >
            This security assessment report was prepared by SolidityScan.com, a
            cloud-based Smart Contract Scanner.
          </Text>
          <ReportCoverDots />
          <HStack justifyContent={"flex-end"}>
            {isPublicReport && (
              <Image
                display={["block", "block", "none"]}
                height={150}
                width={150}
                src={`${assetsURL}report/verified_report_badge.svg`}
              />
            )}
          </HStack>
        </Box>
      </Flex>
      {isPublicReport && (
        <Image
          display={["none", "none", "block"]}
          height={[150, 150, 150, 250]}
          width={[150, 150, 150, 250]}
          src={`${assetsURL}report/verified_report_badge.svg`}
        />
      )}
    </Flex>
  );
};

export default CoverPageContainer;
