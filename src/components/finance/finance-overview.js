import numeral from "numeral";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Typography, Card } from "@mui/material";

const ChartLine = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#7783DB"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] }];

  return <Chart options={chartOptions} series={chartSeries} type="line" />;
};

const data = {
  sales: {
    current: 152996,
    last: 121420,
  },
  profit: {
    current: 32100,
    last: 25200,
  },
  cost: {
    current: 99700,
    last: 68300,
  },
};

const FinanceOverview = ({ report }) => (
  <Card>
    <Grid container>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          alignItems: "center",
          borderRight: (theme) => ({
            md: `1px solid ${theme.palette.divider}`,
          }),
          borderBottom: (theme) => ({
            md: "none",
            xs: `1px solid ${theme.palette.divider}`,
          }),
          display: "flex",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <div>
          <Typography color="textSecondary" variant="overline">
            Sales
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {numeral(report.sales?.current ?? 0).format("€0,0.00")}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            vs.
            {numeral(report.sales?.last ?? 0).format("€0,0.00")}
            &nbsp; last month
          </Typography>
        </div>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: 54,
            width: 177,
          }}
        >
          <ChartLine />
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          alignItems: "center",
          borderRight: (theme) => ({
            md: `1px solid ${theme.palette.divider}`,
          }),
          borderBottom: (theme) => ({
            xs: `1px solid ${theme.palette.divider}`,
            md: "none",
          }),
          display: "flex",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <div>
          <Typography color="textSecondary" variant="overline">
            Cost
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {numeral(report.cost?.current ?? 0).format("€0,0.00")}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            vs.
            {numeral(report.cost?.last ?? 0).format("€0,0.00")}
            &nbsp; last month
          </Typography>
        </div>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: 54,
            width: 177,
          }}
        >
          <ChartLine />
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <div>
          <Typography color="textSecondary" variant="overline">
            Profit
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {numeral(data.profit.current).format("€0,0.00")}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            vs.
            {numeral(data.profit.last).format("€0,0.00")}
            &nbsp; last month
          </Typography>
        </div>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: 54,
            width: 177,
          }}
        >
          <ChartLine />
        </Box>
      </Grid>
    </Grid>
  </Card>
);

export default FinanceOverview;
