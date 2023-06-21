import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { usePricingPlans } from "hooks/usePricingPlans";
import PricingDetails from "./components/PricingDetails";

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
          <Spinner />
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
            </Flex>
          </>
        )
      )}
    </>
  );
};

export default PricingPage;
