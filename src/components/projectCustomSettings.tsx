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
} from "@chakra-ui/react";
import React from "react";
import GithubConnectAlert from "./githubConnectAlert";
import FolderSettings from "./projectFolderSettings";
import ConfigSettings from "./projectConfigSettings";

const ProjectCustomSettings: React.FC<{
  isGithubIntegrated: boolean;
}> = ({ isGithubIntegrated }) => {
  const [githubSync, setGithubSync] = React.useState(false);

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
      <Accordion allowMultiple w={["100%", "100%", "100%", "100%"]}>
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
          <HStack
            width="100%"
            justifyContent="space-between"
            alignItem="center"
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
              <Text fontWeight={400} color="gray.400" fontSize="md">
                Lorem ipsum dolor sit amet consectetur. Lorem pharetra sed
                consequat velit arcu. Dictum volutpat arcu pellentesque risus mi
                non. Ornare phasellus lorem egestas fringilla enim. Posuere in
                ac odio
              </Text>
            </VStack>
            <AccordionButton
              width={["50px", "50px", "50px"]}
              height={["50px", "50px", "50px"]}
              justifyContent="center"
              borderRadius="50%"
            >
              <AccordionIcon />
            </AccordionButton>
          </HStack>

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
            <FolderSettings />
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
          <HStack
            width="100%"
            justifyContent="space-between"
            alignItem="center"
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
              <Text fontWeight={400} color="gray.400" fontSize="md">
                Lorem ipsum dolor sit amet consectetur. Lorem pharetra sed
                consequat velit arcu. Dictum volutpat arcu pellentesque risus mi
                non. Ornare phasellus lorem egestas fringilla enim. Posuere in
                ac odio
              </Text>
            </VStack>
            <AccordionButton
              width={["50px", "50px", "50px"]}
              height={["50px", "50px", "50px"]}
              justifyContent="center"
              borderRadius="50%"
            >
              <AccordionIcon />
            </AccordionButton>
          </HStack>

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
              githubSync={githubSync}
              setGithubSync={setGithubSync}
              isGithubIntegrated={isGithubIntegrated}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default ProjectCustomSettings;
