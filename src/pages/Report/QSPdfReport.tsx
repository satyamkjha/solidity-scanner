import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Flex, Container } from "@chakra-ui/react";
import { usePublicReport } from "hooks/usePublicReport";
import Loader from "components/styled-components/Loader";
import { ReportContainer } from "./ReportContainer";

export default function QSPdfReport() {
  const { reportId } = useParams<{
    reportId: string;
  }>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const { data } = usePublicReport(token || "", reportId);

  

  return (
    <>
      {data ? (
        <ReportContainer
          summary_report={data.summary_report}
          isPublicReport={true}
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
