import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import BarChart from "components/Charts/BarChart";
import React from "react";
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "variables/charts";

export default function Performance() {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");
  return (
    <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
      <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
        <Text color="gray.400" fontSize="sm" fontWeight="bold" mb="6px">
          PERFORMANCE
        </Text>
        <Text color={textColor} fontSize="lg" fontWeight="bold">
          Total orders
        </Text>
      </Flex>
      <Box minH="300px">
        <BarChart chartData={barChartData} chartOptions={barChartOptions} />
      </Box>
    </Card>
  );
}
