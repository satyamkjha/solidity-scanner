import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { getRepoTree } from "hooks/getRepoTree";
import {
  Flex,
  Box,
  Text,
  Button,
  HStack,
  useToast,
  Image,
  Divider,
} from "@chakra-ui/react";
import API from "helpers/api";
import {
  getAssetsURL,
  checkProjectUrl,
  getProjectType,
} from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import ConfigSettings from "components/projectConfigSettings";
import InfoSettings from "components/projectInfoSettings";
import FolderSettings from "components/projectFolderSettings";
import { TreeItem, TreeItemUP } from "common/types";
import { getSkipFilePaths, restructureRepoTree } from "helpers/fileStructure";
import Loader from "components/styled-components/Loader";
import { Profile } from "common/types";
import { useUserRole } from "hooks/useUserRole";
import { AddProjectFormInfographics } from "./AddProjectFormInfographics";
import { capitalize } from "common/functions";
import { infographicsData, OauthName } from "common/values";

const ApplicationForm: React.FC<{
  profileData: Profile;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formType: string;
}> = ({ profileData, step, setStep, formType }) => {
  const role: string = useUserRole();
  const assetsURL = getAssetsURL();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [projectName, setProjectName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [githubSync, setGithubSync] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [repoTreeUP, setRepoTreeUP] = useState<TreeItemUP | null>(null);
  const [branches, setBranches] = useState<string[]>([]);
  const [branch, setBranch] = useState<string>("");
  const [nameError, setNameError] = useState<null | string>(null);
  const [linkError, setLinkError] = useState<null | string>(null);
  const [connectAlert, setConnectAlert] = useState(false);
  const isOauthIntegrated =
    profileData?._integrations?.github?.status === "successful" ||
    profileData?._integrations?.gitlab?.status === "successful" ||
    profileData?._integrations?.bitbucket?.status === "successful";
  const toast = useToast();

  const runValidation = () => {
    if (projectName.length === 0) {
      setNameError("Please enter a Project Name of less than 50 characters.");
      return false;
    }
    if (projectName.length > 50) {
      setNameError("Project Name cannot exceed to more than 50 characters.");
      return false;
    }
    if (
      !checkProjectUrl(githubLink) &&
      getProjectType(githubLink) === formType
    ) {
      setLinkError("Please enter a valid repository link");
      return false;
    }
    setGithubLink(githubLink);
    setNameError(null);
    setLinkError(null);
    return true;
  };

  const runScan = async () => {
    if (!runValidation() || !repoTreeUP) return;
    try {
      setIsLoading(true);
      const skipFilePaths = getSkipFilePaths(repoTreeUP);
      const { data } = await API.post(API_PATH.API_PROJECT_SCAN, {
        project_url: githubLink,
        project_name: projectName,
        project_type: "new",
        project_branch: branch,
        recur_scans: githubSync,
        project_visibility: visibility ? "private" : "public",
        skip_file_paths: skipFilePaths,
      });

      setIsLoading(false);
      if (data.status === "success") {
        queryClient.invalidateQueries("scan_list");
        queryClient.invalidateQueries("profile");
        history.push("/projects");
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const getBranches = async () => {
    setIsLoading(true);
    setBranch("");
    try {
      const { data } = await API.post<{
        status: string;
        default_tree: TreeItem;
        branches: string[];
      }>(API_PATH.API_GET_BRANCHES, {
        project_url: githubLink,
      });
      if (data.status === "success") {
        if (data.default_tree) {
          setRepoTreeUP(restructureRepoTree(data.default_tree, true));
        }
        setBranches(data.branches);
        setBranch(data.branches[0]);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const getRepoTreeReq = async (
    project_url: string,
    project_branch: string
  ) => {
    setIsLoading(true);
    const responseData = await getRepoTree(project_url, project_branch);
    if (responseData) {
      if (responseData.status === "success") {
        setRepoTreeUP(restructureRepoTree(responseData.tree, true));
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (branch !== "") {
      if (step > 1) {
        getRepoTreeReq(githubLink, branch);
      } else {
        setStep(2);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch]);

  let isViewer = role === "viewer";

  return (
    <Flex
      flexDir="column"
      w="100%"
      h={["90vh", "90vh", "75vh"]}
      justifyContent={"space-between"}
      alignItems="flex-start"
      opacity={isViewer ? 0.5 : 1}
    >
      {profileData && (
        <Flex
          flexDir="column"
          justifyContent={"flex-start"}
          alignItems="flex-start"
          px={[2, 4, 2, 7]}
          w="100%"
          h="calc(100% - 80px)"
          mt={0}
          borderRadius={20}
        >
          <HStack w="100%" justifyContent="space-between" mb={4}>
            <Text
              sx={{
                fontSize: "2xl",
                fontWeight: 600,
                textAlign: "left",
                w: "60%",
              }}
            >
              {step === 0
                ? `${capitalize(formType)} Application`
                : step === 1
                ? "Load Application"
                : step === 2
                ? "Select Folders"
                : step === 3
                ? "Project Settings"
                : ""}
            </Text>
            <HStack
              display={step === 0 ? "none" : "flex"}
              justifyContent={"flex-end"}
              spacing={3}
            >
              <Image
                height={["30px", "30px", "40px"]}
                width={["30px", "30px", "40px"]}
                src={`${assetsURL}common/step_${step}.svg`}
              />
              <Text
                sx={{
                  fontSize: ["md", "md", "lg"],
                  fontWeight: 700,
                  lineHeight: "20px",
                  textAlign: "left",
                  width: "fit-content",
                }}
              >
                {"STEP"}{" "}
                <Box ml={1} fontSize={["xl", "xl", "2xl"]} as="span">
                  {step}/
                </Box>
                {3}
              </Text>
            </HStack>
          </HStack>
          {step === 1 ? (
            <Text
              sx={{
                fontSize: "sm",
                color: "subtle",
                textAlign: "left",
                mb: 2,
              }}
            >
              Provide a link to your {OauthName[formType]} repository.
            </Text>
          ) : step === 2 ? (
            <Text
              sx={{
                fontSize: "sm",
                color: "subtle",
                textAlign: "left",
                mb: 2,
              }}
            >
              Select the branch and its corresponding directories and files to
              be scanned.
            </Text>
          ) : step === 3 ? (
            <Text
              sx={{
                fontSize: "sm",
                color: "subtle",
                textAlign: "left",
                mb: 2,
              }}
            >
              Configure your project settings.
            </Text>
          ) : (
            <></>
          )}

          {step !== 0 && (
            <Text
              sx={{
                fontSize: "sm",
                color: "subtle",
                textAlign: "left",
                mb: 2,
              }}
            >
              See link examples and additional restrictions in the User Guide
              available on{" "}
              <Box
                as="span"
                color="accent"
                onClick={() =>
                  window.open("https://docs.solidityscan.com/", "_blank")
                }
              >
                {" "}
                docs.solidityscan.com
              </Box>
              .
            </Text>
          )}

          {step === 0 ? (
            <Box w="100%" h="calc(100% - 50px)">
              <AddProjectFormInfographics
                imgUrl={`${assetsURL}homepage_infographics/project_${formType}.svg`}
                instructions={infographicsData["project_github"]}
              />
            </Box>
          ) : step === 1 ? (
            <InfoSettings
              nameError={nameError}
              linkError={linkError}
              visibility={visibility}
              projectName={projectName}
              githubLink={githubLink}
              isOauthIntegrated={isOauthIntegrated}
              setProjectName={setProjectName}
              setGithubLink={setGithubLink}
              setVisibility={setVisibility}
              isViewer={isViewer}
              connectAlert={connectAlert}
              setConnectAlert={setConnectAlert}
            />
          ) : step === 2 ? (
            repoTreeUP && (
              <FolderSettings
                isLoading={isLoading}
                view="github_app"
                repoTreeUP={repoTreeUP}
                setRepoTreeUP={setRepoTreeUP}
                branches={branches}
                branch={branch}
                setBranch={setBranch}
              />
            )
          ) : step === 3 ? (
            <ConfigSettings
              view="github_app"
              githubSync={githubSync}
              onToggleFunction={async () => setGithubSync(!githubSync)}
              isOauthIntegrated={isOauthIntegrated}
              formType={formType}
            />
          ) : (
            <></>
          )}
        </Flex>
      )}
      <Flex
        w="100%"
        flexDir={["column", "column", "column", "row"]}
        alignItems="center"
        justifyContent={["flex-start", "flex-start", "flex-start", "flex-end"]}
        pt={3}
      >
        {step > 1 && (
          <Button
            type="submit"
            width={["100%", "100%", "100%", "250px"]}
            variant="accent-outline"
            mr={[0, 0, 0, 5]}
            mb={[3, 3, 3, 0]}
            py={6}
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
            isDisabled={profileData?.credits === 0 || isLoading}
          >
            Prev
          </Button>
        )}
        <Button
          type="submit"
          variant="brand"
          isLoading={isLoading}
          spinner={<Loader color={"#3300FF"} size={25} />}
          width={["100%", "100%", "100%", "250px"]}
          onClick={() => {
            if (step === 0) {
              setStep(1);
            } else if (step === 1) {
              if (runValidation()) {
                getBranches();
              }
            } else if (step === 2) {
              setStep(3);
            } else {
              runScan();
            }
          }}
          isDisabled={
            profileData?.credits === 0 ||
            isViewer ||
            (connectAlert && !isOauthIntegrated)
          }
        >
          {step > 2 ? (
            isLoading ? (
              <Loader color={"#3300FF"} />
            ) : (
              "Start Scan"
            )
          ) : (
            "Next"
          )}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ApplicationForm;
