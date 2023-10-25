import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import LineChart from "components/Charts/LineChart";
import React from "react";
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "variables/charts";

export default function SalesOverview() {
  return (
    <Card
      bg={
        colorMode === "dark"
          ? "navy.800"
          : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      }
      p="0px"
      maxW={{ sm: "320px", md: "100%" }}
    >
      <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
        <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
          Sales Overview
        </Text>
        <Text color="#fff" fontSize="sm">
          <Text as="span" color="green.400" fontWeight="bold">
            (+5) more{" "} 
          </Text>
          in 2022
        </Text>
      </Flex>
      <Box minH="300px">
        <LineChart chartData={lineChartData} chartOptions={lineChartOptions} />
      </Box>
    </Card>
  );
}
