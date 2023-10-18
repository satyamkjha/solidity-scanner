import React, { useState, useEffect } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useOverview } from "hooks/useOverview";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import ApplicationForm from "./ApplicationForm";
import ContractForm from "./ContractForm";
import UploadForm from "./UploadForm";
import Loader from "components/styled-components/Loader";
import { useProfile } from "hooks/useProfile";
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { getAssetsURL } from "helpers/helperFunction";
import VulnerabilityDistribution from "components/vulnDistribution";
import { useHistory } from "react-router-dom";
import { capitalize, logout } from "common/functions";
import { BiPlug, BiUser, BiPowerOff } from "react-icons/bi";
import { ProfileIconOne } from "components/icons";
import { Profile } from "common/types";

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

const AddProjectBox: React.FC<{ profileData: Profile }> = ({ profileData }) => {
  const assetsURL = getAssetsURL();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [formType, setFormType] = useState("");

  useEffect(() => {
    if (formType !== "") {
      onOpen();
    }
  }, [setFormType, formType]);

  const menuList = [
    {
      text: "Github Application",
      formType: "github",
      iconLink: "icons/integrations/github.svg",
    },
    {
      text: "Gitlab",
      formType: "gitlab",
      iconLink: "icons/integrations/gitlab.svg",
    },
    {
      text: "BitBucket",
      formType: "bitbucket",
      iconLink: "icons/integrations/bitbucket.svg",
    },
    {
      text: "Verified Contracts",
      formType: "verified_contracts",
      iconLink: "",
    },
    {
      text: "Upload Contract",
      formType: "filescan",
      iconLink: "",
    },
  ];

  return (
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
      <Menu>
        <MenuButton
          as={Button}
          variant="brand"
          leftIcon={<AddIcon />}
          w={"170px"}
        >
          Add Project
        </MenuButton>
        <MenuList
          p={4}
          width="250px"
          borderWidth="0px"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.35)"
          borderRadius="15px"
        >
          {menuList.map((item) => (
            <MenuItem
              borderColor="border"
              py={2}
              borderRadius="10px"
              mt={2}
              onClick={() => setFormType(item.formType)}
              fontWeight={600}
            >
              <Image
                height="30px"
                width="30px"
                mr={2}
                src={`${assetsURL}${item.iconLink}`}
              />{" "}
              {item.text}
            </MenuItem>
          ))}
        </MenuList>
        <AddProjectForm
          profileData={profileData}
          formType={formType}
          isOpen={isOpen}
          onClose={() => {
            setFormType("");
            onClose();
          }}
        />
      </Menu>
    </Flex>
  );
};

const AddProjectForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  formType: string;
  profileData: Profile;
}> = ({ isOpen, onClose, formType, profileData }) => {
  const [step, setStep] = useState(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setStep(0);
      }}
    >
      <ModalOverlay />
      <ModalContent
        maxW={["90vw", "90vw", "80vw"]}
        minW={"300px"}
        overflowY={"scroll"}
        overflowX={"scroll"}
        bg="white"
        minH={"fit-content"}
        p={10}
      >
        <ModalCloseButton />
        <ModalBody
          display="flex"
          justifyContent="space-between"
          flexDir="row"
          alignItems="flex-start"
          w="100%"
          h="fit-content"
        >
          <Flex w="60%" justifyContent="center" alignItems="center">
            {["github", "gitlab", "bitbucket"].includes(formType) && (
              <ApplicationForm
                step={step}
                setStep={setStep}
                profileData={profileData}
              />
            )}
            {formType === "verified_contracts" && (
              <ContractForm profileData={profileData} />
            )}
            {formType === "filescan" && (
              <UploadForm
                page={step}
                setPage={setStep}
                profileData={profileData}
              />
            )}
          </Flex>
          <Flex
            bg="bg.subtle"
            w="37%"
            h="75vh"
            justifyContent="center"
            alignItems="center"
            borderRadius={20}
          ></Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Home: React.FC = () => {
  const { data } = useOverview();
  const { data: profileData } = useProfile();
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
        {profileData && <AddProjectBox profileData={profileData} />}
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
          <Flex
            justifyContent="flex-start"
            alignItems="center"
            p={3}
            flexDirection="column"
            bgColor="bg.subtle"
            w="100%"
            borderRadius={10}
            mt={5}
          >
            <HStack
              px={3}
              justifyContent="space-between"
              alignItems="center"
              w="100%"
            >
              <Text
                sx={{
                  fontSize: "md",
                  fontWeight: 600,
                  textAlign: "center",
                  color: "gray.500",
                }}
              >
                Integrations
              </Text>

              <Button
                variant="ghost"
                color="accent"
                rightIcon={<ArrowForwardIcon />}
                onClick={() => history.push("/integrations")}
              >
                View All
              </Button>
            </HStack>
            {profileData &&
              Object.keys(profileData._integrations).map((item) => (
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                  p={5}
                  borderRadius={10}
                  bg="white"
                  mt={4}
                >
                  <HStack spacing={5}>
                    <Image src={`${assetsURL}icons/integrations/${item}.svg`} />
                    <Text
                      sx={{
                        fontSize: "md",
                        fontWeight: 600,
                      }}
                    >
                      {capitalize(item)}
                    </Text>
                  </HStack>
                  {!profileData._integrations[item].allowed ? (
                    <Button variant="label" color="#1DAAE2" bgColor="#E7F8FF">
                      Coming Soon
                    </Button>
                  ) : profileData._integrations[item].status ===
                    "not integrated" ? (
                    <Button
                      variant="label"
                      color="#4E5D78"
                      onClick={() => history.push("/integrations")}
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<BiPlug />}
                      variant="label"
                      color="#2C991A"
                      bgColor="#F0FFF5"
                    >
                      Connected
                    </Button>
                  )}
                </HStack>
              ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
