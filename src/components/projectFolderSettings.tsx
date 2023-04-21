import React, { useState, useEffect } from "react";
import {
  Flex,
  HStack,
  Text,
  Stack,
  FormControl,
  Divider,
  VStack,
  Checkbox,
  Collapse,
  Button,
  Spinner,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import Select from "react-select";
import { FolderIcon, SimpleFileIcon } from "./icons";
import { AiOutlineFile } from "react-icons/ai";
import { FaCodeBranch } from "react-icons/fa";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  RepeatClockIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { type } from "os";
import { TreeItem } from "common/types";

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
}> = ({ value, label }) => (
  <div id={value} style={{ display: "flex", flexDirection: "row" }}>
    <div>{label}</div>
  </div>
);

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
    borderRadius: 15,
    border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.3 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const FileList: React.FC<{
  fileList: TreeItem;
  view: "github_app" | "detailed_result" | "scan_history";
  skipped: boolean;
  addFilePath: (path: string) => void;
  deleteFilePath: (path: string) => void;
  skipFilePaths: string[];
}> = ({
  fileList,
  view,
  skipped,
  addFilePath,
  deleteFilePath,
  skipFilePaths,
}) => {
  return (
    <Flex
      height="fit-content"
      width={"fit-content"}
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      pl={[2, 2, 7]}
    >
      {fileList.tree.map((item, index) => (
        <FolderItem
          key={index}
          addFilePath={addFilePath}
          deleteFilePath={deleteFilePath}
          skipFilePaths={skipFilePaths}
          view={view}
          folderItem={item}
          skipped={skipped || skipFilePaths.includes(`${item.path}/`)}
        />
      ))}
      {fileList.blobs.map((item, index) => (
        <FileItem
          key={index}
          addFilePath={addFilePath}
          deleteFilePath={deleteFilePath}
          skipFilePaths={skipFilePaths}
          view={view}
          fileName={item}
          filePath={fileList.path}
          skipped={
            skipped ||
            skipFilePaths.includes(
              `${fileList.path}${fileList.path !== "" ? "/" : ""}${item}`
            )
          }
        />
      ))}
    </Flex>
  );
};

const FolderItem: React.FC<{
  folderItem: TreeItem;
  skipped: boolean;
  addFilePath: (path: string) => void;
  deleteFilePath: (path: string) => void;
  skipFilePaths: string[];
  view: "github_app" | "detailed_result" | "scan_history";
}> = ({
  folderItem,
  view,
  skipped,
  addFilePath,
  deleteFilePath,
  skipFilePaths,
}) => {
  const [isChecked, setIsChecked] = React.useState(!skipped);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setIsChecked(!skipped);
  }, []);

  return (
    <>
      <Flex
        p={2}
        pl={2}
        width={"fit-content"}
        cursor={"pointer"}
        onClick={() => setShow(!show)}
        justifyContent="flex-start"
        alignItems="center"
        borderRadius={5}
        _hover={{
          backgroundColor: "gray.100",
        }}
      >
        {show ? <ChevronDownIcon mr={2} /> : <ChevronRightIcon mr={2} />}
        {view !== "scan_history" && (
          <Checkbox
            mr={3}
            isChecked={isChecked}
            colorScheme={"purple"}
            borderColor={"gray.500"}
            onChange={() => {
              if (isChecked) {
                addFilePath(`${folderItem.path}/`);
              } else {
                deleteFilePath(`${folderItem.path}/`);
              }
              setIsChecked(!isChecked);
            }}
          ></Checkbox>
        )}
        <FolderIcon active={isChecked} size={20} />
        <Text ml={3} color={isChecked ? "#4E5D78" : "#4E5D7880"}>
          {folderItem.name}
        </Text>
      </Flex>
      {show && (
        <FileList
          addFilePath={addFilePath}
          deleteFilePath={deleteFilePath}
          skipFilePaths={skipFilePaths}
          view={view}
          fileList={folderItem}
          skipped={!isChecked}
        />
      )}
    </>
  );
};

const FileItem: React.FC<{
  fileName: string;
  filePath: string;
  skipped: boolean;
  addFilePath: (path: string) => void;
  deleteFilePath: (path: string) => void;
  skipFilePaths: string[];
  view: "github_app" | "detailed_result" | "scan_history";
}> = ({
  fileName,
  filePath,
  view,
  skipped,
  addFilePath,
  deleteFilePath,
  skipFilePaths,
}) => {
  const [isChecked, setIsChecked] = React.useState(!skipped);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setIsChecked(!skipped);
  }, []);

  return (
    <Flex
      p={2}
      pl={view !== "scan_history" && fileName.slice(-4) !== ".sol" ? "60px" : 8}
      width={"fit-content"}
      cursor={"pointer"}
      onClick={() => setShow(!show)}
      justifyContent="flex-start"
      alignItems="center"
      borderRadius={5}
      _hover={{
        backgroundColor: "gray.100",
      }}
    >
      {view !== "scan_history" && fileName.slice(-4) === ".sol" && (
        <Checkbox
          mr={3}
          isChecked={isChecked}
          colorScheme={"purple"}
          borderColor={"gray.500"}
          onChange={() => {
            if (isChecked) {
              addFilePath(
                `${filePath}${filePath !== "" ? "/" : ""}${fileName}`
              );
            } else {
              deleteFilePath(
                `${filePath}${filePath !== "" ? "/" : ""}${fileName}`
              );
            }
            setIsChecked(!isChecked);
          }}
        ></Checkbox>
      )}
      <AiOutlineFile
        color={
          isChecked && fileName.slice(-4) === ".sol" ? "#4E5D78" : "#4E5D7880"
        }
        size={20}
      />
      <Text
        ml={3}
        color={
          isChecked && fileName.slice(-4) === ".sol" ? "#4E5D78" : "#4E5D7880"
        }
      >
        {fileName}
      </Text>
    </Flex>
  );
};

