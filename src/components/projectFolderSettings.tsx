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
  PopoverTrigger,
} from "@chakra-ui/react";
import Select from "react-select";
import { FolderIcon } from "./icons";
import { AiOutlineFile } from "react-icons/ai";
import { FaCodeBranch } from "react-icons/fa";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  RepeatClockIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { TreeItem, TreeItemUP } from "common/types";
import { restructureRepoTree, generatePathArray } from "helpers/fileStructure";

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
  fileList: TreeItemUP;
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
      {fileList.tree.map((item) => (
        <FolderItem
          addFilePath={addFilePath}
          deleteFilePath={deleteFilePath}
          skipFilePaths={skipFilePaths}
          view={view}
          folderItem={item}
        />
      ))}
      {fileList.blobs.map((item) => (
        <FileItem
          addFilePath={addFilePath}
          deleteFilePath={deleteFilePath}
          skipFilePaths={skipFilePaths}
          view={view}
          fileItem={item}
        />
      ))}
    </Flex>
  );
};

const FolderItem: React.FC<{
  folderItem: TreeItemUP;
  addFilePath: (path: string) => void;
  deleteFilePath: (path: string) => void;
  skipFilePaths: string[];
  view: "github_app" | "detailed_result" | "scan_history";
}> = ({ folderItem, view, addFilePath, deleteFilePath, skipFilePaths }) => {
  const [isChecked, setIsChecked] = React.useState(
    folderItem.checked && folderItem.isChildCheck
  );
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setIsChecked(folderItem.checked && folderItem.isChildCheck);
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
  fileItem: {
    path: string;
    checked: boolean;
    name: string;
  };
  addFilePath: (path: string) => void;
  deleteFilePath: (path: string) => void;
  skipFilePaths: string[];
  view: "github_app" | "detailed_result" | "scan_history";
}> = ({ fileItem, view, addFilePath, deleteFilePath, skipFilePaths }) => {
  const [isChecked, setIsChecked] = React.useState(fileItem.checked);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setIsChecked(fileItem.checked);
  }, []);

  return (
    <Flex
      p={2}
      pl={
        view !== "scan_history" && fileItem.name.slice(-4) !== ".sol"
          ? "60px"
          : 8
      }
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
      {view !== "scan_history" && fileItem.name.slice(-4) === ".sol" && (
        <Checkbox
          mr={3}
          isChecked={isChecked}
          colorScheme={"purple"}
          borderColor={"gray.500"}
          onChange={() => {
            // if (isChecked) {
            //   addFilePath(
            //     `${filePath}${filePath !== "" ? "/" : ""}${fileName}`
            //   );
            // } else {
            //   deleteFilePath(
            //     `${filePath}${filePath !== "" ? "/" : ""}${fileName}`
            //   );
            // }
            setIsChecked(!isChecked);
          }}
        ></Checkbox>
      )}
      <AiOutlineFile
        color={
          isChecked && fileItem.name.slice(-4) === ".sol"
            ? "#4E5D78"
            : "#4E5D7880"
        }
        size={20}
      />
      <Text
        ml={3}
        color={
          isChecked && fileItem.name.slice(-4) === ".sol"
            ? "#4E5D78"
            : "#4E5D7880"
        }
      >
        {fileItem.name}
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
  const [selectValue, setSelectValue] = useState({
    value: branch,
    label: branch,
  });

  const [repoTreeUP, setRepoTreeUP] = useState<TreeItemUP>();
  const addFilePath = (path: string) => {
    setSkipFilePaths && setSkipFilePaths([...skipFilePaths, path]);
  };
  const deleteFilePath = (path: string) => {
    const newPath = skipFilePaths.filter((item) => item !== path);
    setSkipFilePaths && setSkipFilePaths([...newPath]);
  };
  const updateCheck = (path: string, check: boolean) => {
    if (repoTreeUP) {
      let newRepoTreeUP = repoTreeUP;
      const pathArray = generatePathArray(path);
      let depth = pathArray.length - 1;

      const updateChild = () => {};

      const updateFolderCheck = (tree: TreeItemUP[]): TreeItemUP[] => {
        let newTree = tree.map((item) => {
          if (pathArray[depth] === item.path) {
            depth--;
            if (depth === 0) {
              const newChildTree = restructureRepoTree(item, check);
              // tick all children same check and return updated tree ..... pass the tree and check
              return newChildTree;
            } else {
              if (pathArray[depth].slice(-1) === "/") {
                let newChildTree = updateFolderCheck(item.tree);
                return { ...item, tree: newChildTree };
              }
              let newChildBlobs = updateFileCheck(item.blobs);
              return { ...item, blobs: newChildBlobs };
            }
          }
        });
        return newTree;
      };
      // will be provided with a list of trees and will return an updated list of trees

      const updateFileCheck = (
        blobs: {
          path: string;
          checked: boolean;
          name: string;
        }[]
      ) => {
        const newBlobs = blobs.map((blob) => {
          if (pathArray[depth] === blob.path) {
            return { ...blob, checked: check };
          } else {
            return { ...blob };
          }
        });
        return newBlobs;
      };
      //will be provided with a list of blobs and will return an updated list of blobs

      // newRepoTreeUP.blobs.map((blob) => {
      //   if (pathArray[depth] === blob.path) {
      //     return { ...blob, checked: check };
      //     // updateChild()
      //   }
      // });

      // newRepoTreeUP.tree.map((item) => {
      //   if (pathArray[depth] === item.path) {
      //     depth--;
      //     if (depth === 0) {
      //       const newChildTree = restructureRepoTree(item, true);
      //       // tick all children same check and return updated tree ..... pass the tree and check
      //       return newChildTree;
      //     } else {
      //       const newChildTree = updateFolderCheck();
      //       return { ...item, tree: newChildTree };
      //     }
      //   }
      // });

      if (pathArray[depth] === "/") {
        let updatedTree = updateFolderCheck(newRepoTreeUP.tree);
        newRepoTreeUP = { ...newRepoTreeUP, tree: updatedTree };
      } else {
        let updatedBlobs = updateFileCheck(newRepoTreeUP.blobs);
        newRepoTreeUP = { ...newRepoTreeUP, blobs: updatedBlobs };
      }

      //update the tree with the global var and update the blob with the global var
      // update parent child check if any

      // state update
    }
  };

  useEffect(() => {
    if (fileData) {
      setRepoTreeUP(restructureRepoTree(fileData, true));
    }
  }, []);

  return (
    <Flex
      minHeight={view === "github_app" ? "400px" : "300px"}
      height={[
        "fit-content",
        "fit-content",
        "fit-content",
        view === "github_app" ? "50vh" : "30vh",
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
                    Files you have not selected will be skipped and will not be
                    scanned in future.
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
          repoTreeUP && (
            <FileList
              addFilePath={addFilePath}
              deleteFilePath={deleteFilePath}
              skipFilePaths={skipFilePaths}
              view={view}
              fileList={repoTreeUP}
              skipped={false}
            />
          )
        )}
      </Flex>
    </Flex>
  );
};

export default FolderSettings;
