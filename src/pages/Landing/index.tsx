import React, { useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import Infographics from "components/infographics";
import { getAssetsURL } from "helpers/helperFunction";
import LoadingSkeleton from "./components/loadingSkeleton";
import { useConfig } from "hooks/useConfig";

const QuickScan = lazy(() => import("./components/quickScan"));
const ProductVideo = lazy(() => import("./components/productVideo"));
const ProductOverview = lazy(() => import("./components/productOverview"));
const UserTestimonial = lazy(() => import("./components/testimonial"));
const AboutUs = lazy(() => import("./components/aboutUs"));
const ImageCarousel = lazy(() => import("./components/carousel"));
const ManualAudit = lazy(() => import("./components/manualAudit"));
const ProductNumbers = lazy(() => import("./components/productNumbers"));
const SignupBox = lazy(() => import("components/signupBox"));

export default function LandingPage() {
  const location = useLocation();

  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);
  }, []);

  return (
    <>
      <Header />
      <Container maxW={["95vw", "95vw", "95vw", "100vw"]} color="black">
        {/* Section 1 */}
        <Flex
          as="section"
          w="100%"
          my={0}
          textAlign={["center", "left"]}
          py={24}
          px={[0, 0, 0, 24]}
          display={["flex"]}
          flexDirection={["column", "column", "column", "row"]}
          alignItems={"center"}
          justifyContent={[
            "flex-start",
            "flex-start",
            "flex-start",
            "space-between",
          ]}
        >
          <Box
            w={["100%", "100%", "100%", "50%"]}
            px={[0, 0, 10]}
            py={5}
            textAlign={"center"}
            justifyContent="center"
            display={"flex"}
            flexDir="column"
            alignItems={["center", "center", "center", "flex-start"]}
          >
            <Heading as="h1" fontSize={["3xl", "4xl"]} mb={8}>
              Get your smart contracts audited by a smarter tool
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <Flex
              justifyContent={"flex-start"}
              alignItems="flex-start"
              flexDir={["column", "column", "row"]}
            >
              <Link to="/signup">
                <Button variant="brand" fontSize={"16px"} py={7} w="200px">
                  Signup For Free Trial
                </Button>
              </Link>
              <Link to="/quickscan">
                <Button
                  ml={[0, 0, 5]}
                  mt={[5, 5, 0]}
                  variant="cta-outline"
                  w="200px"
                >
                  Run A QuickScan
                </Button>
              </Link>
            </Flex>
            <a
              href="https://www.producthunt.com/posts/solidityscan?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-solidityscan"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=381735&theme=light&period=monthly&topic_id=267"
                alt="SolidityScan - The&#0032;ultimate&#0032;EVM&#0032;compatible&#0032;smart&#0032;contract&#0032;analysis&#0032;tool | Product Hunt"
                style={{ width: "250px", height: "54px", marginTop: "30px" }}
              />
            </a>
          </Box>
          <Box
            w={["100%", "100%", "100%", "55%"]}
            display={["flex"]}
            flexDirection="column"
            alignItems={"flex-end"}
          >
            {assetsURL && (
              <Image
                marginTop={["0px", "0px", "0px", "-60px"]}
                src={`${assetsURL}landing/landing_hero.png`}
                transform="translateX(20px)"
                zIndex={"10"}
                alt={"Run scans for your smart contracts"}
              />
            )}
          </Box>
        </Flex>

        {/* Section 2 */}
        <Box
          w="100%"
          as="section"
          sx={{ textAlign: "center" }}
          my={[4, 8]}
          px={[0, 0, 0, 24]}
        >
          <Heading as="h1" fontSize="3xl" mb={4}>
            Scan.{" "}
            <Box
              as="span"
              sx={{
                background:
                  "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mx: 4,
              }}
            >
              Fix.
            </Box>{" "}
            Publish.
          </Heading>
          <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
            Simple, fast, effortless.
          </Text>
          <Infographics />
        </Box>

        <Suspense
          fallback={
            <Box px={[0, 0, 0, 24]} w={"100%"}>
              <LoadingSkeleton />
            </Box>
          }
        >
          <QuickScan />
          <ProductVideo />
          <ProductOverview />
          <UserTestimonial />
          <AboutUs />
          <ImageCarousel />
          <ManualAudit />
          <ProductNumbers />
          <SignupBox />
        </Suspense>
      </Container>
      <Footer />
    </>
  );
}
