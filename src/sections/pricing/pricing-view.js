// @mui
import { Box, Container } from "@mui/material";

import PricingCards from "./pricing-cards";

// ----------------------------------------------------------------------

export default function PricingView() {
  return (
    <Container maxWidth="xl">
      <PricingCards />
    </Container>
  );
}
