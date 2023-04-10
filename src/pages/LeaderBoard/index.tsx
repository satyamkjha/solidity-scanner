import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { FiCheck, FiFilter } from "react-icons/fi";
import { SeverityIcon } from "components/icons";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link,
  useDisclosure,
  HStack,
  VStack,
  Input,
  CircularProgressLabel,
  CircularProgress,
  Divider,
  useToast,
  Spinner,
  Stack,
  useMediaQuery,
  IconButton,
  FormControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SlideFade,
  ScaleFade,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";

import Header from "components/header";
import Footer from "components/footer";
import Select from "react-select";
import { monthNames } from "common/values";
import SignupBox from "components/signupBox";
import Infographics from "components/infographics";
import { DetectorIcon } from "components/icons";
import { DetectorItemProp } from "common/types";
import { detectorData } from "common/values";
import {
  VictoryArea,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTheme,
} from "victory";
import { Search2Icon } from "@chakra-ui/icons";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid #f3f3f340",
    opacity: state.isDisabled ? 0.5 : 1,
    backgroundColor: "#FFFFFF00",
    color: "#FFFFFF",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    color: "#FFFFFF",
    borderRadius: 10,
    backdropFilter: "blur(6px)",
    border: "0px solid #ffffff",
    backgroundColor: "#FFFFFF40",
    overflowY: "hidden",
  }),
  control: (state: any) => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#FFFFFF00",
    color: "#FFFFFF",
    padding: 5,
    borderRadius: 15,
    border: state.isFocused ? "2px solid #52FF0020" : "2px solid #EDF2F720",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.3 : 1;
    const transition = "opacity 300ms";
    const color = "#FFFFFF";

    return { ...provided, opacity, transition, color };
  },
};

const options = [
  {
    value: "etherscan",
    icon: "etherscan",
    label: "Ethereum - (etherscan.io)",
  },
  {
    value: "bscscan",
    icon: "bscscan",
    label: "Binance - (bscscan.com)",
  },
  {
    value: "avalanche",
    icon: "avalanche",
    label: "Avalanche C-Chain - (snowtrace.io)",
  },
  {
    value: "polygonscan",
    icon: "polygonscan",
    label: "Polygon - (polygonscan.com)",
  },
  {
    value: "fantom",
    icon: "fantom",
    label: "Fantom - (ftmscan.com)",
  },
  {
    value: "cronos",
    icon: "cronos",
    label: "Cronos - (cronoscan.com)",
  },
  {
    value: "arbiscan",
    icon: "arbiscan",
    label: "Arbiscan - (arbiscan.io)",
  },
  {
    value: "celo",
    icon: "celo",
    label: "Celo - (celoscan.io)",
  },
  {
    value: "aurora",
    icon: "aurora",
    label: "Aurora - (aurorascan.dev)",
  },
  {
    value: "reefscan",
    icon: "reefscan",
    label: "ReefScan - (reefscan.com)",
  },
  {
    value: "optimism",
    icon: "optimism",
    label: "Optimism - (optimism.io)",
  },
  {
    value: "buildbear",
    icon: "buildbear",
    label: "Buildbear - (buildbear.io)",
  },
];

const HackComp: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDir="column"
      w={["100%", "100%", "50%", "calc(33.33% - 15px)"]}
      maxW={["550px"]}
      minW={["0px", "300px"]}
      height="250px"
      borderRadius="25px"
      mr={"15px"}
      mb={"15px"}
      p={7}
      background={"#FFFFFF"}
    >
      <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          height="fit-content"
        >
          <Heading mb={3} fontSize="lg">
            WinDice
          </Heading>
          <HStack>
            <SeverityIcon variant={"low"} />
            <Text fontSize="sm">Rug Pull</Text>
          </HStack>
        </HStack>
        <Text fontSize="xs" color="#78909C">
          Total Loss
        </Text>
        <HStack mt={5} w={["100%", "100%", "80%"]} flexWrap="wrap">
          <HStack mr={3}>
            <Image
              mr={0}
              src={`/blockscan/etherscan.svg`}
              alt="Product screenshot"
              h={"25px"}
              w={"25px"}
            />
            <Heading mb={3} fontSize="lg">
              8000 BTC,
            </Heading>
          </HStack>
          <HStack>
            <Image
              mr={0}
              src={`/blockscan/bscscan.svg`}
              alt="Product screenshot"
              h={"25px"}
              w={"25px"}
            />
            <Heading mb={3} fontSize="lg">
              56,000 ETH,
            </Heading>
          </HStack>
        </HStack>
      </VStack>

      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        height="fit-content"
      >
        <Text fontSize="xs" color="#78909C">
          March 27, 2023
        </Text>
        M
        <Button variant="text" color="#3300FF">
          Learn ore
        </Button>
      </HStack>
    </Flex>
  );
};

