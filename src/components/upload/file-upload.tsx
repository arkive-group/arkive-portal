"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Typography, Box, Card, Grid, Stack, Container, Paper } from "@mui/material";
import Iconify from "@/components/iconify";
import Papa from "papaparse";
import GenerateExcel from "@/sections/sync/download-excel-template";

export default function FileUpload({ setProducts }) {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.type !== "text/csv") {
          console.log("file type is not csv");
          return;
        }

        // Parse CSV using PapaParse
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            // Add unique IDs to each row
            results.data.forEach((row, index) => {
              row.id = index;
            });
            setProducts(results.data); // Update products state
            console.log("Parsed CSV data:", results.data);
          },
        });
      });
    },
    [setProducts]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
    onDrop: handleDrop,
    noClick: true, // Disable automatic click on the dropzone area
  });

  return (
    <Paper sx={{ width: "100%", marginBottom: '48px' }}>
      {/* Header Section */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <div
          style={{
            backgroundColor: "#0033CC",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            color="white"
            variant="h5"
            sx={{ lineHeight: 1, marginRight: "1px" }}
          >
            1
          </Typography>
        </div>
        <Typography variant="h4">Upload CSV</Typography>
      </Stack>

      {/* Main Content Section */}
      <Grid container spacing={2} alignItems="stretch">
        {/* File Upload (70% width) */}
        <Grid item xs={12} md={9}>
          <Card
            {...getRootProps({
              style: {
                height: "100%",
                border: "2px dashed rgba(145, 158, 171, 0.16)",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "rgba(145, 158, 171, 0.08)",
              },
            })}
          >
            <input {...getInputProps()} />
            <Stack
              spacing={5.5}
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%" }}
            >
              {/* ts-ignore */}
              <Iconify icon="eva:cloud-upload-fill" width={40} color="#0033CC" />
              <Stack spacing={0.5}>
                <Typography variant="body2">Drag a CSV file here, or</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={open}
                  sx={{ mt: 1, minWidth: "128px" }}
                >
                  Upload File
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* Generate Excel (30% width) */}
        <Grid item xs={12} md={3}>
          <GenerateExcel />
        </Grid>
      </Grid>
    </Paper>
  );
}
