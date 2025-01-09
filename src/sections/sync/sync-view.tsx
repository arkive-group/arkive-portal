"use client";
import { Container } from "@mui/material";
import { useState } from "react";

import ProductSelection from "./product-selection";
import FileUpload from "@/components/upload/file-upload";

export default function SyncView() {
  const [products, setProducts] = useState([]);
  return (
    <Container maxWidth="xl">
      <FileUpload setProducts={setProducts} />
      <ProductSelection products={products} />
    </Container>
  );
}
