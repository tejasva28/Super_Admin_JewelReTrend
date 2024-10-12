// File: src/views/admin/Dashboard.js

// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from 'react';
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CurrentStocks from "views/admin/Sales/components/CurrentStocks";
import SalesTable from "views/admin/Sales/components/DevelopmentTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "/Users/tejasva/Downloads/horizon-ui-chakra-main/src/views/insurance/components/TotalSpent.js";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataDevelopment from "views/admin/Sales/variables/tableDataDevelopment.json";
import { FcWorkflow } from "react-icons/fc";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaList } from "react-icons/fa";
import DisbursedTable from "./components/DisbursedTable";
import disbursedData from '/Users/tejasva/Downloads/horizon-ui-chakra-main/src/views/insurance/variables/DisbursedData.js'; // Adjust the path based on your project structure
import TransitTable from '/Users/tejasva/Downloads/horizon-ui-chakra-main/src/views/insurance/components/TransitInsurance.js';
import transitData from "./variables/transitData";

// Render Component
export default function Insurance() {
  // Chakra Color Mode
  const [timeRange, setTimeRange] = useState('24hours');
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />}
            />
          }
          name="Total Insurance Cover"
          value="INR 1,000,000,00 Cr"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={FaList} color={brandColor} />
              }
            />
          }
          name="Available Cover"
          value="95,000,00"
        />
        <MiniStatistics 
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={RiMoneyDollarBoxFill} color={brandColor} />}
            />
          }
          name="Total Disbursed Cover"
          value="INR 2,000,00" 
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <TransitTable
          tableData={transitData}
          desiredAttributes={['transitID', 'customerName', 'productName']}
        />
        <MiniCalendar h="200%" minW="100%" selectRange={false} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <DisbursedTable 
          tableData={disbursedData.slice(0, 4)} 
          desiredAttributes={["id", "customerName", "phoneNumber", "purchasedProduct"]}
        />
      </SimpleGrid>
    </Box>
  );
}