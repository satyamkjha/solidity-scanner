import React from "react";
import { FiFilter } from "react-icons/fi";
import {
  Box,
  Button,
  HStack,
  FormControl,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import Select from "react-select";
import TimeFilter from "./TimeFilter";
import { customTranslucentDropdown } from "common/stylesForCustomSelect";
import FormatOptionLabel from "components/common/FormatOptionLabel";

const ChartFilter: React.FC<{
  onFilterSelect: any;
  allChains: string[];
  filterValue: string;
  setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
}> = ({ onFilterSelect, allChains, filterValue, setSelectedChain }) => {
  const chainsOptions = allChains
    ? allChains
        .sort((a, b) => a.localeCompare(b))
        .map((item) => ({
          value: item,
          icon: item.toLowerCase(),
          label: item,
        }))
    : [];
  return (
    <HStack
      w="100%"
      mb={5}
      justifyContent={[
        "flex-start",
        "flex-start",
        "flex-start",
        "space-between",
      ]}
    >
      <FormControl
        width={[
          "calc(100% - 60px)",
          "calc(100% - 60px)",
          "calc(100% - 60px)",
          "400px",
        ]}
        height={"fit-content"}
        mr={3}
      >
        <Select
          formatOptionLabel={FormatOptionLabel}
          isSearchable={true}
          isClearable={true}
          options={chainsOptions}
          placeholder="Select Blockchain"
          styles={customTranslucentDropdown}
          maxMenuHeight={400}
          onChange={(newVal: any) => {
            if (newVal) setSelectedChain(newVal.value);
            else setSelectedChain("all");
          }}
        />
      </FormControl>
      <Popover>
        <PopoverTrigger>
          <Button variant="unstyled" display={["flex", "flex", "flex", "none"]}>
            <FiFilter color={"#FFFFFF80"} size={24} />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="fit-content">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody w="fit-content">
              <TimeFilter
                onFilterSelect={onFilterSelect}
                filterValue={filterValue}
              />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Box display={["none", "none", "none", "flex"]}>
        <TimeFilter onFilterSelect={onFilterSelect} filterValue={filterValue} />
      </Box>
    </HStack>
  );
};

export default ChartFilter;
