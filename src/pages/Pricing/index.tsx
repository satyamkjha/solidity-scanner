import React, { useEffect } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { Box, Text, Flex, Heading, Spinner } from "@chakra-ui/react";
import SignupBox from "components/signupBox";
import Infographics from "components/infographics";

import Header from "components/header";
import Footer from "components/footer";
import { usePricingPlans } from "hooks/usePricingPlans";
import { getAssetsURL } from "helpers/helperFunction";
import PricingDetails from "./components/PricingDetails";
import Loader from "components/styled-components/Loader";

const PricingPage: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
  }, []);

  const { data: pricingDetails, isLoading } = usePricingPlans();

  const assetsURL = getAssetsURL();

  return (
    <>
      <Header />
      {isLoading ? (
        <Box
          w={"100%"}
          h="60vh"
          as="section"
          display={[null, null, "flex"]}
          flexDirection="row"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Loader />
        </Box>
      ) : (
        pricingDetails && (
          <>
            <Flex
              w="100%"
              flexDir={"column"}
              alignItems={"center"}
              justifyContent="flex-start"
              p={0}
            >
              <PricingDetails pricingDetails={pricingDetails} page="pricing" />
              <Box
                display={"flex"}
                flexDir="column"
                alignItems="center"
                justifyContent={"flex-start"}
                textAlign="center"
                w={"90%"}
                maxW="1920px"
                px={[0, 0, 10]}
                my={20}
                py={10}
                borderRadius={20}
                background={"#FFFFFF"}
              >
                <Heading as="h1" fontSize="3xl" mb={4}>
                  Why{" "}
                  <Box textDecoration="underline" as="span" color="#3300FF">
                    SolidityScan ?
                  </Box>{" "}
                </Heading>
                <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
                  Smart-contract scanning tool built to discover vulnerabilities
                  & mitigate risks in your code.
                </Text>
                <Infographics />
                <SignupBox />
              </Box>
            </Flex>
          </>
        )
      )}
      <Footer />
    </>
  );
};

export default PricingPage;
