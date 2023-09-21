import React, { useState, Dispatch, SetStateAction } from "react";
import {
  HStack,
  Image,
  Flex,
  VStack,
  Text,
  Heading,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { Profile, PricingData, Plan } from "common/types";
import { publishReportType } from "common/values";
import RadioButton from "components/styled-components/RadioButton";

const SelectReportType: React.FC<{
  profile: Profile;
  plans: PricingData;
  reportType: "self_published" | "verified" | "assisted" | undefined;
  setReportType: Dispatch<
    SetStateAction<"self_published" | "verified" | "assisted" | undefined>
  >;
  onReportTypeSelect: any;
}> = ({ profile, plans, reportType, setReportType, onReportTypeSelect }) => {
  let publishPackage =
    profile?.current_package === "pro" || profile?.current_package === "custom"
      ? "pro/custom"
      : "non-pro";

  return (
    <HStack spacing={20} h={"100%"} mt={6}>
      <ReportTypeCard
        type={"self_published"}
        reportType={reportType}
        setReportType={setReportType}
        pricing={plans?.pricing_data}
        publishPackage={publishPackage}
        icon={"user"}
        onReportTypeSelect={onReportTypeSelect}
      />
      <ReportTypeCard
        type={"verified"}
        reportType={reportType}
        setReportType={setReportType}
        pricing={plans?.pricing_data}
        publishPackage={publishPackage}
        icon={"ss-shield"}
        onReportTypeSelect={onReportTypeSelect}
      />
      <ReportTypeCard
        type={"assisted"}
        reportType={reportType}
        setReportType={setReportType}
        pricing={plans?.pricing_data}
        publishPackage={publishPackage}
        icon={"assisted"}
        onReportTypeSelect={onReportTypeSelect}
      />
    </HStack>
  );
};

const ReportTypeCard: React.FC<{
  type: "self_published" | "verified" | "assisted";
  reportType: "self_published" | "verified" | "assisted" | undefined;
  setReportType: Dispatch<
    SetStateAction<"self_published" | "verified" | "assisted" | undefined>
  >;
  onReportTypeSelect: any;
  publishPackage: string;
  pricing: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
  icon: string;
}> = ({
  type,
  reportType,
  setReportType,
  onReportTypeSelect,
  publishPackage,
  pricing,
  icon,
}) => {
  const assetsURL = getAssetsURL();
  const [isHovered, setIsHovered] = useState(false);

  let reportTypeCycle =
    type === "self_published" ? "publish_report" : "verified_publish_report";
  let reportPlan = pricing[reportTypeCycle][publishPackage];

  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      h={"100%"}
      cursor={"pointer"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex
        borderRadius={"15px"}
        p={4}
        bg={type === reportType ? "white" : "#F7F9FC"}
        border={type === reportType ? "1px solid #52FF01" : "none"}
        boxShadow={type === reportType ? "0px 4px 23px 0px #2FF86B33" : ""}
        flexDir={"column"}
        w={["150px", "150px", "150px", "230px"]}
        h={["150px", "150px", "150px", "230px"]}
        onClick={() => setReportType(type)}
      >
        <Flex ml={"auto"}>
          <RadioButton isActive={type === reportType} />
        </Flex>
        <VStack spacing={[4, 4, 4, 6]} mt={[2, 2, 2, 8]}>
          <Image src={`${assetsURL}report/${icon}.svg`} />
          <Text fontSize={["sm", "sm", "sm", "lg"]} fontWeight={600}>
            {publishReportType[type]}
          </Text>
        </VStack>
      </Flex>

      {type === "assisted" ? (
        <Flex textAlign="center" mt={10} mb={6}>
          <Heading fontSize={"x-large"} fontWeight={"extrabold"}>
            Contact Team
          </Heading>
        </Flex>
      ) : (
        <Flex textAlign="center" mt={10} mb={6}>
          <Heading fontSize={"x-large"} fontWeight={"extrabold"}>
            {reportPlan ? `$${reportPlan.amount}` : "Free"}&nbsp;
          </Heading>
          <Text fontSize="xs" color="detail" mt={2}>
            / report
          </Text>
        </Flex>
      )}
      <Button
        w="220px"
        h={"50px"}
        mt={6}
        alignContent={"center"}
        variant={isHovered || type === reportType ? "brand" : "gray-outline"}
        onClick={() => {
          onReportTypeSelect(type, reportTypeCycle, publishPackage);
        }}
      >
        {isHovered || type === reportType ? "Proceed" : "Select"}
      </Button>
      <Link
        href="https://docs.solidityscan.com/"
        isExternal
        color={"accent"}
        mt={16}
        visibility={isHovered || type === reportType ? "visible" : "hidden"}
      >
        Know more
      </Link>
    </Flex>
  );
};

export default SelectReportType;
