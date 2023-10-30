import {
  VStack,
  Text,
  HStack,
  Flex,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FolderSettings from "./projectFolderSettings";
import ConfigSettings from "./projectConfigSettings";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { TreeItem, TreeItemUP } from "common/types";
import {
  getSkipFilePaths,
  restructureRepoTree,
  updateCheckedValue,
} from "helpers/fileStructure";
import Loader from "./styled-components/Loader";
import { getProjectType } from "helpers/helperFunction";

const ProjectCustomSettings: React.FC<{
  isGithubIntegrated: boolean;
  project_url: string;
  project_id: string;
  webhook_enabled: boolean;
  project_skip_files: string[];
  repoTree: TreeItem | null;
  project_branch: string;
  getRepoTreeReq: () => Promise<void>;
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
  const [repoTreeUP, setRepoTreeUP] = useState<TreeItemUP | null>(null);

  const toast = useToast();
  const onToggleSwitch = async () => {
    setIsLoading(true);
    try {
      const { data } = await API.post(
        API_PATH.API_TOGGLE_PROJECT_SYNCHRONIZATION,
        {
          project_url: project_url,
          project_id: project_id,
          recur_scans: !githubSync,
        }
      );
      if (data.status === "success") {
        toast({
          title: data.message,
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
    if (repoTreeUP) {
      const skipFilePaths = getSkipFilePaths(repoTreeUP);
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
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setGithubSync(webhook_enabled);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (repoTree) {
      let newRepoTreeUP = restructureRepoTree(repoTree, true);
      project_skip_files.forEach((path) => {
        newRepoTreeUP = updateCheckedValue(path, false, newRepoTreeUP);
      });
      setRepoTreeUP(newRepoTreeUP);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoTree]);

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
                spacing={1}
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
                  Update directories and files to be scanned.
                </Text>
              </VStack>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel
            flexDir="column"
            backgroundColor="#FCFCFC"
            px={[3, 3, 5]}
            py={2}
            mt={3}
            borderRadius={20}
            border="1px solid #ECECEC"
            w="100%"
            height="fit-content"
          >
            {repoTreeUP ? (
              <FolderSettings
                isLoading={isLoading}
                repoTreeUP={repoTreeUP}
                setRepoTreeUP={setRepoTreeUP}
                branch={project_branch}
                updateSkipPathRequests={updateSkipPathRequests}
                view="detailed_result"
              />
            ) : (
              <Flex
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
                py={4}
              >
                <Loader />
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
                  Configure your project settings.
                </Text>
              </VStack>
              <AccordionIcon />
            </HStack>
          </AccordionButton>
          <AccordionPanel
            flexDir="column"
            backgroundColor="#FCFCFC"
            px={[3, 3, 5]}
            py={3}
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
              isOauthIntegrated={isGithubIntegrated}
              formType={getProjectType(project_url)}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default ProjectCustomSettings;
