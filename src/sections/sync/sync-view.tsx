"use client";

// @mui
import { Container, Stack } from "@mui/material";
import { useState } from "react";

import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import UploadBoxs from "./upload-boxs";
import ProductSelection from "./product-selection";
import FileUpload from "@/components/upload/file-upload";

// ----------------------------------------------------------------------

export default function SyncView() {
  const [products, setProducts] = useState([]);
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      {/* <ProductUnavailable /> */}
      {/* <Stack direction="row" spacing={5}> */}
      <FileUpload setProducts={setProducts} />
      <ProductSelection products={products} />
      {/* </Stack> */}
    </Container>
  );
}
