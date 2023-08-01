import React, { useState, useEffect } from "react";
import { SeverityIcon } from "components/icons";
import { Flex, Box, Text, Heading, HStack, Skeleton } from "@chakra-ui/react";
import ChartFilter from "./ChartFilter";
import Chart from "./Chart";
import HackCummulativeData from "./HackCummulativeData";
import { formattedDate, shortenNumber } from "common/functions";
import Loader from "components/styled-components/Loader";
import { useHacksGraph } from "hooks/useHacksGraph";
import { monthNames } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
const HacksOverview: React.FC<{ overviewData: any }> = ({ overviewData }) => {
  const assetsURL = getAssetsURL();
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(
    new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    )
  );
  const [endDate, setEndDate] = useState(currentDate);
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<
    "all" | "W" | "M" | "Y"
  >("Y");
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilterData] = useState<any>();
  const [isChartLoading, setIsChartLoading] = useState(true);
  const { data, isLoading, refetch } = useHacksGraph(
    formattedDate(startDate, "2-digit", "es-CL"),
    formattedDate(endDate, "2-digit", "es-CL"),
    selectedChain
  );

  const attackTrendsColors = [
    "#9C003D",
    "#F46D43",
    "#FEE08B",
    "#E6F598",
    "#66C2A5",
    "#3288BD",
    "#5E4FA2",
    "#7D7D7D",
    "#A7A7A7",
    "#EBEBEB",
  ];

  useEffect(() => {
    if (data && data.data) {
      setFilterData(data.data);
      setIsChartLoading(false);
    }
  }, [data, refetch]);

  useEffect(() => {
    setIsChartLoading(true);
    refetch().finally(() => {
      if (data && data.data) {
        setFilterData(data.data);
        setIsChartLoading(false);
      }
    });
  }, [startDate, endDate, selectedChain]);

  const onFilterSelect = async (
    timeFilter: "all" | "W" | "M" | "Y",
    selectFilterValue: string,
    selectedChain: string = "all"
  ) => {
    let sd = currentDate;
    let ed = currentDate;
    setSelectedTimeFilter(timeFilter);
    switch (timeFilter) {
      case "W":
        sd = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "M":
        if (selectFilterValue) {
          const monthIndex = monthNames.findIndex(
            (m) => m.toLowerCase() === selectFilterValue.toLowerCase()
          );
          const year =
            monthIndex <= currentDate.getMonth()
              ? new Date().getFullYear()
              : new Date().getFullYear() - 1;
          sd = new Date(year, monthIndex, 1);
          ed = new Date(year, monthIndex + 1, 0);
        } else {
          sd = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          );
        }
        break;
      case "Y":
        if (selectFilterValue) {
          sd = new Date(Number(selectFilterValue), 0, 1);
          ed = new Date(Number(selectFilterValue), 11, 31);
        } else {
          sd = new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
        }
        break;
      case "all":
        sd = new Date(2011, 1, 1);
    }
    setStartDate(sd);
    setEndDate(ed);
    setFilterValue(selectFilterValue);
  };

  return (
    <Box
      flexDir={"column"}
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      w={"100%"}
      px={[4, 4, 20]}
      pt={10}
      pb={20}
      h={"fit-content"}
      minH={["fit-content", "fit-content", "fit-content", "800px"]}
      backgroundColor="#04080D"
      background={`url('${assetsURL}background/hackerboard_bg.png')`}
      backgroundSize="cover"
      backgroundPosition={"center"}
      backgroundRepeat="no-repeat"
    >
      {!overviewData ? (
        <Loader width="100%" height="90vh" />
      ) : (
        <>
          <Text color="#B0B7C3" fontSize={"xl"}>
            Web3 Hack Statistics, HackBoard
          </Text>
          <Flex
            flexDir={["column", "column", "column", "row"]}
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            w={"100%"}
            mt={5}
          >
            <Flex
              flexDir={"column"}
              display={"flex"}
              alignItems={["center", "center", "center", "flex-start"]}
              justifyContent={"flex-start"}
              w={["100%", "100%", "100%", "30%"]}
              h="fit-content"
            >
              <Heading
                fontSize={"6xl"}
                mb={1}
                sx={{
                  background:
                    "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0px 4px 24px 0px #29F67E69",
                }}
              >
                ${shortenNumber(overviewData.total_amount, 0, true)}
              </Heading>
              <Text mb={4} color="#8A94A6" fontSize={"lg"}>
                Total amount hacked worldwide
              </Text>
              <Flex
                w="100%"
                flexDir="column"
                display={["flex", "flex", "flex", "none"]}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <ChartFilter
                  onFilterSelect={onFilterSelect}
                  allChains={overviewData.all_chains}
                  filterValue={filterValue}
                  setSelectedChain={setSelectedChain}
                />
                {isChartLoading ? (
                  <Skeleton
                    w={"100%"}
                    h={[900, 700, 500, 400]}
                    startColor="#060316"
                    endColor="#160d45"
                    borderRadius={["15px", "15px", "30px", "40px"]}
                  ></Skeleton>
                ) : (
                  <>
                    <Chart
                      hacksList={filteredData.attack_list}
                      selectedTimeFilter={selectedTimeFilter}
                      selectedFilterValue={filterValue}
                    />
                    <HackCummulativeData filteredData={filteredData} />
                  </>
                )}
              </Flex>
              <HStack mt={5} mb={2} w="100%" justifyContent={"space-between"}>
                <Heading color={"white"} fontSize={"2xl"} fontWeight={500}>
                  Attack Trends
                </Heading>
                {filteredData && (
                  <Heading color={"white"} fontSize={"2xl"} fontWeight={900}>
                    {filteredData.no_of_attacks}
                  </Heading>
                )}
              </HStack>
              {filteredData && (
                <>
                  <Flex width="98%" my={4} ml={3}>
                    {filteredData.attack_trends?.map((item, index) => (
                      <Flex
                        key={index}
                        height="15px"
                        bg={attackTrendsColors[index]}
                        width={`${
                          (item.count / filteredData.no_of_attacks) *
                          (100 + (filteredData.no_of_attacks * 5) / item.count)
                        }%`}
                        ml={-3}
                        zIndex={11 - index}
                        borderRadius="15px"
                        transition="width 0.6s ease-in"
                      />
                    ))}
                  </Flex>
                  {filteredData.attack_trends?.map(
                    (item: any, index: number) => (
                      <HStack
                        key={index}
                        mt={3}
                        w="100%"
                        justifyContent={"space-between"}
                      >
                        <HStack>
                          <SeverityIcon variant={attackTrendsColors[index]} />
                          <Text color="#FFFFFF" fontSize={"sm"}>
                            {item.attacked_method}
                          </Text>
                        </HStack>
                        <Text color="#FFFFFF" fontSize={"sm"}>
                          {item.count}
                        </Text>
                      </HStack>
                    )
                  )}
                </>
              )}
            </Flex>
            <Flex
              flexDir={"column"}
              display={["none", "none", "none", "flex"]}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              w={"64%"}
              h="fit-content"
            >
              <ChartFilter
                onFilterSelect={onFilterSelect}
                allChains={overviewData.all_chains}
                filterValue={filterValue}
                setSelectedChain={setSelectedChain}
              />
              {isChartLoading ? (
                <Skeleton
                  w={"100%"}
                  h={[900, 700, 500, 400]}
                  startColor="#060316"
                  endColor="#160d45"
                  borderRadius={["15px", "15px", "30px", "40px"]}
                ></Skeleton>
              ) : (
                <>
                  <Chart
                    hacksList={filteredData.attack_list}
                    selectedTimeFilter={selectedTimeFilter}
                    selectedFilterValue={filterValue}
                  />
                  <HackCummulativeData filteredData={filteredData} />
                </>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default HacksOverview;
