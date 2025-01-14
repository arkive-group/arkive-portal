"use client";
import { useState } from "react";

import { Box, Paper, Typography, Icon } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import UnwasteDataGridCell from "./unwaste-data-grid-cell";

export default function ProductOverview({ products, productFilters }) {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const columns = [
    {
      field: "imageUrl",
      headerName: "Image",
      headerAlign: "center",
      width: 160,
      editable: true,
      renderCell: (params) => (
        <Link href={`https://arkivegroup.com/products/${params.row.handle}`}>
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
              boxShadow: 3,
            }}
          >
            <img src={params.value} />
          </Icon>
        </Link>
      ),
    },
    // { field: "id", headerName: "ID", width: 150 },
    {
      field: "title",
      headerName: "Products / Materials / Ingredients",
      headerAlign: "center",
      headerClassName: "custom-header",
      width: 240,
      renderCell: (params) => <UnwasteDataGridCell value={params.value} />,
    },
    // { field: "handle", headerName: "Handle", width: 150 },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      maxWidth: 80,
      renderCell: (params) => <UnwasteDataGridCell value={params.value} />,
    },
    // { field: "seoDescription", headerName: "SEO Description", headerAlign: "center", width: 100 },
    {
      field: "salesChannels",
      headerName: "Sales Channels",
      headerAlign: "center",
      headerClassName: "custom-header",
      width: 100,
      renderCell: (params) => <UnwasteDataGridCell value={params.value} />,
    },
    {
      field: "availableMarkets",
      headerName: "Available markets (coming soon)",
      headerAlign: "center",
      headerClassName: "custom-header",
      width: 100,
      renderCell: (params) => <UnwasteDataGridCell value={"Benelux"} />,
    },
    {
      field: "channelType",
      headerName: "Channel Type (coming soon)",
      headerAlign: "center",
      headerClassName: "custom-header",
      width: 100,
      renderCell: (params) => <UnwasteDataGridCell value={"All"} />,
    },
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
            flex: 1,
            minWidth: 100,
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
          sx={{
            "& .custom-header .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal !important", /* Allow text wrapping */
              lineHeight: "1.2", /* Adjust line spacing */
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            },
          }}
        />
      </Box>
    </Paper>
  );
}
