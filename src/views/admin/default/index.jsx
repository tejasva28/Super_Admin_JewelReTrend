// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from 'react';

// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import tableDataCheck from "views/admin/Sales/variables/tableDataCheck.json";
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
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataDevelopment from "views/admin/Sales/variables/tableDataDevelopment.json";
import { FcWorkflow } from "react-icons/fc";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaList } from "react-icons/fa";

// Render Component
export default function Dashboard() {
  // Chakra Color Mode
  const [timeRange, setTimeRange] = useState('24hours');
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const getValueForTimeRange = (range) => {
    switch (range) {
      case '24hours':
        return '2935';
      case '1week':
        return '20485';
      case '1month':
        return '89234';
      case 'year':
        return '1056789';
      default:
        return '2935';
    }
  };

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
          name="Profits"
          value="INR 10,000,00"
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
          name="Total SKU's"
          value="59"
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
        growth="+23%" name="Sales" value="INR 50,000,00" />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={FcWorkflow} color={brandColor} />}
            />
          }
          name="Appraisers"
          value="25"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="Products Live"
          value="40"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
        endContent={
         <Flex me="-16px" mt="10px">
              <Select
                id="timeRange"
                variant="mini"
                mt="5px"
                me="0px"
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <option value="24hours">24 Hours</option>
                <option value="1week">1 Week</option>
                <option value="1month">1 Month</option>
                <option value="year">Year</option>
              </Select>
            </Flex>
          }
          name="Visitors Today"
          value={getValueForTimeRange(timeRange)}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CurrentStocks 
        columnsData={columnsDataCheck} 
        tableData={tableDataCheck.slice(0, 4)} 
        desiredAttributes={["name", "seller", "quantity", "date"]}
        />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          {/* <PieCard /> */}
        </SimpleGrid>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        {/* Corrected SalesTable Usage */}
        <SalesTable
          tableData={tableDataDevelopment.slice(0, 6)} // Correct table data
          desiredAttributes={["id", "name", "cost", "date"]} // Specify which columns to show
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          {/* <Tasks /> */}
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
