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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Input,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { MdBarChart } from "react-icons/md";
import { FaList } from "react-icons/fa";
import ordersData from "../orders/variables/OrderData.js"

// Adjust imports of custom components (remove curly braces)
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ReturnsOverviewTable from "./components/PaymentsOverviewTable.js";
import JobsCompleted from "./components/JobsCompleted.js";
import TotalSpent from "./components/ReturnStats.js";
import ReturnRequests from "./components/TransactionHistory.js";
import ReturnMetrics from "./components/ReturnMetrics.js";

// Change the component definition
const PaymentSettlement = () => {
  // Chakra Color Mode
  const [timeRange, setTimeRange] = useState('24hours');
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // Move hook declarations above the early return
  const [paymentSettlements, setPaymentSettlements] = useState([]);
  const [selectedSettlements, setSelectedSettlements] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: '',
    status: '',
    paymentMethod: '',
    transactionId: '',
  });

  useEffect(() => {
    // Fetch or define the paymentSettlements data here
    setPaymentSettlements([
      {
        settlementId: 'S001',
        transactionId: 'T123',
        amount: 150.00,
        settlementDate: '2023-10-01',
        status: 'Completed',
      },
      // ...other payment settlements...
    ]);
  }, []);

  // Handle loading or error state
  if (!paymentSettlements) {
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }} textAlign="center">
        <Spinner size="xl" />
        <Text mt="4">Loading payment settlements...</Text>
      </Box>
    );
  }

  // Filter settlements with status 'Completed'
  const completedSettlements = paymentSettlements.filter((settlement) => settlement.status === 'Completed');

  // Calculate counts
  const completedSettlementsCount = completedSettlements.length;
  const totalSettlementsCount = paymentSettlements.length;

  // Define desired attributes for JobsCompleted component
  const desiredAttributes = ['settlementId', 'transactionId', 'amount'];

  // Handler functions for filters and bulk actions
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBulkAction = (action) => {
    // Implement bulk action logic here
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Tabs Section */}
      <Tabs variant="enclosed" mb="20px">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Order Settlement</Tab>
          <Tab>Settlement Metrics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* MiniStatistics Section */}
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}
              gap="20px"
              mb="20px"
            >
              {/* Completed Settlements Statistic */}
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />}
                  />
                }
                name="Total Settlements"
                value={completedSettlementsCount}
              />
              
              {/* Total Settlements Statistic */}
              <MiniStatistics 
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={<Icon w="32px" h="32px" as={FaList} color={brandColor} />}
                  />
                }
                name="Pending Settlements"
                value={totalSettlementsCount} 
              />

<MiniStatistics 
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={<Icon w="32px" h="32px" as={FaList} color={brandColor} />}
                  />
                }
                name="Approved Returns"
                value={totalSettlementsCount} 
              />
              
              <MiniStatistics 
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={<Icon w="32px" h="32px" as={FaList} color={brandColor} />}
                  />
                }
                name="Rejected Returns"
                value={totalSettlementsCount} 
              />
            </SimpleGrid>

            {/* Rest of the Dashboard Components */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px" mb="20px">
               <TotalSpent/>
            </SimpleGrid>
            
            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
              <ReturnsOverviewTable 
                tableData={paymentSettlements} 
              />
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <ReturnRequests
              returnRequests={paymentSettlements}
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleBulkAction={handleBulkAction}
            />
          </TabPanel>

          <TabPanel>
            {/* Content for Settlement Tracking */}
           <ReturnMetrics />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

// Export the component
export default PaymentSettlement;