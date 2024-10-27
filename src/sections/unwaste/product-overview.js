"use client";
import { useState, useEffect } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getProducts } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";
import { Channels } from "@/components/active-channel";

export default function ProductOverview({ channel }) {
  const { user } = useAuthContext();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [productFilters, setProductFilters] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const company = user?.company;
      const productList = await getProducts({
        company,
      });
      console.log(productList);
      setProducts(productList);
    };
    fetchProducts();
  }, [user]);

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

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "handle", headerName: "Handle", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "seoDescription", headerName: "SEO Description", width: 100 },
    { field: "salesChannels", headerName: "Sales Channels", width: 100 },
  ];

  return (
    <Paper sx={{ height: 400 }}>
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Products</Typography>
      </Box>
      <DataGrid
        rows={products}
        columns={columns.map((col) => ({
          ...col,
          flex: 1, // Allow flexible sizing based on content
          minWidth: 100, // Ensure a minimum width to avoid squishing
        }))}
        filterModel={{
          items: productFilters,
        }}
        getRowId={(row) => row["id"]}
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
