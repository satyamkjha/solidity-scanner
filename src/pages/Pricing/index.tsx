import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Button,
  Text,
  Flex,
  SimpleGrid,
  ButtonProps,
  Link,
  ScaleFade,
  useDisclosure,
  HStack,
  Image,
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import { PricingCard } from "./components/pricingCard";
import { useState } from "react";
import ContactUs from "components/contactus";

export default function PricingPage() {
  const [tab, setTab] = useState<string>("weekly");
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Header />
      <Container maxW="100vw" color="black">
        <Flex
          maxW="7xl"
          mx="auto"
          flexDirection="column"
          alignItems="center"
          py={7}
          px={4}
          background="rgba(82, 255, 0, 0.04)"
          backgroundImage="url(./pattern.png)"
          borderRadius="3xl"
        >
          <Text
            fontSize="4xl"
            fontWeight="700"
            my={1}
            color="#323B4B"
            textAlign="center"
            lineHeight="title"
          >
            Pricing
          </Text>
          <Text
            color="#323B4B"
            width={["100%", "50%"]}
            lineHeight="title"
            fontWeight="500"
            textAlign="center"
            fontSize="lg"
            fontFamily="Inter"
            my={3}
          >
            Signup for a trial and get two scans free.
          </Text>
          {/* <Flex
            flexDirection="row"
            alignItems="center"
            mt={7}
            px={2}
            py={2}
            background="#FFFFFF"
            borderRadius="full"
            maxW="85vw"
          > */}
          {/* <ActionButton
              onClick={() => setTab("weekly")}
              fontSize="lg"
              py={1}
              px={10}
              borderRadius="full"
              mr={1}
              variant={tab === "weekly" ? "brand" : "ghost"}
            >
              Weekly
            </ActionButton> */}
          {/* <ActionButton
              onClick={() => setTab("monthly")}
              fontSize="lg"
              py={1}
              px={10}
              borderRadius="full"
              mx={1}
              variant={tab === "monthly" ? "brand" : "ghost"}
            >
              Monthly
            </ActionButton> */}
          {/* <ActionButton
              onClick={() => setTab("yearly")}
              fontSize="lg"
              py={1}
              px={10}
              borderRadius="full"
              ml={1}
              variant={tab === "yearly" ? "brand" : "ghost"}
            >
              Yearly
            </ActionButton> */}
          {/* </Flex> */}
        </Flex>
          <ScaleFade initialScale={0.9} in={tab === "weekly"}>
            <Box
              px={16}
              as="section"
              py="14"
              display="flex"
              flexDirection="row"
            >
              <Flex
                as={"div"}
                flexDirection="column"
                justifyContent={"flex-start"}
                alignContent={"flex-start"}
              >
                <Box
                  as="div"
                  py={"25px"}
                  px={"100px"}
                  display="flex"
                  flexDirection="row"
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="700"
                    my={1}
                    textAlign="center"
                    lineHeight="title"
                  >
                    Packages
                  </Text>
                </Box>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderTopLeftRadius={"xl"}
                  border="1px solid #D6D6D6"
                  borderRightWidth={0}
                  borderBottomWidth={0}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/coin.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Scan Credit
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="1px solid #D6D6D6"
                  backgroundColor={'#FAFAFB'}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/github.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Private Github
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="1px solid #D6D6D6"
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/report.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Generate Report
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="1px solid #D6D6D6"
                  borderBottom="1px solid #D6D6D6"
                  backgroundColor={'#FAFAFB'}
                  borderBottomLeftRadius={"xl"}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/publish.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Publishable Reports
                    </Text>
                  </HStack>
                </Box>
              </Flex>
              <SimpleGrid
                columns={4}
                maxW="7xl"
                justifyItems="center"
                alignItems="center"
              >
                <PricingColumn/>
              </SimpleGrid>
            </Box>
          </ScaleFade>
       
      </Container>
      <ContactUs isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  );
}

export const ActionButton = (props: ButtonProps) => (
  <Button
    variant="brand"
    size="lg"
    w="full"
    fontWeight="extrabold"
    py={{ md: "8" }}
    {...props}
  />
);


export const PricingColumn = () => {

  return (
              <Flex
                as={"div"}
                flexDirection="column"
                justifyContent={"flex-start"}
                alignContent={"flex-start"}
              >
                <Box
                  as="div"
                  py={"25px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="column"
                  borderTopLeftRadius={"xl"}
                  border="1px solid #D6D6D6"
                  borderRightWidth={0}
                >
                  <Text
                      fontSize="md"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Free
                    </Text>
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Ultra Noob
                    </Text>
                    <Text
                      fontSize="xl"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'extrabold'}
                    >
                      Free
                    </Text>
                </Bsdasdasdasdaox>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="1px solid #D6D6D6"
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/coin.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Scan Credit
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="1px solid #D6D6D6"
                  backgroundColor={'#FAFAFB'}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/github.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Private Github
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="1px solid #D6D6D6"
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/report.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Generate Report
                    </Text>
                  </HStack>
                </Box>
                <Box
                  as="div"
                  py={"40px"}
                  px={"50px"}
                  display="flex"
                  flexDirection="row"
                  borderLeft="1px solid #D6D6D6"
                  borderBottom="1px solid #D6D6D6"
                  backgroundColor={'#FAFAFB'}
                  borderBottomLeftRadius={"xl"}
                >
                  <HStack spacing={1}>
                    <Image src="/pricing/publish.svg" mx="auto" mr={4} />
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      lineHeight="title"
                      fontWeight={'300'}
                    >
                      Publishable Reports
                    </Text>
                  </HStack>
                </Box>
              </Flex>
)}
