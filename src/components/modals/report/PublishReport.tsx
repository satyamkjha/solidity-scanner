import React, { useState, useEffect } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { Scan, Profile, PricingData } from "common/types";
import SelectReportType from "./SelectReportType";
import PublishReportForm from "./PublishReportForm";
import ManualAuditForm from "../manualAuditForm";
import PaymentModal from "../PaymentModal";

export const PublishReport: React.FC<{
  type: "project" | "block";
  scanData: {
    scan_report: Scan;
    is_latest_scan: boolean;
    webhook_enabled?: boolean;
  };
  projectId: string;
  profile: Profile;
  plans: PricingData;
  lastTimeUpdate: string;
  onClose(): any;
  isOpen: boolean;
}> = ({
  type,
  scanData,
  projectId,
  profile,
  plans,
  isOpen,
  lastTimeUpdate,
  onClose,
}) => {

  const [modalHeader, setModalHeader] = useState("Publish Report");
  const [modalState, setModalState] = useState("");
  const [openPayment, setOpenPaymnet] = useState(false);

  const [reportType, setReportType] = useState<
    "self_published" | "verified" | "assisted"
  >();
  const [assistedFormOpen, setAssistedFormOpen] = useState(false);
  const [reportTypeCycle, setReportTypeCycle] = useState("");
  const [publishPackage, setPublishPackage] = useState("");

  useEffect(() => {
    setModalHeader("Publish Report");
    setModalState("report_type");
  }, []);

  const onReportTypeSelect = (
    report_type: "self_published" | "verified" | "assisted",
    billiing_cycle: string,
    publish_package: string
  ) => {
    setReportType(report_type);
    setReportTypeCycle(billiing_cycle);
    setPublishPackage(publish_package);
    setAssistedFormOpen(report_type === "assisted");
    setModalState("publish_details");
    if (report_type === "self_published")
      setModalHeader("Self-Published Report");
    else setModalHeader("Publish Verified Report");
  };

  const onPublishReport = (status: string) => {
    if (status === "success") {
      setModalState("make_payment");
      setOpenPaymnet(true);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          h={["auto", "auto", "auto", "650px"]}
          minH={"fit-content"}
          maxW={["90vw", "90vw", "70vw"]}
          minW={"300px"}
          borderRadius="15px"
        >
          <ModalHeader textAlign={["center"]} py={10}>
            {modalHeader}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              h={"100%"}
              flexDir="row"
              p={4}
              pb={6}
            >
              {modalState === "report_type" ? (
                <SelectReportType
                  profile={profile}
                  plans={plans}
                  reportType={reportType}
                  setReportType={setReportType}
                  onReportTypeSelect={onReportTypeSelect}
                />
              ) : modalState === "publish_details" ? (
                <PublishReportForm
                  type={type}
                  reportType={reportType}
                  projectId={projectId}
                  lastTimeUpdate={lastTimeUpdate}
                  scanData={scanData}
                  onPublishReport={onPublishReport}
                />
              ) : modalState === "make_payment" ? (
                <PaymentModal
                  globalDuration={reportTypeCycle}
                  selectedPlan={publishPackage}
                  profileData={profile}
                  pricingDetails={plans.pricing_data}
                  isOpen={openPayment}
                  onClose={() => {
                    setOpenPaymnet(false);
                    onClose();
                  }}
                  paymentMetadata={{
                    project_type: type,
                    project_id: projectId,
                    report_id: scanData?.scan_report.latest_report_id,
                    report_type: reportType,
                  }}
                />
              ) : null}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ManualAuditForm
        isOpen={assistedFormOpen}
        onClose={() => {
          setAssistedFormOpen(false);
          onClose();
        }}
        type={"Assisted_Audit_Report"}
        header={"Assisted-audit"}
      />
    </>
  );
};
