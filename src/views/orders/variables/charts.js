export const lineChartDataInsuranceDisbursement = [
  {
    name: "Insurance Amount",
    data: [50000, 75000, 65000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000], // Example: Monthly insurance amounts
  },
  {
    name: "Disbursement Amount",
    data: [30000, 45000, 40000, 50000, 52000, 55000, 58000, 60000, 62000, 65000, 67000, 70000], // Example: Monthly disbursement amounts
  },
];

export const lineChartOptionsInsuranceDisbursement = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#00B5D8",
    },
  },
  colors: ["#00B5D8", "#FF8C00"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: ["#00B5D8", "#FF8C00"],
    strokeWidth: 3,
  },
  tooltip: {
    theme: "light",
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], // Monthly tracking
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    title: {
      text: "Amount (INR)",
      style: {
        color: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    labels: {
      colors: "#A3AED0",
    },
  },
  grid: {
    show: false,
  },
};
