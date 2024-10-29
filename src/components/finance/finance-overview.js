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
      {report?.products?.label && (
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
              {report?.products?.label}
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {numeral(report?.products?.data ?? 0).format("$0,0.00")}
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
      )}

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
            {report.sales?.label ?? report?.co2?.label}
          </Typography>

          <Typography color="textPrimary" variant="h5">
            {numeral(report.sales?.current ?? report?.co2?.data ?? 0).format(
              "$0,0.00"
            )}
          </Typography>
          {!report?.products?.label && (
            <Typography color="textSecondary" variant="caption">
              vs.
              {numeral(report.sales?.last ?? 0).format("$0,0.00")}
              &nbsp; last month
            </Typography>
          )}
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
            {report.cost?.label ?? report?.rescured?.label}
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {numeral(
              report.cost?.current ?? report?.rescured?.data ?? 0
            ).format("$0,0.00")}
          </Typography>
          {!report?.products?.label && (
            <Typography color="textSecondary" variant="caption">
              vs.
              {numeral(report.cost?.last ?? 0).format("$0,0.00")}
              &nbsp; last month
            </Typography>
          )}
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
            {report.profit?.label ?? report?.materials?.label}
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {numeral(
              report?.profit?.current ?? report?.materials?.data ?? 0
            ).format("$0,0.00")}
          </Typography>

          {!report?.products?.label && (
            <Typography color="textSecondary" variant="caption">
              vs.
              {numeral(report?.profit?.last).format("$0,0.00")}
              &nbsp; last month
            </Typography>
          )}
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
