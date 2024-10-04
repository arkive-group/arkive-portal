import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Divider,
  List,
  ListItem,
  Typography,
  Checkbox,
  Grid,
} from "@mui/material";

const pricingPlans = [
  {
    title: "E C O  S T A R T P L A N",
    description: "Begin your path to a greener future",
    price: "€0 -",
    features: [
      "Sales channels on 30% commission",
      "Standard dashboard",
      "Chat support",
      "Repurposing channels",
      "Donation channels",
      "Customer success*",
    ],
    chipLabel: "BASIC",
    variant: "outlined",
  },
  {
    title: "E C O M A S T E R P L A N",
    description: "Master sustainable practices with personalized solutions",
    price: "€199 -",
    features: [
      "Sales channels on 25% commission",
      "Co-create insights",
      "Chat support",
      "Repurposing channels [+20c pp]",
      "Donation channels [shipping +10c pp]",
      "Customer success*",
    ],
    chipLabel: "MOST POPULAR",
    variant: "contained",
  },
];

const PricingCard = ({ plan }) => {
  const { title, description, price, features, chipLabel, variant } = plan;

  return (
    <Card
      variant={variant}
      sx={{
        padding: 3,
        paddingTop: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: variant === "contained" ? "primary.main" : "white",
        color: variant === "contained" ? "white" : "black",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 1 }}>
        {description}
      </Typography>
      <Typography variant="h1" align="center" sx={{ mb: 2 }}>
        {price}
      </Typography>
      <Divider />
      <List sx={{ padding: 0 }}>
        {features.map((feature, index) => (
          <ListItem
            key={index}
            sx={{ py: "0px", display: "flex", alignItems: "center" }}
          >
            <Checkbox
              size="small"
              sx={{
                color: variant === "contained" ? "white" : "primary.main",
                "&.Mui-checked": {
                  color: variant === "contained" ? "white" : "primary.main",
                },
                "& .MuiSvgIcon-root": {
                  borderRadius: "50%",
                  backgroundColor:
                    variant === "contained" ? "primary.main" : "transparent",
                },
                "&:hover": {
                  backgroundColor:
                    variant === "contained"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(3, 46, 238, 0.08)",
                },
              }}
              checked
            />
            <Typography sx={{ ml: 0.5 }}>{feature}</Typography>{" "}
            {/* Add left margin for spacing */}
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button
          fullWidth
          variant={variant === "contained" ? "contained" : "outlined"}
          sx={{
            bgcolor:
              variant === "contained" ? "white" : "rgba(3, 46, 238, 0.08)",
            color: "primary.main",
            borderRadius: "20px",
            minHeight: "48px",
            "&:hover": {
              bgcolor:
                variant === "contained"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(3, 46, 238, 0.2)",
              boxShadow: 3,
            },
          }}
        >
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
};

export default function PricingCards() {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "rgba(3, 46, 238, 0.08)",
          color: "primary.main",
          height: "60px",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">PRICING</Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {pricingPlans.map((plan, index) => (
          <Grid item md={4} sm={6} xs={12}>
            <PricingCard key={index} plan={plan} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
