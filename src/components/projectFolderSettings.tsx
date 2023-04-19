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
} from "@chakra-ui/react";
import Select from "react-select";
import { FolderIcon, SimpleFileIcon } from "./icons";
import { AiOutlineFile } from "react-icons/ai";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
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

const fileData: TreeItem = {
  name: "root",
  path: ".",
  tree: [
    {
      name: "assets",
      path: "./assets",
      blobs: ["eth-bsc-swap.png"],
      tree: [],
    },
    {
      name: "contracts",
      path: "./assets/contracts",
      tree: [
        {
          name: "bep20",
          path: "./assets/contracts",
          tree: [],
          blobs: ["BEP20TokenImplementation.sol", "BEP20UpgradeableProxy.sol"],
        },
        {
          name: "interfaces",
          tree: [],
          path: "./assets/interfaces",
          blobs: [
            "IBEP20.sol",
            "IERC20Query.sol",
            "IProxyInitialize.sol",
            "ISwap.sol",
          ],
        },
        {
          name: "test",
          tree: [],
          path: "./assets/contracts/test",
          blobs: [
            "ERC20ABC.sol",
            "ERC20DEF.sol",
            "ERC20EMPTYNAME.sol",
            "ERC20EMPTYSYMBOL.sol",
          ],
        },
      ],
      blobs: [
        "BSCSwapAgentImpl.sol",
        "BSCSwapAgentImpl.template",
        "BSCSwapAgentUpgradeableProxy.sol",
        "ETHSwapAgentImpl.sol",
        "ETHSwapAgentImpl.template",
        "ETHSwapAgentUpgradeableProxy.sol",
        "Migrations.sol",
      ],
    },
  ],
  blobs: [
    "BSCSwapAgentImpl.sol",
    "BSCSwapAgentImpl.template",
    "BSCSwapAgentUpgradeableProxy.sol",
    "ETHSwapAgentImpl.sol",
    "ETHSwapAgentImpl.template",
    "ETHSwapAgentUpgradeableProxy.sol",
    "Migrations.sol",
  ],
};

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

const branches = ["master", "test", "dev", "lang"];

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
      width={"100%"}
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
          skipped={skipped || skipFilePaths.includes(`${item.path}/`)}
        />
      ))}
      {fileList.blobs.map((item) => (
        <FileItem
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
        width={"100%"}
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
      pl={8}
      width={"100%"}
      cursor={"pointer"}
      onClick={() => setShow(!show)}
      justifyContent="flex-start"
      alignItems="center"
      borderRadius={5}
      _hover={{
        backgroundColor: "gray.100",
      }}
    >
      {view !== "scan_history" && (
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
      <AiOutlineFile color={isChecked ? "#4E5D78" : "#4E5D7880"} size={20} />
      <Text ml={3} color={isChecked ? "#4E5D78" : "#4E5D7880"}>
        {fileName}
      </Text>
    </Flex>
  );
};

const FolderSettings: React.FC<{
  view: "github_app" | "detailed_result" | "scan_history";
  fileData: TreeItem;
  branches?: string[];
  branch?: string;
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

  const [selectValue, setSelectValue] = useState<any>();

  useEffect(() => {
    if (branch) {
      setSelectValue({
        value: branch,
        label: branch,
      });
    }
  }, []);

  return (
    <Flex
      minHeight={view === "github_app" ? "400px" : "300px"}
      height={[
        "fit-content",
        "fit-content",
        "fit-content",
        view === "github_app" ? "35vh" : "30vh",
      ]}
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
          <Text color="gray.500" mr={[0, 0, 5]} mb={[3, 3, 0]}>
            {view === "detailed_result"
              ? "Selected Branch"
              : "Select your branch"}
          </Text>
          {view === "github_app" ? (
            <FormControl id="select_branch" width={["100%", "100%", "300px"]}>
              <Select
                formatOptionLabel={formatOptionLabel}
                isSearchable={true}
                isDisabled={isLoading}
                value={selectValue}
                options={branches.map((item) => ({ value: item, label: item }))}
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
          ) : (
            <Text
              borderRadius={15}
              border={"1px solid #B0B7C3"}
              py={3}
              px={10}
              color="gray.700"
            >
              {branch}
            </Text>
          )}

          {view === "detailed_result" && (
            <Button
              px={10}
              ml={[0, 0, 7]}
              mt={[3, 3, 0]}
              width={["100%", "100%", "200px"]}
              variant="brand"
              isLoading={isLoading}
              onClick={updateSkipPathRequests}
            >
              Update
            </Button>
          )}
        </Flex>
      )}

      <Divider mt={3} color="gray.700" borderWidth="1px" />
      <Flex
        height="calc(100% - 10px)"
        mt={3}
        ml={[-2, -2, 0]}
        width={"100%"}
        flexDir="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow={"scroll"}
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
