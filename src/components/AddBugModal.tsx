import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  Flex,
  HStack,
  Button,
  Link,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  useToast,
  Image,
  Tooltip,
  CloseButton,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { DefaultSelectOption, IssueListItem } from "common/types";
import { useFiles } from "hooks/useFiles";
import { BiCodeCurly } from "react-icons/bi";
import { useFileContent } from "hooks/useFileContent";
import { FileDataContTest } from "./result";

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
}> = ({ label, value }) => (
  <div id={value} style={{ display: "flex", flexDirection: "row" }}>
    <div>{label}</div>
  </div>
);

// const CodeContainer: React.FC<{
//   fileName: string;
//   type: "block" | "project";
// }> = ({ fileName, type }) => {
//   const { scanId: scan_id } = useParams<{ scanId: string }>();
//   const [fileContent, setFileContent] = useState<string[] | undefined>();
//   const { data, isLoading } = useFileContent(scan_id, fileName, type);

//   useEffect(() => {
//     if (data) {
//       let dataArray = data.file_contents.split("\n");
//       setFileContent([...dataArray]);
//     }
//   }, [data]);
// };

export const AddBugModal: React.FC<{ onClose(): any; isOpen: boolean }> = ({
  isOpen,
  onClose,
}) => {
  const [issueId, setIssueId] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileList, setFileList] = useState<DefaultSelectOption[]>([]);
  const [startLineNumber, setStartLineNumber] = useState(1);
  const [endLineNumber, setEndLineNumber] = useState(1);
  const [variableKey, setVariableKey] = useState("");
  const [variableValue, setVariableValue] = useState("");
  const [fileVsLine, setFileVsLine] = useState<
    { fileName: string; startLineNo: number; endLineNo: number }[]
  >([]);
  const [variableList, setVariableList] = useState<
    { key: string; value: string }[]
  >([]);
  const toast = useToast();

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      opacity: state.isDisabled ? 0.5 : 1,
      backgroundColor: state.isDisabled
        ? "#ECECEC"
        : state.isSelected
        ? "#FFFFFF"
        : state.isFocused
        ? "#E6E6E6"
        : "#FFFFFF",
      color: "#000000",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuColor,
      borderRadius: 10,
      border: "0px solid #ffffff",
      overflowY: "hidden",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      padding: 5,
      width: "500px",
      borderRadius: 15,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const { scanId } = useParams<{
    projectId: string;
    scanId: string;
  }>();

  const { data: filesData } = useFiles(scanId);

  useEffect(() => {
    let newArray: DefaultSelectOption[] = [];
    if (filesData) {
      newArray = filesData.data.files.map((file) => ({
        value: file,
        label: file,
      }));
      setFileList([...newArray]);
    }
  }, [filesData]);

  const addFileVsLine = () => {
    if (
      fileName !== "" &&
      fileName &&
      startLineNumber > 0 &&
      endLineNumber >= startLineNumber
    ) {
      setFileVsLine([
        ...fileVsLine,
        {
          fileName: fileName,
          startLineNo: startLineNumber,
          endLineNo: endLineNumber,
        },
      ]);
    } else {
      toast({
        title: `Invalid Input`,
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const removeFileVsLine = (fileItem: any) => {
    let newArray: {
      fileName: string;
      startLineNo: number;
      endLineNo: number;
    }[] = [];
    fileVsLine.map((item) => {
      if (JSON.stringify(item) !== JSON.stringify(fileItem)) {
        newArray.push(item);
      }
    });
    setFileVsLine([...newArray]);
  };

  const addVariable = () => {
    if (variableKey === "" || variableValue === "") {
      toast({
        title: `Invalid Input`,
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    } else {
      setVariableList([
        ...variableList,
        {
          key: variableKey,
          value: variableValue,
        },
      ]);
    }
  };

  const removeVariable = (variableItem: any) => {
    let newArray: {
      key: string;
      value: string;
    }[] = [];
    variableList.map((item) => {
      if (JSON.stringify(item) !== JSON.stringify(variableItem)) {
        newArray.push(item);
      }
    });
    setVariableList([...newArray]);
  };

  const searchIssues = async (inputValue: string) => {
    if (inputValue !== "") {
      const { data } = await API.get<{
        status: string;
        issues: IssueListItem[];
      }>(`${API_PATH.BACKOFFICE_API_SEARCH_ISSUES}?issue_name=${inputValue}`);
      console.log(data);
      if (data.status === "success") {
        let issueArray: any[] = [];
        issueArray = data.issues.map((issue) => ({
          ...issue,
          value: issue.issue_id,
          label: issue.issue_name,
        }));
        return issueArray;
      }
    }
    return [{ value: "", label: "No Options" }];
  };

  const loadingIssues = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      resolve(searchIssues(inputValue));
    });

  const validationCheck = () => {
    if (fileVsLine.length === 0) return false;
    if (issueId === "") return false;
    return true;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "90vw"]}
          minW={"300px"}
          overflowY={"scroll"}
          overflowX={"scroll"}
          bg="bg.subtle"
          minH={"fit-content"}
        >
          <ModalHeader
            background="rgba(82, 255, 0, 0.04)"
            backgroundImage="url('/background/pattern.png')"
            textAlign={["center", "center", "center", "left"]}
          >
            Add a Bug
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody h={"fit-content"} w={"100%"} px={[6, 6, 6, 12]}>
            <Flex
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              flexDir="column"
              h="70vh"
              overflowY={"scroll"}
            >
              <Flex
                w={"100%"}
                alignItems={["center", "center", "flex-start"]}
                flexDir="column"
                h="fit-content"
                paddingTop={"15px"}
              >
                <AsyncSelect
                  formatOptionLabel={formatOptionLabel}
                  isSearchable={true}
                  loadOptions={loadingIssues}
                  cacheOptions
                  placeholder="Select Issue"
                  styles={customStyles}
                  onChange={(newValue) => {
                    if (newValue) {
                      setIssueId(newValue.value);
                      console.log(newValue);
                    }
                  }}
                />
                <Text ml={3} mt={7} mb={5}>
                  Add Files and Line Nos
                </Text>
                <HStack w="100%" alignItems={"flex-start"} mb={5}>
                  <VStack
                    w="40%"
                    justifyContent={"flex-start"}
                    alignItems="flex-start"
                  >
                    <Select
                      formatOptionLabel={formatOptionLabel}
                      isSearchable={true}
                      options={fileList}
                      placeholder="Select File"
                      styles={customStyles}
                      onChange={(newValue) => {
                        if (newValue) {
                          setFileName(newValue.value);
                        }
                      }}
                    />
                    <HStack>
                      <Input
                        isRequired
                        placeholder="Email"
                        variant="brand"
                        size="lg"
                        width={"100px"}
                        type="number"
                        value={startLineNumber}
                        onChange={(e) => {
                          setStartLineNumber(parseInt(e.target.value));
                        }}
                      />
                      <Input
                        isRequired
                        placeholder="Email"
                        variant="brand"
                        size="lg"
                        width={"100px"}
                        type="number"
                        value={endLineNumber}
                        onChange={(e) => {
                          setEndLineNumber(parseInt(e.target.value));
                        }}
                      />
                      <Button
                        w={["100%", "100%", "100%", "100px"]}
                        variant="brand"
                        mr={[0, 0, 0, "50px"]}
                        mb={5}
                        onClick={() => addFileVsLine()}
                      >
                        Add
                      </Button>
                    </HStack>
                    {fileVsLine.map((item) => (
                      <HStack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        mb={4}
                        p={2}
                        borderRadius={5}
                        border={"1px solid #bfbfbf"}
                      >
                        <HStack>
                          <Tooltip
                            label={item.fileName}
                            aria-label={item.fileName}
                          >
                            <Text isTruncated width={"300px"}>
                              {item.fileName}
                            </Text>
                          </Tooltip>
                          <Text isTruncated width={"70px"}>
                            {item.startLineNo}
                          </Text>
                          <Text isTruncated width={"70px"}>
                            {item.endLineNo}
                          </Text>
                        </HStack>
                        <CloseButton
                          bgColor={"gray.100"}
                          onClick={() => removeFileVsLine(item)}
                        />
                      </HStack>
                    ))}
                  </VStack>
                  {fileName && fileName !== "" ? (
                    <Flex
                      sx={{
                        w: "58%",
                        bg: "white",
                        flexDir: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 15,
                        height: "500px",
                      }}
                    >
                      <FileDataContTest
                        type="block"
                        file={{
                          file_path: fileName,
                          line_nos_start: [startLineNumber],
                          line_nos_end: [endLineNumber],
                        }}
                      />
                    </Flex>
                  ) : (
                    <Flex
                      sx={{
                        w: "58%",
                        bg: "white",
                        flexDir: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 15,
                        height: "500px",
                      }}
                    >
                      <Icon
                        as={BiCodeCurly}
                        fontSize="40px"
                        color="subtle"
                        mb={4}
                      />
                      <Text color="subtle">
                        Please select a file from the dropdown to see its
                        contents.
                      </Text>
                    </Flex>
                  )}
                </HStack>

                <Text ml={3} mt={7} mb={5}>
                  Add Variables
                </Text>
                <HStack w="100%" mb={5}>
                  <Input
                    isRequired
                    placeholder="Variable Key"
                    variant="brand"
                    size="lg"
                    width={"300px"}
                    value={variableKey}
                    onChange={(e) => {
                      setVariableKey(e.target.value);
                    }}
                  />
                  <Input
                    isRequired
                    placeholder="Variable Value"
                    variant="brand"
                    size="lg"
                    width={"300px"}
                    value={variableValue}
                    onChange={(e) => {
                      setVariableValue(e.target.value);
                    }}
                  />
                  <Button
                    w={["100%", "100%", "100%", "100px"]}
                    variant="brand"
                    mr={[0, 0, 0, "50px"]}
                    mb={5}
                    onClick={() => addVariable()}
                  >
                    Add
                  </Button>
                </HStack>
                {variableList.map((item) => (
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mb={4}
                    p={2}
                    borderRadius={5}
                    border={"1px solid #bfbfbf"}
                  >
                    <HStack>
                      <Text isTruncated width={"300px"}>
                        {item.key}
                      </Text>
                      <Text isTruncated width={"300px"}>
                        {item.value}
                      </Text>
                    </HStack>
                    <CloseButton
                      bgColor={"gray.100"}
                      onClick={() => removeVariable(item)}
                    />
                  </HStack>
                ))}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              w={["100%", "100%", "100%", "200px"]}
              variant="brand"
              mr={[0, 0, 0, "50px"]}
              mb={5}
              onClick={() => {
                if (!validationCheck()) {
                  toast({
                    title: `Invalid Input`,
                    status: "error",
                    isClosable: true,
                    position: "bottom",
                  });
                }
              }}
            >
              Add Bug
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBugModal;
