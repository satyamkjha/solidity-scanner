import React, { useState } from "react";
import { useMediaQuery, Flex, HStack, Text, Box } from "@chakra-ui/react";
import {
  VictoryArea,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryScatter,
} from "victory";
import { formattedDate, shortenNumber } from "common/functions";
import { monthNames } from "common/values";

interface IProps {
  datum: any;
  x: number;
  y: number;
  center?: any;
}

const CustomTooltip = (props: IProps) => {
  const { datum, x, y } = props;
  const tooltipWidth = 120;
  const tooltipHeight = 50;

  if (!datum || !x || !y) {
    return null;
  }

  return (
    <g style={{ pointerEvents: "none" }}>
      <foreignObject
        x={x - tooltipWidth / 2}
        y={y - tooltipHeight}
        width={tooltipWidth}
        height={tooltipHeight}
      >
        <Box
          position="relative"
          background="white"
          borderRadius="10px"
          p={2}
          textAlign="left"
        >
          <Text fontSize="11px" fontWeight={800} whiteSpace={"nowrap"}>
            {"$ "}
            {datum.y?.toLocaleString()}
          </Text>
          <Text fontSize="8px" fontWeight={400} color="gray.500">
            {datum.tooltip || formattedDate(datum.x)}
          </Text>
        </Box>
      </foreignObject>
    </g>
  );
};

const Chart: React.FC<{
  hacksList: any;
  selectedTimeFilter: "all" | "W" | "M" | "Y";
  selectedMonth: string;
}> = ({ hacksList, selectedTimeFilter, selectedMonth }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  let chartData = [];
  let formattedDates = [];
  if (hacksList) {
    console.log(new Date(selectedMonth).getMonth());
    if (selectedTimeFilter === "Y") {
      const monthlyData: Record<string, number> = {};
      const data = hacksList.map((item) => {
        const month = new Date(item.date).toLocaleString("default", {
          month: "short",
        });
        const xLabel =
          new Date(item.date).getMonth() >= currentMonth
            ? `${month} ${currentYear - 1}`
            : `${month} ${currentYear}`;
        if (!monthlyData[xLabel]) {
          monthlyData[xLabel] = 0;
        }
        monthlyData[xLabel] += item.amount_in_usd;

        return {
          x: xLabel,
          y: item.amount_in_usd,
        };
      });

      chartData = Object.entries(monthlyData).map(([month, amount]) => ({
        x: new Date(month),
        y: amount,
        tooltip: month,
      }));
    } else if (selectedTimeFilter === "all") {
      const yearlyData: Record<string, number> = {};
      const data = hacksList.map((item) => {
        const xLabel = new Date(item.date).getFullYear();
        if (!yearlyData[xLabel]) {
          yearlyData[xLabel] = 0;
        }
        yearlyData[xLabel] += item.amount_in_usd;

        return {
          x: xLabel,
          y: item.amount_in_usd,
        };
      });

      chartData = Object.entries(yearlyData).map(([year, amount]) => ({
        x: new Date(year),
        y: amount,
        tooltip: year,
      }));
    } else {
      chartData = hacksList.map((item) => {
        return {
          x: new Date(item.date),
          y: item.amount_in_usd,
          tooltip: formattedDate(new Date(item.date)),
        };
      });
      formattedDates = hacksList.map((item) => new Date(item.date));
    }
  }

  const [
    is300Pixel,
    is450Pixel,
    is600Pixel,
    is750Pixel,
    is1000Pixel,
    is1250Pixel,
  ] = useMediaQuery([
    "(max-width: 300px)",
    "(max-width: 450px)",
    "(max-width: 600px)",
    "(max-width: 750px)",
    "(max-width: 1000px)",
    "(max-width: 1250px)",
  ]);

  const getHeight = () => {
    let height: number = 0;
    if (is300Pixel) {
      height = 1100;
    } else if (is450Pixel) {
      height = 900;
    } else if (is600Pixel) {
      height = 700;
    } else if (is750Pixel) {
      height = 500;
    } else if (is1000Pixel) {
      height = 420;
    } else if (is1250Pixel) {
      height = 350;
    } else {
      height = 280;
    }
    return height;
  };
  const getYAxisDomain = () => {
    const dataValues = chartData.map((data) => data.y);
    const minY = Math.min(0, ...dataValues);
    const maxY = Math.max(...dataValues);
    const padding = (maxY - minY) * 0.1;
    return [minY, maxY + padding];
  };

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
      {selectedMonth && (
        <HStack
          w="100%"
          px={20}
          mt={10}
          mb={"-60px"}
          justifyContent={"flex-end"}
        >
          <Text color="#424242">
            {monthNames.findIndex(
              (m) => m.toLowerCase() === selectedMonth.toLowerCase()
            ) <= new Date().getMonth()
              ? selectedMonth + " " + new Date().getFullYear()
              : selectedMonth + " " + (new Date().getFullYear() - 1)}
          </Text>
        </HStack>
      )}
      {chartData.length ? (
        <VictoryChart
          scale={{ x: "time" }}
          containerComponent={<VictoryVoronoiContainer />}
          width={600}
          height={getHeight()}
          theme={{
            ...VictoryTheme.material,
            axis: {
              ...VictoryTheme.material.axis,
              style: {
                ...VictoryTheme.material.axis?.style,
                axis: { stroke: "none" },
                grid: {
                  stroke: "#2D2D2D",
                },
              },
            },
          }}
          style={{ parent: { overflow: "visible" } }}
        >
          {chartData.length === 1 ? (
            <VictoryAxis
              style={{
                tickLabels: { fill: "#4E5D78", fontSize: 9 },
                axisLabel: { fontSize: 9 },
                grid: { stroke: "none" },
                ticks: {
                  stroke: "#2D2D2D",
                },
              }}
              theme={VictoryTheme.material}
              tickFormat={(x) => formattedDate(x)}
              tickCount={1}
            />
          ) : (
            <VictoryAxis
              style={{
                tickLabels: { fill: "#4E5D78", fontSize: 9 },
                axisLabel: { fontSize: 9 },
                grid: { stroke: "none" },
                ticks: {
                  stroke: "#2D2D2D",
                },
              }}
              theme={VictoryTheme.material}
            />
          )}

          <VictoryAxis
            style={{
              tickLabels: { fill: "#4E5D78", fontSize: 10 },
              axisLabel: { fontSize: 10 },
              axis: { stroke: "none" },
              grid: {
                stroke: "#2D2D2D",
              },
              ticks: {
                stroke: "#2D2D2D",
              },
            }}
            dependentAxis
            tickFormat={(tick) => shortenNumber(tick, 1)}
            theme={VictoryTheme.material}
            domain={getYAxisDomain()}
          />
          <VictoryArea
            data={chartData}
            style={{
              data: {
                stroke: "#4489E9",
                strokeWidth: 2,
                fill: "#4489E9",
                fillOpacity: 0.05,
              },
            }}
            interpolation="cardinal"
            labelComponent={
              <VictoryTooltip flyoutComponent={<CustomTooltip />} />
            }
            labels={() => ""}
          />
          {chartData.length === 1 && (
            <VictoryScatter
              data={chartData}
              size={3}
              style={{ data: { fill: "#4489E9" } }}
              labelComponent={
                <VictoryTooltip flyoutComponent={<CustomTooltip />} />
              }
              labels={() => ""}
            />
          )}
        </VictoryChart>
      ) : (
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          h={getHeight() + 150}
        >
          <Text fontSize={"xl"} color={"detail"}>
            No data found
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Chart;
