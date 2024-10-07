import { Grid, Box, Typography, Select, MenuItem, Button } from "@mui/material";

const AccountDetails = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={1}>
        {/* User Info Section */}

        {/* Main Content Section */}
        <Grid item xs={12} md={9}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Welcome back, you beautiful anti-waste trooper !!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">ANEC COSMETICS</Typography>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  display: "inline-block", // To limit the border to the text's width
                  padding: "8px", // Optional padding to space the content within the border
                  border: "2px solid",
                  borderColor: "primary.main",
                  boxShadow: "0px 4px 6px rgba(0, 0, 255, 0.2)", // Customize shadow to use primary.main color (approximation)
                  "&:hover": {
                    boxShadow: "0px 6px 8px rgba(0, 0, 255, 0.3)", // Optional hover effect for shadow enhancement
                  },
                }}
              >
                Eco Master Plan
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Subscription
            </Typography>

            <Box display="flex" alignItems="center">
              <Typography variant="h6">ECOMASTER PLAN</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">
              1 licence x €0 €189,- per licence
            </Typography>
            <Button variant="text" sx={{ marginLeft: 1 }}>
              Manage Users
            </Button>
          </Box>

          <Box mt={2}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              PROEFABONNEMENT
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can still use your trial subscription for 30 days.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountDetails;

{
  /* <Grid item xs={12} md={9}>
<Box mt={3}>
  <Typography variant="h6">ANEC COSMETICS</Typography>
  <Typography variant="body1" color="text.secondary">
    SUBSCRIPTION
  </Typography>


  <Box mt={2} display="flex" alignItems="center">
    <Typography variant="body1" sx={{ marginRight: 2 }}>
      ECOMASTER PLAN
    </Typography>
    <Select defaultValue="ecomaster plan" sx={{ width: 200 }}>
      <MenuItem value="ecomaster plan">Ecomaster Plan</MenuItem>
      <MenuItem value="ecostart plan">Ecostart Plan</MenuItem>
    </Select>
  </Box>

  <Box mt={1}>
    <Typography variant="body2">
      1 licence x €0 €189,- per licence
    </Typography>
    <Button variant="text" sx={{ marginLeft: 1 }}>
      Manage Users
    </Button>
  </Box>

  <Box mt={2}>
    <Typography
      variant="body2"
      color="primary"
      sx={{ fontWeight: "bold" }}
    >
      PROEFABONNEMENT
    </Typography>
    <Typography variant="body2" color="text.secondary">
      You can still use your trial subscription for 30 days.
    </Typography>
  </Box>

  <Box mt={2}>
    <Typography variant="body1">CHANNEL TYPE</Typography>
    <Button variant="text">Select Channels</Button>
  </Box>

  <Box mt={2}>
    <Typography variant="h6">ADD-ON(S)</Typography>
    <Typography variant="body2">
      REPURPOSING: 70K x €0.20 per product (€14,000)
    </Typography>
    <Typography variant="body2">
      SALES CHANNELS: 30% per sold product
    </Typography>
  </Box>

  <Box mt={2}>
    <Typography variant="body1">MARKETS</Typography>
    <Button variant="text">Select Markets</Button>
  </Box>
</Box>
</Grid> */
}
