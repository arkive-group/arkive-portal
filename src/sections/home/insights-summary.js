"use client";
import { useEffect, useCallback, useState, useRef } from "react";
import { useAuthContext } from "@/auth/hooks";
import {
  Grid,
  Typography,
  Paper,
  Card,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Button,
} from "@mui/material";
// import Grid from '@mui/material/Grid2';
import Iconify from 'src/components/iconify';
import EmptyContent from "@/components/empty-content";

import TiktokIcon from "./icons/TiktokIcon"
import MailIcon from "./icons/MailIcon"
import LinktreeIcon from "./icons/LinktreeIcon"
import ShopIcon from "./icons/ShopIcon"
import OnlineStoreIcon from "./icons/OnlineStoreIcon"


import { reportDefaultTemplate } from "../../utils/report-default-object";
import { InsightsSummaryCards } from "./insights-summary-cards";
import { LoadingScreen } from "@/components/loading-screen";
import { lowerCase } from "lodash";
import {
  getMonthlyReport,
  getOrders,
  getProducts,
  getActiveSalesChannels,
} from "@/lib/shopify";
import ActiveChannel from "@/components/active-channel";
// import MailIcon from '@mui/icons-material/Mail';


export default function InsightsSummary() {
  const { user } = useAuthContext();
  // useRef is a quick fix for useEffect that fetches data to prevent from running twice
  // rewrite this component logic later (setState in useEffect triggers double API call, plus the logic can be simplified and
  // divided into several separate fuhnctions
  // delete mutability because it is producing unwanted side effects
  // too many useEffects that arent necessary)
  const effectRan = useRef(false);
  // const memoizedUser = useMemo(() => user, [user]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeChannels, setActiveChannels] = useState([]);
  const [report, setReport] = useState({
    financeOverview: {
      sales: {
        current: 0,
        last: 0,
      },
      profit: {
        current: 0,
        last: 0,
      },
      cost: {
        current: 0,
        last: 0,
      },
    },
    repurposing: {
      sales: {
        label: "SALES",
        current: 0,
        last: 0,
      },
      products: {
        label: "PRODUCTS CREATED",
        data: 0,
      },
      co2: {
        label: "KILO GRAM CO2 SAVED IN TOTAL",
        data: 0,
      },
      rescured: {
        label: "RESCUED MATERIALS + INGREDIENTS",
        data: 0,
      },
      materials: {
        label: "MATERIALS + INGREDIENTS ON AVERAGE PER PRODUCT",
        data: 0,
      },
    },
    financeSalesRevenue: [
      {
        name: "Monthly Revenue",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    channelBreakdown: [
      {
        color: "#92BA43",
        data: 0,
        label: "Shopify",
      },
      {
        color: "#FFC0CB",
        data: 0,
        label: "Bol.com",
      },
      {
        color: "#FF9900",
        data: 0,
        label: "Amazon",
      },
      {
        color: "#4285F4",
        data: 0,
        label: "Google",
      },
    ],
  });

  const activeChannelsIcons = {
    "TikTok": <TiktokIcon />,
    "Inbox": <MailIcon />,
    "Linktree": <LinktreeIcon />,
    "Shop": <ShopIcon />,
    "Online Store": null,
    "Facebook & Instagram": null,
  }

  const orderProc = ({ orders, products, skus }) => {
    const now = new Date();

    let reportObj = report;

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      // For FinanceOverview
      if (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      ) {
        reportObj.financeOverview.sales.current += parseFloat(order.totalPrice);
        reportObj.repurposing.sales.current += parseFloat(order.totalPrice);
      } else if (orderDate.getMonth() === (now.getMonth() - 1) % 12) {
        reportObj.financeOverview.sales.last += parseFloat(order.totalPrice);
        reportObj.repurposing.sales.last += parseFloat(order.totalPrice);
      }

      // For FinanceSalesRevenue
      for (let i = 0; i < 12; i++) {
        if (orderDate.getMonth() === now.getMonth() - i) {
          reportObj.financeSalesRevenue[0].data[11 - i] += parseFloat(
            order.totalPrice
          );
        }
      }

      // For ChannelBreakdown
      const name = lowerCase(order.name);

      if (name.includes("bol")) {
        reportObj.channelBreakdown[1].data += parseFloat(order.totalPrice);
      } else if (name.includes("amazon")) {
        reportObj.channelBreakdown[2].data += parseFloat(order.totalPrice);
      } else if (name.includes("google")) {
        reportObj.channelBreakdown[3].data += parseFloat(order.totalPrice);
      } else {
        reportObj.channelBreakdown[0].data += parseFloat(order.totalPrice);
      }

      // For Repurposing
      reportObj.repurposing.co2.data += 0.029;
      // setco2(reportObj.repurposing.co2.data += 0.029)
      // console.log(orders.length, 'length')
      // console.log(reportObj.repurposing.co2.data)
    });

    reportObj.financeSalesRevenue[0].data =
      reportObj.financeSalesRevenue[0].data.map((data) =>
        parseFloat(data.toFixed(2))
      );
    reportObj.repurposing.co2.data = parseFloat(
      reportObj.repurposing.co2.data.toFixed(2)
    );
    reportObj.repurposing.products.data = new Set(skus).size;
    return reportObj;
  };

  const fetchMonthlyReport = useCallback(async () => {
    const uploader = user?.email;
    const company = user?.company;
    console.log("Fetching data...");
    setLoading(true);
    try {
      const productList = await getProducts({
        company,
      });
      const skuList = productList
        .map((product) => product.variants.map((variant) => variant.sku))
        .flat();

      const afterString = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      ).toISOString();
      const orderList = await getOrders({
        uploader,
        skuList,
        fulfilled: true,
        after: afterString,
      });

      const channels = await getActiveSalesChannels();
      setActiveChannels(channels);
      console.log(channels, "channels");
      // console.log(orderList)
      setOrders(orderList);

      const report = orderProc({
        orders: orderList,
        products: productList,
        skus: skuList,
      });

      setReport(report);
      console.log(orderList);
      // if (orderList) {
      //   const co2calculation = orderList.length * 0.029
      //   console.log(co2calculation, 'co2calculation')
      // }
      // const co2calculation = orders.length += 0.029
      // console.log(co2calculation, 'co2calculation')
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  });
  useEffect(() => {
    if (effectRan.current) return; // Prevent second run
    effectRan.current = true;

    fetchMonthlyReport();
  }, []);

  return (
    <Grid container spacing={4} sx={{ padding: 4, paddingLeft: 0, paddingRight: 0 }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
        <Grid item xs={9}>
          <InsightsSummaryCards
            report={report.repurposing}
            co2={report.repurposing.co2.data}
          />
          </Grid>
          <Grid item xs={3} style={{paddingTop: '24px'}}>
            <Card
              sx={{
                mb: 3,
              }}
            >
              <List style={{paddingTop: 0}}>
                <ListItem style={{backgroundColor: "#FF5F1F", opacity: "85%"}}>
                  <ListItemText
                    primary="Active Channels"
                    secondary={activeChannels?.name}
                    style={{textAlign: "center", color: "white"}}
                  />
                </ListItem>
                <Divider />
                {Object.keys(activeChannels).map((channel) => {
                  const name = activeChannels[channel].name; // Access the title property
                  const icon = activeChannelsIcons[name] || "";
                  return (
                    <ListItem key={channel} style={{textAlign: "left"}}>
                      <ListItemIcon sx={{ marginRight: 1 }}>
                        <Icon
                          sx={{
                            width: "2rem",
                            height: "2rem",
                            background: "#efefef",
                            borderRadius: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                          }}
                          
                        >
                          {icon}
                        </Icon>
                      </ListItemIcon>
                      <Typography
                        fullWidth
                        // variant={key === channel ? "contained" : "text"}
                      >
                        {activeChannels[channel].name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
    // <InsightsSummaryCards report={report} />
  );
}