const ArticleComp: React.FC = () => {
  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      w="350px"
      height="300px"
      borderRadius="25px"
      mr={5}
      background={"#FAFBFC"}
    >
      <Image
        src="/background/article_img.png"
        width="100%"
        height="250px"
        borderRadius="25px"
        alt={"Article Image"}
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDir="row"
        px={5}
        borderBottomLeftRadius="25px"
        borderBottomRightRadius="25px"
        width="100%"
        height="100px"
        background={"#FAFBFC"}
      >
        <VStack spacing={1} alignItems="flex-start">
          <Text fontSize="sm">Smart Contract Audit</Text>
          <Text fontSize="xs" color="#78909C">
            Published in . Mar 13
          </Text>
        </VStack>
        <Button fontSize="12px" py={4} px={5} variant="cta-outline" w="">
          Read Full Article
        </Button>
      </Flex>
    </Flex>
  );
};

const ChartComp: React.FC = () => {
  const data = [
    { x: 1, y: 240, label: "Point 1" },
    { x: 5, y: 210, label: "Point 2" },
    { x: 9, y: 150, label: "Point 3" },
    { x: 13, y: 170, label: "Point 4" },
    { x: 17, y: 190, label: "Point 5" },
    { x: 21, y: 160, label: "Point 6" },
    { x: 25, y: 180, label: "Point 7" },
    { x: 29, y: 250, label: "Point 8" },
  ];
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      my={[5, 5, 0]}
      flexDir={"column"}
      height={["fit-content"]}
      backgroundColor={"#060316"}
      borderRadius={["15px", "15px", "30px", "40px"]}
    >
      <svg style={{ height: 0 }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="my_gradient"
            x1="398.727"
            y1="-74"
            x2="398.727"
            y2="215.327"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#4489E9" />
            <stop offset="1" stop-color="#0C59C2" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <HStack w="100%" px={20} mt={10} mb={"-60px"} justifyContent={"flex-end"}>
        <Text color="#424242">June 2023</Text>
      </HStack>
      <VictoryChart
        containerComponent={<VictoryVoronoiContainer />}
        width={600}
        domain={{ x: [0, 30], y: [140, 280] }}
        height={250}
        theme={{
          ...VictoryTheme.material,
          axis: {
            ...VictoryTheme.material.axis,
            style: {
              ...VictoryTheme.material.axis?.style,
              grid: {
                ...VictoryTheme.material.axis?.style?.grid,
                stroke: "#2D2D2D",
              },
            },
          },
        }}
      >
        <VictoryArea
          data={data}
          style={{
            data: {
              stroke: "#4489E9",
              strokeWidth: 2,
              fill: "url(#my_gradient)",
            },
            labels: { fontSize: 12 },
          }}
          interpolation="cardinal"
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
              flyoutStyle={{
                stroke: "#c43a31",
                strokeWidth: 0,
                fill: "#fff",
              }}
              cornerRadius={2}
              pointerLength={4}
              pointerWidth={8}
            />
          }
          labels={({ datum }) => datum.label}
        />
        <VictoryAxis crossAxis domain={[0, 30]} theme={VictoryTheme.material} />
        <VictoryAxis
          dependentAxis
          domain={[140, 280]}
          theme={VictoryTheme.material}
        />
      </VictoryChart>
    </Flex>
  );
};

const HackCummulativeDataComp: React.FC = () => {
  const headingData = [
    { title: "The total amount hacked ", data: "$6.27B" },
    { title: "Number of hacks", data: "205" },
    { title: "Security Breaches", data: "155" },
    { title: "Security Breaches", data: "155" },
  ];

  return (
    <Flex
      sx={{
        mt: 7,
        px: [3, 3, 0],
        w: "100%",
        justifyContent: ["flex-start", "flex-start", "space-between"],
        flexDir: "row",
        flexWrap: ["wrap", "wrap", "nowrap"],
      }}
    >
      {headingData.map((item) => (
        <Flex
          sx={{
            flexDir: "column",
            alignItems: "flex-start",
            w: ["50%", "50%", "fit-content"],
          }}
        >
          <Text color={"#D9D9D9"} fontSize="sm" fontWeight={400}>
            {item.title}
          </Text>
          <Heading
            as="h1"
            color="#FFFFFF"
            mt={2}
            fontSize={["3xl", "4xl"]}
            mb={8}
          >
            {item.data}
          </Heading>
        </Flex>
      ))}
    </Flex>
  );
};

