"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const AccountGeneralSettings = () => {
  return (
    <Grid container spacing={3} mt={1}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: "50%",
                }}
              >
                <Avatar sx={{ height: 100, width: 100 }} />
              </Box>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                User Name
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Your plan:
                <Link color="primary" to="/dashboard/account">
                  Plan Name
                </Link>
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button color="primary" fullWidth variant="text">
              Remove Picture
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <form>
          <Card>
            <CardHeader title="Basic Details" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="State/Region"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Biography (optional)"
                    type="text"
                    variant="outlined"
                    size="small"
                    multiline
                    minRows={3}
                  />
                </Grid>
                <CardHeader title="Billing Details" />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="City"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="State/Region"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Zip Code"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Tax ID"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Currency"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Grid item xs={12}>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="subtitle2"
                  >
                    Public Profile
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Means that anyone viewing your profile will be able to see
                    your contact details
                  </Typography>
                  <Switch color="primary" />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Button color="primary" type="submit" variant="contained">
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};

export default AccountGeneralSettings;
