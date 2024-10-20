"use client";

// import { useAuthContext } from '@/auth/hooks'
import { Card, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { UploadBox } from "@/components/upload";
import Iconify from "@/components/iconify";
import Papa from "papaparse";

export default function UploadBoxs({ setProducts }) {
  const uploadOptions = [
    {
      value: "one-by-one",
      label: "One by One Upload Tool",
    },
<<<<<<< HEAD
    {
      value: "ftp",
      label: "FTP Connectors",
    },
  ];
=======
    // {
    //   value: 'ftp',
    //   label: 'FTP Connectors',
    // },
  ]
>>>>>>> a29b07be36b127eba9df209395753a4c5282f08d

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      // const newFiles = acceptedFiles.map(file =>
      //   Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //   }),
      // )

      acceptedFiles.forEach((file) => {
        if (file.type !== "text/csv") {
          console.log("file type is not csv");
          return;
        }

        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            for (let i = 0; i < results.data.length; i++) {
              results.data[i].id = i;
            }
            setProducts(results.data);
            console.log(results.data);
          },
        });
      });

      const res = await fetch("/api/files", {
        method: "POST",
        body: JSON.stringify(acceptedFiles[0]),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const success = await res.json();
    },

    [setProducts]
  );

  return (
    <Card sx={{ p: 3, mb: 5 }}>
      <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
        {uploadOptions.map((option) => (
          <Grid xs={12} md={6} lg={4} key={option.value}>
            <UploadBox
              onDrop={handleDrop}
              placeholder={
                <Stack
                  spacing={0.5}
                  alignItems="center"
                  sx={{ color: "text.disabled" }}
                >
                  <Iconify icon="eva:cloud-upload-fill" width={40} />
                  <Typography variant="body2">{option.label}</Typography>
                </Stack>
              }
              sx={{
                mb: 3,
                py: 2.5,
                width: "auto",
                height: "auto",
                borderRadius: 1.5,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
