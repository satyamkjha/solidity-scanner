import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { usePricingPlans } from "hooks/usePricingPlans";
import Loader from "components/styled-components/Loader";
import PricingDetails from "./components/PricingDetails";
import { Header } from "components/header";

const PricingPage: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: pricingDetails, isLoading } = usePricingPlans();

  return (
    <>
      {isLoading ? (
        <Box
          w={"100%"}
          h="100vh"
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
          <Flex
            w="100%"
            flexDir={"column"}
            alignItems={"center"}
            justifyContent="flex-start"
            p={0}
          >
            <PricingDetails pricingDetails={pricingDetails} page="pricing" />
          </Flex>
        )
      )}
    </>
  );
};

export default PricingPage;
