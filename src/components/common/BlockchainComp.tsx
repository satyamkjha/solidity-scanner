import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { contractChain } from "common/values";

export const BlockchainComp: React.FC<{
  view: "dark" | "light";
  index?: number;
  blockchain: string;
  selectedChain: string;
  onBlockchainSelect: any;
}> = ({ view, index, blockchain, selectedChain, onBlockchainSelect }) => {
  const assetsUrl = getAssetsURL();

  return (
    <Flex
      my={[0, 0, 1]}
      mx={[2, 2, 0]}
      height={selectedChain === blockchain ? "100px" : "80px"}
      width={selectedChain === blockchain ? "100px" : "80px"}
      padding="10px"
      borderRadius={selectedChain === blockchain ? "50px" : "40px"}
      transition={"transform 0.3s ease"}
      transform={selectedChain === blockchain ? "scale(1)" : "scale(0.9)"}
      animation={
        index ? `zoomInAnimation ${0.1 + index / 20}s ease-in-out` : "none"
      }
      backgroundColor={view === "dark" ? "#404040" : "#F3F3F3"}
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      onClick={() => {
        onBlockchainSelect(blockchain);
      }}
      border={selectedChain === blockchain ? "3px solid #52FF00" : "none"}
    >
      <Image
        height={selectedChain === blockchain ? "60px" : "50px"}
        width={selectedChain === blockchain ? "60px" : "50px"}
        src={
          blockchain === "buildbear"
            ? `${assetsUrl}blockscan/buildbear-${
                view === "dark" ? "white" : "black"
              }.svg`
            : `${assetsUrl}${contractChain[blockchain].logoUrl}.svg`
        }
      />
    </Flex>
  );
};
