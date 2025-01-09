import React from "react";
import { useDropzone } from "react-dropzone";
import { Button, Typography, Box } from "@mui/material";
import Papa from "papaparse"; // For CSV parsing (if needed)

export default function FileUpload({ setProducts }) {
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false, // Only one file at a time
    accept: {
      "text/csv": [".csv"], // CSV file
      "application/vnd.ms-excel": [".xls"], // Older Excel file
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ], // Modern Excel file
    },
    onDropAccepted: (acceptedFiles) => {
      console.log("Accepted files:", acceptedFiles);

      // Handle CSV parsing or Excel processing here
      const file = acceptedFiles[0];
      if (file.type === "text/csv") {
        // Parse CSV using PapaParse
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            console.log("Parsed CSV data:", results.data);
            setProducts(results.data); // Set the parsed products
          },
        });
      } else {
        // Add logic for Excel file processing if needed
        alert("Excel processing is not implemented yet!");
      }
    },
    onDropRejected: (fileRejections) => {
      console.error("Rejected files:", fileRejections);
      alert("Invalid file type. Please upload a CSV or Excel file.");
    },
    noClick: true, // Prevent automatic file picker opening
    noKeyboard: true, // Disable keyboard interaction
  });

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
      }}
      {...getRootProps()}
    >
      {/* Hidden input for file upload */}
      <input {...getInputProps()} />
      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
        Drag and drop a file here, or
      </Typography>
      {/* Upload button to trigger file explorer */}
      <Button
        variant="contained"
        color="primary"
        onClick={open} // Open the file explorer
      >
        Upload File
      </Button>
      <Typography
        variant="caption"
        sx={{ display: "block", marginTop: "8px", color: "gray" }}
      >
        Accepted formats: .csv, .xls, .xlsx
      </Typography>
    </Box>
  );
}
