import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Divider,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { Profile, Plan } from "common/types";
import { getAssetsURL } from "helpers/helperFunction";
import PaymentModal from "../../../components/modals/PaymentModal";
import { LOCInfoContainer } from "components/locInfoContainer";
import { useLocation } from "react-router-dom";
import { packageLabel } from "common/values";

const LocTopUp: React.FC<{
  planData: Plan;
  profile: Profile;
  topUpData: {
    [plan: string]: Plan;
  };
  pricingDetails: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
}> = ({ planData, profile, topUpData, pricingDetails }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramsLoc = searchParams.get("loc");

  const { isOpen, onClose, onOpen } = useDisclosure();
  const assetsURL = getAssetsURL();
  const currentTopUpPlan = topUpData[profile.current_package];
  const [noOfLoc, setNoOfLoc] = useState(
    paramsLoc ? +paramsLoc - profile.loc_remaining : 0
  );
  const locPriceUnits = currentTopUpPlan.loc;

  return (
    <Flex w="100%" h={"60vh"} flexDir={["column", "column", "column", "row"]}>
      <Flex
        w={["100%", "100%", "100%", "55%"]}
        h="100%"
        bgColor="white"
        borderRadius="15px"
        flexDir={"column"}
        p={8}
      >
        <Text color="text">Current Selected Plan</Text>
        <Flex mt={6} mb={2} alignItems="center">
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}pricing/${profile.current_package}-heading.svg`}
          />
          <Text fontSize="2xl" fontWeight={700} ml={1}>
            {packageLabel[planData.name]}
          </Text>
        </Flex>
        <Text color="detail" fontWeight={400}>
          {planData.description}
        </Text>
        <Flex
          p={4}
          my={4}
          borderRadius="15px"
          background=" #FCFCFC"
          flexDir="column"
        >
          {Object.keys(topUpData).map((key, index) => (
            <>
              <Flex key={index} w="100%" fontSize="sm" fontWeight="600">
                <Text>{packageLabel[topUpData[key].name]}</Text>
                <Text ml="auto">{`$ ${parseFloat(topUpData[key].amount).toFixed(
                  2
                )}`}</Text>
                <Text fontWeight={400}>&nbsp;/ LOC</Text>
              </Flex>
              {index !== Object.keys(topUpData).length - 1 && (
                <Divider borderColor="#F3F3F3" my={1} />
              )}
            </>
          ))}
        </Flex>
        <Flex
          mt={[8, 8, 8, "auto"]}
          border={"1px solid #FFC661"}
          bgColor="#FFF8ED"
          p={6}
          borderRadius={"15px"}
        >
          <Text color="detail" fontWeight={400}>
            Increase your LOC with our top-up option. It will cost{" "}
            <strong>${currentTopUpPlan.amount} </strong> per LOC for your
            current
            <strong> {packageLabel[planData.name]} </strong> plan.
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={["100%", "100%", "100%", "45%"]}
        bgColor="white"
        borderRadius="15px"
        flexDir={"column"}
        py={8}
        px={10}
        ml={[0, 0, 0, 10]}
      >
        <Text fontSize="lg">How many LOC you need to buy?</Text>
        <Box w="100%" my={5}>
          <LOCInfoContainer view="topup_page" />
        </Box>
        {/* <Flex w="100%">
          
        </Flex> */}
        <InputGroup alignItems="center">
          <InputLeftElement
            height="80px"
            width="80px"
            children={
              <Image
                w="50px"
                h="50px"
                src={`${assetsURL}common/loc-code.svg`}
              />
            }
          />
          <Input
            placeholder="Enter required LOC here"
            variant={"brand"}
            size="lg"
            pl="80px"
            height="80px"
            value={noOfLoc === 0 ? "" : noOfLoc.toLocaleString("en-US")}
            type="text"
            onChange={(e) => {
              const value = parseInt(e.target.value.replace(/,/g, ""), 10);
              setNoOfLoc(isNaN(value) ? 0 : value);
            }}
          />
        </InputGroup>
        <Text fontSize="xl" mt={8}>{`${
          noOfLoc.toLocaleString("en-US") || "00"
        } LOC`}</Text>
        <Flex w="100%" textColor="subtle" my={2}>
          <Text>{`$${currentTopUpPlan.amount} Per LOC  X  ${
            noOfLoc / locPriceUnits || 0
          }`}</Text>
          <Text ml="auto">{`$${(
            parseFloat(currentTopUpPlan.amount) * (noOfLoc / locPriceUnits || 0)
          ).toFixed(2)}`}</Text>
        </Flex>
        <Divider borderColor={"#EAEAEA"} my={4} />
        <Flex align="center" w="100%">
          <Text fontSize="lg">Total</Text>
          <Text fontSize="2xl" fontWeight={800} ml="auto">
            {`$${Number(
              parseFloat(currentTopUpPlan.amount) *
                (noOfLoc / locPriceUnits || 0)
            ).toFixed(2)}`}
          </Text>
        </Flex>
        <Divider borderColor={"#EAEAEA"} my={4} />
        <Button
          variant="brand"
          p={6}
          mt={"auto"}
          w="100%"
          alignSelf="center"
          isDisabled={noOfLoc === 0}
          onClick={onOpen}
        >
          Make Payment
        </Button>
      </Flex>
      {isOpen && (
        <PaymentModal
          globalDuration={"topup"}
          selectedPlan={profile.current_package}
          quantity={noOfLoc}
          profileData={profile}
          pricingDetails={pricingDetails}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Flex>
  );
};

export default LocTopUp;
