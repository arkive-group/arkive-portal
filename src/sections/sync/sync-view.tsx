"use client";

// @mui
import { Container, Grid, Stack } from "@mui/material";
import { useState } from "react";

import UserProfileView from "@/sections/user/user-profile-view";
import ProductUnavailable from "../error/product-unavailable";
import UploadBoxs from "./upload-boxs";
import ProductSelection from "./product-selection";
import FileUpload from "@/components/upload/file-upload";
import GenerateExcel from "./download-excel-template";

// ----------------------------------------------------------------------

export default function SyncView() {
  const [products, setProducts] = useState([]);
  return (
    <Container maxWidth="xl">
      {/* Row for FileUpload and GenerateExcel */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* FileUpload (70% width) */}
        <Grid item xs={12} md={8}>
          <FileUpload setProducts={setProducts} />
        </Grid>

        {/* GenerateExcel (30% width) */}
        <Grid item xs={12} md={4}>
          <GenerateExcel />
        </Grid>
      </Grid>
      <ProductSelection products={products} />
      {/* </Stack> */}
    </Container>
  );
}
