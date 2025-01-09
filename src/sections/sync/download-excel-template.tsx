"use client";

import React from "react";
import * as XLSX from "xlsx";
import { Button, Typography, Box, Card, Stack } from "@mui/material";
import Iconify from "@/components/iconify";
import { productSelectionColumns } from "@/constants/product-selection-columnns";

export default function GenerateExcel() {
  const generateExcelFile = () => {
    const headers = productSelectionColumns.map((col) => col.headerName);
    const worksheetData = [headers];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "Products.xlsx");
  };

  return (
    <Card
      sx={{
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
      <Stack spacing={6.5} alignItems="center" sx={{ color: "text.disabled" }}>
        {/* @ts-ignore */}
        <Iconify icon="eva:file-text-fill" width={40} color="#0033CC" />
        <Stack spacing={0.5}>
          <Typography color="gray" variant="body2">
            Click below to download the Excel template
          </Typography>
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
  );
}