const FolderSettings: React.FC<{
  view: "github_app" | "detailed_result" | "scan_history";
  fileData: TreeItem;
  branches?: string[];
  branch: string;
  setBranch?: React.Dispatch<React.SetStateAction<string>>;
  skipFilePaths: string[];
  setSkipFilePaths?: React.Dispatch<React.SetStateAction<string[]>>;
  updateSkipPathRequests?: () => Promise<void>;
  isLoading?: boolean;
}> = ({
  view,
  branches,
  fileData,
  skipFilePaths,
  setSkipFilePaths,
  branch,
  setBranch,
  updateSkipPathRequests,
  isLoading,
}) => {
  const addFilePath = (path: string) => {
    setSkipFilePaths && setSkipFilePaths([...skipFilePaths, path]);
  };

  const deleteFilePath = (path: string) => {
    const newPath = skipFilePaths.filter((item) => item !== path);
    setSkipFilePaths && setSkipFilePaths([...newPath]);
  };

  const [selectValue, setSelectValue] = useState({
    value: branch,
    label: branch,
  });

  return (
    <Flex
      minHeight={view === "github_app" ? "350px" : "300px"}
      height={[
        "fit-content",
        "fit-content",
        "fit-content",
        view === "github_app" ? "35vh" : "30vh",
      ]}
      width={"100%"}
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {view !== "scan_history" && (
        <Flex
          alignItems="center"
          justifyContent={"flex-start"}
          flexDir={["column", "column", "row"]}
          w="100%"
        >
          {view === "github_app" && (
            <>
              <Text color="gray.500" mr={[0, 0, 5]} mb={[3, 3, 0]}>
                Select your branch
              </Text>
              <FormControl id="select_branch" width={["100%", "100%", "300px"]}>
                <Select
                  formatOptionLabel={formatOptionLabel}
                  isSearchable={true}
                  isClearable={true}
                  isDisabled={isLoading}
                  defaultValue={selectValue}
                  options={
                    branches
                      ? branches.map((item) => ({ value: item, label: item }))
                      : []
                  }
                  placeholder="Select Branch"
                  styles={customStyles}
                  onChange={(newValue) => {
                    if (newValue && setBranch) {
                      setBranch(newValue.value);
                      setSelectValue(newValue);
                    }
                  }}
                />
              </FormControl>
            </>
          )}
        </Flex>
      )}
      {view === "detailed_result" && (
        <Flex
          alignItems="center"
          justifyContent={["flex-start", "flex-start", "space-between"]}
          flexDir={["column", "column", "row"]}
          w="100%"
        >
          <HStack spacing={3}>
            <FaCodeBranch />
            <Text>{branch}</Text>
          </HStack>
          <HStack spacing={3}>
            <Button
              px={10}
              width={["100%", "100%", "150px"]}
              variant="accent-outline"
              isLoading={isLoading}
              color="#3E15F4"
              onClick={updateSkipPathRequests}
            >
              <RepeatClockIcon mr={3} />
              Update
            </Button>
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <InfoIcon color="#d7cdfa" />
              </PopoverTrigger>
              <PopoverContent p={3}>
                <PopoverArrow />
                <PopoverCloseButton />

                <PopoverBody>
                  <Text
                    fontSize="sm"
                    textAlign="left"
                    lineHeight="title"
                    fontWeight={"300"}
                    mb={0}
                  >
                    Files you have selected to be skipped will not be scanned in
                    the future scans.
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </Flex>
      )}
      <Divider mt={3} color="gray.700" borderWidth="1px" />
      <Flex
        height="calc(100% - 10px)"
        mt={3}
        ml={[-2, -2, -5]}
        width={"100%"}
        flexDir="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflowX={"scroll"}
        overflowY={"scroll"}
      >
        {isLoading ? (
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Spinner color="gray.500" />
          </Flex>
        ) : (
          <FileList
            addFilePath={addFilePath}
            deleteFilePath={deleteFilePath}
            skipFilePaths={skipFilePaths}
            view={view}
            fileList={fileData}
            skipped={false}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default FolderSettings;
