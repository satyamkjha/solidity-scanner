import {
  Heading,
  HStack,
  Button,
  Image,
  Box,
  VStack,
  Text,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { getAssetsURL } from "helpers/helperFunction";
import ContactUs from "components/modals/contactus";
import { useConfig } from "hooks/useConfig";

const CustomPlanCard = () => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      display={"flex"}
      flexDir={["column", "column", "column", "row"]}
      alignItems="flex-start"
      justifyContent={[
        "flex-start",
        "flex-start",
        "flex-start",
        "space-between",
      ]}
      w={["100%"]}
      h={["fit-content", "fit-content", "fit-content", "320px"]}
      mt={20}
      p={[5, 5, 5, 10]}
      borderRadius="15px"
      background={`url('${assetsURL}background/custom_plan_bg.png')`}
      backgroundSize="cover"
      backgroundPosition={"left"}
      backgroundRepeat="no-repeat"
      maxW="1920px"
    >
      <VStack
        w={["100%", "90%", "90%", "50%"]}
        mb={[10, 10, 10, 0]}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Heading
          color="#B0B7C3"
          fontFamily={"Inter"}
          fontSize="26px"
          mb={8}
          fontWeight={400}
        >
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
        <Text fontSize="lg" color="#B0B7C3" fontWeight={400}>
          Enterprise dealing in Crypto Development or Security with large team
          size. Get your scan results and reports vetted by our security
          professionals
        </Text>
      </VStack>
      <Flex
        mt={[10, 10, 10, 0]}
        w={["100%", "90%", "90%", "35%"]}
        h="100%"
        flexDir="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        maxWidth="350px"
      >
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          spacing={5}
        >
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}pricing/coin.svg`}
          />
          <Heading fontSize="22px" color="#FFFFFF" fontWeight={400}>
            Unlimited Scans
          </Heading>
        </HStack>
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          spacing={5}
          mt={4}
        >
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}icons/detectorIcon.svg`}
          />
          <Heading fontSize="22px" color="#FFFFFF" fontWeight={400}>
            All Detectors
          </Heading>
        </HStack>
        <HStack
          width="100%"
          alignItems={"center"}
          justifyContent="flex-start"
          spacing={5}
          mt={4}
        >
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}icons/security.svg`}
          />
          <Heading fontSize="22px" color="#FFFFFF" fontWeight={400}>
            Dedicated Security Team
          </Heading>
        </HStack>

        <Button
          width="100%"
          maxW={"270px"}
          onClick={onOpen}
          py={6}
          color="white"
          mt={[5, 5, 5, "auto"]}
          variant="outline"
          _hover={{
            color: "#000000",
            bgColor: "#FFFFFF",
          }}
        >
          Contact Sales
        </Button>
      </Flex>
      <ContactUs onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

export default CustomPlanCard;
