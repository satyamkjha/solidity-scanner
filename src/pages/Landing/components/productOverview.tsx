import React from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Image,
  VStack,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export default function ProductOverview() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  const data = [
    {
      heading: "See your security posture evolve",
      imgAlt: "Keep track of the bugs in your project",
      text: `Upload specific contract code or provide code repositories link and
        we’ll take care of the rest. Set triggers to automatically run scans
        when developers make updates, and see trends on how your code
        quality has improved`,
    },
    {
      heading: "Supported Protocols",
      imgAlt: "Supported Protocols",
      text: `With tremendous growth across the Blockchain spectrum, there is a
        wide variety of Protocol options for builders to choose from. In our
        endeavor to retain the pinnacle in the Smart Contract Security Audit
        Scan space, SolidityScan boasts of providing seamless support for
        Ethereum, Polygon, Avalanche, Binance, Fantom, Cronos, Celo, and
        many more. Inviting all buidlers to subscribe to the world's
        fastest, most accurate, and secure smart contract vulnerability
        analysis and auditing platform at the most affordable price.`,
    },
    {
      heading: "Built by us, for your contracts",
      imgAlt: "Customize and silence issues and set your own rules",
      text: `Customize issues, silence specific issues or add your own rules to
      trigger alerts for. Request for assistance with issue remediation or
      get a manual audit from a team of security experts.`,
    },
    {
      heading: "Publish reports and share your security score",
      imgAlt: "Publish reports and share your security score",
      text: `Share and validate your progress with the community with easily
      publishable reports. Your community and investors can use the report
      summary and be confident of your contracts' security. For the more
      technical minded, you can add the full bug reports available in the
      report too.`,
    },
    {
      heading: "Integrate with the services you already love",
      imgAlt: "Integrate with Microsoft Teams, Slack and Jira",
      text: `Using Slack/ Microsoft teams or JIRA? Built-in integrations with
      most of the popular tools to automatically send out alerts or raise
      issue tickets, so your team sees everything in one place.`,
    },
  ];

  return (
    <>
      {data.map((item, index) => (
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          py={[5, 5, 10]}
          px={[0, 0, 0, 24]}
          flexDir={["column", "column", index % 2 == 0 ? "row" : "row-reverse"]}
          textAlign={["center", "center", "left"]}
        >
          <Box width={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
            <Image
              src={`${assetsURL}landing/landing_${index + 1}.png`}
              alt={item.imgAlt}
              mx="auto"
            />
          </Box>
          <Box w={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
            <Heading as="h2" fontSize="3xl" mb={8}>
              {item.heading}
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
              {item.text}
            </Text>
            {index === 3 && (
              <Button
                onClick={() =>
                  window.open(
                    "https://solidityscan.com/published-report/project/d393242670c81938",
                    "_blank"
                  )
                }
                variant={"cta-outline"}
              >
                View Audit Reports
              </Button>
            )}
          </Box>
        </Flex>
      ))}
    </>
  );
}

export function OverviewSkeleton() {
  const count = 5;
  return (
    <>
      {Array.from({ length: count - 1 }, (_, index) => index + 1).map(
        (item, index) => (
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            py={[5, 5, 10]}
            px={[0, 0, 0, 24]}
            w="100%"
            flexDir={
              index % 2 == 0
                ? ["column", "column", "column", "row"]
                : ["column", "column", "column", "row-reverse"]
            }
          >
            <Skeleton
              startColor="lightgray"
              endColor="#eeeeee"
              borderRadius={"50%"}
              w={["250px", "250px", "250px", "500px"]}
              h={["250px", "250px", "250px", "500px"]}
              mx={[0, 0, 0, 24]}
              mt={[10, 10, 10, 0]}
            />
            <VStack
              w={["100%", "100%", "100%", "40%"]}
              spacing={[5, 5, 5, 10]}
              mt={[10, 10, 10, 0]}
            >
              <SkeletonText
                startColor="lightgray"
                endColor="#eeeeee"
                noOfLines={1}
                skeletonHeight="7"
                w={"100%"}
              />
              <SkeletonText
                startColor="lightgray"
                endColor="#eeeeee"
                noOfLines={7}
                spacing="3"
                skeletonHeight="2"
                w={"100%"}
              />
            </VStack>
          </Flex>
        )
      )}
    </>
  );
}
