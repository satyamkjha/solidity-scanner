import { IssueItem, Finding } from "common/types";
import {
  Flex,
  Divider,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

export const ReportCodeBlock: React.FC<{
  download: boolean;
  findings: Finding[];
  showDescription: boolean;
  codeStartLine?: number;
  codeEndLine?: number;
  filesContent: any[];
  type: string;
}> = ({
  download,
  type,
  findings,
  showDescription,
  codeStartLine,
  codeEndLine,
  filesContent,
}) => {
  const getFileContent = (
    file_path: string,
    line_start: number,
    line_end: number
  ) => {
    const file = filesContent.filter((item) => item.path === file_path);

    if (file.length === 0) {
      return [];
    }

    let dataArray = file[0].content.split("\n");

    line_start = Math.max(0, line_start - 2);
    line_end = Math.min(dataArray.length - 1, line_end + 1);

    dataArray = [...dataArray];

    return dataArray.slice(line_start, line_end + 1);
  };

  const getCodeLineNo = (start: number, index: number) => {
    return start === 0 ? index + 1 : start - 2 + index + 1;
  };

  let codeFontSize =
    useBreakpointValue({
      base: "4px",
      sm: "5px",
      md: "10px",
    }) || "10px";

  return (
    <Flex
      w={"100%"}
      h={showDescription ? "auto" : "100%"}
      px={download ? 6 : [2, 3, 6]}
      mb={showDescription ? 0 : download ? 4 : [1, 2, 4]}
      flexDir={"column"}
      borderLeft={"1px solid #D9D9D9"}
      borderRight={"1px solid #D9D9D9"}
    >
      {findings.map((item, index) => (
        <Flex
          key={index}
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
              {item.file_path}
            </Text>
            <Text
              fontSize={download ? "10px" : ["6px", "7px", "10px"]}
              color={"#323B4B"}
              ml={"auto"}
            >
              L{item.line_nos_start} - L{item.line_nos_end}
            </Text>
          </Flex>
          <Divider mb={download ? 3 : [1, 2, 3]} />
          <Flex w={"100%"} flexDir={"column"}>
            {getFileContent(
              item.file_path,
              item.file_path === type && codeStartLine
                ? codeStartLine
                : item.line_nos_start[0],
              item.file_path === type && codeEndLine
                ? codeEndLine
                : item.line_nos_end[0]
            ).map((content: any, cIndex: number, array: any[]) => (
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
                >
                  {codeStartLine
                    ? getCodeLineNo(codeStartLine, cIndex)
                    : getCodeLineNo(item.line_nos_start[0], cIndex)}
                </Text>
                <pre
                  style={{
                    fontSize: codeFontSize,
                    color:
                      (cIndex > 0 && cIndex < array.length - 2) ||
                      item.line_nos_start[0] === 0
                        ? "#000000"
                        : "#B0B7C3",
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
      ))}
    </Flex>
  );
};
