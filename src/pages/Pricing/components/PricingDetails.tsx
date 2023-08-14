import React, { useState, Suspense, lazy } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Grid,
  Switch,
} from "@chakra-ui/react";
import { PricingData } from "common/types";
import { pricing_table_data } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { useHistory } from "react-router-dom";
import { CurlyArrowUp, CurlyArrowDown } from "components/icons";
import { PricingCard } from "./pricingCard";

const CustomPlanCard = lazy(() => import("./customPlanCard"));
const PricingTable = lazy(() => import("./pricingTable"));

const PricingDetails: React.FC<{
  pricingDetails: PricingData;
  page: "billing" | "pricing";
  currentPackage?: string;
}> = ({ pricingDetails, page, currentPackage }) => {
  const assetsURL = getAssetsURL();
  const history = useHistory();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState<"monthly" | "yearly" | "ondemand">(
    "monthly"
  );

  return (
    <Flex
      id={"pricing-details"}
      w="100%"
      flexDir={"column"}
      alignItems={"center"}
      justifyContent="flex-start"
      p={0}
    >
      <Flex
        flexDir={"column"}
        justifyContent="flex-start"
        alignItems={"center"}
        w={"100%"}
        px={[5, 10, 10]}
        py={"60px"}
        h={["1100px", "1000px", "800px", "720px", "720px"]}
        backgroundColor="#FFFFFF"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        background={[
          `url('${assetsURL}pricing/pricing_bg_xs.jpg')`,
          `url('${assetsURL}pricing/pricing_bg_sm.jpg')`,
          `url('${assetsURL}pricing/pricing_bg_md.jpg')`,
          `url('${assetsURL}pricing/pricing_bg_lg.jpg')`,
          `url('${assetsURL}pricing/pricing_bg_xl.jpg')`,
        ]}
      >
        <Heading
          color={"white"}
          fontSize={
            page === "pricing" ? ["3xl", "3xl", "4xl", "4xl", "5xl"] : "3xl"
          }
          mb={7}
          textAlign="center"
        >
          Choose the plan that{" "}
          <Box
            as="span"
            sx={{
              background:
                "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            fits{" "}
          </Box>
          your{" "}
          <Box
            as="span"
            sx={{
              background:
                "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            needs.
          </Box>
        </Heading>
        <Text
          w={["90%", "90%", "80%", "70%", "60%"]}
          textAlign="center"
          fontSize={page === "pricing" ? ["md", "lg", "xl"] : "md"}
          color="#B0B7C3"
          fontWeight={300}
        >
          Enterprise dealing in Crypto Development or Security with large team
          size. Get your scan results and reports vetted by our security
          professionals
        </Text>

        {page === "pricing" && (
          <>
            <Text
              w={["90%", "90%", "80%", "70%", "60%"]}
              my={8}
              textAlign="center"
              fontSize={["md", "lg", "xl"]}
              color="#2FF86B"
              fontWeight={700}
            >
              Try our trial version now and get two free scans upon signing up!
            </Text>

            <Button
              width="200px"
              onClick={() => history.push("/signin")}
              variant="brand"
            >
              Start Free Trial
            </Button>
          </>
        )}
        <Flex
          flexDir={"row"}
          position={"relative"}
          py={10}
          mt={page === "pricing" ? 0 : 10}
          alignItems={["flex-start", "flex-start", "flex-end"]}
          justifyContent="center"
          height={["100px", "100px", "140px"]}
          width="300px"
        >
          <Text
            color={duration === "monthly" ? "#FFFFFF" : "gray.400"}
            fontSize="md"
            fontWeight={300}
          >
            Pay Monthly
          </Text>
          <Switch
            mx={5}
            size="lg"
            variant="brand"
            isChecked={duration === "yearly"}
            onChange={() => {
              if (duration === "monthly") {
                setDuration("yearly");
              } else {
                setDuration("monthly");
              }
            }}
          />
          <Text
            color={duration === "yearly" ? "#FFFFFF" : "gray.400"}
            fontSize="md"
            fontWeight={300}
          >
            Pay Yearly
          </Text>
          {duration === "yearly" && (
            <Flex
              flexDir={"column"}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              position={"absolute"}
              top={["70px", "70px", "-30px"]}
              right={["150px", "70px", "-100px"]}
            >
              <Box display={["block", "block", "none"]}>
                <CurlyArrowUp size={50} />
              </Box>
              <Text
                fontSize={"md"}
                ml={[-10, -10, 10]}
                color="gray.200"
                fontWeight={900}
              >
                Just pay for
              </Text>
              <Heading ml={[-10, -10, 10]} fontSize={"md"} color="#FFFFFF">
                10 MONTHS
              </Heading>
              <Box display={["none", "none", "block"]}>
                <CurlyArrowDown size={70} />
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex
        w={["95%", "95%", "95%", "100%"]}
        flexDir={"column"}
        h={["fit-content", "fit-content", "fit-content", "850px"]}
        alignItems={"center"}
        justifyContent="flex-end"
        backgroundColor="#FFFFFF00"
        mt={page === "pricing" ? "-300px" : "-430px"}
        px={page === "pricing" ? [16] : [4]}
      >
        <Grid
          backgroundColor="#FFFFFF00"
          w="100%"
          h="fit-content"
          px={2}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={page === "pricing" ? 6 : 4}
        >
          {Object.keys(pricingDetails.pricing_data["ondemand"]).map((plan) => {
            if (plan !== "custom" && plan !== "trial") {
              return (
                <PricingCard
                  page={page}
                  globalDuration={"ondemand"}
                  plan={plan}
                  currentPackage={currentPackage}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  pricingDetails={pricingDetails.pricing_data}
                />
              );
            }
            return <></>;
          })}
          {Object.keys(pricingDetails.pricing_data[duration])
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((plan) => {
              if (plan !== "custom" && plan !== "trial") {
                return (
                  <PricingCard
                    page={page}
                    globalDuration={duration}
                    plan={plan}
                    currentPackage={currentPackage}
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    pricingDetails={pricingDetails.pricing_data}
                  />
                );
              }
              return <></>;
            })}
        </Grid>
      </Flex>
      <Suspense fallback={""}>
        <Flex px={page === "pricing" ? [8, 8, 8, 16] : [4]}>
          <CustomPlanCard />
        </Flex>
        <PricingTable
          pricing_data={pricingDetails.pricing_data}
          pricing_table_data={pricing_table_data}
        />
      </Suspense>
    </Flex>
  );
};

export default PricingDetails;
