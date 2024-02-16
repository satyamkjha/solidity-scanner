import {
  useBreakpointValue,
  Flex,
  Divider,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const DemoCodeBlock: React.FC<{ download: boolean }> = ({
  download,
}) => {
  let codeFontSize =
    useBreakpointValue({
      base: "4px",
      sm: "5px",
      md: "10px",
    }) || "10px";

  const demoCodeArray = [
    "",
    "    function callback(uint256[] memory ids, uint256 campaignId)onlyOracle public {",
    '        require(winningTicketIds[campaignId].length + ids.length <= campaigns[campaignId].rewardCount, "exceeded reward limit");',
    "",
    "        for(uint256 i = 0; i<ids.length; i++){",
    "             winningTicketIds[campaignId].push(ids[i]);",
    "            winningTixketIdExist[campaignId][ids[i]] = true;",
    "        }",
    "        for(uint256 i = 0; i<ids.length; i++){",
    "             winningTicketIds[campaignId].push(ids[i]);",
    "            winningTixketIdExist[campaignId][ids[i]] = true;",
    "        }",
    "        for(uint256 i = 0; i<ids.length; i++){",
    "             winningTicketIds[campaignId].push(ids[i]);",
    "            winningTixketIdExist[campaignId][ids[i]] = true;",
    "        }",
    "    }",
    "",
    "    function setOracleAddress(address _add) onlyOwner public {",
  ];

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      px={download ? 6 : [2, 3, 6]}
      mb={download ? 4 : [1, 2, 4]}
      flexDir={"column"}
      borderLeft={"1px solid #D9D9D9"}
      borderRight={"1px solid #D9D9D9"}
    >
      <Flex
        w={"100%"}
        flexDir={"column"}
        bg={"#FBFBFB"}
        borderRadius={15}
        mb={download ? 4 : [1, 2, 4]}
        p={download ? 4 : [1, 2, 4]}
      >
        <Flex w={"100%"} pb={download ? 3 : [1, 2, 3]}>
          <Text
            fontSize={download ? "10px" : ["6px", "7px", "10px"]}
            color={"#323B4B"}
          >
            {"item.file_path"}
          </Text>
          <Text
            fontSize={download ? "10px" : ["6px", "7px", "10px"]}
            color={"#323B4B"}
            ml={"auto"}
          >
            L{"110"} - L{"120"}
          </Text>
        </Flex>
        <Divider mb={download ? 3 : [1, 2, 3]} />
        <Flex w={"100%"} flexDir={"column"}>
          {demoCodeArray.map((content: any, cIndex: number, array: any[]) => (
            <HStack
              as={"div"}
              key={cIndex}
              align={"flex-start"}
              spacing={download ? 4 : [1, 2, 4]}
              pb={download ? 1 : ["1px", "2px", 1]}
            >
              <Text
                color={"#D8D8D8"}
                fontSize={codeFontSize}
                fontWeight="normal"
              ></Text>
              <pre
                style={{
                  fontSize: codeFontSize,
                  color: "#B0B7C3",
                  whiteSpace: "pre-wrap",
                }}
                key={cIndex}
              >
                {content}
              </pre>
            </HStack>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
