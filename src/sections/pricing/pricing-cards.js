"use client";
import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import { PricingCard } from "@/components/pricing-card";

const pricingPlans = [
  {
    title: "ECO START PLAN",
    description: "Begin your path to a greener future",
    price: "€0",
    features: [
      "Sales channels on 30% commission",
      "Standard dashboard",
      "Chat support",
      "Customer success*",
    ],
    chipLabel: "BASIC",
    variant: "outlined",
    isFree: true,
  },
  {
    title: "ECO MASTER PLAN",
    description: "Master sustainable practices with personalized solutions",
    price: "€199",
    features: [
      "Sales channels on 25% commission",
      "Co-create insights",
      "Chat support",
      "Repurposing channels [+20c pp]",
      "Donation channels [shipping +10c pp]",
      "Customer success*",
    ],
    chipLabel: "MOST POPULAR",
    variant: "contained",
    isFree: false,
  },
];

export default function PricingCards() {
  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          my: 5,
        }}
      >
        <Typography variant="h3">Get The Right Plan For You</Typography>
        <Typography variant="p">
          Choose one of our tailored solutions. For you and your team
        </Typography>
      </Box>

      <Grid container spacing={10} justifyContent="center">
        {pricingPlans?.map((plan) => (
          <Grid key={plan?.chipLabel} item lg={6} xs={12}>
            <PricingCard plan={plan} />
          </Grid>
        ))}
      </Grid>
      <Box mt={3}>
        <Typography variant="p">
          The Customer Success Manager is a sustainability and tech expert
          dedicated to continually supporting your account. They ensure ESG
          compliance by providing valuable insights, demonstrating product ease
          of use, and verifying compliance with evolving regulations across all
          markets and channels based on your data.
        </Typography>
      </Box>
    </Box>
  );
}
