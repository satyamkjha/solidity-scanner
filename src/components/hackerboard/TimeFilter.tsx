import React, { useState } from "react";
import {
  Flex,
  Button,
  HStack,
  useMediaQuery,
  FormControl,
} from "@chakra-ui/react";
import Select from "react-select";
import { monthNames } from "common/values";
import {
  customTranslucentDropdown,
  customDropdown,
} from "common/stylesForCustomSelect";
import FormatOptionLabel from "components/common/FormatOptionLabel";

const FilterButton: React.FC<{
  timeFilter: "all" | "W" | "M" | "Y";
  filterValue: "all" | "W" | "M" | "Y";
  setTimeFilter: React.Dispatch<React.SetStateAction<"all" | "W" | "M" | "Y">>;
  onFilterSelect: any;
}> = ({ timeFilter, filterValue, setTimeFilter, onFilterSelect }) => {
  return (
    <Button
      variant={timeFilter === filterValue ? "brand" : "ghost"}
      px={5}
      py={1}
      h={8}
      color={
        timeFilter === filterValue
          ? "black"
          : ["black", "black", "black", "white"]
      }
      borderRadius={"4px"}
      background={
        timeFilter === filterValue
          ? "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
          : ""
      }
      _hover={{
        color: "black",
        background: "gray.200",
      }}
      onClick={() => {
        setTimeFilter(filterValue);
        onFilterSelect(filterValue, "");
      }}
    >
      {filterValue === "all" ? "All" : 1 + filterValue}
    </Button>
  );
};

const TimeFilter: React.FC<{
  onFilterSelect: any;
  filterValue: string;
}> = ({ onFilterSelect, filterValue }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [timeFilter, setTimeFilter] = useState<"all" | "W" | "M" | "Y">("Y");

  const currentYear = new Date().getFullYear();
  const startYear = 2011;
  const yearsList = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => {
      const year = startYear + index;
      return { value: String(year), label: String(year) };
    }
  );

  return (
    <Flex
      w="100%"
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
    >
      <Flex
        justify={"flex-start"}
        alignItems={"center"}
        mx={0}
        mt={[7, 7, 7, 0]}
        borderRadius={10}
        w="fit-content"
        height={"fit-content"}
        flexDir={["column", "column", "column", "row"]}
        backgroundColor={["#EDF2F7", "#EDF2F7", "#EDF2F7", "#EDF2F700"]}
        py={[10, 10, 10, 0]}
      >
        <HStack spacing={5} mr={8}>
          <FilterButton
            filterValue={"W"}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            onFilterSelect={onFilterSelect}
          />
          <FilterButton
            filterValue={"M"}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            onFilterSelect={onFilterSelect}
          />
          <FilterButton
            filterValue={"Y"}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            onFilterSelect={onFilterSelect}
          />
          <FilterButton
            filterValue={"all"}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            onFilterSelect={onFilterSelect}
          />
        </HStack>
        <FormControl mt={[5, 5, 5, 0]} width={["90%", "90%", "90%", "150px"]}>
          <Select
            formatOptionLabel={FormatOptionLabel}
            isSearchable={true}
            options={
              timeFilter === "Y"
                ? yearsList
                : monthNames.map((item) => ({
                    value: item,
                    label: item,
                  }))
            }
            value={
              filterValue ? { value: filterValue, label: filterValue } : null
            }
            onChange={(newValue) => {
              if (newValue) {
                onFilterSelect(timeFilter, newValue.value);
              }
            }}
            placeholder={
              timeFilter === "Y"
                ? "Year"
                : timeFilter === "M"
                ? "Month"
                : "Select"
            }
            isDisabled={["all", "W"].includes(timeFilter)}
            styles={
              isLargerThan1280 ? customTranslucentDropdown : customDropdown
            }
          />
        </FormControl>
      </Flex>
      <Button
        color="#3300FF"
        my={5}
        textDecoration={"underline"}
        variant="link"
        display={["flex", "flex", "flex", "none"]}
      >
        Clear Filters
      </Button>
    </Flex>
  );
};

export default TimeFilter;
