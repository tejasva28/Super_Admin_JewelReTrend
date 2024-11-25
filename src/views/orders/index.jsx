// File: src/views/admin/Dashboard.js

import {
  Box,
  Flex,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState, useContext } from 'react';
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdBarChart } from "react-icons/md";
import { FaList } from "react-icons/fa";
import OrdersTable from "./components/OrdersTable.js";
import JobsCompleted from "./components/JobsCompleted.js";
import { OrdersContext } from './components/OrdersContext.js'; // Import OrdersContext// Import the chart component
import TotalSpent from "views/admin/default/components/TotalSpent.js";

export default function Dashboard() {
  // Chakra Color Mode
  const [timeRange, setTimeRange] = useState('24hours');
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // Consume OrdersContext
  const { ordersData } = useContext(OrdersContext);

  // Handle loading or error state
  if (!ordersData) {
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }} textAlign="center">
        <Spinner size="xl" />
        <Text mt="4">Loading orders...</Text>
      </Box>
    );
  }

  // Filter jobs with status 'Completed'
  const completedJobs = ordersData.filter((job) => job.orderStatus === 'Completed');

  // Calculate counts
  const completedJobsCount = completedJobs.length;
  const totalJobsCount = ordersData.length;

  // Define desired attributes for JobsCompleted component
  const desiredAttributes = ['orderId', 'customerName', 'grandTotal'];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* MiniStatistics Section */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {/* Completed Jobs Statistic */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />}
            />
          }
          name="Completed Jobs"
          value={completedJobsCount}
        />
        
        {/* Total Jobs Statistic */}
        <MiniStatistics 
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={FaList} color={brandColor} />}
            />
          }
          name="Total Jobs"
          value={totalJobsCount} 
        />
      </SimpleGrid>

      {/* Rest of the Dashboard Components */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <JobsCompleted
          tableData={completedJobs}
          desiredAttributes={desiredAttributes}
        />
        {/* Pass ordersData to InsuranceDisbursementChart */}
        <TotalSpent ordersData={ordersData} />
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <OrdersTable 
          tableData={ordersData} 
        />
      </SimpleGrid>
    </Box>
  );
}
