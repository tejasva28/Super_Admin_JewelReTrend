// File: src/views/admin/default/components/InsuranceDisbursementChart.js

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataInsuranceDisbursement,
  lineChartOptionsInsuranceDisbursement
} from "../variables/charts.js";

export default function InsuranceDisbursementChart(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // State for selected time range (optional)
  const [timeRange, setTimeRange] = useState("This Year");

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      {/* Header with Time Range Button and Chart Icon */}
      <Flex
        justify="space-between"
        ps="0px"
        pe="20px"
        pt="5px"
        w="100%"
        flexDirection={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        mb={{ base: "4", md: "0" }}
      >
        <Flex align="center">
          <Button
            bg={boxBg}
            fontSize="sm"
            fontWeight="500"
            color={textColorSecondary}
            borderRadius="7px"
            onClick={() => setTimeRange("This Year")} // Example: handle time range selection
            mb={{ base: "2", md: "0" }}
          >
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me="4px"
            />
            {timeRange}
          </Button>
        </Flex>
        <Button
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          mt={{ base: "2", md: "0" }}
        >
          <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
        </Button>
      </Flex>

      {/* Amount and Chart */}
      <Flex
        w="100%"
        flexDirection="column"
        align="center"
      >
        {/* Amount Information */}
        <Box
          w="100%"
          textAlign="center"
          mb="20px"
        >
            
        </Box>

        {/* Line Chart */}
        <Box
          flex="1"
          minH="400px"
          w="100%"
        >
          <LineChart
            chartData={lineChartDataInsuranceDisbursement}
            chartOptions={lineChartOptionsInsuranceDisbursement}
          />
        </Box>
      </Flex>
    </Card>
  );
}