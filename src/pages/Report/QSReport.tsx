import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Container } from "@chakra-ui/react";
import Loader from "components/styled-components/Loader";
import { ReportContainer } from "./ReportContainer";
import { useQSReport } from "hooks/useQSReport";

export default function QSReport() {
  const { reportId, projectId } = useParams<{
    reportId: string;
    projectId: string;
  }>();
  const { data } = useQSReport(projectId, reportId);

  return (
    <>
      {data ? (
        <ReportContainer
          summary_report={data.summary_report}
          isPublicReport={true}
          isQSReport={true}
        />
      ) : (
        <Container py={12} h="100vh" maxW={"100vw"} bg="black">
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
            <Loader />
          </Flex>
        </Container>
      )}
    </>
  );
}
