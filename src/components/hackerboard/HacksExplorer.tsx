import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  HStack,
  VStack,
  Input,
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
import { SearchIcon, Search2Icon } from "@chakra-ui/icons";
import HackCard from "./HackCard";
import { Pagination } from "common/types";
import { useHacksList } from "hooks/useHacksList";
import PaginationNav from "components/common/PaginationNav";
import Loader from "components/styled-components/Loader";
import { NoBugIcon } from "components/icons";
import HackFilters from "./HackFilters";

const HacksExplorer: React.FC<{ overviewData: any }> = ({ overviewData }) => {
  const [filters, setFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState("-date");
  const [isLoading, setIsLoading] = useState(true);
  const [hacksList, setHacksList] = useState<any>();
  const [searchBar, setSearchBar] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    pageNo: pageNo,
    perPageCount: 9,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch } = useHacksList(
    pagination,
    filters,
    sortBy,
    searchTerm
  );

  const updateHacks = () => {
    if (data && data.page) {
      setPagination({ ...pagination, totalPages: data.page.total_pages });
      setHacksList(data.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateHacks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setPageNo(page);
    setPagination({ ...pagination, pageNo: page });
    refetch();
  };

  const refetchHacks = () => {
    setIsLoading(true);
    setPageNo(1);
    setPagination({ ...pagination, pageNo: 1 });
    refetch().finally(() => updateHacks());
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
          <HackFilters
            overviewData={overviewData}
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            refetchHacks={refetchHacks}
          />
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
                        <HackFilters
                          overviewData={overviewData}
                          filters={filters}
                          setFilters={setFilters}
                          sortBy={sortBy}
                          setSortBy={setSortBy}
                          refetchHacks={refetchHacks}
                        />
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
            hacksList.map((item: any, index: number) => (
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
