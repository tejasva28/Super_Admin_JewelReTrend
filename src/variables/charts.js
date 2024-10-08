// Daily Traffic Dashboards Default

// Daily Traffic Dashboards Default for Jewelry Categories

export const barChartDataDailyTraffic = [
  {
    name: "Daily Traffic",
    data: [100, 150, 200, 250], // Example: Traffic on each category
  },
];

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    theme: "dark",
  },
  xaxis: {
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};


// Consumption Users Reports

// Consumption Report - Jewelry Products

export const barChartDataConsumption = [
  {
    name: "Gold Rings",
    data: [450, 400, 470, 420, 480, 500, 520, 490, 470],
  },
  {
    name: "Diamond Necklaces",
    data: [300, 280, 290, 320, 310, 330, 340, 310, 320],
  },
  {
    name: "Silver Bracelets",
    data: [150, 140, 160, 170, 180, 200, 210, 190, 180],
  },
];

export const barChartOptionsConsumption = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9"], // Weeks for sales tracking
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
  },
  fill: {
    type: "solid",
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  },
  colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};


// Pie Chart for Jewelry Inventory (Gold, Silver, Diamond)
export const pieChartOptions = {
  labels: ["Gold Inventory", "Diamond Inventory", "Silver Inventory"],
  colors: ["#FFD700", "#B9F2FF", "#C0C0C0"], // Colors for gold, diamond, silver
  chart: {
    type: 'pie',
    height: '200%',  // Let the chart fill the container height
    width: '200%',   // Let the chart fill the container width
    responsive: true,
    maintainAspectRatio: false,  // Allow chart to stretch as needed
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%'  // Adjust this if you're using a donut chart
      }
    }
  },
  legend: {
    position: 'bottom',  // Move the legend below the pie chart
    labels: {
      colors: ['#FFFFFF'],  // Adjust colors for light or dark themes
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";  // Add percentage symbol to labels
    },
    style: {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      colors: ['#FFF'],  // Label color adjustment for dark backgrounds
    },
    dropShadow: {
      enabled: false
    }
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const pieChartData = [50, 30, 20];  // Example data


export const lineChartDataTotalSpent = [
  {
    name: "Revenue",
    data: [10000, 12000, 11000, 13000, 12500, 14000], // Revenue values
  },
  {
    name: "Profit",
    data: [7000, 8000, 7500, 8500, 8200, 9000], // Profit values
  },
];

export const lineChartOptionsTotalSpent = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#4318FF", "#39B8FF"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
  },
  tooltip: {
    theme: "dark",
  },
  stroke: {
    curve: "smooth",
    type: "line",
  },
  xaxis: {
    type: "numeric",
    categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"], // Monthly tracking
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    show: false,
  },
};
