"use client";
import { useState } from "react";
import {
  Toolbar,
  Typography,
  Container,
  MenuItem,
  Select,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  AppBar,
  CssBaseline,
} from "@mui/material";

const platforms = ["Amazon", "Shopify", "eBay", "Etsy"];
const analyticsTypes = ["Sales", "Re-purposing", "Returns", "Refunds"];

const analyticsData = {
  Amazon: {
    Sales: {
      totalSales: 150,
      amountEarned: 12000,
      totalOrders: 75,
      refunds: 5,
    },
    "Re-purposing": { totalItems: 200, views: 5000, shares: 50 },
  },
  Shopify: {
    Sales: { totalSales: 100, amountEarned: 8000, totalOrders: 60, refunds: 3 },
    "Re-purposing": { totalItems: 180, views: 4500, shares: 40 },
  },
};

export default function Insights() {
  const [platform, setPlatform] = useState("Amazon");
  const [analyticsType, setAnalyticsType] = useState("Sales");
  const [isConnected, setIsConnected] = useState(false);
  const data = analyticsData[platform][analyticsType];
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, padding: "40px", backgroundColor: "#e8f0f2" }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, color: "#333" }}>
          Insights Dashboard
        </Typography>

        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          mb={4}
          justifyContent="center"
        >
          <Select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            sx={{ minWidth: 150, marginRight: 2, backgroundColor: "#fff" }}
            variant="outlined"
          >
            {platforms.map((platform) => (
              <MenuItem key={platform} value={platform}>
                {platform}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={analyticsType}
            onChange={(e) => setAnalyticsType(e.target.value)}
            sx={{ minWidth: 150, backgroundColor: "#fff" }}
            variant="outlined"
          >
            {analyticsTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              title: "Total Sales",
              value: data?.totalSales || data?.totalItems || 0,
            },
            {
              title: "Amount Earned",
              value: data?.amountEarned ? `$${data.amountEarned}` : "N/A",
            },
            { title: "Total Orders", value: data?.totalOrders || "N/A" },
            { title: "Refunds", value: data?.refunds || "N/A" },
            { title: "Views", value: data?.views || "N/A" },
            { title: "Shares", value: data?.shares || "N/A" },
          ].map((item) => (
            <Grid item xs={12} sm={6} key={item.title}>
              <Card sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={4}>
          {isConnected ? (
            <Button variant="contained" color="success" size="large">
              Start Getting Paid
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              size="large"
              onClick={() => setIsConnected(true)}
            >
              Connect Account
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
