import {
  VStack,
  Text,
  Switch,
  HStack,
  Alert,
  AlertIcon,
  Link,
  Flex,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import GithubConnectAlert from "./githubConnectAlert";
import FolderSettings from "./projectFolderSettings";
import ConfigSettings from "./projectConfigSettings";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { TreeItem } from "common/types";

const ProjectCustomSettings: React.FC<{
  isGithubIntegrated: boolean;
  project_url: string;
  project_id: string;
  webhook_enabled: boolean;
  project_skip_files: string[];
  repoTree: TreeItem | null;
  project_branch: string;
  getRepoTreeReq: (
    project_url: string,
    project_branch: string
  ) => Promise<void>;
}> = ({
  isGithubIntegrated,
  project_id,
  project_url,
  webhook_enabled,
  repoTree,
  project_skip_files,
  project_branch,
  getRepoTreeReq,
}) => {
  const [githubSync, setGithubSync] = React.useState<boolean>(webhook_enabled);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [skipFilePaths, setSkipFilePaths] = useState<string[]>([
    ...project_skip_files,
  ]);
  const toast = useToast();
  const onToggleSwitch = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await API.post(
        API_PATH.API_TOGGLE_PROJECT_SYNCHRONIZATION,
        {
          project_url: project_url,
          project_id: project_id,
          recur_scans: !githubSync,
        }
      );
      if (status === 201) {
        toast({
          title: "Webhooks enabled for the project",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom",
        });
        setGithubSync(!githubSync);
      } else if (status === 204) {
        toast({
          title: "Webhooks diabled for the project",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom",
        });
        setGithubSync(!githubSync);
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const updateSkipPathRequests = async () => {
    setIsLoading(true);

    try {
      const { data } = await API.post<{ status: string; message: string }>(
        API_PATH.API_UPDATE_SKIP_FILE_PATHS,
        {
          project_id: project_id,
          skip_file_paths: skipFilePaths,
        }
      );
      if (data.status === "success") {
        toast({
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setGithubSync(webhook_enabled);
    setSkipFilePaths([...project_skip_files]);
  }, []);

  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      sx={{
        w: "100%",
        borderRadius: "20px",
        px: [2, 2, 4],
        h: "65vh",
        overflowY: "scroll",
      }}
    >
      <Accordion allowToggle w={["100%", "100%", "100%", "100%"]}>
        <AccordionItem
          alignItems="center"
          justifyContent="flex-start"
          flexDir={"column"}
          sx={{
            cursor: "pointer",
            w: "100%",
            bg: "white",
            my: 4,
            py: [4, 4, 6],
            h: "fit-content",
            px: [4, 4, 7, 10],
            borderRadius: "10px",
            transition: "0.3s box-shadow",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            _hover: {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <AccordionButton
            w="100%"
            h="fit-content"
            p={0}
            _hover={{ backgroundColor: "white" }}
            onClick={async () => getRepoTreeReq()}
          >
            <HStack
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack
                justifyContent="flex-start"
                spacing={3}
                alignItems="flex-start"
                w={["calc(100% - 60px)", "calc(100% - 60px)", "80%", "70%"]}
              >
                <Text fontWeight={500} fontSize="xl">
                  Project Folders
                </Text>
                <Text
                  fontWeight={400}
                  color="gray.400"
                  textAlign="left"
                  fontSize="md"
                >
                  Lorem ipsum dolor sit amet consectetur. Lorem pharetra sed
                  consequat velit arcu. Dictum volutpat arcu pellentesque risus
                  mi non. Ornare phasellus lorem egestas fringilla enim. Posuere
                  in ac odio
                </Text>
              </VStack>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel
            flexDir="column"
            backgroundColor="#FCFCFC"
            px={[3, 3, 5, 7]}
            py={5}
            mt={5}
            borderRadius={20}
            border="1px solid #ECECEC"
            w="100%"
            height="fit-content"
          >
            {repoTree ? (
              <FolderSettings
                isLoading={isLoading}
                fileData={repoTree}
                branch={project_branch}
                skipFilePaths={skipFilePaths}
                updateSkipPathRequests={updateSkipPathRequests}
                setSkipFilePaths={setSkipFilePaths}
                view="detailed_result"
              />
            ) : (
              <Flex
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner color="gray.500" />
              </Flex>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem
          alignItems="center"
          justifyContent="flex-start"
          flexDir={"column"}
          sx={{
            cursor: "pointer",
            w: "100%",
            bg: "white",
            my: 4,
            py: 6,
            h: "fit-content",
            px: [5, 5, 7, 10],
            borderRadius: "10px",
            transition: "0.3s box-shadow",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            _hover: {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <AccordionButton
            w="100%"
            h="fit-content"
            p={0}
            _hover={{ backgroundColor: "white" }}
          >
            <HStack
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack
                justifyContent="flex-start"
                spacing={3}
                alignItems="flex-start"
                w={["calc(100% - 60px)", "calc(100% - 60px)", "80%", "70%"]}
              >
                <Text fontWeight={500} fontSize="xl">
                  Project Settings
                </Text>
                <Text
                  fontWeight={400}
                  color="gray.400"
                  textAlign="left"
                  fontSize="md"
                >
                  Lorem ipsum dolor sit amet consectetur. Lorem pharetra sed
                  consequat velit arcu. Dictum volutpat arcu pellentesque risus
                  mi non. Ornare phasellus lorem egestas fringilla enim. Posuere
                  in ac odio
                </Text>
              </VStack>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel
            flexDir="column"
            backgroundColor="#FCFCFC"
            px={7}
            py={5}
            mt={5}
            borderRadius={20}
            border="1px solid #ECECEC"
            w="100%"
            height="fit-content"
          >
            <ConfigSettings
              view="detailed_result"
              githubSync={githubSync}
              isLoading={isLoading}
              onToggleFunction={onToggleSwitch}
              isGithubIntegrated={isGithubIntegrated}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default ProjectCustomSettings;
