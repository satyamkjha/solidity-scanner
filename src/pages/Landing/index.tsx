import React, { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Box, Divider } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import { VideoSkeleton } from "./components/productVideo";
import { TestimonialSkeleton } from "./components/testimonial";
import { AboutUsSkeleton } from "./components/aboutUs";
import { ManualAuditSkeleton } from "./components/manualAudit";
import Partners from "./components/partners";
import { LatestHacks } from "./components/latestHacks";
import { HeroInfographics } from "./components/heroInfographics";
import { Header } from "../../components/header";
import { LandingHero } from "./components/hero";
import QuickScan, { QSSkeleton } from "./components/quickScan";
import { InNewsSection } from "./components/inNewsSection";

const ProductVideo = lazy(() => import("./components/productVideo"));
const UserTestimonial = lazy(() => import("./components/testimonial"));
const AboutUs = lazy(() => import("./components/aboutUs"));
const ManualAudit = lazy(() => import("./components/manualAudit"));
const ProductNumbers = lazy(() => import("./components/productNumbers"));
const ProductSlides = lazy(() => import("./components/productSildes"));

export default function Landing() {
  const location = useLocation();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Section 1 */}

      <Flex
        background="#02070E"
        backgroundImage={`${assetsURL}background/hero_bg.svg`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        alignItems="center"
        justifyContent="flex-start"
        flexDir="column"
        h="fit-content"
        position="relative"
        width="100vw"
      >
        <Box
          sx={{
            borderRadius: "100px",
            opacity: 0.4,
            background: "rgba(82, 255, 0, 0.32)",
            filter: "blur(250px)",
            position: "absolute",
            width: "633.226px",
            height: "642px",
            top: -10,
            right: -30,
            zIndex: 0,
            pointerEvents: "none",
          }}
        ></Box>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="flex-start"
          flexDir="column"
          position="relative"
          zIndex={10}
        >
          <Header theme={"dark"} />

          <LandingHero />
          <HeroInfographics />
        </Flex>
        <Box
          sx={{
            borderRadius: "100px",
            opacity: 0.5,
            background: "rgba(51, 0, 255, 0.25)",
            filter: "blur(250px)",
            position: "absolute",
            width: "633.226px",
            height: "642px",
            bottom: -50,
            left: -30,
            zIndex: 0,
            pointerEvents: "none",
          }}
        ></Box>
      </Flex>

      {/* Section 2 */}

      <Suspense fallback={<QSSkeleton />}>
        <QuickScan />
      </Suspense>

      <Suspense fallback={null}>
        <ProductSlides />
      </Suspense>

      <Suspense fallback={<VideoSkeleton />}>
        <ProductVideo />
      </Suspense>

      <Partners />

      <Suspense fallback={<AboutUsSkeleton />}>
        <AboutUs />
      </Suspense>

      <Suspense fallback={<ProductNumbers />}>
        <ProductNumbers />
      </Suspense>

      <Suspense fallback={<ManualAuditSkeleton />}>
        <ManualAudit />
      </Suspense>

      <Suspense fallback={<TestimonialSkeleton />}>
        <UserTestimonial />
      </Suspense>

      <InNewsSection />

      <LatestHacks />
    </>
  );
}
