import React, { useRef, useEffect, useState } from "react";
import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useIntersectionObserver } from "helpers/observerManager";

const PDFContainer: React.FC<{
  page: string;
  content: any;
  setCurrentPageHeadings: React.Dispatch<
    React.SetStateAction<(string | null)[] | undefined>
  >;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  pageNumber?: number;
}> = ({
  page,
  content,
  setCurrentPageHeadings,
  setCurrentPage,
  pageNumber,
}) => {
  const assetsURL = getAssetsURL();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const observerRef = useIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Update state based on whether the container is in the viewport
      setIsInViewport(entry.isIntersecting);
      if (entry.isIntersecting && containerRef.current) {
        const pageElements = containerRef.current.getElementsByClassName(
          "ss-report-right-nav"
        );
        const pageElementsContentList = Array.from(pageElements).map(
          (element) => element.getAttribute("content")
        );
        setCurrentPageHeadings(pageElementsContentList);
        setCurrentPage({ value: page.split("-")[0] });
      }
    });
  });

  useEffect(() => {
    if (containerRef.current && observerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current && observerRef.current) {
        observerRef.current.unobserve(containerRef.current);
      }
    };
  }, [containerRef, observerRef]);

  return (
    <Box
      ref={containerRef}
      className={`ss-report-${page} ${isInViewport ? "in-view" : ""}`}
      w="794px"
      h={"fit-content"}
      bg={"white"}
      position={"relative"}
    >
      <Box
        position={"absolute"}
        top={0}
        right={0}
        h={"270px"}
        w={"260px"}
        bgImage={`url("${assetsURL}report/report-watermark.svg")`}
        bgSize={"cover"}
      ></Box>
      <Box
        w="100%"
        h="1123px"
        py={page !== "cover" ? 10 : 0}
        px={page !== "cover" ? 10 : 0}
        position={"relative"}
        className="content"
      >
        {content}
      </Box>
      <Flex
        w="100%"
        h={"fit-content"}
        p={4}
        px={6}
        position={"absolute"}
        bottom={2}
        color={"#8A94A6"}
        className="footer"
        fontSize={"10px"}
        zIndex={2}
        pointerEvents={"none"}
      >
        {pageNumber ? <Text>Page {pageNumber}</Text> : null}
        <HStack ml={"auto"}>
          <Text>SolidityScan</Text>
          <Box borderRadius={"50%"} bg={"#8A94A6"} w={"4px"} h={"4px"}></Box>
          <Text>A security assessment report</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default PDFContainer;
