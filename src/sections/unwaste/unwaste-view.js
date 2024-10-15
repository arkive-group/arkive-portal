"use client";

// @mui
import { Container } from "@mui/material";

import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import ProductOverview from "./product-overview";

// ----------------------------------------------------------------------

export default function UnwasteView() {

    return (
        <Container maxWidth="xl">
        <UserProfileView />
        {/* <ProductUnavailable /> */}
        <ProductOverview />
        </Container>
    );
}
