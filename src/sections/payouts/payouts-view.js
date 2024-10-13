"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Divider,
  Box,
  Button,
  Card,
  Grid,
  Avatar,
  CardContent,
  Alert,
} from "@mui/material";
import Chart from "react-apexcharts";
import { useAuthContext } from "src/auth/hooks";
import { useTheme, alpha } from "@mui/material/styles";
import { ArrowRightIcon, ChevronUpIcon, ChevronDownIcon } from "@/svg";
import { accountStatus, createAccount, createLink } from "@/lib/stripe";
import { useSnackbar } from "src/components/snackbar";

const BarChart = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#7783DB"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [10, 20, 30, 40, 50, 60, 5] }];

  return (
    <Chart options={chartOptions} series={chartSeries} type="bar" width={120} />
  );
};
const LineChart = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#7783DB"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [0, 60, 30, 60, 0, 30, 10, 30, 0] }];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      width={120}
    />
  );
};
// Sample function to simulate checking the Stripe account status
const checkStripeAccountStatus = async (accountId) => {
  const response = await accountStatus(accountId);

  return {
    isConnected: accountId ? true : false,
    isVerified: response ? true : false,
  };
};

const SalesEarnings = () => {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [stripeStatus, setStripeStatus] = useState({
    isConnected: false,
    isVerified: false,
  });

  const [loading, setLoading] = useState(false);

  const getStatus = useCallback(async () => {
    try {
      const status = await checkStripeAccountStatus(user?.accountId);
      setStripeStatus(status);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  // Simulate fetching Stripe status on component mount
  useEffect(() => {
    getStatus();
  }, [getStatus]);

  // Example data
  const salesChannelData = {
    channel: "Sales Channel",
    earnings: 14000,
  };

  const purposeEarningsData = {
    purpose: "Purchasing for You",
    units: 70000,
    rate: 0.2,
    totalEarnings: 70000 * 0.2,
  };

  const onCreate = async () => {
    setLoading(true);
    const account = await createAccount(user?.email, "US", user?.id);
    if (account) {
      const link = await createLink(account);

      router.push(link);
    }
    setLoading(false);
  };

  const onRequest = async () => {
    setLoading(true);

    await axios.post("/api/payout-email", {
      name: `${user?.first_name} ${user?.last_name}`,
      email: "ahsanmansoor7572@gmail.com",
      amount: 1000,
      clientEmail: "test@test.com",
      accountId: user?.accountId,
    });

    enqueueSnackbar("Requested Generated Succussfully");

    setLoading(true);
  };

  // Conditional CTA rendering based on Stripe status
  const renderCTA = () => {
    if (!stripeStatus.isConnected) {
      return (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body1" gutterBottom>
            You do not have a connected Stripe account. Please create one.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onCreate}
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Stripe Connected Account"}
          </Button>
        </Alert>
      );
    } else if (!stripeStatus.isVerified) {
      return (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body1" gutterBottom>
            Your Stripe account is not verified. Please complete the
            verification process by visiting your stripe portal
          </Typography>
        </Alert>
      );
    } else {
      return (
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body1" gutterBottom>
            Your Stripe account is connected and verified.
          </Typography>
          <Button variant="contained" color="primary" onClick={onRequest}>
            Request Payout
          </Button>
        </Alert>
      );
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Earnings Breakdown
      </Typography>
      <Grid container spacing={4}>
        {/* Sales Channel Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                {salesChannelData.channel}
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                ${salesChannelData.earnings.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Total earnings from {salesChannelData.channel}.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Earnings from {purposeEarningsData.purpose}.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Purpose Earnings Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                {purposeEarningsData.purpose}
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                ${purposeEarningsData.totalEarnings.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {`${purposeEarningsData.units.toLocaleString()} units x $${purposeEarningsData.rate.toFixed(
                  2
                )} per unit`}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Earnings from {purposeEarningsData.purpose}.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* CTA based on Stripe Account Status */}
      {renderCTA()}
    </Box>
  );
};

export default function Insights() {
  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <Typography color="textPrimary" variant="h5">
          Payouts
        </Typography>
      </Grid>
      <Grid item sm={6} xs={12} display="flex">
        <Button
          color="primary"
          endIcon={<ChevronDownIcon fontSize="small" />}
          sx={{ ml: "auto" }}
          variant="contained"
        >
          Last month
        </Button>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <div>
              <Typography color="textPrimary" variant="subtitle2">
                Total Orders
              </Typography>
              <Typography color="textPrimary" sx={{ mt: 1 }} variant="h4">
                1.9M
              </Typography>
            </div>
            <LineChart />
          </Box>
          <Divider />
          <Box
            sx={{
              px: 3,
              py: 2,
            }}
          >
            <Button
              color="primary"
              endIcon={<ArrowRightIcon fontSize="small" />}
              variant="text"
            >
              See all visits
            </Button>
          </Box>
        </Card>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <div>
              <Typography color="textPrimary" variant="subtitle2">
                Total Amount
              </Typography>
              <Typography color="textPrimary" sx={{ mt: 1 }} variant="h5">
                $41.2K
              </Typography>
            </div>
            <LineChart />
          </Box>
          <Divider />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              px: 3,
              py: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.success.main, 0.08),
                color: "success.main",
                height: 36,
                width: 36,
              }}
            >
              <ChevronUpIcon fontSize="small" />
            </Avatar>
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              12% more then last month
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <div>
              <Typography color="textPrimary" variant="subtitle2">
                Comission
              </Typography>
              <Typography color="textPrimary" sx={{ mt: 1 }} variant="h5">
                36,6K
              </Typography>
            </div>
            <LineChart />
          </Box>
          <Divider />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              px: 3,
              py: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.error.main, 0.08),
                color: "error.main",
                height: 36,
                width: 36,
              }}
            >
              <ChevronDownIcon fontSize="small" />
            </Avatar>
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              30% less then last month
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <div>
              <Typography color="textPrimary" variant="subtitle2">
                Pending Amount
              </Typography>
              <Typography color="textPrimary" sx={{ mt: 1 }} variant="h5">
                131,3K
              </Typography>
            </div>
            <BarChart />
          </Box>
          <Divider />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              px: 3,
              py: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.success.main, 0.08),
                color: "success.main",
                height: 36,
                width: 36,
              }}
            >
              <ChevronUpIcon fontSize="small" />
            </Avatar>
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              12% more then last month
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <SalesEarnings />
      </Grid>
    </Grid>
  );
}
