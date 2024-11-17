"use client";
import { useState, useEffect, useCallback, use } from "react";
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
import { useRouter } from "@/routes/hooks";
import axios from "axios";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { DB } from "@/utils/firebase-config";
import { getOrders, getProducts } from "@/lib/shopify";
import { usePremiumStatus } from "@/auth/hooks";
import { createVendor, updateOrders, getOrders as getOrdersFirebase, updatePayout } from "@/lib/firebase-db";
import { create } from "lodash";

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
  const { premium } = usePremiumStatus(user);
  const { enqueueSnackbar } = useSnackbar();
  const [stripeStatus, setStripeStatus] = useState({
    isConnected: false,
    isVerified: false,
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);


  const [lastPayoutDate, setLastPayoutDate] = useState(null);

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

  const [digest, setDigest] = useState({
    unclaimedData: {
      total: (0).toFixed(2),
    },
    pendingData: {
      total: (0).toFixed(2),
    },
    totalClaimedData: {
      total: (0).toFixed(2),
    },
  });

  const onCreate = async () => {
    setLoading(true);
    const account = await createAccount(user?.email, "NL", user?.id);
    if (account) {
      const link = await createLink(account);

      router.push(link);
    }
    setLoading(false);
  };

  const onRequest = async ({ amount }) => {
    setLoading(true);

    await axios.post("/api/payout-email", {
      name: `${user?.first_name} ${user?.last_name}`,
      email: process.env.NEXT_PUBLIC_VERCEL_ADMIN_EMAIL.split(',').map(item=>item.trim()).filter(i => i),
      amount: (amount * (1 - (premium.commission ?? 0.3))).toFixed(2),
      clientEmail: user?.email,
      accountId: user?.accountId,
    });

    enqueueSnackbar("Requested Generated Succussfully");

    setLoading(true);
  };

  // Conditional CTA rendering based on Stripe status
  const renderCTA = () => {
    const [canRequestPayout, setCanRequestPayout] = useState(false);
    const [loadingPayoutStatus, setLoadingPayoutStatus] = useState(true);
    const [unclaimedOrders, setUnclaimedOrders] = useState([]);

    const handlePayoutRequest = async () => {
      const amount = digest.unclaimedData.total; // Define how you'll calculate or determine the payout amount
  
      try {
        const timestamp = new Date();
        await updatePayout({ amount, timestamp, user, premium });
        
        if (unclaimedOrders.length > 0) {
          await updateOrders({ vendorName: user?.company, orders: unclaimedOrders });
        }

        alert("Payout requested successfully!");
        onRequest({ amount });
        setLastPayoutDate(timestamp);
        setCanRequestPayout(false); // Disable button after request
      } catch (error) {
        console.error("Error requesting payout:", error);
        alert("Error requesting payout. Please try again.");
      }
    };

    // Check eligibility based on the last payout date
    useEffect(() => {
      const checkPayoutEligibility = async () => {
        try {
          const q = query(
            collection(DB, "payout-requests"),
            where("accountID", "==", user?.accountId)
          );

          const querySnapshot = await getDocs(q);

          var latestDate = null;
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.timestamp) {
              const payoutDate = new Date(data.timestamp.seconds * 1000);
              if (!latestDate || latestDate < payoutDate) {
                latestDate = payoutDate;
              }
            }
          });
          if (latestDate) {
            setLastPayoutDate(latestDate);
          } else {
            setLastPayoutDate(new Date(0));
          }

          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

          // Enable the button if no previous payout or the last payout was more than a month ago
          setCanRequestPayout(!latestDate || latestDate < oneMonthAgo);
        } catch (error) {
          console.error("Error checking payout eligibility:", error);
        } finally {
          setLoadingPayoutStatus(false);
        }
      };

      checkPayoutEligibility();
    }, [user?.accountId]);

    useEffect(() => {
      const fetchPendingAmount = async () => {
        if (!user) return;
        if (!lastPayoutDate) return;
        const uploader = user?.email;
        const company = user?.company;

        await createVendor({ name: company });

        const productList = await getProducts({
          company,
          active: true,
        });
        const skuList = productList
          .map((product) => product.variants.map((variant) => variant.sku))
          .flat();

        const afterString = (new Date(new Date().setMonth(new Date().getMonth() - 2))).toISOString();
        const orderList = await getOrders({
          uploader,
          skuList,
          fulfilled: true,
          // after: afterString,
        });
        console.log(orderList);

        // Fetch previous claimed orders from Firebase
        const claimedOrders = await getOrdersFirebase({ vendorName: company });
        const claimedOrderIds = claimedOrders.map((doc) => doc?.id);

        if (lastPayoutDate !== new Date(0)) {
          let unclaimedOrders = [];
          const unclaimedAmount = orderList.reduce((acc, order) => {
            const orderDate = new Date(order.createdAt);
            
            if (orderDate > lastPayoutDate && !claimedOrderIds.includes(order.id)) {
              unclaimedOrders.push(order);
              acc += parseFloat(order.totalPrice);
            }
            return acc;
          }, 0);
          setUnclaimedOrders(unclaimedOrders);
          console.log(unclaimedOrders);
          setDigest({
            unclaimedData: {
              total: unclaimedAmount.toFixed(2),
            },
            pendingData: {
              total: digest.pendingData.total,
            },
          });
        } else {
          const unclaimedAmount = orderList.reduce(
            (acc, order) => acc + parseFloat(order.totalPrice),
            0
          );
          setUnclaimedOrders(orderList);
          setDigest({
            unclaimedData: {
              total: unclaimedAmount.toFixed(2),
            },
            pendingData: {
              total: digest.pendingData.total,
            },
          });
        }
      };

      fetchPendingAmount();
    }, [lastPayoutDate]);

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

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayoutRequest}
            disabled={!canRequestPayout || loadingPayoutStatus}
          >
            {loadingPayoutStatus ? "Checking eligibility..." : "Request Payout"}
          </Button>
        </Alert>
      );
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payout Digest
      </Typography>
      <Grid container spacing={4}>
        {/* Sales Channel Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                Unclaimed Earnings
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                €{digest.unclaimedData.total}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Total earnings since {!lastPayoutDate || lastPayoutDate.toDateString() === (new Date(0)).toDateString() ? "joining" : lastPayoutDate.toDateString()}.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                A commission of {(premium.commission ?? 0.3) * 100}% will be deducted from your earnings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Purpose Earnings Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                Pending Payout
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                €{digest.pendingData.total}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Total pending payout.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Usually processed within 7 business days.
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


const PayoutReports = ({ report }) => {
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
                $ 1.0
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
    </Grid>
  )
};

export default function Insights() {
  return (
      <Grid item xs={12}>
        <SalesEarnings />
      </Grid>
  );
}
