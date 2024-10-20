"use client";

import { useState } from "react";

import { Button, Paper, Typography, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createProduct } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";

import shopifyTaxonomy from "./shopify-taxonomy.json";
import { display } from "@mui/system";

export default function ProductSelection({ products }) {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const { user } = useAuthContext();

  const columns = [
    { field: "Title", headerName: "Title", width: 150 },
    { field: "Cost per item", headerName: "Cost per item", width: 80 },
    { field: "Handle", headerName: "Handle", width: 110 },
    { field: "Product Category", headerName: "Product Category", width: 130 },
    { field: "Variant Barcode", headerName: "Variant Barcode", width: 100 },
  ];

  const getSelectedProducts = async () => {
    if (selectedRowIds.length === 0) return [];
    const selectedIDs = new Set(selectedRowIds);
    const handles = new Set();
    for (let i = 0; i < products.length; i++) {
      if (selectedIDs.has(products[i].id)) {
        handles.add(products[i].Handle);
      }
    }
    console.log(handles);
    handles.forEach(async (handle) => {
      const productObj = {
        handle: handle,
        media: [],
      };
      const productsWithHandle = products.filter(
        (row) => row.Handle === handle
      );
      for (let i = 0; i < productsWithHandle.length; i++) {
        if (
          productsWithHandle[i].Title !== null &&
          productsWithHandle[i].Title !== ""
        ) {
          productObj.title = productsWithHandle[i].Title;
        }
        if (
          productsWithHandle[i]["Product Category"] !== null &&
          productsWithHandle[i]["Product Category"] !== ""
        ) {
          const categoryTitle =
            productsWithHandle[i]["Product Category"].trim();
          for (let j = 0; j < shopifyTaxonomy.length; j++) {
            if (shopifyTaxonomy[j].title === categoryTitle) {
              productObj.category = shopifyTaxonomy[j].searchIdentifier;
              break;
            }
          }
        }
        if (
          productsWithHandle[i].Type !== null &&
          productsWithHandle[i].Type !== ""
        ) {
          productObj.type = productsWithHandle[i].Type;
        }
        if (
          productsWithHandle[i]["SEO Title"] !== null &&
          productsWithHandle[i]["SEO Title"] !== ""
        ) {
          productObj.seoTitle = productsWithHandle[i]["SEO Title"];
        }
        if (
          productsWithHandle[i]["SEO Description"] !== null &&
          productsWithHandle[i]["SEO Description"] !== ""
        ) {
          productObj.seoDescription = productsWithHandle[i]["SEO Description"];
        }
        if (
          productsWithHandle[i].Vendor !== null &&
          productsWithHandle[i].Vendor !== ""
        ) {
          productObj.vendor = productsWithHandle[i].Vendor;
        }
        if (user?.email !== null && user?.email !== "") {
          productObj.uploader = user.email;
        }

        if (
          productsWithHandle[i]["Image Src"] !== null &&
          productsWithHandle[i]["Image Src"] !== ""
        ) {
          let mediaObj = {
            originalSource: productsWithHandle[i]["Image Src"],
            mediaContentType: "IMAGE",
          };
          if (
            productsWithHandle[i]["Image Alt Text"] !== null &&
            productsWithHandle[i]["Image Alt Text"] !== ""
          ) {
            mediaObj.alt = productsWithHandle[i]["Image Alt Text"];
          }
          productObj.media.push(mediaObj);
        }
      }
      console.log(productObj);
      const product = await createProduct(productObj);
      console.log(product);
    });
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        mb={3}
      >
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={getSelectedProducts}>
          Create Products
        </Button>
      </Box>

      <DataGrid
        rows={products}
        columns={columns.map((col) => ({
          ...col,
          flex: 1, // Allow flexible sizing based on content
          minWidth: 100, // Ensure a minimum width to avoid squishing
        }))}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          setSelectedRowIds(ids);
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Paper>
  );
}