const ChartFilterComp: React.FC = () => {
  return (
    <HStack
      w="100%"
      mb={5}
      justifyContent={[
        "flex-start",
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
          "calc(100% - 60px)",
          "400px",
        ]}
        mr={3}
      >
        <Select
          formatOptionLabel={formatOptionLabel}
          isSearchable={true}
          options={options}
          placeholder="Select BlockChain"
          styles={customStyles}
          onChange={(newValue) => {}}
        />
      </FormControl>
      <Popover display={["flex", "flex", "flex", "flex", "none"]}>
        <PopoverTrigger>
          <Button variant="unstyled">
            <FiFilter color={"#FFFFFF80"} size={24} />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>ahsjdkljalkshjdklasjdkl</PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>

      <HStack mr={5} display={["none", "none", "none", "none", "flex"]}>
        <Text px={5} color="#FFFFFF">
          1 D
        </Text>
        <Text px={5} color="#FFFFFF">
          1 W
        </Text>
        <Text px={5} color="#FFFFFF">
          1 M
        </Text>
        <Text
          background="linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)"
          px={5}
          color="#000000"
          borderRadius={3}
        >
          1 Y
        </Text>
        <Text px={2} color="#000000" borderRadius={3}>
          {" "}
        </Text>
        <FormControl width="150px">
          <Select
            formatOptionLabel={formatOptionLabelFilter}
            isSearchable={true}
            options={monthNames.map((item) => ({
              value: item,
              label: item,
            }))}
            placeholder="Month"
            styles={customStyles}
            onChange={(newValue) => {}}
          />
        </FormControl>
      </HStack>
    </HStack>
  );
};

const formatOptionLabel: React.FC<{
  value: string;
  label: string;
  icon: string;
}> = ({ value, label, icon }) => (
  <div id={value} style={{ display: "flex", flexDirection: "row" }}>
    {icon !== "" && (
      <Image h={"20px"} w={"20px"} mr={3} src={`/blockscan/${icon}.svg`} />
    )}
    <div>{label}</div>
  </div>
);

const formatOptionLabelFilter: React.FC<{
  value: string;
  label: string;
}> = ({ value, label }) => (
  <div id={value} style={{ display: "flex", flexDirection: "row" }}>
    <div>{label}</div>
  </div>
);

