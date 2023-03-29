import React, { useRef } from "react";
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

  const [isLargenThan790, isSmallerThan800] = useMediaQuery([
    "(min-width: 790px)",
    "(max-width: 800px)",
  ]);

  return (
    <>
      <HStack w="100%" height={"fit-content"}>
        <Button onClick={handlePrint}> TEST PRINT </Button>
      </HStack>
      {data ? (
        <Box w="100vw" ref={componentRef}>
          {isLargenThan790 && isSmallerThan800 ? (
            <PrintContainer summary_report={data.summary_report} />
          ) : (
            <ReportContainer summary_report={data.summary_report} />
          )}
        </Box>
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
