import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import Loader from "components/styled-components/Loader";

export const AddProjectFormInfographics: React.FC<{
  imgUrl: string;
  instructions: string[];
}> = ({ imgUrl, instructions }) => {
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    return () => {
      setImageLoaded(false);
    };
  }, []);

  return (
    <>
      <img
        src={imgUrl}
        alt="Pre-fetch"
        style={{ display: "none" }}
        onLoad={handleImageLoad}
      />
      {imageLoaded ? (
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
      ) : (
        <Loader width={"100%"} height={"100%"} />
      )}
    </>
  );
};
