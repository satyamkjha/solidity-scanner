import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Container, Button, HStack, Box } from "@chakra-ui/react";
import { PrintContainer } from "./PrintContainer";
import { usePublicReport } from "hooks/usePublicReport";
import { useReactToPrint } from "react-to-print";
import { DownloadIcon } from "@chakra-ui/icons";
import Loader from "components/styled-components/Loader";
import { ReportContainer } from "./ReportContainer";

export default function ReportPage() {
  const { reportId, projectType } = useParams<{
    reportId: ScrollSetting;
    projectType: string;
  }>();
  const { data } = usePublicReport(projectType, reportId);

  const [printLoading, setPrintLoading] = useState<boolean>(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setPrintLoading(false),
  });

  const printReport = () => {
    setPrintLoading(true);
    setTimeout(() => handlePrint());
  };

  return (
    <>
      <HStack
        w={["100%"]}
        height={"fit-content"}
        justifyContent={["center", "center", "flex-end"]}
        bg={"black"}
      >
        <Button
          variant={"accent-outline"}
          w={["250px"]}
          mr={28}
          my={5}
          onClick={printReport}
          disabled={printLoading}
        >
          {printLoading ? (
            <Flex mr={5}>
              <Loader size={25} color="#3E15F4" />
            </Flex>
          ) : (
            <DownloadIcon mr={5} />
          )}
          Download Report
        </Button>
      </HStack>

      {data ? (
        <Flex flexDir={"column"} overflow={"hidden"}>
          {printLoading && (
            <Box w={0} h={0} visibility={"hidden"}>
              <Box w="100vw" ref={componentRef}>
                <PrintContainer summary_report={data.summary_report} />
              </Box>
            </Box>
          )}
          <ReportContainer
            summary_report={data.summary_report}
            isPublicReport={true}
          />
        </Flex>
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
