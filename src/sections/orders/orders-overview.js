"use client";
import { useState, useEffect } from "react";

import { StyledDataGrid } from "@/components/styled-data-grid";
import { Box, Button, Paper, Typography, Tooltip } from "@mui/material";
import { GridToolbar, GridRow } from "@mui/x-data-grid";
import { getOrders, getProducts } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";
import FulfillPopup from "./fulfill-popup";
import { LoadingScreen } from "@/components/loading-screen";

const TootlipedRow = (props) => {
  return (
    <Tooltip placement="bottom" title={props.row.displayFulfillmentStatus}>
      <GridRow {...props} />
    </Tooltip>
  );
};


export default function OrdersOverview() {
  const { user } = useAuthContext();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fulfillmentOrder, setFulfillmentOrder] = useState([]);
  const [openFulfillPopup, setOpenFulfillPopup] = useState(false);

  useEffect(() => {
    const uploader = user?.email;
    const company = user?.company;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const productList = await getProducts({
          company,
        });
        const skuList = productList
          .map((product) => product.variants.map((variant) => variant.sku))
          .flat();
        // console.log(skuList);
        const afterString = (new Date(new Date().setMonth(new Date().getMonth() - 3))).toISOString();
        const orderList = await getOrders({
          uploader,
          skuList,
          after: afterString,
        });
        // console.log(orderList);
        setOrders(orderList);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, openFulfillPopup]);

  const getSelectedOrders = async () => {
    if (selectedRowIds.length === 0) return [];
    const selectedOrders = orders.filter((order) =>
      selectedRowIds.includes(order.id)
    );
    const order = selectedOrders[0];
    let fulfillmentOrder = {
      id: order.id,
      name: order.name,
      fulfillmentOrderIds: order.fulfillmentOrders.map(
        (fulfillmentOrder) => fulfillmentOrder.id
      ),
    };
    setFulfillmentOrder(fulfillmentOrder);
    setOpenFulfillPopup(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "totalPrice", headerName: "Total Price", width: 100 },
    { field: "currencyCode", headerName: "Currency Code", width: 100 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "address1", headerName: "Address", width: 200 },
    { field: "address2", headerName: "Address 2", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "zip", headerName: "Zip", width: 100 },
    { field: "phone", headerName: "Phone", width: 100 },
    // {
    //   field: "displayFulfillmentStatus",
    //   headerName: "Fullfillment",
    //   width: 100,
    // },
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
        <Button
          disabled={!selectedRowIds?.length}
          variant="contained"
          onClick={getSelectedOrders}
        >
          Fulfill Orders
        </Button>
      </Box>

      {loading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ height: "600px", width: "100%" }}>
          <StyledDataGrid
            rows={orders}
            getRowClassName={(params) =>
              params.row.displayFulfillmentStatus === "FULFILLED"
                ? "super-app-theme--green"
                : "super-app-theme--red"
            }
            columns={columns.map((col) => ({
              ...col,
              // flex: 'auto', // Allow flexible sizing based on content
              // minWidth: 200, // Ensure a minimum width to avoid squishing
            }))}
            getRowId={(row) => row["id"]}
            getEstimatedRowHeight={() => 100}
            getRowHeight={() => 'auto'}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableMultipleRowSelection={true}
            onRowSelectionModelChange={(ids) => {
              setSelectedRowIds(ids);
            }}
            slots={{
              toolbar: GridToolbar,
              row: TootlipedRow,
            }}
          />
        </Box>
      )}

      <FulfillPopup
        fulfillmentOrder={fulfillmentOrder}
        open={openFulfillPopup}
        setOpen={setOpenFulfillPopup}
      />
    </Paper>
  );
}
