import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Image,
  Flex,
  Text,
  Heading,
  Button,
  Link,
  Stack,
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
  let reportTypeCycle =
    reportType === "self_published"
      ? "publish_report"
      : "verified_publish_report";

  return (
    <Stack
      direction={["column", "column", "column", "row"]}
      spacing={[8, 8, 8, 20]}
      w={"100%"}
      h={"100%"}
      mt={[2, 2, 2, 6]}
      alignItems={"center"}
      justifyContent={"center"}
    >
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
      <Button
        w="250px"
        h={"50px"}
        mt={6}
        display={["flex", "flex", "flex", "none"]}
        alignContent={"center"}
        variant={"brand"}
        isDisabled={!reportType}
        onClick={() => {
          onReportTypeSelect(reportType, reportTypeCycle, publishPackage);
        }}
      >
        {"Proceed"}
      </Button>
      <Link
        href="https://docs.solidityscan.com/report/"
        isExternal
        color={"accent"}
        mt={16}
        display={["flex", "flex", "flex", "none"]}
      >
        Know more
      </Link>
    </Stack>
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
      flexDir={["row", "row", "row", "column"]}
      alignItems={"center"}
      justifyContent={"flex-start"}
      w={["100%", "100%", "100%", "auto"]}
      h={["auto", "auto", "auto", "100%"]}
      cursor={"pointer"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex
        borderRadius={"15px"}
        p={[6, 6, 6, 4]}
        bg={type === reportType ? "white" : "#F7F9FC"}
        border={type === reportType ? "1px solid #52FF01" : "none"}
        boxShadow={type === reportType ? "0px 4px 23px 0px #2FF86B33" : ""}
        flexDir={["row-reverse", "row-reverse", "row-reverse", "column"]}
        w={["100%", "100%", "100%", "230px"]}
        h={["100%", "100%", "100%", "230px"]}
        alignItems={"center"}
        onClick={() => setReportType(type)}
      >
        <Flex ml={"auto"}>
          <RadioButton isActive={type === reportType} />
        </Flex>
        <Stack
          direction={["row", "row", "row", "column"]}
          spacing={[4, 4, 4, 6]}
          mt={[0, 0, 0, 8]}
          alignItems={"center"}
        >
          <Image
            src={`${assetsURL}report/${icon}.svg`}
            w={["57px"]}
            h={"57px"}
          />
          <Stack>
            <Text
              fontSize={["sm", "sm", "sm", "lg"]}
              fontWeight={[400, 400, 400, 600]}
            >
              {publishReportType[type]}
            </Text>
            {type === "assisted" ? (
              <Flex
                textAlign="center"
                mt={10}
                mb={6}
                display={["flex", "flex", "flex", "none"]}
              >
                <Heading fontSize={"large"} fontWeight={"extrabold"}>
                  Contact Team
                </Heading>
              </Flex>
            ) : (
              <Flex
                textAlign="center"
                mt={10}
                mb={0}
                display={["flex", "flex", "flex", "none"]}
              >
                <Heading fontSize={"large"} fontWeight={"extrabold"}>
                  {reportPlan ? `$${reportPlan.amount}` : "Free"}&nbsp;
                </Heading>
                <Text fontSize="xs" color="detail" mt={1}>
                  / report
                </Text>
              </Flex>
            )}
          </Stack>
        </Stack>
      </Flex>

      {type === "assisted" ? (
        <Flex
          textAlign="center"
          mt={10}
          mb={6}
          display={["none", "none", "none", "flex"]}
        >
          <Heading fontSize={"x-large"} fontWeight={"extrabold"}>
            Contact Team
          </Heading>
        </Flex>
      ) : (
        <Flex
          textAlign="center"
          mt={10}
          mb={6}
          display={["none", "none", "none", "flex"]}
        >
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
        display={["none", "none", "none", "flex"]}
        alignContent={"center"}
        variant={isHovered || type === reportType ? "brand" : "gray-outline"}
        onClick={() => {
          onReportTypeSelect(type, reportTypeCycle, publishPackage);
        }}
      >
        {isHovered || type === reportType ? "Proceed" : "Select"}
      </Button>
      <Link
        href="https://docs.solidityscan.com/report/"
        isExternal
        color={"accent"}
        mt={16}
        display={["none", "none", "none", "flex"]}
        visibility={isHovered || type === reportType ? "visible" : "hidden"}
      >
        Know more
      </Link>
    </Flex>
  );
};

export default SelectReportType;
