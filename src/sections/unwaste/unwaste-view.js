"use client";

import { useState, useEffect } from "react";
// @mui
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Channels } from "@/components/active-channel";
import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import ProductOverview from "./product-overview";
import ActiveChannel from "@/components/active-channel";
import { getProducts } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";
import { LoadingScreen } from "@/components/loading-screen";

// ----------------------------------------------------------------------

export default function UnwasteView() {
  const { user } = useAuthContext();
  const [channel, setChannel] = useState("shopify");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productFilters, setProductFilters] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const company = user?.company;
        const productList = await getProducts({
          company,
        });
        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const onChannleChange = (value) => {
    setChannel(value); // Only update the channel
  };

  // Sync productFilters when channel changes
  useEffect(() => {
    if (Object.keys(Channels).includes(channel)) {
      setProductFilters([
        {
          field: "salesChannels",
          operator: "contains",
          value: Channels[channel].alias,
        },
      ]);
    } else {
      setProductFilters([]);
    }
  }, [channel]);

  return (
    <Container maxWidth="xl">
      <UserProfileView />
      {/* <ProductUnavailable /> */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <ProductOverview
              products={products}
              productFilters={productFilters}
            />
          </Grid>
          <Grid item xs={3}>
            <ActiveChannel
              channel={channel}
              onChannleChange={onChannleChange}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
