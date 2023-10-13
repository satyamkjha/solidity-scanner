import React from "react";

import {
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Button,
  useDisclosure,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useOverview } from "hooks/useOverview";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import ApplicationForm from "./ApplicationForm";
import ContractForm from "./ContractForm";
import UploadForm from "./UploadForm";
import Loader from "components/styled-components/Loader";
import { useProfile } from "hooks/useProfile";
import { AddIcon } from "@chakra-ui/icons";
import { getAssetsURL } from "helpers/helperFunction";
import VulnerabilityDistribution from "components/vulnDistribution";
import { useHistory } from "react-router-dom";

const OverviewData: React.FC<{
  heading: number;
  subHeading: string;
}> = ({ heading, subHeading }) => {
  const assetsURL = getAssetsURL();

  return (
    <VStack
      borderRadius={10}
      bg="bg.subtle"
      h="100%"
      w="48%"
      p={2}
      align="center"
      spacing={0}
    >
      <Text sx={{ fontSize: "2xl", fontWeight: 700 }}>{heading}</Text>
      <Image
        height="56px"
        width="52px"
        src={`${assetsURL}common/search_icon.svg`}
      />
      <Text
        sx={{
          fontSize: "sm",
          fontWeight: 600,
          textAlign: "center",
          color: "gray.500",
        }}
      >
        {subHeading}
      </Text>
    </VStack>
  );
};

const Home: React.FC = () => {
  const { data } = useOverview();
  const { data: profileData } = useProfile();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const assetsURL = getAssetsURL();
  const history = useHistory();

  return (
    <Flex
      sx={{
        width: "100%",
        height: "100%",
        flexDir: ["column", "column", "row"],
      }}
    >
      <Flex
        sx={{
          w: ["100%", "100%", "60%"],
          h: "fit-content",
          flexDir: "column",
          alignItems: "center",
          borderRadius: "20px",
          p: 4,
          mx: [0, 0, 4],
          my: 2,
        }}
      >
        <Flex
          width="100%"
          h="120px"
          borderRadius={10}
          border="1px solid #52FF00"
          flexDir={["column", "column", "row"]}
          justifyContent={["flex-start", "flex-start", "space-between"]}
          alignItems={"center"}
          p={5}
          bg="white"
        >
          <VStack alignItems="flex-start" w={["100%", "100%", "60%"]}>
            <Text
              sx={{
                fontSize: ["lg", "lg", "xl"],
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              Add Project
            </Text>
            <Text
              sx={{
                color: "subtle",
                textAlign: "left",
                mb: 2,
                fontSize: "sm",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Consequat mauris risus in
              rhoncus. Et sed condimentum faucibus lacus
            </Text>
          </VStack>
          <Button
            leftIcon={<AddIcon />}
            variant="brand"
            w={["100%", "100%", "200px"]}
            onClick={onOpen}
          >
            Add Project
          </Button>
        </Flex>
        {data && (
          <Flex
            width="100%"
            h="150px"
            my={4}
            flexDir={["column", "column", "row"]}
            justifyContent={["flex-start", "flex-start", "space-between"]}
            alignItems={"center"}
          >
            <HStack h="100%" w="45%" justify="space-between" spacing={0}>
              <OverviewData
                heading={data.overview.total_lines_scanner}
                subHeading={"Lines of code scanned"}
              />
              <OverviewData
                heading={data.overview.total_projects_monitored}
                subHeading={"Projects monitored"}
              />
            </HStack>
            <VStack
              h="100%"
              w="53%"
              bg="bg.subtle"
              justify="space-between"
              borderRadius={10}
              py={2}
              px={4}
            >
              <HStack justify="space-between" w="100%" h="fit-content">
                <Text
                  sx={{
                    fontSize: "sm",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "gray.500",
                  }}
                >
                  Total Vulnerabilities
                </Text>
                <Text sx={{ fontSize: "2xl", fontWeight: 700 }}>
                  {data.overview.issue_count_total}
                </Text>
              </HStack>
              <VulnerabilityDistribution
                view="home"
                critical={data.overview.issue_count_critical}
                high={data.overview.issue_count_high}
                medium={data.overview.issue_count_medium}
                low={data.overview.issue_count_low}
                informational={data.overview.issue_count_informational}
                gas={data.overview.issue_count_gas}
              />
            </VStack>
          </Flex>
        )}
      </Flex>
      {/* {!data && (
        <Flex
          sx={{
            w: ["100%", "100%", "40%"],
            mx: [0, 0, 4],
            my: 24,
            justifyContent: "center",
          }}
        >
          <Loader />
        </Flex>
      )} */}
      {data && (
        <Flex
          sx={{
            w: ["100%", "100%", "40%"],
            flexDir: "column",
            alignItems: "flex-start",
          }}
          justifyContent="flex-start"
          px={5}
        >
          <Image
            onClick={() => history.push("/billing")}
            cursor="pointer"
            w="100%"
            h="auto"
            src={`${assetsURL}common/pro_upgrade.svg`}
          />
          
        </Flex>

      )}
    </Flex>
  );
};

export default Home;
