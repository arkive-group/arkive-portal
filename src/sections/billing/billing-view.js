import { Container } from "@mui/material";
import PricingView from "@/sections/pricing/pricing-view";
import UserProfileView from "@/sections/user/user-profile-view";

const Billing = () => {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <PricingView />
    </Container>
  );
};

export default Billing;