const LeaderBoard: React.FC = () => {
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

  const attackTrendsData = [
    { title: "Contract Vulnerability", color: "#9C003D", number: "56" },
    { title: "Rug Pull", color: "#F46D43", number: "34" },
    { title: "Flash Loan Attack", color: "#FEE08B", number: "09" },
    { title: "Scam", color: "#E6F598", number: "04" },
    { title: "Honeypot", color: "#66C2A5", number: "03" },
    { title: "Access Control", color: "#3288BD", number: "07" },
    { title: "Lorem ipsum dolor sit", color: "#5E4FA2", number: "01" },
    { title: "Lorem ipsum dolor sit", color: "#7D7D7D", number: "01" },
    { title: "Lorem ipsum dolor sit", color: "#A7A7A7", number: "01" },
    { title: "Lorem ipsum dolor sit", color: "#EBEBEB", number: "01" },
  ];

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

  const [searchBar, setSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header />
      <Container maxW="100vw" p={0} color="black">
        <Flex
          as="section"
          w="100%"
          alignItems="center"
          p={0}
          textAlign={["center", "center"]}
          flexDir="column"
        >
          <Box
            flexDir={"column"}
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            w={"100%"}
            px={[4, 4, 20]}
            py={10}
            h={["fit-content", "fit-content", "fit-content", "800px"]}
            pb={"200px"}
            backgorundColor="#04080D"
            background={"url('/background/leaderboard_bg.png')"}
            backgroundSize="cover"
            backgroundPosition={"center"}
            backgroundRepeat="no-repeat"
          >
            <Text color="#B0B7C3" fontSize={"2xl"}>
              Web3 Hack Statistics, Hackerboard
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
                w={["100%", "100%", "100%", "25%"]}
                h="fit-content"
              >
                <Heading
                  fontSize={["5xl", "6xl"]}
                  mb={3}
                  sx={{
                    background:
                      "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  $ 6.27B
                </Heading>
                <Text mb={4} color="#8A94A6" fontSize={"lg"}>
                  The total amount hacked
                </Text>
                <Flex
                  w="100%"
                  flexDir="column"
                  display={["flex", "flex", "flex", "none"]}
                  justifyContent={"flex-start"}
                  alignItem={"center"}
                >
                  <ChartFilterComp />
                  <ChartComp />
                  <HackCummulativeDataComp />
                </Flex>
                <HStack mt={7} mb={2} w="100%" justifyContent={"space-between"}>
                  <Heading color={"white"} fontSize={"2xl"}>
                    Attack Trends
                  </Heading>
                  <Heading color={"white"} fontSize={"2xl"}>
                    205
                  </Heading>
                </HStack>
                {attackTrendsData.map((item) => (
                  <HStack mt={3} w="100%" justifyContent={"space-between"}>
                    <HStack>
                      <SeverityIcon variant={item.color} />
                      <Text color="#FFFFFF" fontSize={"md"}>
                        {item.title}
                      </Text>
                    </HStack>
                    <Text color="#FFFFFF" fontSize={"md"}>
                      {item.number}
                    </Text>
                  </HStack>
                ))}
              </Flex>
              <Flex
                flexDir={"column"}
                display={["none", "none", "none", "flex"]}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                w={"70%"}
                h="fit-content"
              >
                <ChartFilterComp />
                <ChartComp />
                <HackCummulativeDataComp />
              </Flex>
            </Flex>
          </Box>

          <Box
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={["90%"]}
            px={[4, 4, 7, 10]}
            mt={"-60px"}
            mb={["30px", "30px", "60px"]}
            py={[0, 0, 0, 10]}
            borderRadius={20}
            background={"#FFFFFF"}
          >
            <Heading as="h1" fontSize="3xl" my={5}>
              Explore through all the hacks{" "}
              <Box as="span" color="#3300FF" textDecoration="underline">
                since 2020
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
              Lorem ipsum dolor sit amet consectetur. Vitae egestas integer est
              ut iaculis. Volutpat nascetur tortor et ante.
            </Text>
          </Box>

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
                  width={"89%"}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              ) : (
                <>
                  <FormControl w="21%">
                    <Select
                      formatOptionLabel={formatOptionLabel}
                      options={options}
                      isSearchable={false}
                      placeholder="Select Blockchain"
                      styles={customStylesStart}
                    />
                  </FormControl>
                  <FormControl w="17%">
                    <Select
                      formatOptionLabel={formatOptionLabelFilter}
                      isSearchable={false}
                      options={[]}
                      placeholder="Select Category"
                      styles={customStylesMiddle}
                    />
                  </FormControl>
                  <FormControl w="17%">
                    <Select
                      formatOptionLabel={formatOptionLabelFilter}
                      isSearchable={false}
                      options={monthNames.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      placeholder="Select Month"
                      styles={customStylesMiddle}
                    />
                  </FormControl>
                  <FormControl w="17%">
                    <Select
                      formatOptionLabel={formatOptionLabelFilter}
                      isSearchable={false}
                      options={[]}
                      placeholder="Select Year"
                      styles={customStylesMiddle}
                    />
                  </FormControl>
                  <FormControl w="17%">
                    <Select
                      formatOptionLabel={formatOptionLabelFilter}
                      isSearchable={false}
                      options={[]}
                      placeholder="Sort By"
                      styles={customStylesMiddle}
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
                <Search2Icon color={"#B0B7C3"} />
              </Flex>
            </HStack>
            <Flex
              w={"100%"}
              mt={5}
              display="flex"
              flexDir={["column", "row", "row"]}
              alignItems={["flex-start", "flex-start", "flex-start", "center"]}
              justifyContent={"flex-start"}
              flexWrap={["nowrap", "wrap", "wrap"]}
            >
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
              <HackComp />
            </Flex>
          </Box>

          <Box
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={"90%"}
            px={[0, 0, 10]}
            py={10}
            my={10}
            borderRadius={20}
            background={"#FFFFFF"}
          >
            <Heading as="h1" fontSize="3xl" mb={4}>
              Most recent hacks that{" "}
              <Box as="span" color="#3300FF" textDecoration="underline">
                made the news
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize={["lg", "lg", "xl"]} mt={4} mb={6}>
              Lorem ipsum dolor sit amet consectetur. Vitae egestas integer est
              ut iaculis. Volutpat nascetur tortor et ante.
            </Text>
            <Flex
              justifyContent="flex-start"
              alignItems={"flex-start"}
              height="fit-content"
              width="100%"
              overflowX="scroll"
              my={20}
              pb={5}
            >
              <Flex
                justifyContent="flex-start"
                alignItems={"flex-start"}
                height="fit-content"
                width="fit-content"
              >
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
                <ArticleComp />
              </Flex>
            </Flex>
          </Box>
          <Box
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent={"flex-start"}
            w={"90%"}
            px={[0, 0, 10]}
            py={10}
            borderRadius={20}
            background={"#FFFFFF"}
          >
            <Heading as="h1" fontSize="3xl" mb={4}>
              Why{" "}
              <Box as="span" color="#3300FF">
                SolidityScan ?
              </Box>{" "}
            </Heading>
            <Text color="subtle" fontSize={["lg", "lg", "xl"]} mb={4}>
              Smart-contract scanning tool built to discover vulnerabilities &
              mitigate risks in your code.
            </Text>
            <Infographics />
            <SignupBox />
          </Box>
        </Flex>
        <Footer />
      </Container>
    </>
  );
};

export default LeaderBoard;
