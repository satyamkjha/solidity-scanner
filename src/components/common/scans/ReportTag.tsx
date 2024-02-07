import React from "react";
import { HStack, Text, Image, useDisclosure } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import ManualAuditForm from "components/modals/manualAuditForm";
import ReportTypeDetailModal from "components/modals/ReportTypeDetailModal";

const ReportTag: React.FC<{ is_approved: boolean; theme?: string }> = ({
  is_approved,
  theme = "dark",
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const assetsUrl = getAssetsURL();

  return (
    <>
      <HStack
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        bgColor={theme === "light" ? "white" : "#272727"}
        border={`1px dashed ${is_approved ? "#52FF00" : "#8D8D8D"}`}
        p={5}
        borderRadius={10}
      >
        <Image
          src={`${assetsUrl}quickscan/ss_quickscan_report${
            is_approved ? "" : "_not"
          }_approved.svg`}
          height="56px"
          width="56px"
        />
        <Text
          textAlign={["left", "left", "left"]}
          color={is_approved ? "#52FF00" : "#8D8D8D"}
        >
          This audit report has {is_approved ? "" : "not"} been verified by the
          SolidityScan team. To learn more about our published reports.{" "}
          <span
            style={{
              color: theme === "light" ? "#3300FF" : "white",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => onOpen()}
          >
            click here.
          </span>
        </Text>
      </HStack>
      <ReportTypeDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ReportTag;
