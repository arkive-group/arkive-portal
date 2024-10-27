"use client";

import { useState } from "react";
// @mui
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";


import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import ProductOverview from "./product-overview";
import ActiveChannel from "@/components/active-channel";

// ----------------------------------------------------------------------

export default function UnwasteView() {
    const [channel, setChannel] = useState("shopify");

    return (
        <Container maxWidth="xl">
        <UserProfileView />
        {/* <ProductUnavailable /> */}
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <ProductOverview channel={channel}/>
            </Grid>
            <Grid item xs={3}>
                <ActiveChannel channel={channel} setChannel={setChannel} />
            </Grid>
        </Grid>
        </Container>
    );
}
