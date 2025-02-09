import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { CheckIcon } from "@chakra-ui/icons";
import { Finding } from "common/types";
import { codePlatform } from "common/values";
import {
  getProjectFileUrl,
  getContractBlockchainId,
} from "helpers/helperFunction";

const FileNameTab: React.FC<{
  file: Finding;
  setCurrentFile: Dispatch<SetStateAction<Finding>>;
  currentFile: Finding;
  type: "project" | "block";
  branchName?: string;
  project_url?: string;
  contract_url?: string;
  contract_chain?: string;
  contract_platform?: string;
  contract_address?: string;
}> = ({
  setCurrentFile,
  file,
  currentFile,
  type,
  branchName,
  project_url,
  contract_url,
  contract_platform,
  contract_address,
  contract_chain,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const selected = currentFile.file_path === file.file_path;

  const copyFileLink = () => {
    navigator.clipboard
      .writeText(
        type === "project" && project_url && project_url === "File Scan"
          ? file.file_path
          : type === "project" && project_url && branchName
          ? getProjectFileUrl(project_url, branchName, file)
          : contract_platform &&
            contract_chain &&
            codePlatform[
              getContractBlockchainId(contract_platform, contract_chain)
            ]
          ? `${contract_url}${
              codePlatform[
                getContractBlockchainId(contract_platform, contract_chain)
              ][contract_platform]
            }`
          : ""
      )
      .then(
        () => {
          setShowCheck(true);
          setTimeout(() => setShowCheck(false), 2000);
        },
        () => console.log("Could not copy to clipboard")
      );
  };

  return (
    <Box
      key={file.file_path}
      onClick={() => setCurrentFile(file)}
      background={selected ? "white" : "gray.100"}
      borderWidth={selected ? "1px" : "0px"}
      borderRightWidth={"1px"}
      borderColor={selected ? "gray.100" : "#C4C4C4"}
      px="10px"
      w="200px"
      h="40px"
      borderBottomColor={selected ? "#3300FF" : "#C4C4C4"}
      borderBottomWidth="2px"
    >
      <HStack
        justifyContent="flex-start"
        alignItems="center"
        height="100%"
        width="200px"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tooltip label={file.file_path} aria-label="A tooltip">
          <Text fontSize={"xs"} w="150px" isTruncated>
            {file.file_path}
          </Text>
        </Tooltip>
        {isHovered && !showCheck && (
          <AiOutlineCopy
            onClick={(e) => {
              e.stopPropagation();
              copyFileLink();
            }}
          />
        )}
        {showCheck && <CheckIcon color="#38CB89" />}
      </HStack>
    </Box>
  );
};

export default FileNameTab;
