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
  download: boolean;
}> = ({
  page,
  content,
  setCurrentPageHeadings,
  setCurrentPage,
  pageNumber,
  download,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current && observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(containerRef.current);
      }
    };
  }, [containerRef, observerRef]);

  return (
    <Box
      ref={containerRef}
      className={`ss-report-${page} ${isInViewport ? "in-view" : ""}`}
      w={download ? "826px" : ["100%", "450px", "760px", "826px"]}
      h={"fit-content"}
      bg={"white"}
      position={"relative"}
    >
      <Box
        position={"absolute"}
        top={0}
        right={0}
        h={download ? "270px" : ["140px", "160px", "270px"]}
        w={download ? "260px" : ["140px", "160px", "260px"]}
        bgImage={`url("${assetsURL}report/report-watermark.svg")`}
        bgSize={"cover"}
      ></Box>
      <Box
        w="100%"
        h={download ? "1185px" : ["570px", "750px", "1165px"]}
        py={page !== "cover" ? (download ? 10 : [5, 7, 10]) : 0}
        px={page !== "cover" ? (download ? 10 : [5, 7, 10]) : 0}
        position={"relative"}
        className="content"
      >
        {content}
      </Box>
      <Flex
        w="100%"
        h={"fit-content"}
        p={download ? 4 : [2, 2, 4]}
        px={download ? 6 : [2, 4, 6]}
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
