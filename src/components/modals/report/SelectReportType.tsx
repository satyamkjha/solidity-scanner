import React, { useState } from "react";
import {
  HStack,
  Image,
  Flex,
  VStack,
  Text,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import RadioButton from "components/styled-components/RadioButton";
import { getAssetsURL } from "helpers/helperFunction";
import { Profile, PricingData, Plan } from "common/types";
import { publishReportType } from "common/values";

const SelectReportType: React.FC<{
  profile: Profile;
  plans: PricingData;
  reportType: "self_published" | "verified" | "assisted";
  onReportTypeSelect: any;
}> = ({ profile, plans, reportType, onReportTypeSelect }) => {
  let publishPackage =
    profile?.current_package === "pro" || profile?.current_package === "custom"
      ? "pro/custom"
      : "non-pro";

  return (
    <HStack spacing={20}>
      <ReportTypeCard
        type={"self_published"}
        reportType={reportType}
        pricing={plans?.pricing_data}
        publishPackage={publishPackage}
        icon={"user"}
        onReportTypeSelect={onReportTypeSelect}
      />
      <ReportTypeCard
        type={"verified"}
        reportType={reportType}
        pricing={plans?.pricing_data}
        publishPackage={publishPackage}
        icon={"ss-shield"}
        onReportTypeSelect={onReportTypeSelect}
      />
      <ReportTypeCard
        type={"assisted"}
        reportType={reportType}
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
  reportType?: "self_published" | "verified" | "assisted";
  onReportTypeSelect?: any;
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
    <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
      <Flex
        borderRadius={"15px"}
        p={4}
        bg={"white"}
        border={"1px solid #52FF01"}
        sx={{
          boxShadow: "0px 4px 23px 0px #2FF86B33",
        }}
        flexDir={"column"}
        w={["150px", "150px", "150px", "220px"]}
        h={["150px", "150px", "150px", "220px"]}
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

      <Flex textAlign="center" mt={10} mb={6}>
        <Heading fontSize={"x-large"}>
          {reportPlan ? `$${reportPlan.amount}` : "Free"}&nbsp;
        </Heading>
        <Text fontSize="xs" color="detail" mt={2}>
          / report
        </Text>
      </Flex>
      <Button
        w="220px"
        h={"50px"}
        mt={6}
        alignContent={"center"}
        variant={isHovered ? "brand" : "gray-outline"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          onReportTypeSelect(type, reportTypeCycle, publishPackage);
        }}
      >
        {isHovered ? "Proceed" : "Select"}
      </Button>
    </Flex>
  );
};

export default SelectReportType;
