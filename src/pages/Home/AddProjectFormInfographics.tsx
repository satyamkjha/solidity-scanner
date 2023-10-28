import React from "react";
import {
  Flex,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";

export const AddProjectFormInfographics: React.FC<{
  imgUrl: string;
  instructions: string[];
}> = ({ imgUrl, instructions }) => {
  return (
    <Flex
      display={"flex"}
      w={"100%"}
      h="100%"
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      overflowY="scroll"
    >
      <Image src={imgUrl} height="320px" width="400px" />
      <Text
        mt={5}
        w="100%"
        sx={{
          fontSize: "sm",
          color: "subtle",
          textAlign: "left",
        }}
      >
        NOTE: Please verify the following to avoid scan failure:
      </Text>
      <UnorderedList fontSize="sm" w="90%" mt={5} spacing={5}>
        {instructions.map((item) => (
          <ListItem>{item}</ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
};
