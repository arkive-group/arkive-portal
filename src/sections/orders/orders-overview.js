"use client";
import { useState, useEffect } from "react";

import { StyledDataGrid } from "@/components/styled-data-grid";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getOrders, getProducts } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";

export default function OrdersOverview() {
  const { user } = useAuthContext();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const uploader = user?.email;
    const company = user?.company;
    const fetchOrders = async () => {
      const productList = await getProducts({
        company,
      });
      const skuList = productList
        .map((product) => product.variants.map((variant) => variant.sku))
        .flat();

      const orderList = await getOrders(uploader, skuList);
      console.log(orderList);
      setOrders(orderList);
    };
    fetchOrders();
  }, [user]);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "totalPrice", headerName: "Total Price", width: 100 },
    { field: "currencyCode", headerName: "Currency Code", width: 100 },
    { field: "displayFulfillmentStatus", headerName: "Fullfillment", width: 100 },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Orders</Typography>
      </Box>
      <StyledDataGrid
        rows={orders}
        columns={columns.map((col) => ({
          ...col,
          flex: 1, // Allow flexible sizing based on content
          minWidth: 100, // Ensure a minimum width to avoid squishing
        }))}
        getRowId={(row) => row["id"]}
        getRowClassName={(params) =>
          params.row.displayFulfillmentStatus === "FULFILLED" ? "super-app-theme--green" : "super-app-theme--red"
        }
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
