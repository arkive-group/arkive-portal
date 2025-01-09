"use client";
import { Grid, Typography, Paper } from "@mui/material";

export function InsightsSummaryCards({ report, co2 }) {
  // Reusable Card Component
  const StatCard = ({ value, label }) => {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          textAlign: "center",
          verticalAlign: "middle",
          backgroundColor: "#0033CC", // Blue background
          color: "#FFFFFF", // White text
          borderRadius: 0,
          minHeight: "140px",
          maxHeight: "140px",
          minWidth: "200px",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
        <Typography fontSize={12} variant="body1">
          {label}
        </Typography>
      </Paper>
    );
  };

  return (
    <Grid container spacing={4} sx={{ padding: 4, paddingLeft: 0 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard value={report.products.data} label="PRODUCTS UPLOADED" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          value="€75.786"
          label="REVENUE OTHERWISE WASTED PRODUCTS + MATERIALS"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard value={co2} label="LESS CO2 ON AVERAGE PER PRODUCT" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard value="31%" label="RESCUED MATERIALS + INGREDIENTS" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          value="35"
          label="MATERIALS + INGREDIENTS ON AVERAGE PER PRODUCT"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          value="14.291"
          label="AVERAGE SUPPLY CHAIN MILES PER PRODUCT"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard value="56" label="DAYS IN WAREHOUSE ON AVERAGE" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          value="7.621"
          label="METRIC TONS CO2 ON AVERAGE PER PRODUCT"
        />
      </Grid>
    </Grid>
  );
}
