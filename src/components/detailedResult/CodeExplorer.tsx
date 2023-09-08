import { HStack, Text, useMediaQuery, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

const CodeExplorer: React.FC<{
  file_content: string[];
  line_nos_start: number[];
  line_nos_end: number[];
  wait_to_scroll: number;
}> = ({ file_content, line_nos_start, line_nos_end, wait_to_scroll }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const scrollToBottom = () => {
    if (isDesktopView) {
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      }, wait_to_scroll);
    } else {
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.scrollIntoView({
            block: "end",
            inline: "start",
            behavior: "smooth",
          });
        }
      }, 500);
    }
  };

  let count: number = 0;

  const start = file_content.length;

  const values = [];

  for (let i = 0; i < 25; i++) {
    const currentValue = start + i;
    values.push(currentValue);
  }

  useEffect(() => {
    scrollToBottom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line_nos_start, line_nos_end, file_content]);

  return (
    <Flex
      sx={{
        w: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDir: "column",
        h: ["600px", "600px", "600px", "505px"],
        overflow: "hidden",
        pl: "15px",
      }}
      _hover={{
        overflow: "scroll",
      }}
    >
      <Flex
        sx={{
          w: "fit-content",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDir: "column",
          h: "fit-content",
        }}
      >
        <>
          {file_content.map((item, index) => {
            if (index + 1 > line_nos_end[count] && count <= line_nos_end.length)
              count++;

            return (
              <React.Fragment key={index}>
                {index + 1 === line_nos_start[count] ? (
                  <HStack
                    as={"div"}
                    key={index}
                    ref={elementRef}
                    align={"flex-start"}
                    spacing={5}
                    sx={{
                      scrollMarginTop: isDesktopView ? 20 : "-60vh",
                    }}
                  >
                    <Text
                      color={"gray.600"}
                      fontSize="13px"
                      fontWeight="normal"
                    >
                      {index + 1}
                    </Text>
                    <pre
                      style={{
                        fontSize: "13px",
                        color:
                          index + 1 <= line_nos_end[count] + 1 &&
                          index + 1 >= line_nos_start[count]
                            ? "#000000"
                            : "#A0AEC0",
                      }}
                      key={index}
                    >
                      {item}
                    </pre>
                  </HStack>
                ) : (
                  <HStack
                    as={"div"}
                    key={index}
                    align={"flex-start"}
                    spacing={5}
                  >
                    <Text
                      color={"gray.600"}
                      fontSize="13px"
                      fontWeight="normal"
                    >
                      {index + 1}
                    </Text>
                    <pre
                      style={{
                        fontSize: "13px",
                        color:
                          index + 1 <= line_nos_end[count] + 1 &&
                          index + 1 >= line_nos_start[count]
                            ? "#000000"
                            : "#A0AEC0",
                      }}
                      key={index}
                    >
                      {item}
                    </pre>
                  </HStack>
                )}
              </React.Fragment>
            );
          })}
          {values.map((value) => (
            <HStack as={"div"} key={value} align={"flex-start"} spacing={5}>
              <pre
                style={{
                  fontSize: "13px",
                  color: "#A0AEC0",
                }}
                key={value}
              >
                {" "}
              </pre>
            </HStack>
          ))}
        </>
      </Flex>
    </Flex>
  );
};

export default CodeExplorer;
