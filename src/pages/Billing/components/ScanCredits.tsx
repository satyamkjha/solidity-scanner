import React, { useState } from "react";
import {
  Flex,
  Image,
  Text,
  Button,
  Divider,
  useDisclosure,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Profile, Plan } from "common/types";
import { getAssetsURL } from "helpers/helperFunction";
import ContactUs from "components/modals/contactus";
import { packageLabel } from "common/values";

const ScanCredits: React.FC<{
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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const assetsURL = getAssetsURL();
  const [optionsSelected, setOptionsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentTopUpPlan = topUpData[profile.current_package];
  const creditOptions = ["00", "02", "05", "10", "20", "40", "60", "80"];

  return (
    <Flex w="100%" h={"100%"} flexDir={["column", "column", "column", "row"]}>
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
                <Text fontWeight={400}>&nbsp;/ Credit</Text>
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
            Increase your scan credits with our top-up option. It will cost{" "}
            <strong>${currentTopUpPlan.amount} </strong> per credit for your
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
        <VStack
          alignItems={["center", "center", "flex-start"]}
          justifyContent="flex-start"
          textAlign={["center", "center", "left"]}
          spacing={3}
          w="100%"
          border="1px solid #FFC661"
          bgColor="#FFFCF7"
          p={5}
          borderRadius={10}
        >
          <HStack spacing={4}>
            <Image w="34px" h="34px" src={`${assetsURL}pricing/coin.svg`} />
            <Text fontSize="lg" color="#000000" fontWeight={600}>
              Scan Credits Top-up
            </Text>
          </HStack>
          <Text fontSize="sm" color="#4E5D78" fontWeight={300}>
            We are upgrading to new pricing plans, If u need Scan Credits please
            contact our team for the Scan Credits Top-up . Eu On Demand blandit
            arcu et massa sit. Purus aliquam sagittis convallis vitae aliquam
            magna.
          </Text>
          <HStack justifyContent="space-between" w="100%" alignItems="flex-end">
            <Button
              minW="200px"
              borderRadius={7}
              onClick={onOpen}
              variant="black-outline"
            >
              Contact Us
            </Button>
            <Image w="70px" h="70px" src={`${assetsURL}icons/mail-icon.svg`} />
          </HStack>
        </VStack>
        <VStack
          alignItems="center"
          justifyContent="flex-start"
          textAlign="center"
          background="linear-gradient(to right, #1BD8E330, #FBEAAA30)"
          spacing={3}
          p={5}
          display={["none", "none", "flex"]}
          borderRadius={10}
          mt={5}
        >
          <Text fontWeight={600} fontSize="lg">
            New Pricing Plans 2024
          </Text>
          <Text fontWeight={300}>
            Lorem ipsum dolor sit amet consectetur. Elit cras purus ultricies
            eget tempor. Viverra leo id potenti.
          </Text>
          <Button w="100%" variant="brand">
            Get LoCs Top up now
          </Button>
        </VStack>
      </Flex>
      {isOpen && <ContactUs isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ScanCredits;
