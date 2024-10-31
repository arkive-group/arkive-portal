"use client";

// @mui
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

import UserProfileView from "@/sections/user/user-profile-view";
import { getMonthlyReport, getOrders, getProducts } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";
import { LoadingScreen } from "@/components/loading-screen";
import InsightsCharts from "./insights-charts";
import { InsightsCards } from "./insights-cards";
import { parse } from "date-fns";
import { lowerCase } from "lodash";

// ----------------------------------------------------------------------

export default function InsightsView() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
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
      }
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
  const { user } = useAuthContext();


  const orderProc = ({orders, products, skus}) => {
    const now = new Date()

    let reportObj = report;
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      // For FinanceOverview
      if (orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()) {
        reportObj.financeOverview.sales.current += parseFloat(order.totalPrice);
        reportObj.repurposing.sales.current += parseFloat(order.totalPrice);
      } else if (orderDate.getMonth() === (now.getMonth() - 1) % 12) {
        reportObj.financeOverview.sales.last += parseFloat(order.totalPrice);
        reportObj.repurposing.sales.last += parseFloat(order.totalPrice);
      }

      // For FinanceSalesRevenue
      for (let i = 0; i < 12; i++) {
        if (orderDate.getMonth() === now.getMonth() - i) {
          reportObj.financeSalesRevenue[0].data[11 - i] += parseFloat(order.totalPrice);
        }
      }

      // For ChannelBreakdown
      const name = lowerCase(order.name);
      
      
      if (name.includes("bol")){
        reportObj.channelBreakdown[1].data += parseFloat(order.totalPrice);
      }
      else if (name.includes("amazon")) {
        reportObj.channelBreakdown[2].data += parseFloat(order.totalPrice);
      }
      else if (name.includes("google")) {
        reportObj.channelBreakdown[3].data += parseFloat(order.totalPrice);
      }
      else {
        reportObj.channelBreakdown[0].data += parseFloat(order.totalPrice);
      }

      // For Repurposing
      reportObj.repurposing.co2.data += 0.029;

    });

    reportObj.financeSalesRevenue[0].data = reportObj.financeSalesRevenue[0].data.map((data) => parseFloat(data.toFixed(2)));
    reportObj.repurposing.co2.data = parseFloat(reportObj.repurposing.co2.data.toFixed(2));
    reportObj.repurposing.products.data = new Set(skus).size;

    return reportObj;
  }

  useEffect(() => {
    const uploader = user?.email;
    const company = user?.company;
    const fetchMonthlyReport = async () => {
      setLoading(true);
      try {
        const productList = await getProducts({
          company,
        });
        const skuList = productList
          .map((product) => product.variants.map((variant) => variant.sku))
          .flat();

        const afterString = (new Date(new Date().setFullYear(new Date().getFullYear() - 1))).toISOString();
        const orderList = await getOrders({
          uploader, 
          skuList, 
          fulfilled: true,
          after: afterString,
        });

        setOrders(orderList);

        const report = orderProc({
          orders: orderList,
          products: productList,
          skus: skuList
        });
        console.log(report);
        setReport(report);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchMonthlyReport();
  }, []);

  return (
    <Container maxWidth="xl">
      <UserProfileView />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <InsightsCards report={report.repurposing} />
          <InsightsCharts report={report} />
        </>
      )}
    </Container>
  );
}
