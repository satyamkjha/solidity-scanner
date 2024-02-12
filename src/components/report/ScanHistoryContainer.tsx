import { Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { SeverityIcon } from "components/icons";
import React from "react";
import { ScanSummaryItem } from "common/types";

const ScanHistoryContainer: React.FC<{
  scan_summary: ScanSummaryItem[];
  startIndex: number;
  download: boolean;
}> = ({ scan_summary, startIndex, download }) => {
  let severityIconSize =
    useBreakpointValue({
      base: 5,
      sm: 6,
      md: 10,
    }) || 10;

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
        py={download ? 2 : ["2px", 1, 2]}
        px={download ? 10 : [3, 4, 10]}
      >
        <SeverityIcon
          size={download ? 10 : severityIconSize}
          variant={"critical"}
        />
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={download ? 2 : ["2px", 1, 2]}
          mr={download ? 5 : [2, 2, 5]}
        >
          Critical
        </Text>
        <SeverityIcon
          size={download ? 10 : severityIconSize}
          variant={"high"}
        />
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={download ? 2 : ["2px", 1, 2]}
          mr={download ? 5 : [2, 2, 5]}
        >
          High
        </Text>
        <SeverityIcon
          size={download ? 10 : severityIconSize}
          variant={"medium"}
        />
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={download ? 2 : ["2px", 1, 2]}
          mr={download ? 5 : [2, 2, 5]}
        >
          Medium
        </Text>
        <SeverityIcon size={download ? 10 : severityIconSize} variant={"low"} />
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={download ? 2 : ["2px", 1, 2]}
          mr={download ? 5 : [2, 2, 5]}
        >
          Low
        </Text>
        <SeverityIcon
          size={download ? 10 : severityIconSize}
          variant={"informational"}
        />
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={download ? 2 : ["2px", 1, 2]}
          mr={download ? 5 : [2, 2, 5]}
        >
          Informational
        </Text>
        <SeverityIcon size={download ? 10 : severityIconSize} variant={"gas"} />
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"normal"}
          color={"gray.600"}
          ml={download ? 2 : ["2px", 1, 2]}
          mr={download ? 5 : [2, 2, 5]}
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
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={["10%"]}
          pl={0}
        >
          No
        </Text>
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={["18%"]}
        >
          Date
        </Text>
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={"22%"}
        >
          Security Score
        </Text>
        <Text
          fontSize={download ? "md" : ["7px", "9px", "md"]}
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
            fontSize={download ? "md" : ["7px", "9px", "md"]}
            fontWeight={"normal"}
            color={"gray.600"}
            width={["10%"]}
            pl={0}
          >
            {index + startIndex}.
          </Text>
          <Text
            fontSize={download ? "md" : ["7px", "9px", "md"]}
            fontWeight={"normal"}
            color={"gray.600"}
            width={["18%"]}
          >
            {scan.scan_time.slice(0, 10)}
          </Text>
          <Text
            fontSize={download ? "md" : ["7px", "9px", "md"]}
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
            <SeverityIcon
              size={download ? 10 : severityIconSize}
              variant={"critical"}
            />
            <Text
              fontSize={download ? "md" : ["7px", "9px", "md"]}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={download ? 2 : ["2px", 1, 2]}
              width={"18%"}
            >
              {scan.issue_severity_distribution.critical}
            </Text>
            <SeverityIcon
              size={download ? 10 : severityIconSize}
              variant={"high"}
            />
            <Text
              fontSize={download ? "md" : ["7px", "9px", "md"]}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={download ? 2 : ["2px", 1, 2]}
              width={"18%"}
            >
              {scan.issue_severity_distribution.high}
            </Text>
            <SeverityIcon
              size={download ? 10 : severityIconSize}
              variant={"medium"}
            />
            <Text
              fontSize={download ? "md" : ["7px", "9px", "md"]}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={download ? 2 : ["2px", 1, 2]}
              width={"18%"}
            >
              {scan.issue_severity_distribution.medium}
            </Text>
            <SeverityIcon
              size={download ? 10 : severityIconSize}
              variant={"low"}
            />
            <Text
              fontSize={download ? "md" : ["7px", "9px", "md"]}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={download ? 2 : ["2px", 1, 2]}
              width={"18%"}
            >
              {scan.issue_severity_distribution.low}
            </Text>
            <SeverityIcon
              size={download ? 10 : severityIconSize}
              variant={"informational"}
            />
            <Text
              fontSize={download ? "md" : ["7px", "9px", "md"]}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={download ? 2 : ["2px", 1, 2]}
              width={"18%"}
            >
              {scan.issue_severity_distribution.informational}
            </Text>
            <SeverityIcon
              size={download ? 10 : severityIconSize}
              variant={"gas"}
            />
            <Text
              fontSize={download ? "md" : ["7px", "9px", "md"]}
              fontWeight={"normal"}
              color={"gray.600"}
              ml={download ? 2 : ["2px", 1, 2]}
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
