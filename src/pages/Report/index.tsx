import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Container } from "@chakra-ui/react";
import { useReport } from "hooks/useReport";
import { Text } from "@chakra-ui/react";
import { ReportContainer } from "./ReportContainer";
import Loader from "components/styled-components/Loader";
import { useProfile } from "hooks/useProfile";
import { ReportContainerV2 } from "./ReportContainerV2";

export default function ReportPage() {
  const { reportId, projectId } = useParams<{
    reportId: string;
    projectId: string;
  }>();
  const { data } = useReport(projectId, reportId);
  const { data: profile } = useProfile(true);

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
          You are viewing this report in private mode, accessible only using an
          authenticated account. This is not a public report.
        </Text>
      </Flex>
      {data && profile ? (
        <ReportContainerV2
          summary_report={data.summary_report}
          profile={profile}
          isPublicReport={false}
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
