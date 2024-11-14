"use client";
import { useState } from "react";

import { Box, Paper, Typography, Icon } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function ProductOverview({ products, productFilters }) {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const columns = [
    {
      field: "imageUrl",
      headerName: "Image",
      width: 160,
      editable: true,
      renderCell: (params) => (
        <Icon
          sx={{
            width: "100px",
            height: "100px",
            background: "#efefef",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            mx: "auto",
          }}
        >
          <img src={params.value} />
        </Icon>
      ), // renderCell will render the component
    },
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "handle", headerName: "Handle", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "seoDescription", headerName: "SEO Description", width: 100 },
    { field: "salesChannels", headerName: "Sales Channels", width: 100 },
  ];

  console.log(productFilters, "productFilters");
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

      <Box sx={{ height: "600px", width: "100%" }}>
        <DataGrid
          rowHeight={110}
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
      </Box>
    </Paper>
  );
}
