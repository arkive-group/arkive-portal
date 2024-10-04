// @mui
import { Box, Container, Typography } from "@mui/material";

import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import PricingCards from "./pricing-cards";

// ----------------------------------------------------------------------

export default function PricingView() {
  return (
    <Container maxWidth="xl">
      <PricingCards />
    </Container>
  );
}
