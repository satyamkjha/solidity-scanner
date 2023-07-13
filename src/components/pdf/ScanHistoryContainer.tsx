import { Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { Report } from "common/types";
import { SeverityIcon } from "components/icons";
import React from "react";

const ScanHistoryContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <Flex
        sx={{
          color: "#000000",
          mx: 1,
        }}
        py={10}
        alignItems="center"
      >
        <Heading color={"#52FF00"} fontSize="4xl">
          Scan
        </Heading>
        <Text fontSize="4xl" fontWeight={400}>
          {" "}
          &nbsp;History{" "}
        </Text>
      </Flex>
      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        sx={{
          pageBreakAfter: "always",
        }}
      >
        {isDesktopView && (
          <Flex
            as="section"
            w="100%"
            alignItems="center"
            justifyContent="flex-end"
            flexDir={"row"}
            textAlign={["left", "left"]}
            pt={7}
            pb={2}
            px={[1, 10]}
            border={"1px solid #D9D9D9;"}
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
        )}
        <Flex
          as="section"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          textAlign={["left", "left"]}
          py={5}
          px={[1, 10]}
          border={"1px solid #D9D9D9;"}
          backgroundColor={"#F5F5F5"}
        >
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={["30%", "30%", "30%", "10%"]}
            pl={[4, 4, 4, 0]}
          >
            No
          </Text>
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={["50%", "50%", "50%", "23%"]}
          >
            Date
          </Text>
          <Text
            fontSize="md"
            fontWeight={"extrabold"}
            color={"gray.600"}
            width={"17%"}
          >
            Security Score
          </Text>
          {isDesktopView && (
            <Text
              fontSize="md"
              fontWeight={"extrabold"}
              color={"gray.600"}
              width={"50%"}
            >
              Scan Overview
            </Text>
          )}
        </Flex>

        {summary_report.scan_summary.map((scan, index) => (
          <Flex
            as="section"
            w="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDir={"row"}
            textAlign={["left", "left"]}
            py={5}
            px={[1, 10]}
            border={"1px solid #D9D9D9;"}
            sx={{
              pageBreakAfter: index === 10 ? "always" : "avoid",
            }}
            // borderBottomWidth={1}
            // borderBottomColor={"#E4E4E4"}
          >
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              width={["30%", "30%", "30%", "10%"]}
              pl={[4, 4, 4, 0]}
            >
              {index + 1}.
            </Text>
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              width={["50%", "50%", "50%", "23%"]}
            >
              {scan.scan_time.slice(0, 10)}
            </Text>
            <Text
              fontSize="md"
              fontWeight={"extrabold"}
              color={"#3300FF"}
              width={["20%", "20%", "20%", "17%"]}
            >
              {scan.score}
            </Text>

            {isDesktopView && (
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
            )}
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default ScanHistoryContainer;
