"use client";
import { useState, useEffect } from "react";

import { Box, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { TextField } from "@mui/material";

import { fulfillOrder } from "@/lib/shopify";
import { useSnackbar } from "src/components/snackbar";

export default function FulfillPopup({ fulfillmentOrder, open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();

  const [fulfillmentOrderIds, setFulfillmentOrderIds] = useState(
    fulfillmentOrder.fulfillmentOrderIds ?? []
  );
  const [trackingNumbers, setTrackingNumbers] = useState(
    Array(fulfillmentOrderIds.length)
  );
  const [trackingUrls, setTrackingUrls] = useState(
    Array(fulfillmentOrderIds.length)
  );
  const [trackingCompanies, setTrackingCompanies] = useState(
    Array(fulfillmentOrderIds.length)
  );

  useEffect(() => {
    if (fulfillmentOrder.fulfillmentOrderIds) {
      setFulfillmentOrderIds(fulfillmentOrder.fulfillmentOrderIds);
      setTrackingNumbers(Array(fulfillmentOrder.fulfillmentOrderIds.length));
      setTrackingUrls(Array(fulfillmentOrder.fulfillmentOrderIds.length));
      setTrackingCompanies(Array(fulfillmentOrder.fulfillmentOrderIds.length));
    }
  }, [fulfillmentOrder]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFulfillOrder = async (e) => {
    e.preventDefault();
    console.log(fulfillmentOrderIds);
    console.log(trackingNumbers);
    console.log(trackingUrls);
    console.log(trackingCompanies);

    for (let i = 0; i < fulfillmentOrderIds.length; i++) {
      const response = await fulfillOrder({
        fulfillmentOrderId: fulfillmentOrderIds[i],
        notifyCustomer: true,
        trackingInfo: {
          number: trackingNumbers[i],
          url: trackingUrls[i],
          company: trackingCompanies[i],
        },
      });
      if (response.userErrors !== undefined && response.userErrors.length > 0) {
        enqueueSnackbar(
          `Error fulfilling order with ID: ${fulfillmentOrderIds[i]}: ${response.userErrors[0]?.message}`,
          { variant: "error" }
        );
        console.error(response.userErrors[0]);
        return;
      } else {
        const fulfillmentId = response.fulfillment?.id;
        enqueueSnackbar(`Product created with ID: ${fulfillmentId}`);
        console.log(`Fulfilled order with ID: ${fulfillmentId}`);
        setOpen(false);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">Fulfill Orders</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            id="fulfillmentOrderId"
            label="Order ID"
            name="fulfillmentOrderId"
            value={fulfillmentOrder.id}
            slotprops={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="fulfillmentOrderName"
            label="Order Name"
            name="fulfillmentOrderName"
            value={fulfillmentOrder.name}
            slotprops={{
              input: {
                readOnly: true,
              },
            }}
          />
          {fulfillmentOrderIds.map((fulfillmentOrderId, idx) => (
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                id="fulfillmentOrderId"
                label="Order ID"
                name="fulfillmentOrderId"
                type="hidden"
                value={fulfillmentOrder.id}
                slotprops={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
              <TextField
                margin="normal"
                id="fulfillmentOrderName"
                label="Order Name"
                name="fulfillmentOrderName"
                type="hidden"
                value={fulfillmentOrder.name}
                slotprops={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                id="fulfillmentOrderId"
                label="Fulfillment Order ID"
                name="fulfillmentOrderId"
                value={fulfillmentOrderId}
              />
              <TextField
                margin="normal"
                id="fulfillmentTrackingNumber"
                label="Tracking Number"
                type="text"
                name="fulfillmentTrackingNumber"
                onChange={(e) => {
                  let newTrackingNumbers = trackingNumbers;
                  newTrackingNumbers[idx] = e.target.value;
                  setTrackingNumbers(newTrackingNumbers);
                }}
                sx={{ mr: 1 }}
              />
              <TextField
                margin="normal"
                id="fulfillmentTrackingUrl"
                label="Tracking URL"
                type="text"
                name="fulfillmentTrackingUrl"
                onChange={(e) => {
                  let newTrackingUrls = trackingUrls;
                  newTrackingUrls[idx] = e.target.value;
                  setTrackingUrls(newTrackingUrls);
                }}
                sx={{ mr: 1 }}
              />
              <TextField
                margin="normal"
                id="fulfillmentCompany"
                label="Company"
                type="text"
                name="fulfillmentCompany"
                onChange={(e) => {
                  let newTrackingCompanies = trackingCompanies;
                  newTrackingCompanies[idx] = e.target.value;
                  setTrackingCompanies(newTrackingCompanies);
                }}
                sx={{ mr: 1 }}
              />
            </Box>
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFulfillOrder}
          >
            Fulfill Orders
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
