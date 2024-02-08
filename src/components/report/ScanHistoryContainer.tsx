import { Flex, Heading, Text } from "@chakra-ui/react";
import { SeverityIcon } from "components/icons";
import React from "react";
import { ScanSummaryItem } from "common/types";

const ScanHistoryContainer: React.FC<{
  scan_summary: ScanSummaryItem[];
  startIndex: number;
}> = ({ scan_summary, startIndex }) => {
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
        mb={10}
        alignItems="center"
      >
        <Text fontSize={["28px"]} fontWeight={400}>
          5.
        </Text>
        <Heading color={"#52FF00"} fontSize="4xl" ml={4}>
          Scan
        </Heading>
        <Text fontSize="4xl" fontWeight={400}>
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
        py={2}
        px={[1, 10]}
      >
        <SeverityIcon variant={"critical"} />
        <Text
          fontSize="md"
          fontWeight={"normal"}
          color={"gray.600"}
          ml={2}
          mr={5}
        >
          Critical
        </Text>
        <SeverityIcon variant={"high"} />
        <Text
          fontSize="md"
          fontWeight={"normal"}
          color={"gray.600"}
          ml={2}
          mr={5}
        >
          High
        </Text>
        <SeverityIcon variant={"medium"} />
        <Text
          fontSize="md"
          fontWeight={"normal"}
          color={"gray.600"}
          ml={2}
          mr={5}
        >
          Medium
        </Text>
        <SeverityIcon variant={"low"} />
        <Text
          fontSize="md"
          fontWeight={"normal"}
          color={"gray.600"}
          ml={2}
          mr={5}
        >
          Low
        </Text>
        <SeverityIcon variant={"informational"} />
        <Text
          fontSize="md"
          fontWeight={"normal"}
          color={"gray.600"}
          ml={2}
          mr={5}
        >
          Informational
        </Text>
        <SeverityIcon variant={"gas"} />
        <Text
          fontSize="md"
          fontWeight={"normal"}
          color={"gray.600"}
          ml={2}
          mr={5}
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
        py={5}
        px={10}
        backgroundColor={"#F5F5F5"}
      >
        <Text
          fontSize="md"
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={["10%"]}
          pl={0}
        >
          No
        </Text>
        <Text
          fontSize="md"
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={["18%"]}
        >
          Date
        </Text>
        <Text
          fontSize="md"
          fontWeight={"extrabold"}
          color={"gray.600"}
          width={"22%"}
        >
          Security Score
        </Text>
        <Text
          fontSize="md"
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
          py={5}
          px={10}
          borderBottomWidth={1}
          borderBottomColor={"#E4E4E4"}
        >
          <Text
            fontSize="md"
            fontWeight={"normal"}
            color={"gray.600"}
            width={["10%"]}
            pl={0}
          >
            {index + startIndex}.
          </Text>
          <Text
            fontSize="md"
            fontWeight={"normal"}
            color={"gray.600"}
            width={["18%"]}
          >
            {scan.scan_time.slice(0, 10)}
          </Text>
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"#3300FF"}
            width={["22%"]}
          >
            {scan.score_v2 || parseInt(scan.score) * 20}
          </Text>

          <Flex
            as="div"
            w="50%"
            height={"30px"}
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
          >
            <SeverityIcon variant={"critical"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              width={"18%"}
            >
              {scan.issue_severity_distribution.critical}
            </Text>
            <SeverityIcon variant={"high"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              width={"18%"}
            >
              {scan.issue_severity_distribution.high}
            </Text>
            <SeverityIcon variant={"medium"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              width={"18%"}
            >
              {scan.issue_severity_distribution.medium}
            </Text>
            <SeverityIcon variant={"low"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              width={"18%"}
            >
              {scan.issue_severity_distribution.low}
            </Text>
            <SeverityIcon variant={"informational"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              width={"18%"}
            >
              {scan.issue_severity_distribution.informational}
            </Text>
            <SeverityIcon variant={"gas"} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
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
