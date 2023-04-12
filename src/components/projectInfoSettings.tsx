import {
  Stack,
  VStack,
  InputGroup,
  InputLeftElement,
  Switch,
  Input,
  HStack,
  Alert,
  AlertIcon,
  Text,
  Link,
} from "@chakra-ui/react";
import React from "react";
import Icon from "react-crypto-icons";
import { AiOutlineProject } from "react-icons/ai";
import { FaFileCode } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const InfoSettings: React.FC<{
  nameError: string | null;
  linkError: string | null;
  visibility: boolean;
  projectName: string;
  githubLink: string;
  isGithubIntegrated: boolean;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setGithubLink: React.Dispatch<React.SetStateAction<string>>;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  nameError,
  linkError,
  visibility,
  projectName,
  githubLink,
  isGithubIntegrated,
  setProjectName,
  setGithubLink,
  setVisibility,
}) => {
  return (
    <Stack spacing={6} my={8} width={"100%"}>
      <VStack alignItems={"flex-start"}>
        <Text mb={0} fontSize="sm">
          Project name
        </Text>
        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<AiOutlineProject color={"#ECECEC"} />}
          />
          <Input
            placeholder="Project name"
            variant={nameError ? "error" : "brand"}
            size="lg"
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
          Link to the Github repository
        </Text>
        <InputGroup alignItems="center" mb={4}>
          <InputLeftElement
            height="48px"
            children={<Icon as={FaFileCode} color="gray.300" />}
          />
          <Input
            isRequired
            type="url"
            placeholder="https://github.com/yourproject/project.git"
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
          isChecked={visibility}
          onChange={() => setVisibility(!visibility)}
        />
        <Text>Private</Text>
      </HStack>

      {!isGithubIntegrated && visibility && (
        <Alert status="warning" fontSize="14px">
          <AlertIcon />
          You need to connect your GitHub to start a private scan.
          <Link
            as={RouterLink}
            to="/integrations"
            variant="brand"
            fontWeight="600"
            ml={1}
          >
            Connect
          </Link>
        </Alert>
      )}
    </Stack>
  );
};

export default InfoSettings;
