import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Container, Spinner } from "@chakra-ui/react";
import { useReport } from "hooks/useReport";
import { ReportContainer } from "./ReportContainer";
import { Text } from "@chakra-ui/react";

export default function ReportPage() {
  const { reportId, projectId } =
    useParams<{ reportId: string; projectId: string }>();
  const { data } = useReport(projectId, reportId);

  return (
    <>
      <Flex
        sx={{
          w: "100%",
          justifyContent: "center",
          py: 1,
          bg: "#ff715e",
        }}
      >
        <Text fontSize="12px" color="white" fontWeight={700}>
        You are viewing this report in private mode, accessible only using an authenticated account. This is not a public report.
        </Text>
      </Flex>
      {data ? (
        <ReportContainer summary_report={data.summary_report} />
      ) : (
        <Container
          py={12}
          h="90vh"
          maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
          color="black"
        >
          <Flex
            as="div"
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            flexDir={"row"}
            textAlign={["left", "left"]}
            mb={10}
          >
            <Spinner />
          </Flex>
        </Container>
      )}
    </>
  );
}
