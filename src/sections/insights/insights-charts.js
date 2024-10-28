"use client";
import { Box, Container, Grid } from "@mui/material";
import {
  FinanceCostBreakdown,
  FinanceOverview,
  FinanceIncrementalSales,
  FinanceSalesByContinent,
  FinanceSalesRevenue,
} from "@/components/finance";

const InsightsCharts = () => {
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
              <FinanceOverview />
            </Grid>
            <Grid item md={8} xs={12}>
              <FinanceSalesRevenue />
            </Grid>
            <Grid item md={4} xs={12}>
              <FinanceCostBreakdown />
            </Grid>
            <Grid item md={8} xs={12}>
              <FinanceSalesByContinent />
            </Grid>
            <Grid item md={4} xs={12}>
              <FinanceIncrementalSales />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default InsightsCharts;
