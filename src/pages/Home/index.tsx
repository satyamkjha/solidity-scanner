import React, { useEffect, useState, useMemo } from "react";
import { useQueryClient } from "react-query";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { getRepoTree } from "hooks/getRepoTree";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  Flex,
  Box,
  Text,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Switch,
  HStack,
  Link,
  useToast,
  VStack,
  Progress,
  CloseButton,
  FormErrorMessage,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FaFileCode } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import {
  BlockCredit,
  ProjectIcon,
  SolidityFileIcon,
  UploadIcon,
} from "components/icons";
import API from "helpers/api";
import { useOverview } from "hooks/useOverview";
import { useProfile } from "hooks/useProfile";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { useSupportedChains } from "hooks/useSupportedPlatforms";
import { getFeatureGateConfig, getAssetsURL } from "helpers/helperFunction";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { API_PATH } from "helpers/routeManager";
import ConfigSettings from "components/projectConfigSettings";
import InfoSettings from "components/projectInfoSettings";
import FolderSettings from "components/projectFolderSettings";
import { TreeItem, TreeItemUP } from "common/types";
import {
  getSkipFilePaths,
  restructureRepoTree,
  updateCheckedValue,
} from "helpers/fileStructure";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { customStylesForReactSelect } from "common/stylesForCustomSelect";
import ApplicationForm from "./ApplicationForm";
import ContractForm from "./ContractForm";
import UploadForm from "./UploadForm";

const Home: React.FC = () => {
  const { data } = useOverview();

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Flex sx={{ width: "100%", flexDir: ["column", "column", "row"] }}>
        <Flex
          sx={{
            w: ["100%", "100%", "60%"],
            flexDir: "column",
            alignItems: "center",
            bg: "bg.subtle",
            borderRadius: "20px",
            p: 4,
            mx: [0, 0, 4],
            my: 2,
          }}
        >
          <Tabs variant="soft-rounded" colorScheme="green" w="100%">
            <TabList mb="1em">
              <Tab width="50%">GitHub Application</Tab>
              <Tab width="50%">Verified Contracts</Tab>
              <Tab width="50%">Upload Contract</Tab>
            </TabList>
            <TabPanels w="100%">
              <TabPanel w="100%" p={0}>
                <ApplicationForm />
              </TabPanel>
              <TabPanel p={0}>
                <ContractForm />
              </TabPanel>
              <TabPanel p={0}>
                <UploadForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        {!data && (
          <Flex
            sx={{
              w: ["100%", "100%", "40%"],
              mx: [0, 0, 4],
              my: 2,
              justifyContent: "center",
            }}
          >
            <Spinner mt={20} />
          </Flex>
        )}
        {data && (
          <Box
            sx={{
              w: ["100%", "100%", "40%"],
              mx: [0, 0, 4],
              my: 2,
            }}
          >
            <Text sx={{ color: "subtle", fontSize: "sm", px: 4 }}>
              OVERVIEW
            </Text>
            <Box
              sx={{
                w: "100%",
                borderRadius: "20px",
                bg: "bg.subtle",
                p: 4,
                my: 2,
              }}
            >
              <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>
                {data.overview.total_lines_scanner}
              </Text>
              <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
                Lines of code scanned
              </Text>
            </Box>
            <Box
              sx={{
                w: "100%",
                borderRadius: "20px",
                bg: "bg.subtle",
                p: 4,
                my: 2,
              }}
            >
              <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>
                {data.overview.total_projects_monitored}
              </Text>
              <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
                Projects monitored
              </Text>
            </Box>
            {/* <Box
              sx={{
                w: "100%",
                borderRadius: "20px",
                bg: "bg.subtle",
                p: 4,
                my: 2,
              }}
            >
              <Text sx={{ fontSize: "3xl", fontWeight: 600 }}>
                {data?.overview.total_issues_open}
              </Text>
              <Text sx={{ fontSize: "sm", fontWeight: 600, color: "gray.600" }}>
                Open Issues
              </Text>
            </Box> */}
            <Box
              sx={{
                w: "100%",
                borderRadius: "20px",
                p: 4,
                my: 2,
              }}
            >
              <VulnerabilityProgress
                label="Critical"
                variant="critical"
                count={data.overview.issue_count_critical}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="High"
                variant="high"
                count={data.overview.issue_count_high}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="Medium"
                variant="medium"
                count={data.overview.issue_count_medium}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="Low"
                variant="low"
                count={data.overview.issue_count_low}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="Informational"
                variant="informational"
                count={data.overview.issue_count_informational}
                total={data.overview.issue_count_total}
              />
              <VulnerabilityProgress
                label="Gas"
                variant="gas"
                count={data.overview.issue_count_gas}
                total={data.overview.issue_count_total}
              />
              <Flex
                sx={{
                  w: "100%",
                  justifyContent: "space-between",
                  fontSize: "md",
                  fontWeight: 600,
                  px: 4,
                  mt: 8,
                }}
              >
                <Text>Total Vulnerabilities Found</Text>
                <Text>{data.overview.issue_count_total}</Text>
              </Flex>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
