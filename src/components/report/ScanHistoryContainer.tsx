import { Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { SeverityIcon } from "components/icons";
import React from "react";
import { ScanSummaryItem } from "common/types";

const ScanHistoryContainer: React.FC<{
  scan_summary: ScanSummaryItem[];
  startIndex: number;
  download: boolean;
}> = ({ scan_summary, startIndex, download }) => {
  let responsiveIconSize =
    useBreakpointValue({
      base: 5,
      sm: 6,
      md: 10,
    }) || 10;

  let severityIconSize = download ? 10 : responsiveIconSize;

  const bigFontSize = download ? "md" : ["7px", "9px", "md"];
  const marginLeft = download ? 2 : ["2px", 1, 2];
  const marginRight = download ? 5 : [2, 2, 5];

  return (
    <Flex
      as="div"
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir={"column"}
      id={"scan-history"}
    >
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        mb={download ? 10 : [3, 4, 10]}
        alignItems="center"
      >
        <Text
          fontSize={download ? "28px" : ["14px", "20px", "28px"]}
          fontWeight={400}
        >
          5.
        </Text>
        <Heading
          color={"#52FF00"}
          fontSize={download ? "4xl" : ["xl", "2xl", "4xl"]}
          ml={download ? 4 : [2, 2, 4]}
        >
          Scan
        </Heading>
        <Text
          fontSize={download ? "4xl" : ["xl", "2xl", "4xl"]}
          fontWeight={400}
        >
          {" "}
          &nbsp;History{" "}
        </Text>
      </Flex>
      <Flex
        as="section"
        w="100%"
        alignItems="center"
        justifyContent="flex-end"
        flexDir={"row"}
        textAlign={["left", "left"]}
        py={marginLeft}
        px={download ? 10 : [3, 4, 10]}
      >
        <SeverityIcon size={severityIconSize} variant={"critical"} />
        <Text
          fontSize={bigFontSize}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={marginLeft}
          mr={marginRight}
        >
          Critical
        </Text>
        <SeverityIcon size={severityIconSize} variant={"high"} />
        <Text
          fontSize={bigFontSize}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={marginLeft}
          mr={marginRight}
        >
          High
        </Text>
        <SeverityIcon size={severityIconSize} variant={"medium"} />
        <Text
          fontSize={bigFontSize}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={marginLeft}
          mr={marginRight}
        >
          Medium
        </Text>
        <SeverityIcon size={severityIconSize} variant={"low"} />
        <Text
          fontSize={bigFontSize}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={marginLeft}
          mr={marginRight}
        >
          Low
        </Text>
        <SeverityIcon size={severityIconSize} variant={"informational"} />
        <Text
          fontSize={bigFontSize}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={marginLeft}
          mr={marginRight}
        >
          Informational
        </Text>
        <SeverityIcon size={severityIconSize} variant={"gas"} />
        <Text
          fontSize={bigFontSize}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={marginLeft}
          mr={marginRight}
        >
          Gas
        </Text>
      </Flex>
      <Flex
        as="section"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"row"}
        textAlign={"left"}
        py={download ? 5 : [2, 2, 5]}
        px={download ? 10 : [3, 4, 10]}
        backgroundColor={"#F5F5F5"}
      >
        <Text
          fontSize={bigFontSize}
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={["10%"]}
          pl={0}
        >
          No
        </Text>
        <Text
          fontSize={bigFontSize}
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={["18%"]}
        >
          Date
        </Text>
        <Text
          fontSize={bigFontSize}
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={"22%"}
        >
          Security Score
        </Text>
        <Text
          fontSize={bigFontSize}
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={"50%"}
        >
          Scan Overview
        </Text>
      </Flex>

      {scan_summary.map((scan, index) => (
        <Flex
          key={index}
          as="section"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          textAlign={["left", "left"]}
          py={download ? 5 : [2, 2, 5]}
          px={download ? 10 : [3, 4, 10]}
          borderBottomWidth={1}
          borderBottomColor={"#E4E4E4"}
        >
          <Text
            fontSize={bigFontSize}
            fontWeight={"normal"}
            color={"gray.600"}
            width={["10%"]}
            pl={0}
          >
            {index + startIndex}.
          </Text>
          <Text
            fontSize={bigFontSize}
            fontWeight={"normal"}
            color={"gray.600"}
            width={["18%"]}
          >
            {scan.scan_time.slice(0, 10)}
          </Text>
          <Text
            fontSize={bigFontSize}
            fontWeight={"extrabold"}
            color={"#3300FF"}
            width={["22%"]}
          >
            {scan.score_v2 || parseInt(scan.score) * 20}
          </Text>

          <Flex
            as="div"
            w="50%"
            height={download ? "30px" : ["12px", "15px", "30px"]}
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
          >
            <SeverityIcon size={severityIconSize} variant={"critical"} />
            <Text
              fontSize={bigFontSize}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={marginLeft}
              width={"18%"}
            >
              {scan.issue_severity_distribution.critical}
            </Text>
            <SeverityIcon size={severityIconSize} variant={"high"} />
            <Text
              fontSize={bigFontSize}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={marginLeft}
              width={"18%"}
            >
              {scan.issue_severity_distribution.high}
            </Text>
            <SeverityIcon size={severityIconSize} variant={"medium"} />
            <Text
              fontSize={bigFontSize}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={marginLeft}
              width={"18%"}
            >
              {scan.issue_severity_distribution.medium}
            </Text>
            <SeverityIcon size={severityIconSize} variant={"low"} />
            <Text
              fontSize={bigFontSize}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={marginLeft}
              width={"18%"}
            >
              {scan.issue_severity_distribution.low}
            </Text>
            <SeverityIcon size={severityIconSize} variant={"informational"} />
            <Text
              fontSize={bigFontSize}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={marginLeft}
              width={"18%"}
            >
              {scan.issue_severity_distribution.informational}
            </Text>
            <SeverityIcon size={severityIconSize} variant={"gas"} />
            <Text
              fontSize={bigFontSize}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={marginLeft}
              width={"18%"}
            >
              {scan.issue_severity_distribution.gas}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default ScanHistoryContainer;
