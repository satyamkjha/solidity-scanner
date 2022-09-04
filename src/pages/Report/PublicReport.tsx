import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Container } from "@chakra-ui/react";
import { Logo } from "components/icons";
import { usePublicReport } from "hooks/usePublicReport";

export default function PublicReportPage() {
  const { projectType, reportId } =
    useParams<{ projectType: string; reportId: string }>();
  const { data } = usePublicReport(projectType, reportId);

  return (
    <>
      {data && (
        <Container
          py={12}
          maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
          color="black"
        >
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
            textAlign={["left", "left"]}
            mb={10}
          >
            <Logo />
            <Box
              ml={10}
              height={"10px"}
              width="calc(100% - 400px)"
              backgroundColor={"#38CB89"}
            />
          </Flex>
          {/* <ReportContainer summary_report={data.summary_report} /> */}
        </Container>
      )}
    </>
  );
}
