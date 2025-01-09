"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Typography, Box, Card, Grid, Stack, Container } from "@mui/material";
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
    // <Card sx={{ p: 3, mb: 5 }}>
    // <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
    //   <Grid xs={12} md={6} lg={4}>
    <>
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* Blue Round Badge */}
        <div
          style={{
            backgroundColor: "#0033CC",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex", // Flexbox for centering content
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
          }}
        >
          <Typography
            color="white"
            variant="h5"
            sx={{ lineHeight: 1, marginRight: "1px" }} // Adjust line height to keep the character vertically aligned
          >
            1
          </Typography>
        </div>

        {/* Text Element */}

        <Typography variant="h4">Upload CSV</Typography>

      </Stack>
      </Box>

      <Card
        sx={{ mb: 8, mt: 8 }}
        {...getRootProps({
          style: {
            minWidth: "auto",
            minHeight: "200px",
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
          sx={{ color: "text.disabled" }}
        >
          {/* @ts-ignore */}
          <Iconify icon="eva:cloud-upload-fill" width={40} color="#0033CC" />
          <Stack spacing={0.5}>
            <Typography variant="body2">Drag a CSV file here, or</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={open} // Trigger file explorer
              sx={{ mt: 1, minWidth: "128px" }}
            >
              Upload File
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
    //   </Grid>
    // </Grid>
    // </Card>
  );
}
