import {
  Flex,
  Text,
  Image,
  Heading,
  Box,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

const Infographics: React.FC<{ header?: any; subHeader?: any }> = ({
  header,
  subHeader,
}) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const no_of_vuln_detectors =
    config && config.REACT_APP_ISSUES_DATA.no_of_vuln_detectors;

  const [singleRow, doubleRow] = useMediaQuery([
    "(max-width: 600px)",
    "(max-width: 1200px)",
  ]);

  const data: {
    url: string;
    text: string;
  }[] = [
    { url: "landing/infographic_1.svg", text: "Initiate Scans" },
    {
      url: "landing/infographic_2.svg",
      text: "Publish Reports",
    },
    {
      url: "landing/infographic_3.svg",
      text: `${no_of_vuln_detectors}+ Vulnerability Checks`,
    },
    {
      url: "landing/infographic_4.svg",
      text: "Easy Integrations",
    },
  ];

  return (
    <Flex w={"100%"} flexDir="column" alignItems="center" mb={14}>
      {header ? (
        header
      ) : (
        <Heading as="h1" fontSize="3xl" mb={4}>
          Why{" "}
          <Box textDecoration="underline" as="span" color="#3300FF">
            SolidityScan ?
          </Box>{" "}
        </Heading>
      )}
      {subHeader ? (
        subHeader
      ) : (
        <Text
          color="subtle"
          fontSize={["lg", "lg", "xl"]}
          w={["90%", "90%", "90%", "50%"]}
          textAlign="center"
        >
          Smart-contract scanning tool built to discover vulnerabilities &
          mitigate risks in your code.
        </Text>
      )}
      <Grid
        backgroundColor="#FFFFFF00"
        w={["100%", "100%", "100%", "70%"]}
        maxW="900px"
        h="fit-content"
        my={10}
        templateColumns={
          singleRow
            ? "repeat(1, 1fr)"
            : doubleRow
            ? "repeat(2, 1fr)"
            : "repeat(4, 1fr)"
        }
      >
        {data.map((item, index) => (
          <GridItem
            w="100%"
            display="flex"
            h={"300px"}
            justifyContent="center"
            sx={{
              flexDir: "column",
              alignItems: "center",
              mb: [8, 8, 0],
            }}
          >
            <Image
              src={`${assetsURL}${item.url}`}
              height={"140px"}
              width={"140px"}
            />
            <Text fontSize="sm" ml="2" mt={4} fontWeight={600}>
              {item.text}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Infographics;
