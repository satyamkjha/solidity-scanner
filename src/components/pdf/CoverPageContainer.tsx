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
    <>
      <h6></h6>
      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        sx={{
          pageBreakAfter: "always",
        }}
        border={"1px solid #D9D9D9;"}
        py={[4, 4, 4, 20]}
        px={[6, 6, 6, 10]}
        marginTop={[6, 6, 6, "100px"]}
        marginBottom={[2, 2, 2, "400px"]}
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
        backgroundImage={[
          null,
          null,
          null,
          `url('${assetsURL}background/report_cover.png')`,
        ]}
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
        <Box
          w="100%"
          h={["50vh", "50vh", "50vh", "auto"]}
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          backgroundImage={[
            `url('${assetsURL}background/report_cover.svg')`,
            null,
            null,
            null,
            "",
          ]}
        >
          <Text
            fontSize="lg"
            width={["100%", "100%", "100%", "60%"]}
            color={"gray.300"}
            mb={10}
          >
            This security assessment report was prepared by SolidityScan.com, a
            cloud-based Smart Contract Scanner.
          </Text>
          <ReportCoverDots />
        </Box>
      </Flex>
    </>
  );
};

export default CoverPageContainer;
