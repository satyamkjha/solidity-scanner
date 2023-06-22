import { Flex, Heading, HStack, Text, Divider, VStack } from "@chakra-ui/react";
import { Report } from "common/types";
import { SeverityIcon } from "components/icons";
import { sentenceCapitalize } from "helpers/helperFunction";
import React from "react";
import DynamicContainer from "./DynamicContainer";
import NonDynamicContainer from "./NonDynamicContainer";

const VulnerabililtyDetailsContainer: React.FC<{
  summary_report: Report;
}> = ({ summary_report }) => {
  return (
    <>
      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        py={20}
      >
        <Flex
          sx={{
            color: "#000000",
            mx: 1,
          }}
          my={10}
          alignItems="center"
        >
          <Heading color={"#52FF00"} fontSize="4xl">
            Vulnerability
          </Heading>
          <Text fontSize="4xl" fontWeight={400}>
            {" "}
            &nbsp;Details{" "}
          </Text>
        </Flex>

        {/* UI for new vulnerabillity Details */}
        {Object.keys(summary_report.issues).map((key) => (
          <Flex
            p={5}
            flexDir="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            border={"1px solid #D9D9D9;"}
            my={5}
            width={"100%"}
          >
            <Flex width={"100%"} mb={3} flexWrap="wrap">
              <VStack
                width={["100%", "100%", "100%", "70%"]}
                mb={[4, 4, 4, 0]}
                alignItems="flex-start"
              >
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.400"}
                  width={"100%"}
                  mb={1}
                >
                  Issue Type
                </Text>
                <Text fontSize="xl" fontWeight={"bold"} mb={5} width={"100%"}>
                  {summary_report.issues[key].issue_name}
                </Text>
              </VStack>
              <VStack
                width={["50%", "50%", "50%", "15%"]}
                mb={[4, 4, 4, 0]}
                alignItems="flex-start"
              >
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.400"}
                  mb={1}
                >
                  Severity
                </Text>
                <HStack>
                  <SeverityIcon
                    size={12}
                    variant={
                      summary_report.issues[key].issue_details[0].severity
                    }
                  />
                  <Text fontSize="lg" fontWeight={"bold"} ml={2} width={"100%"}>
                    {sentenceCapitalize(
                      summary_report.issues[key].issue_details[0].severity
                    )}
                  </Text>
                </HStack>
              </VStack>
              <VStack
                width={["50%", "50%", "50%", "15%"]}
                mb={[4, 4, 4, 0]}
                alignItems="flex-start"
              >
                <Text
                  fontSize="md"
                  fontWeight={"normal"}
                  color={"gray.400"}
                  mb={1}
                >
                  Confidence
                </Text>
                <HStack>
                  <Text
                    px={5}
                    py={1}
                    borderRadius={20}
                    color={
                      summary_report.issues[key].issue_details[0]
                        .issue_confidence === "2"
                        ? "#289F4C"
                        : summary_report.issues[key].issue_details[0]
                            .issue_confidence === "1"
                        ? "#ED9801"
                        : "#FF5630"
                    }
                    backgroundColor={
                      summary_report.issues[key].issue_details[0]
                        .issue_confidence === "2"
                        ? "#CFFFB8"
                        : summary_report.issues[key].issue_details[0]
                            .issue_confidence === "1"
                        ? "#FFF8EB"
                        : "#FFF5F3"
                    }
                    fontSize="lg"
                    fontWeight={"bold"}
                  >
                    {summary_report.issues[key].issue_details[0]
                      .issue_confidence === "2"
                      ? "Certain"
                      : summary_report.issues[key].issue_details[0]
                          .issue_confidence === "1"
                      ? "Firm"
                      : "Tentative"}
                  </Text>
                </HStack>
              </VStack>
            </Flex>

            <Divider my={5} />

            {summary_report.issues[key].is_issue_description_dynamic ? (
              summary_report.issues[key].issue_details.map((issue) => (
                <DynamicContainer issue={issue} />
              ))
            ) : (
              <NonDynamicContainer issue={summary_report.issues[key]} />
            )}
          </Flex>
        ))}
        {/* UI for new vulnerabillity Details */}
      </Flex>
    </>
  );
};

export default VulnerabililtyDetailsContainer;
