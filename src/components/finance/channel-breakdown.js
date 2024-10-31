import Chart from "react-apexcharts";
import numeral from "numeral";
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";


const ChannelBreakdown = ({ report }) => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: report.map((item) => item.color),
    dataLabels: {
      enabled: false,
    },
    labels: report.map((item) => item.label),
    legend: {
      show: true,
    },
    stroke: {
      colors: [theme.palette.background.paper],
      width: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = report.map((item) => item.data);

  return (
    <Card>
      <CardHeader title="Cost Breakdown" />
      <CardContent>
        <Chart
          height="300"
          options={chartOptions}
          series={chartSeries}
          type="pie"
        />
        {report.channelBreakdown?.map((item) => (
          <Box
            key={item.label}
            sx={{
              alignItems: "center",
              display: "flex",
              p: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: item.color,
                borderRadius: "50%",
                height: 8,
                width: 8,
              }}
            />
            <Typography color="textPrimary" sx={{ ml: 2 }} variant="subtitle2">
              {item.label}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography color="textSecondary" variant="subtitle2">
              {numeral(item.data).format("€0,0.00")}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChannelBreakdown;
