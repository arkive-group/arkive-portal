"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Typography, Box, Card, Grid, Stack } from "@mui/material";
import Iconify from "@/components/iconify";
import Papa from "papaparse";

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
    <Card sx={{ p: 3, mb: 5 }}>
      <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
        <Grid xs={12} md={6} lg={4}>
          <Box
            {...getRootProps({
              style: {
                border: "2px dashed rgba(145, 158, 171, 0.16)",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
              },
            })}
          >
            <input {...getInputProps()} />
            <Stack
              spacing={0.5}
              alignItems="center"
              sx={{ color: "text.disabled" }}
            >
              {/* @ts-ignore */}
              <Iconify icon="eva:cloud-upload-fill" width={40} color="#0033CC"/>
              <Typography variant="body2">
                Drag and drop a CSV file here, or
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={open} // Trigger file explorer
                sx={{ mt: 1, minWidth: '128px' }}
              >
                Upload File
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
