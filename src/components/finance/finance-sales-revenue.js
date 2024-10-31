import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader } from "@mui/material";

const FinanceSalesRevenue = ({ report }) => {
  const theme = useTheme();

  const currentMonth = new Date().getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: ["#ffb547", "#7783DB"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 0,
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    markers: {
      strokeColors: theme.palette.background.paper,
      size: 6,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: months.slice(currentMonth+1, 12).concat(months.slice(0, currentMonth+1)),
    },
  };

  const chartSeries = [
    {
      name: "New Customers",
      data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 42, 90, 140],
    },
    {
      name: "Up/Cross-Selling",
      data: [11, 32, 45, 32, 34, 52, 41, 80, 96, 140, 30, 100],
    },
  ];

  return (
    <Card>
      <CardHeader title="Sales Revenue" />
      <CardContent>
        <Chart
          height="360"
          options={chartOptions}
          series={report}
          type="area"
        />
      </CardContent>
    </Card>
  );
};

export default FinanceSalesRevenue;
