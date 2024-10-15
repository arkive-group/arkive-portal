"use client";

// @mui
import { Container } from "@mui/material";
import { useState } from "react";

import UserProfileView from "@/sections/user/user-profile-view";
import OrdersOverview from "./orders-overview";


// ----------------------------------------------------------------------

export default function OrdersView() {
  return (
    <Container maxWidth="xl">
        <UserProfileView />
        {/* <ProductUnavailable /> */}
        <OrdersOverview />
    </Container>
  );
}
