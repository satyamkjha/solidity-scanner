import React from "react";
import Footer from "./footer";
import Header from "./landingHeader";
import { Box, Container } from "@chakra-ui/react";
import Infographics from "./infographics";
import SignupBox from "./signupBox";
import { useLocation } from "react-router-dom";

const PublicLayout: React.FC = ({ children }) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  const location = useLocation();

  return (
    <Container
      maxW={"100vw"}
      overflowX="hidden"
      overflowY="scroll"
      padding={0}
      m={0}
      h="100vh"
    >
      {location.pathname !== "/" && <Header />}
      <main>{children}</main>
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
