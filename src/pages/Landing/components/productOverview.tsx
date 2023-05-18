import React from "react";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  useDisclosure,
  HStack,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";

export default function ProductOverview() {
  const assetsURL = getAssetsURL();

  return (
    <>
      <Flex
        as="section"
        w="100%"
        alignItems="center"
        py={[5, 5, 10]}
        px={[0, 0, 0, 24]}
        flexDir={["column", "column", "row"]}
        textAlign={["center", "center", "left"]}
      >
        <Box width={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Image
            src={`${assetsURL}landing/landing_1.png`}
            alt="Keep track of the bugs in your project"
            mx="auto"
          />
        </Box>
        <Box w={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            See your security posture evolve
          </Heading>
          <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
            Upload specific contract code or provide code repositories link and
            we’ll take care of the rest. Set triggers to automatically run scans
            when developers make updates, and see trends on how your code
            quality has improved.
          </Text>
        </Box>
      </Flex>
      <Flex
        as="section"
        w="100%"
        alignItems="center"
        py={[5, 5, 10]}
        px={[0, 0, 0, 24]}
        flexDir={["column", "column", "row-reverse"]}
        textAlign={["center", "center", "left"]}
      >
        <Box width={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Image
            src={`${assetsURL}landing/landing_2.png`}
            alt="Integrate with Microsoft Teams, Slack and Jira"
            mx="auto"
          />
        </Box>
        <Box w={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            Supported Protocols
          </Heading>
          <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
            With tremendous growth across the Blockchain spectrum, there is a
            wide variety of Protocol options for builders to choose from. In our
            endeavor to retain the pinnacle in the Smart Contract Security Audit
            Scan space, SolidityScan boasts of providing seamless support for
            Ethereum, Polygon, Avalanche, Binance, Fantom, Cronos, Celo, and
            many more. Inviting all buidlers to subscribe to the world's
            fastest, most accurate, and secure smart contract vulnerability
            analysis and auditing platform at the most affordable price.
          </Text>
        </Box>
      </Flex>
      <Flex
        as="section"
        w="100%"
        alignItems="center"
        py={[5, 5, 10]}
        px={[0, 0, 0, 24]}
        flexDir={["column", "column", "row"]}
        textAlign={["center", "center", "left"]}
      >
        <Box width={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Image
            src={`${assetsURL}landing/landing_3.png`}
            alt="Customize and silence issues and set your own rules"
            mx="auto"
          />
        </Box>
        <Box w={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            Built by us, for your contracts:
          </Heading>
          <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
            Customize issues, silence specific issues or add your own rules to
            trigger alerts for. Request for assistance with issue remediation or
            get a manual audit from a team of security experts.
          </Text>
        </Box>
      </Flex>
      <Flex
        as="section"
        w="100%"
        alignItems="center"
        py={[5, 5, 10]}
        px={[0, 0, 0, 24]}
        flexDir={["column", "column", "row-reverse"]}
        textAlign={["center", "center", "left"]}
      >
        <Box width={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Image
            src={`${assetsURL}landing/landing_4.png`}
            alt="Publish reports and share your security score"
            mx="auto"
          />
        </Box>
        <Box w={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            Publish reports and share your security score
          </Heading>
          <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
            Share and validate your progress with the community with easily
            publishable reports. Your community and investors can use the report
            summary and be confident of your contracts' security. For the more
            technical minded, you can add the full bug reports available in the
            report too.
          </Text>

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
        </Box>
      </Flex>
      <Flex
        as="section"
        w="100%"
        alignItems="center"
        py={[5, 5, 10]}
        px={[0, 0, 0, 24]}
        flexDir={["column", "column", "row"]}
        textAlign={["center", "center", "left"]}
      >
        <Box width={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Image
            src={`${assetsURL}landing/landing_5.png`}
            alt="Integrate with Microsoft Teams, Slack and Jira"
            mx="auto"
          />
        </Box>
        <Box w={["100%", "100%", "50%"]} p={[5, 5, 5, 10]}>
          <Heading as="h2" fontSize="3xl" mb={8}>
            Integrate with the services you already love
          </Heading>
          <Text fontSize={["lg", "lg", "xl"]} color="subtle" mb={8}>
            Using Slack/ Microsoft teams or JIRA? Built-in integrations with
            most of the popular tools to automatically send out alerts or raise
            issue tickets, so your team sees everything in one place.
          </Text>
        </Box>
      </Flex>
    </>
  );
}
