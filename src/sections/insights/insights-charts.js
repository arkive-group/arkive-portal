"use client";
import { Box, Container, Grid } from "@mui/material";
import {
  ChannelBreakdown,
  FinanceOverview,
  FinanceIncrementalSales,
  FinanceSalesByContinent,
  FinanceSalesRevenue,
} from "@/components/finance";

const InsightsCharts = ({ report }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
        }}
      >
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FinanceOverview report={report.financeOverview} />
            </Grid>
            <Grid item md={6} xs={12}>
              <FinanceSalesRevenue report={report.financeSalesRevenue} />
            </Grid>
            <Grid item md={6} xs={12}>
              <ChannelBreakdown report={report.channelBreakdown} />
            </Grid>
            <Grid item md={12} xs={12}>
              <FinanceSalesByContinent />
            </Grid>
            {/* <Grid item md={4} xs={12}>
              <FinanceIncrementalSales />
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default InsightsCharts;
