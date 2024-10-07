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
import AccountDetails from "./account-details";

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

      <Grid container xs={6} mt={2}>
        <Card
          sx={{
            width: "100%",
            p: 2,
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">ANEC COSMETICS</Typography>
          <FormControl sx={{ minWidth: 160 }} size="small">
            <InputLabel id="select-plan-label">Select plan</InputLabel>
            <Select
              labelId="select-plan-label"
              id="select-plan"
              label="Select plan"
            >
              <MenuItem value="ecomaster">ecomaster plan</MenuItem>
              <MenuItem value="second plan">second plan</MenuItem>
            </Select>
          </FormControl>
        </Card>

        <Box mt={2} sx={{ width: "100%" }}>
          <Typography variant="body1" sx={{ color: "gray", fontSize: 12 }}>
            SUBSCRIPTION
          </Typography>
          <Card
            sx={{
              width: "100%",
              p: 2,
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6">ECOMASTER PLAN</Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "gray",
                  fontSize: 14,
                  fontWeight: "bold",
                  mt: 0.5,
                }}
              >
                1 licence x €0{" "}
                <Box component="span" sx={{ textDecoration: "line-through" }}>
                  €199
                </Box>{" "}
                - per licence {">"}
                <Box component="span" sx={{ color: "blue", cursor: "pointer" }}>
                  {" "}
                  Manage Users
                </Box>
              </Typography>
            </Box>
            <Box>
              <Box display="flex">
                <Typography
                  variant="body1"
                  sx={{ color: "green", fontSize: 16, fontWeight: "bold" }}
                >
                  €O
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "black",
                    fontSize: 14,
                    fontWeight: "bold",
                    mt: 2,
                    textDecoration: "line-through",
                  }}
                >
                  €100
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Per company
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Per month
              </Typography>
            </Box>
          </Card>

          <Typography
            variant="body1"
            sx={{
              color: "gray",
              fontSize: 14,
              p: 0.5,
            }}
          >
            <Box
              component="span"
              sx={{
                backgroundColor: "#2471a1",
                px: 1,
                py: 0.2,
                borderRadius: 10,
                fontSize: 12,
                color: "white",
              }}
            >
              PROEFABONNEMENT
            </Box>{" "}
            You can still use your trial subscription for 30 days.
          </Typography>
        </Box>

        <Card
          sx={{
            width: "100%",
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="h6">
            CHANNEL TYPE {">"}{" "}
            <Box component="span" sx={{ color: "blue", cursor: "pointer" }}>
              Select Markets
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            ADD-ON[S]
          </Typography>
        </Card>

        <Card
          sx={{
            width: "100%",
            p: 2,
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6">REPURPOSING</Typography>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              70K x €0.20 per product
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              €14.000
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            width: "100%",
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="h6">SALES CHANNELS</Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            30% per sold product
          </Typography>
        </Card>

        <Card
          sx={{
            width: "100%",
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="h6">
            MARKETS {">"}{" "}
            <Box component="span" sx={{ color: "blue", cursor: "pointer" }}>
              Select Markets
            </Box>
          </Typography>
        </Card>
      </Grid>
    </Container>
  );
};

export default Account;
