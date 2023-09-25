import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { Profile, Plan } from "common/types";
import { sentenceCapitalize, getAssetsURL } from "helpers/helperFunction";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import PaymentModal from "../../../components/modals/PaymentModal";

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
            src={`${assetsURL}pricing/${planData.name}-heading.svg`}
          />
          <Text fontSize="2xl" fontWeight={700} ml={1}>
            {sentenceCapitalize(planData.name)}
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
                <Text>{sentenceCapitalize(topUpData[key].name)}</Text>
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
            <strong> {sentenceCapitalize(planData.name)} </strong> plan.
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
        <Text fontSize="lg">How many credits you need to buy?</Text>
        <Flex
          w="100%"
          h="80px"
          my={5}
          borderRadius={"15px"}
          border={optionsSelected ? "1px solid #52FF00" : "1px solid #ECECEC"}
          boxShadow={
            optionsSelected ? "0px 12px 23px rgba(107, 255, 55, 0.06)" : "none"
          }
          onClick={() => setOptionsSelected(true)}
        >
          <Flex w="100%">
            <Menu matchWidth>
              <MenuButton w="100%" textAlign="left">
                <Flex p={4} w="100%">
                  <Image
                    w="34px"
                    h="34px"
                    src={`${assetsURL}pricing/coin.svg`}
                  />

                  <Box w="1px" background="#ECECEC" mx={4}></Box>
                  <Text fontSize="2xl" fontWeight={800} ml={2}>
                    {creditOptions[selectedIndex]}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList
                maxH={"220px"}
                overflow="scroll"
                boxShadow={"0px 2px 13px rgba(0, 0, 0, 0.25)"}
                borderRadius="15px"
              >
                {creditOptions.map((item: string, index: number) => (
                  <>
                    {index !== 0 && (
                      <MenuItem
                        w="100%"
                        p={2}
                        pl={6}
                        onClick={() => setSelectedIndex(index)}
                      >
                        <Image
                          w="20px"
                          h="20px"
                          src={`${assetsURL}pricing/coin.svg`}
                        />
                        <Flex align="center">
                          <Text fontSize="2xl" fontWeight={800} ml={4}>
                            {item}
                          </Text>
                          <Text fontSize="lg" ml={2}>
                            credits
                          </Text>
                        </Flex>
                      </MenuItem>
                    )}
                    {index !== 0 && creditOptions.length - 1 !== index && (
                      <Divider borderColor={"#ECECEC"} />
                    )}
                  </>
                ))}
              </MenuList>
            </Menu>
          </Flex>
          <Flex
            flexDir="column"
            ml="auto"
            w={["15%", "15%", "10%", "10%"]}
            h="100%"
            alignItems="center"
            justifyContent="center"
            borderLeft={"1px solid #ECECEC"}
          >
            <Flex
              w="100%"
              h="50%"
              align="center"
              justifyContent="center"
              borderTopRightRadius="15px"
              cursor="pointer"
              _hover={{
                background: "#ECECEC",
              }}
              onClick={() =>
                setSelectedIndex(
                  Math.min(selectedIndex + 1, creditOptions.length - 1)
                )
              }
            >
              <ChevronUpIcon color={"subtle"} fontSize="xl" />
            </Flex>
            <Divider borderColor={"#ECECEC"} />
            <Flex
              w="100%"
              h="50%"
              align="center"
              justifyContent="center"
              borderBottomRightRadius="15px"
              cursor="pointer"
              _hover={{
                background: "#ECECEC",
              }}
              onClick={() => setSelectedIndex(Math.max(selectedIndex - 1, 0))}
            >
              <ChevronDownIcon color={"subtle"} fontSize="xl" />
            </Flex>
          </Flex>
        </Flex>
        <Text
          fontSize="xl"
          mt={2}
        >{`${creditOptions[selectedIndex]} credits`}</Text>
        <Flex w="100%" textColor="subtle" my={2}>
          <Text>{`$${currentTopUpPlan.amount} Per Credit  X  ${creditOptions[selectedIndex]}`}</Text>
          <Text ml="auto">{`$${
            parseFloat(currentTopUpPlan.amount) *
            parseInt(creditOptions[selectedIndex])
          }`}</Text>
        </Flex>
        <Divider borderColor={"#EAEAEA"} my={4} />
        <Flex align="center" w="100%">
          <Text fontSize="lg">Total</Text>
          <Text fontSize="2xl" fontWeight={800} ml="auto">
            {`$${Number(
              parseFloat(currentTopUpPlan.amount) *
                parseInt(creditOptions[selectedIndex])
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
          isDisabled={selectedIndex === 0}
          onClick={onOpen}
        >
          Make Payment
        </Button>
      </Flex>
      {isOpen && (
        <PaymentModal
          globalDuration={"topup"}
          selectedPlan={planData.name}
          quantity={parseInt(creditOptions[selectedIndex])}
          profileData={profile}
          pricingDetails={pricingDetails}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Flex>
  );
};

export default ScanCredits;
