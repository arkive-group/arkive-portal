"use client";

import React from "react";
import * as XLSX from "xlsx";
import { Button, Typography, Box, Card, Stack } from "@mui/material";
import Iconify from "@/components/iconify";

const columns = [
  { field: "Title", headerName: "Title", width: 150 },
  { field: "Cost per item", headerName: "Cost per item", width: 80 },
  { field: "Handle", headerName: "Handle", width: 110 },
  { field: "Product Category", headerName: "Product Category", width: 130 },
  { field: "Variant Barcode", headerName: "Variant Barcode", width: 100 },
  { field: "Image Link", headerName: "Image Link", width: 100 },
];

export default function GenerateExcel() {
  const generateExcelFile = () => {
    // Prepare column headers for the Excel file
    const headers = columns.map((col) => col.headerName);

    // Combine headers only (no data rows provided)
    const worksheetData = [headers];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "Products.xlsx");
  };

  return (
    <>

      <Card
        sx={{
          // mb: 8,
          // mt: 8,
          maxWidth: "400px",
          minHeight: "200px",
          border: "2px solid rgba(145, 158, 171, 0.16)",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "rgba(145, 158, 171, 0.08)",
        }}
      >
        <Stack spacing={5.5} alignItems="center" sx={{ color: "text.disabled" }}>
          {/* Icon */}
          {/* @ts-ignore */}
          <Iconify icon="eva:file-text-fill" width={40} color="#0033CC" />
          <Stack spacing={0.5}>
            <Typography variant="body2">Click below to download the Excel template</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={generateExcelFile}
              sx={{ mt: 1, minWidth: "128px" }}
            >
              Download Excel template
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
