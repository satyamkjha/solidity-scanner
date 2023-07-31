import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  HStack,
  VStack,
  Input,
  useMediaQuery,
  FormControl,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Select from "react-select";
import { monthNames } from "common/values";
import { SearchIcon, Search2Icon } from "@chakra-ui/icons";
import FormatOptionLabel from "components/common/FormatOptionLabel";
import HackCard from "./HackCard";
import { Pagination } from "common/types";
import { useHacksList } from "hooks/useHacksList";
import PaginationNav from "components/common/PaginationNav";
import Loader from "components/styled-components/Loader";
import { formattedDate } from "common/functions";
import { NoBugIcon } from "components/icons";

const HacksExplorer: React.FC<{ overviewData: any }> = ({ overviewData }) => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

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
    ? overviewData.all_chains.map((item) => ({
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

  const [isLoading, setIsLoading] = useState(true);
  const [hacksList, setHacksList] = useState(null);
  const [searchBar, setSearchBar] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: pageNo,
    perPageCount: 9,
  });
  const [filters, setFilters] = useState<any>({});
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch } = useHacksList(
    pagination,
    filters,
    sortBy,
    searchTerm
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

  const updateHacks = () => {
    if (data && data.page) {
      setPagination({ ...pagination, totalPages: data.page.total_pages });
      setHacksList(data.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateHacks();
  }, [data]);

  useEffect(() => {
    if (
      selectedChain ||
      selectedCategory ||
      selectedMonth ||
      selectedYear ||
      sortBy
    ) {
      setIsLoading(true);
      setPageNo(1);
      setPagination({ ...pagination, pageNo: 1 });
      refetch().finally(() => updateHacks());
    }
  }, [selectedChain, selectedCategory, selectedMonth, selectedYear, sortBy]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const performSearch = async () => {
      const fetchHacks = new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(true);
          refetch().finally(() => setIsLoading(false));
        }, 500);
      });

      await fetchHacks;
    };

    const debounceSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        performSearch();
      }, 400);
    };

    debounceSearch();

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setPageNo(page);
    setPagination({ ...pagination, pageNo: page });
    refetch();
  };

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
    }
    setFilters({ ...filters, start_date: sd, end_date: ed });
    setSelectedMonth(month);
  };

  const setYearFilter = (year: string) => {
    year = year || currentYear.toString();
    setSelectedYear(year);
    if (selectedMonth) {
      setMonthFilter(selectedMonth, year);
    } else {
      setFilters({
        ...filters,
        start_date: `01-01-${year}`,
        end_date: `31-12-${year}`,
      });
    }
  };

  return (
    <Box
      w={["100%", "100%", "95%", "90%"]}
      borderRadius={15}
      p={5}
      my={[5, 5, 5, 10]}
      background={" #FAFBFC "}
      display="flex"
      flexDir={"column"}
      alignItems={["center", "center", "center", "flex-start"]}
      justifyContent={"flex-start"}
    >
      <HStack
        display={["none", "none", "none", "flex"]}
        spacing={0}
        ml={[4, 4, 4, 0]}
        justify="center"
        w="100%"
      >
        {searchBar ? (
          <Input
            isRequired
            placeholder="Search ...."
            variant="brand"
            size="lg"
            px={10}
            height={50}
            borderTopRightRadius={[15, 15, 15, 0]}
            borderBottomRightRadius={[15, 15, 15, 0]}
            width={"90%"}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        ) : (
          <>
            <FormControl w="21%">
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
            <FormControl w="21%">
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
            <FormControl w="19%">
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
            <FormControl w="19%">
              <Select
                formatOptionLabel={FormatOptionLabel}
                isSearchable={true}
                isClearable={true}
                options={yearsList}
                placeholder="Select Year"
                styles={customStylesMiddle}
                onChange={(year) => {
                  if (year) {
                    setYearFilter(year.value);
                  } else {
                    setYearFilter("");
                  }
                }}
              />
            </FormControl>
            <FormControl w="14%">
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
                  }
                }}
              />
            </FormControl>
          </>
        )}

        <Flex
          display={"flex"}
          backgroundColor={"#FAFBFC"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"8%"}
          height="50px"
          border={"2px solid #EDF2F7"}
          borderRightRadius={15}
          onClick={() => setSearchBar(!searchBar)}
        >
          {searchBar ? (
            <Button fontSize="2xl" variant="unstyled" display={["flex"]}>
              <Icon as={FiFilter} color="gray.300" />
            </Button>
          ) : (
            <Search2Icon color={"#B0B7C3"} />
          )}
        </Flex>
      </HStack>

      <InputGroup
        display={["flex", "flex", "flex", "none"]}
        alignItems="center"
        mb={4}
      >
        <Input type="text" variant={"brand"} size="lg" />
        <InputRightElement
          height="48px"
          fontSize="2xl"
          width="fit-content"
          children={
            <HStack spacing={2} mr={2}>
              <SearchIcon color="gray.300" /> <Text color="gray.300"> |</Text>
              <Popover>
                <PopoverTrigger>
                  <Button
                    fontSize="2xl"
                    variant="unstyled"
                    display={["flex", "flex", "flex", "flex", "none"]}
                  >
                    <Icon as={FiFilter} color="gray.300" />
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent w="fit-content">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody
                      display={"flex"}
                      justifyContent="flex-start"
                      alignItems={"center"}
                      flexDir={"column"}
                      w="fit-content"
                    >
                      <Flex
                        justify={"flex-start"}
                        alignItems={"center"}
                        mx={0}
                        mt={7}
                        borderRadius={10}
                        w="fit-content"
                        height={"fit-content"}
                        flexDir={"column"}
                        backgroundColor={"#EDF2F7"}
                        pb={5}
                      >
                        <FormControl mt={5} mx={3} w="280px">
                          <Select
                            formatOptionLabel={FormatOptionLabel}
                            options={chainsOptions}
                            isSearchable={false}
                            placeholder="Select Blockchain"
                            styles={customStylesStart}
                            onChange={(chain) => {
                              if (chain) {
                                setSelectedChain(chain.value);
                                setFilters({ ...filters, chain: chain.value });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl mt={5} mx={3} w="280px">
                          <Select
                            formatOptionLabel={FormatOptionLabel}
                            isSearchable={false}
                            options={categoriesOptions}
                            placeholder="Select Category"
                            styles={customStylesMiddle}
                            onChange={(category) => {
                              if (category) {
                                setSelectedCategory(category.value);
                                setFilters({
                                  ...filters,
                                  category: category.value,
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl mt={5} mx={3} w="280px">
                          <Select
                            formatOptionLabel={FormatOptionLabel}
                            isSearchable={false}
                            options={monthNames.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            placeholder="Select Month"
                            styles={customStylesMiddle}
                            onChange={(month) => {
                              if (month) {
                                setMonthFilter(month.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl mt={5} mx={3} w="280px">
                          <Select
                            formatOptionLabel={FormatOptionLabel}
                            isSearchable={false}
                            options={yearsList}
                            placeholder="Select Year"
                            styles={customStylesMiddle}
                            onChange={(year) => {
                              if (year) {
                                setYearFilter(year.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormControl mt={5} mx={3} w="280px">
                          <Select
                            formatOptionLabel={FormatOptionLabel}
                            isSearchable={false}
                            options={sortOptions}
                            placeholder="Sort By"
                            styles={customStylesMiddle}
                            onChange={(sort) => {
                              if (sort) {
                                setSortBy(sort.value);
                                setFilters({ ...filters, sort_by: sort.value });
                              }
                            }}
                          />
                        </FormControl>
                      </Flex>
                      <Button
                        color="#3300FF"
                        my={5}
                        textDecoration={"underline"}
                        variant="link"
                        display={["flex", "flex", "flex", "flex", "none"]}
                      >
                        Clear Filters
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </HStack>
          }
        />
      </InputGroup>

      {!hacksList ? (
        <Loader width={"100%"} height={"100vh"} />
      ) : (
        <Flex
          w={"100%"}
          mt={5}
          display="flex"
          flexDir={["column", "row", "row"]}
          alignItems={["flex-start", "flex-start", "flex-start", "center"]}
          justifyContent={"flex-start"}
          flexWrap={["nowrap", "wrap", "wrap"]}
          position={"relative"}
        >
          {hacksList && hacksList.length ? (
            hacksList.map((item, index) => (
              <HackCard key={index} hackData={item} />
            ))
          ) : (
            <VStack
              justifyContent="center"
              alignItems="center"
              spacing={10}
              w="100%"
              h={"50vh"}
            >
              <NoBugIcon size={200} />
              <Heading fontSize={"md"}>
                Oops! Seems the web3 hacks are camouflaged! 🦎🎭 Try different
                filters to uncover their secrets!
              </Heading>
            </VStack>
          )}
          {isLoading && (
            <Flex
              w={"100%"}
              h={"100%"}
              position={"absolute"}
              top={0}
              left={0}
              alignItems={"center"}
              justifyContent="center"
              sx={{
                backdropFilter: "blur(2px)",
              }}
            >
              <Loader />
            </Flex>
          )}
        </Flex>
      )}
      <Flex
        w={"100%"}
        alignItems={"center"}
        justifyContent="center"
        mt={10}
        mb={6}
      >
        {pagination.totalPages && (
          <PaginationNav
            currentPage={pagination.pageNo}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Flex>
    </Box>
  );
};

export default HacksExplorer;
