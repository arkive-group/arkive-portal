"use client";

// @mui
import { Container } from "@mui/material";
import { useState, useEffect } from "react";

import UserProfileView from "@/sections/user/user-profile-view";
import { getMonthlyReport } from "@/lib/shopify";


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
            {/* <ProductUnavailable /> */}
        </Container>
    );
}
