import React from "react";
import {
  Flex,
  HStack,
  Text,
  FormControl,
  Divider,
  VStack,
  Checkbox,
  Collapse,
} from "@chakra-ui/react";
import Select from "react-select";
import { FolderIcon, SimpleFileIcon } from "./icons";

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
}> = ({ value, label }) => (
  <div id={value} style={{ display: "flex", flexDirection: "row" }}>
    <div>{label}</div>
  </div>
);

const fileData: { path: string; type: string; sha?: string }[] = [
  {
    path: "skljdklsajdlkajsldk",
    type: "folder",
    sha: "ashdkashdkjhaskljd",
  },
  {
    path: "skljdklsajdlkajsldk",
    type: "folder",
    sha: "ashdkashdkjhaskljd",
  },
  {
    path: "skljdklsajdlkajsldk",
    type: "file",
  },
  {
    path: "skljdklsajdlkajsldk",
    type: "file",
  },
  {
    path: "skljdklsajdlkajsldk",
    type: "file",
  },
];

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
  fileList: { path: string; type: string; sha?: string }[];
}> = ({ fileList }) => {
  return (
    <Flex
      height="fit-content"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      ml={5}
    >
      {fileList.map((item) => (
        <FileItem fileItem={item} />
      ))}
    </Flex>
  );
};

const FileItem: React.FC<{
  fileItem: { path: string; type: string; sha?: string };
}> = ({ fileItem }) => {
  const [isChecked, setIsChecked] = React.useState(true);

  const [show, setShow] = React.useState(false);

  return (
    <>
      <HStack
        mb={2}
        spacing={5}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Checkbox
          isChecked={isChecked}
          colorScheme={"purple"}
          borderColor={"gray.500"}
          onChange={() => setIsChecked(!isChecked)}
        ></Checkbox>
        {fileItem.type === "file" ? (
          <SimpleFileIcon size={20} />
        ) : (
          <FolderIcon active={isChecked} size={20} />
        )}
        <Text
          onClick={() => setShow(!show)}
          color={isChecked ? "#4E5D78" : "#4E5D7880"}
        >
          {fileItem.path}
        </Text>
      </HStack>
      {fileItem.sha && show && <FileList fileList={fileData} />}
    </>
  );
};

const FolderSettings: React.FC = () => {
  return (
    <Flex
      minHeight="300px"
      height="35vh"
      mt={8}
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <HStack mt={-5} spacing={5}>
        <Text>Select your branch</Text>
        <FormControl id="select_branch" width={"300px"}>
          <Select
            formatOptionLabel={formatOptionLabel}
            isSearchable={true}
            isDisabled={false}
            options={branches.map((item) => ({ value: item, label: item }))}
            placeholder="Select Branch"
            styles={customStyles}
            onChange={(newValue) => {}}
          />
        </FormControl>
      </HStack>
      <Divider mt={3} color="gray.700" borderWidth="1px" />
      <Flex
        height="calc(100% - 10px)"
        mt={3}
        width={"100%"}
        flexDir="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflowX={"scroll"}
      >
        <FileList fileList={fileData} />
      </Flex>
    </Flex>
  );
};

export default FolderSettings;
