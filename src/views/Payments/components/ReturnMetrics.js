// File: src/views/returns/ReturnMetrics.js
import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Remove Chart.js imports
// import { Line, Bar, Pie } from 'react-chartjs-2';
// Remove Chart.js registration
// Import Victory Charts
import { VictoryLine, VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from 'victory';

function ReturnMetrics({ returnTimeline, returnReasons, returnCategories }) {
  // UseColorMode for theming
  const brandColor = useColorModeValue('blue.500', 'blue.300');

  // Example: Assuming props contain data in a structured form
  // returnTimeline: { labels: [...], data: [...] }
  // returnReasons: { labels: [...], data: [...] }
  // returnCategories: { labels: [...], data: [...] }

  // If data is not passed as props, you could fetch or compute here using useEffect.

  // Prepare data for Victory Charts
  const lineData = (returnTimeline?.labels || []).map((label, index) => ({
    x: label,
    y: returnTimeline?.data[index],
  }));

  const barData = (returnCategories?.labels || []).map((label, index) => ({
    x: label,
    y: returnCategories?.data[index],
  }));

  const pieData = (returnReasons?.labels || []).map((label, index) => ({
    x: label,
    y: returnReasons?.data[index],
  }));

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb="20px">
        {/* Line Chart */}
        <Box bg="whiteAlpha.50" p={4} borderRadius="md">
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              data={lineData}
              style={{ data: { stroke: brandColor } }}
            />
          </VictoryChart>
        </Box>

        {/* Pie Chart */}
        <Box bg="whiteAlpha.50" p={4} borderRadius="md">
          <VictoryPie
            data={pieData}
            colorScale={['#E53E3E', '#3182CE', '#ECC94B', '#718096']}
          />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px">
        {/* Bar Chart */}
        <Box bg="whiteAlpha.50" p={4} borderRadius="md">
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar
              data={barData}
              style={{ data: { fill: brandColor } }}
            />
          </VictoryChart>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default ReturnMetrics;