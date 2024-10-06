import { Box, Typography, Container } from "@mui/material";
import UserProfileView from "@/sections/user/user-profile-view";

const Account = () => {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <Box>
        <Typography variant="h4" gutterBottom>
          Account Information
        </Typography>
        <Typography variant="body1">
          Here you can manage your account details.
        </Typography>
      </Box>
    </Container>
  );
};

export default Account;
