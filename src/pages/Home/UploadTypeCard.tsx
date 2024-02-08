import React from "react";
import { Flex, Text, HStack } from "@chakra-ui/react";
import RadioButton from "components/styled-components/RadioButton";
import { SingleFileIcon, MultiFileIcon } from "components/icons";

const UploadTypeCard: React.FC<{
  setUploadType: React.Dispatch<React.SetStateAction<"single" | "multiple">>;
  uploadMethod: "single" | "multiple";
  uploadType: "single" | "multiple";
}> = ({ setUploadType, uploadMethod, uploadType }) => {

  return (
    <Flex
      w="100%"
      minW={"190px"}
      h="100px"
      cursor={"pointer"}
      borderRadius="10px"
      backgroundColor={uploadMethod === uploadType ? "#FFFFFF" : "#F7F9FC"}
      flexDir={"row"}
      justifyContent="space-between"
      alignItems="center"
      p={7}
      boxShadow={
        uploadMethod === uploadType
          ? " 0px 4px 23px rgba(47, 248, 107, 0.2)"
          : ""
      }
      border={uploadMethod === uploadType ? "1px solid #52FF00" : ""}
      onClick={() => {
        setUploadType(uploadMethod);
      }}
    >
      <HStack w="fit-content" justifyContent="flex-start">
        {uploadMethod === "single" ? (
          <SingleFileIcon active={uploadMethod === uploadType} />
        ) : (
          <MultiFileIcon active={uploadMethod === uploadType} />
        )}
        <Text>
          {uploadMethod === "single" ? "Single Upload" : "Multi-File Upload"}
        </Text>
      </HStack>
      <RadioButton isActive={uploadMethod === uploadType} />
    </Flex>
  );
};

export default UploadTypeCard;
