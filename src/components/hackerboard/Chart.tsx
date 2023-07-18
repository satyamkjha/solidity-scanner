import React from "react";
import { useMediaQuery, Flex, HStack, Text, Box } from "@chakra-ui/react";
import {
  VictoryArea,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTheme,
} from "victory";
import { formattedDate, shortenNumber } from "common/functions";

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
          <Text fontSize="11px" fontWeight={800}>
            {"$ "}
            {datum.y?.toLocaleString()}
          </Text>
          <Text fontSize="8px" fontWeight={400} color="gray.500">
            {datum.tooltip || datum.x}
          </Text>
        </Box>
      </foreignObject>
    </g>
  );
};

const Chart: React.FC<{
  hacksList: any;
  selectedTimeFilter: "D" | "W" | "M" | "Y";
  selectedMonth: string;
}> = ({ hacksList, selectedTimeFilter, selectedMonth }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  let chartData = [];
  let formattedDates = [];
  if (hacksList) {
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
        x: month,
        y: amount,
      }));
    } else {
      chartData = hacksList.map((item) => {
        return {
          x: item.date,
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
      height = 250;
    }
    return height;
  };
  const getYAxisDomain = () => {
    const dataValues = chartData.map((data) => data.y);
    const minY = Math.min(...dataValues);
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
            {selectedMonth + " " + new Date().getFullYear()}
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
                ...VictoryTheme.material.axis.style,
                grid: {
                  ...VictoryTheme.material.axis.style.grid,
                  stroke: "#2D2D2D",
                },
              },
            },
          }}
        >
          {selectedTimeFilter === "Y" ? (
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 8 },
                axisLabel: { fontSize: 8 },
                grid: { stroke: "black" },
              }}
              theme={VictoryTheme.material}
            />
          ) : (
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 8 },
                axisLabel: { fontSize: 8 },
                grid: { stroke: "black" },
              }}
              tickFormat={(x) => formattedDate(new Date(x))}
              tickValues={formattedDates}
              tickCount={6}
              theme={VictoryTheme.material}
            />
          )}
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 10 },
              axisLabel: { fontSize: 10 },
            }}
            dependentAxis
            tickFormat={(tick) => shortenNumber(tick, 1)}
            theme={VictoryTheme.material}
            domain={getYAxisDomain()} // Adjust the y-axis domain
          />
          <VictoryArea
            data={chartData}
            style={{
              data: {
                stroke: "#4489E9",
                strokeWidth: 2,
                fill: `url(#gradient-x-axis)`,
              },
            }}
            interpolation="cardinal"
            labelComponent={
              <VictoryTooltip flyoutComponent={<CustomTooltip />} />
            }
            labels={() => " "}
          />
        </VictoryChart>
      ) : (
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          h={getHeight() + 150}
        >
          <Text fontSize={"xl"} color={"detail"}>
            {" "}
            No data found
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Chart;
