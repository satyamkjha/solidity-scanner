import {
  Stack,
  VStack,
  InputGroup,
  InputLeftElement,
  Switch,
  Input,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineProject } from "react-icons/ai";
import { FaFileCode } from "react-icons/fa";
import GithubConnectAlert from "./githubConnectAlert";
import { Profile } from "common/types";
import { sentenceCapitalize } from "helpers/helperFunction";

const InfoSettings: React.FC<{
  nameError: string | null;
  linkError: string | null;

  visibility: boolean;
  projectName: string;
  profileData: Profile;
  githubLink: string;
  isViewer: boolean;
  formType: string;
  connectAlert: boolean;
  isOauthIntegrated: boolean;

  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setGithubLink: React.Dispatch<React.SetStateAction<string>>;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setConnectAlert: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  nameError,
  linkError,
  visibility,
  projectName,
  githubLink,
  isOauthIntegrated,
  setProjectName,
  setGithubLink,
  setVisibility,
  isViewer,
  connectAlert,
  setConnectAlert,
  formType,

  profileData,
}) => {
  const placeholder: { [key: string]: string } = {
    github: "github.com",
    gitlab: "gitlab.com",
    bitbucket: "bitbucket.org",
  };

  return (
    <Stack spacing={5} mt={0} height={"fit-content"} width={"100%"}>
      <VStack alignItems={"flex-start"} mt={[3, 3, 3, 3, 10]}>
        <Text mb={0} fontSize="sm">
          Project name
        </Text>
        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<AiOutlineProject color={"#A0AEC0"} />}
          />
          <Input
            placeholder="Project name"
            variant={nameError ? "error" : "brand"}
            size="lg"
            disabled={isViewer}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </InputGroup>
        <Text mb={0} color="#FF2400" fontSize="sm">
          {nameError}
        </Text>
      </VStack>
      <VStack mb={5} alignItems={"flex-start"}>
        <Text mb={0} fontSize="sm">
          Link to your repository
        </Text>
        <InputGroup alignItems="center" mb={4}>
          <InputLeftElement
            height="48px"
            children={<FaFileCode color={"#CBD5E0"} />}
          />
          <Input
            isRequired
            type="url"
            disabled={isViewer}
            placeholder={`https://${placeholder[formType]}/yourproject/project.git`}
            variant={linkError ? "error" : "brand"}
            size="lg"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </InputGroup>
        <Text mb={0} color="#FF2400" fontSize="sm">
          {linkError}
        </Text>
      </VStack>

      <HStack alignItems="center" spacing={6} fontSize="14px">
        <Text>Public</Text>
        <Switch
          size="lg"
          variant="brand"
          disabled={isViewer}
          isChecked={visibility}
          onChange={() => {
            if (isOauthIntegrated) {
              if (profileData._integrations[formType].status === "successful") {
                setVisibility(!visibility);
              }
            } else {
              setConnectAlert(!connectAlert);
            }
          }}
        />
        <Text>Private</Text>
      </HStack>

      {!isOauthIntegrated && connectAlert && (
        <GithubConnectAlert
          msg={`You need to connect your code hosting platform ${sentenceCapitalize(
            formType
          )} to start a private scan.`}
        />
      )}

      {isOauthIntegrated && (
        <Text
          width="100%"
          p={3}
          borderWidth={1}
          borderColor="#FFC661"
          background="#FFF8ED"
          color="#4E5D78"
          fontSize={"xs"}
          fontWeight={300}
          borderRadius={10}
        >
          In order to conduct a scan, users must have ownership of the private
          repositories. Our product currently does not support scanning private
          repositories not owned by the user.
        </Text>
      )}
    </Stack>
  );
};

export default InfoSettings;
