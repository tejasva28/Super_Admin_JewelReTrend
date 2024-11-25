import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData, chartOptions }) => {
  return <Line data={chartData} options={chartOptions} />;
};
{
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

  // State for chart data
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      // Example Processing: Group disbursements by month
      const disbursementsByMonth = {};

      ordersData.forEach(order => {
        // Ensure the order has 'date' and 'disbursementAmount' fields
        if (order.date && order.disbursementAmount) {
          const date = new Date(order.date);
          // Format: 'MMM YYYY' e.g., 'Apr 2024'
          const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          if (!disbursementsByMonth[month]) {
            disbursementsByMonth[month] = 0;
          }
          disbursementsByMonth[month] += parseFloat(order.disbursementAmount) || 0;
        }
      });

      // Sort the months chronologically
      const sortedMonths = Object.keys(disbursementsByMonth).sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);
        return dateA - dateB;
      });

      // Prepare chart data
      const data = {
        labels: sortedMonths,
        datasets: [
          {
            label: "Disbursement ($)",
            data: sortedMonths.map(month => disbursementsByMonth[month]),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.4,
          }
        ]
      };

      setChartData(data);
    }
  }, [ordersData]);

  // Define chart options (customize as needed)
  const chartOptions = {
    responsive: true, // Must be a boolean
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
          callback: function(value) {
            return '$' + value;
          }
        },
        grid: {
          color: useColorModeValue('gray.200', 'gray.700'),
        },
      },
    },
  };

  if (!chartData) {
    // Loading state
    return (
      <Card
        justifyContent="center"
        align="center"
        direction="column"
        w="100%"
        mb="0px"
        {...rest}
      >
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
          <Text mt="4">Loading chart...</Text>
        </Flex>
      </Card>
    );
  }

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
          <Text fontSize="lg" fontWeight="bold">
            Total Disbursement: $
            {chartData.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}
          </Text>
        </Box>

        {/* Line Chart */}
        <Box
          flex="1"
          minH="400px"
          w="100%"
        >
          <LineChart
            chartData={chartData}
            chartOptions={chartOptions}
          />
        </Box>
      </Flex>
    </Card>
  );
}

export default LineChart;
