import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Container,
  Spinner,
  Button,
  HStack,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { useReport } from "hooks/useReport";
import { PrintContainer } from "./PrintContainer";
import { usePublicReport } from "hooks/usePublicReport";
import { Text } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { ReportContainer } from "./ReportContainer";
import { DownloadIcon } from "@chakra-ui/icons";
import { getFeatureGateConfig } from "helpers/helperFunction";

export default function ReportPage() {
  const { reportId, projectType } = useParams<{
    reportId: string;
    projectType: string;
  }>();
  const { data } = usePublicReport(projectType, reportId);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printReport = () => {
    setTimeout(() => handlePrint(), 100);
  };

  return (
    <>
      {getFeatureGateConfig().pdf_report_generation && (
        <HStack my={5} w="90%" height={"fit-content"} justifyContent="flex-end">
          <Button
            variant={"accent-outline"}
            w={["250px"]}
            onClick={printReport}
          >
            <DownloadIcon mr={5} />
            Download Report
          </Button>
        </HStack>
      )}

      {data ? (
        <>
          <Box display={"none"}>
            <Box w="100vw" ref={componentRef}>
              <PrintContainer summary_report={data.summary_report} />
            </Box>
          </Box>
          <ReportContainer
            summary_report={data.summary_report}
            isPublicReport={true}
          />
        </>
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
