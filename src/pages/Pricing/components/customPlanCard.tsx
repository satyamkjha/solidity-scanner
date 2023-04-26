import {
  Heading,
  HStack,
  Button,
  Image,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const CustomPlanCard = () => {
  return (
    <Box
      display={"flex"}
      flexDir={["column", "column", "column", "row"]}
      alignItems="center"
      justifyContent={[
        "flex-start",
        "flex-start",
        "flex-start",
        "space-between",
      ]}
      w={"90%"}
      h={["fit-content", "fit-content", "fit-content", "350px", "300px"]}
      mt={20}
      px={10}
      py={[10, 10, 10, 5]}
      borderRadius="25px"
      background={"url('/background/custom_plan_bg.png')"}
      backgroundSize="cover"
      backgroundPosition={"center"}
      backgroundRepeat="no-repeat"
    >
      <VStack
        w={["100%", "90%", "90%", "60%"]}
        mb={[10, 10, 10, 0]}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Heading color="#B0B7C3" fontFamily={"Inter"} fontSize="3xl" mb={8}>
          Try our{" "}
          <Box
            fontWeight={900}
            fontFamily={"Poppins"}
            as="span"
            color="#FFFFFF"
          >
            Enterprise version{" "}
          </Box>
          now and get two free scans upon signing up!{" "}
        </Heading>
        <Text fontSize="xl" color="#B0B7C3" fontWeight={300}>
          Enterprise Dealing in Crypto Development or Security with Large Team
          Size. Get your scan results and reports vetted by our security
          professionals
        </Text>
      </VStack>
      <VStack
        mt={[10, 10, 10, 0]}
        w={["100%", "90%", "90%", "30%"]}
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={7}
        maxWidth="300px"
      >
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          spacing={5}
        >
          <Image width="50px" height="50px" src="/pricing/coin.svg" />
          <Heading fontSize="2xl" color="#FFFFFF" fontWeight={400}>
            Unlimited Scans
          </Heading>
        </HStack>
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          spacing={5}
        >
          <Image width="50px" height="50px" src="/icons/detectorIcon.svg" />
          <Heading fontSize="2xl" color="#FFFFFF" fontWeight={400}>
            All Detectors
          </Heading>
        </HStack>

        <Button width="100%" py={6} color="white" mt={5} variant="outline">
          Contact Sales
        </Button>
      </VStack>
    </Box>
  );
};

export default CustomPlanCard;
