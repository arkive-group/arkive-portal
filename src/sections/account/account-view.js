import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import UserProfileView from "@/sections/user/user-profile-view";
import AccountGeneralSettings from "./account-details";

const Account = () => {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome back, you beautiful anti-waste trooper !!
        </Typography>
        <Typography variant="body1">
          Here you can manage your account details.
        </Typography>
      </Box>

      <AccountGeneralSettings />
    </Container>
  );
};

export default Account;
