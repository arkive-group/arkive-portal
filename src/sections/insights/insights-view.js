"use client";

// @mui
import { Container } from "@mui/material";
import { useEffect } from "react";

import UserProfileView from "@/sections/user/user-profile-view";
import { getMonthlyReport } from "@/lib/shopify";
import InsightsCharts from "./insights-charts";
// ----------------------------------------------------------------------

export default function InsightsView() {
  useEffect(() => {
    const fetchMonthlyReport = async () => {
      const report = await getMonthlyReport();
      console.log(report);
    };

    fetchMonthlyReport();
  }, []);

  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <InsightsCharts />
    </Container>
  );
}
