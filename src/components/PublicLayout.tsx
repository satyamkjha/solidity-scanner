import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./landingHeader";
import { Box, Container, HStack, Text, Flex } from "@chakra-ui/react";
import Infographics from "./infographics";
import SignupBox from "./signupBox";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CloseIcon } from "@chakra-ui/icons";

const MotionFlex = motion(Flex);

const PublicLayout: React.FC = ({ children }) => {
  const location = useLocation();

  // const [isBannerOpen, setIsBannerOpen] = useState(true);

  useEffect(() => {
    const element = document.getElementById("public_layout");
    element?.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return (
    <Container
      id={"public_layout"}
      maxW={"100vw"}
      overflowX="hidden"
      overflowY="scroll"
      padding={0}
      m={0}
      h="100vh"
    >
      {/* {isBannerOpen && (
        <MotionFlex
          initial={{ height: 0 }}
          animate={{ height: "25px" }}
          sx={{
            w: "100%",
            justifyContent: "center",
            py: 1,
            bg: "brand-dark",
          }}
        >
          <HStack justifyContent="center" w="calc(100% - 30px)">
            <Text
              cursor="pointer"
              fontSize="12px"
              color="white"
              onClick={() =>
                window.open(
                  "https://proofofsecurity.solidityscan.com/",
                  "_blank"
                )
              }
              fontWeight={700}
            >
              Proof of Security Summit'23 - India
            </Text>
            <Text fontSize="12px" color="white" fontWeight={700}>
              |
            </Text>
            <Text
              cursor="pointer"
              fontSize="12px"
              color="white"
              fontWeight={700}
              onClick={() => window.open("https://lu.ma/x3063d6n", "_blank")}
            >
              Register here
            </Text>
          </HStack>
          <CloseIcon
            mr="10px"
            cursor="pointer"
            fontSize="13px"
            color="white"
            onClick={() => setIsBannerOpen(false)}
          />
        </MotionFlex>
      )} */}

      {children}
      <Box
        display={"flex"}
        flexDir="column"
        alignItems="center"
        justifyContent={"center"}
        w={"100%"}
        px={[0, 0, 10]}
        py={10}
        borderRadius={20}
        background={"#FFFFFF"}
      >
        {location.pathname !== "/" && <Infographics />}
        <SignupBox />
      </Box>
      <Footer />
    </Container>
  );
};

export default PublicLayout;
