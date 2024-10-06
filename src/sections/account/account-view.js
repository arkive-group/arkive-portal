import { Box, Typography, Container } from "@mui/material";
import UserProfileView from "@/sections/user/user-profile-view";
import AccountDetails from "./account-details";

const Account = () => {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <AccountDetails />
    </Container>
  );
};

export default Account;
