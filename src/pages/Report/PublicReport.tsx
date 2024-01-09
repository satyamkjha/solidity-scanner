import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Container, Button, HStack, Box } from "@chakra-ui/react";
import { PrintContainer } from "./PrintContainer";
import { usePublicReport } from "hooks/usePublicReport";
import { useReactToPrint } from "react-to-print";
import { DownloadIcon } from "@chakra-ui/icons";
import Loader from "components/styled-components/Loader";
import { ReportContainer } from "./ReportContainer";
import { ReportContainerV2 } from "./ReportContainerV2";

export default function ReportPage() {
  const { reportId, projectType } = useParams<{
    reportId: ScrollSetting;
    projectType: string;
  }>();
  const { data } = usePublicReport(projectType, reportId);

  const [printLoading, setPrintLoading] = useState<boolean>(false);

  const componentRef = useRef<HTMLDivElement | null>(null);

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
      {data ? (
        <ReportContainerV2
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
