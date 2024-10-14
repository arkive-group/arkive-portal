"use client";

// @mui
import { Container } from "@mui/material";
import { useState } from "react";

import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import UploadBoxs from "./upload-boxs";
import ProductSelection from "./product-selection";

// ----------------------------------------------------------------------

export default function SyncView() {
  const [products, setProducts] = useState([]);
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      {/* <ProductUnavailable /> */}
      <UploadBoxs setProducts={setProducts} />
      <ProductSelection products={products} />
    </Container>
  );
}
