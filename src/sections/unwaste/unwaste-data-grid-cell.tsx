"use client";

import { Box } from "@mui/material";

export default function UnwasteDataGridCell({ value }) {
  return (
    <Box
      sx={{
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: "1.5",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      {value}
    </Box>
  );
}
