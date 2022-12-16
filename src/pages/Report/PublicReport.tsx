import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Container, Spinner } from "@chakra-ui/react";
import { useReport } from "hooks/useReport";
import { ReportContainer } from "./ReportContainer";
import { usePublicReport } from "hooks/usePublicReport";
import { Text } from "@chakra-ui/react";

export default function ReportPage() {
  const { reportId, projectType } =
    useParams<{ reportId: string; projectType: string }>();
  const { data } = usePublicReport(projectType, reportId);

  return (
    <>
      
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
