import React, { useState, useEffect } from "react";
import { useMediaQuery, FormControl } from "@chakra-ui/react";
import Select from "react-select";
import { monthNames } from "common/values";
import FormatOptionLabel from "components/common/FormatOptionLabel";
import { formattedDate } from "common/functions";

const HackFilters: React.FC<{
  overviewData: any;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  refetchHacks: any;
}> = ({
  overviewData,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  refetchHacks,
}) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const sortOptions = [
    {
      value: "date",
      label: "Date",
    },
    {
      value: "chain",
      label: "BlockChain",
    },
    {
      value: "attacked_method",
      label: "Attack Method",
    },
  ];
  const chainsOptions = overviewData?.all_chains
    ? overviewData.all_chains
        .sort((a, b) => a.localeCompare(b))
        .map((item) => ({
          value: item,
          icon: item.toLowerCase(),
          label: item,
        }))
    : [];
  const categoriesOptions = overviewData?.all_categories
    ? overviewData.all_categories.map((item) => ({
        value: item,
        label: item,
      }))
    : [];
  const currentYear = new Date().getFullYear();
  const startYear = 2011;
  const yearsList = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => {
      const year = startYear + index;
      return { value: String(year), label: String(year) };
    }
  );

  const customStylesStart = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      backgroundColor: state.isSelected
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
      width: "300px",
      textAlign: "left",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      padding: 5,
      margin: 0,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      borderTopRightRadius: isDesktopView ? 0 : 15,
      borderBottomRightRadius: isDesktopView ? 0 : 15,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const customStylesMiddle = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      backgroundColor: state.isSelected
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
      width: "250px",
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      padding: 5,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: isDesktopView ? 0 : 15,
      marginLeft: isDesktopView ? -2 : 0,
      marginRight: isDesktopView ? -2 : 0,
      marginBottom: isDesktopView ? 0 : 10,
      border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  useEffect(() => {
    if (
      selectedChain ||
      selectedCategory ||
      selectedMonth ||
      selectedYear ||
      sortBy
    ) {
      refetchHacks();
    }
  }, [selectedChain, selectedCategory, selectedMonth, selectedYear, sortBy]);

  const setMonthFilter = (month: string, selectedYear: string) => {
    const monthIndex = monthNames.findIndex(
      (m) => m.toLowerCase() === month.toLowerCase()
    );
    const year = Number(selectedYear) || currentYear;
    let sd = "";
    let ed = "";
    if (monthIndex !== -1) {
      sd = formattedDate(new Date(year, monthIndex, 1), "2-digit", "es-CL");
      ed = formattedDate(new Date(year, monthIndex + 1, 0), "2-digit", "es-CL");
      setFilters({ ...filters, start_date: sd, end_date: ed });
    } else if (selectedYear) {
      setYearFilter(year.toString(), month);
    } else {
      setFilters({ ...filters, start_date: sd, end_date: ed });
    }
    setSelectedMonth(month);
  };

  const setYearFilter = (year: string, month: string) => {
    setSelectedYear(year);
    if (month) {
      setMonthFilter(month, year);
    } else if (year) {
      setFilters({
        ...filters,
        start_date: `01-01-${year}`,
        end_date: `31-12-${year}`,
      });
    } else {
      setFilters({
        ...filters,
        start_date: "",
        end_date: "",
      });
    }
  };

  return (
    <>
      <FormControl
        mt={[5, 5, 5, 0]}
        mx={[3, 3, 3, 0]}
        w={["280px", "280px", "280px", "21%"]}
      >
        <Select
          formatOptionLabel={FormatOptionLabel}
          options={chainsOptions}
          isSearchable={true}
          isClearable={true}
          placeholder="Select Blockchain"
          styles={customStylesStart}
          onChange={(chain) => {
            if (chain) {
              setSelectedChain(chain.value);
              setFilters({ ...filters, chain: chain.value });
            } else {
              setSelectedChain("");
              setFilters({ ...filters, chain: "" });
            }
          }}
        />
      </FormControl>
      <FormControl
        mt={[5, 5, 5, 0]}
        mx={[3, 3, 3, 0]}
        w={["280px", "280px", "280px", "21%"]}
      >
        <Select
          formatOptionLabel={FormatOptionLabel}
          isSearchable={true}
          isClearable={true}
          options={categoriesOptions}
          placeholder="Select Category"
          styles={customStylesMiddle}
          onChange={(category) => {
            if (category) {
              setSelectedCategory(category.value);
              setFilters({ ...filters, category: category.value });
            } else {
              setSelectedCategory("");
              setFilters({ ...filters, category: "" });
            }
          }}
        />
      </FormControl>
      <FormControl
        mt={[5, 5, 5, 0]}
        mx={[3, 3, 3, 0]}
        w={["280px", "280px", "280px", "19%"]}
      >
        <Select
          formatOptionLabel={FormatOptionLabel}
          isSearchable={true}
          isClearable={true}
          options={monthNames.map((item) => ({
            value: item,
            label: item,
          }))}
          placeholder="Select Month"
          styles={customStylesMiddle}
          onChange={(month) => {
            if (month) {
              setMonthFilter(month.value, selectedYear);
            } else {
              setMonthFilter("", selectedYear);
            }
          }}
        />
      </FormControl>
      <FormControl
        mt={[5, 5, 5, 0]}
        mx={[3, 3, 3, 0]}
        w={["280px", "280px", "280px", "19%"]}
      >
        <Select
          formatOptionLabel={FormatOptionLabel}
          isSearchable={true}
          isClearable={true}
          options={yearsList}
          placeholder="Select Year"
          styles={customStylesMiddle}
          onChange={(year) => {
            if (year) {
              setYearFilter(year.value, selectedMonth);
            } else {
              setYearFilter("", selectedMonth);
            }
          }}
        />
      </FormControl>
      <FormControl
        mt={[5, 5, 5, 0]}
        mx={[3, 3, 3, 0]}
        w={["280px", "280px", "280px", "14%"]}
      >
        <Select
          formatOptionLabel={FormatOptionLabel}
          isSearchable={true}
          isClearable={true}
          options={sortOptions}
          placeholder="Sort By"
          styles={customStylesMiddle}
          onChange={(sort) => {
            if (sort) {
              setSortBy(sort.value);
              setFilters({ ...filters, sort_by: sort.value });
            } else {
              setSortBy("");
              setFilters({ ...filters, sort_by: "" });
            }
          }}
        />
      </FormControl>
    </>
  );
};

export default HackFilters;
