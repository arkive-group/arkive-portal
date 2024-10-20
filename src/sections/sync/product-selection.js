"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { Button, Paper, Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  createProduct,
  createProductOptions,
  createProductVariants,
} from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";
import { useSnackbar } from "src/components/snackbar";

import shopifyTaxonomy from "./shopify-taxonomy.json";

export default function ProductSelection({ products }) {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { field: "Title", headerName: "Title", width: 150 },
    { field: "Cost per item", headerName: "Cost per item", width: 80 },
    { field: "Handle", headerName: "Handle", width: 110 },
    { field: "Product Category", headerName: "Product Category", width: 130 },
    { field: "Variant Barcode", headerName: "Variant Barcode", width: 100 },
  ];

  const extractProductFromHandleArray = (handle, products) => {
    const productObj = {
      handle: handle,
      media: [],
      options: [],
      variants: [],
    };
    const productsWithHandle = products.filter((row) => row.Handle === handle);
    for (let i = 0; i < productsWithHandle.length; i++) {
      const productRaw = productsWithHandle[i];
      if (productRaw.Title !== null && productRaw.Title !== "") {
        productObj.title = productRaw.Title;
      }
      if (
        productRaw["Product Category"] !== null &&
        productRaw["Product Category"] !== ""
      ) {
        const categoryTitle = productRaw["Product Category"].trim();
        for (let j = 0; j < shopifyTaxonomy.length; j++) {
          if (shopifyTaxonomy[j].title === categoryTitle) {
            productObj.category = shopifyTaxonomy[j].searchIdentifier;
            break;
          }
        }
      }
      if (productRaw.Type !== null && productRaw.Type !== "") {
        productObj.type = productRaw.Type;
      }
      if (productRaw["SEO Title"] !== null && productRaw["SEO Title"] !== "") {
        productObj.seoTitle = productRaw["SEO Title"];
      }
      if (
        productRaw["SEO Description"] !== null &&
        productRaw["SEO Description"] !== ""
      ) {
        productObj.seoDescription = productRaw["SEO Description"];
      }
      if (productRaw.Vendor !== null && productRaw.Vendor !== "") {
        productObj.vendor = productRaw.Vendor;
      }
      if (user?.email !== null && user?.email !== "") {
        productObj.uploader = user.email;
      }

      // Medias
      if (productRaw["Image Src"] !== null && productRaw["Image Src"] !== "") {
        let mediaObj = {
          originalSource: productRaw["Image Src"],
          mediaContentType: "IMAGE",
        };
        if (
          productRaw["Image Alt Text"] !== null &&
          productRaw["Image Alt Text"] !== ""
        ) {
          mediaObj.alt = productRaw["Image Alt Text"];
        }
        productObj.media.push(mediaObj);
      }

      // Options
      if (
        productRaw["Option1 Name"] !== null &&
        productRaw["Option1 Name"] !== ""
      ) {
        productObj.options.push({
          name: productRaw["Option1 Name"],
          values: [],
        });
      }
      if (
        productRaw["Option2 Name"] !== null &&
        productRaw["Option2 Name"] !== ""
      ) {
        productObj.options.push({
          name: productRaw["Option2 Name"],
          values: [],
        });
      }
      if (
        productRaw["Option3 Name"] !== null &&
        productRaw["Option3 Name"] !== ""
      ) {
        productObj.options.push({
          name: productRaw["Option3 Name"],
          values: [],
        });
      }

      // Variants
      if (
        productRaw["Variant Barcode"] !== null &&
        productRaw["Variant Barcode"] !== ""
      ) {
        let variantObj = {
          barcode: productRaw["Variant Barcode"].toString(),
          price: productRaw["Variant Price"],
          mediaSrc: [productRaw["Variant Image"]],
          inventoryPolicy: productRaw["Variant Inventory Policy"].toUpperCase(),
          taxable: productRaw["Variant Taxable"],
          taxCode: productRaw["Variant Tax Code"],
          inventoryItem: {
            sku: productRaw["Variant SKU"].toString(),
            requiresShipping: productRaw["Variant Requires Shipping"],
          },
          optionValues: [],
        };
        if (
          productRaw["Option1 Value"] !== null &&
          productRaw["Option1 Value"] !== "" &&
          productObj.options[0].name !== null &&
          productObj.options[0].name !== ""
        ) {
          variantObj.optionValues.push({
            optionName: productObj.options[0].name,
            name: productRaw["Option1 Value"],
          });
          productObj.options[0].values.push({
            name: productRaw["Option1 Value"],
          });
        } else if (
          productRaw["Option2 Value"] !== null &&
          productRaw["Option2 Value"] !== "" &&
          productObj.options[1].name !== null &&
          productObj.options[1].name !== ""
        ) {
          variantObj.optionValues.push({
            optionName: productObj.options[1].name,
            name: productRaw["Option2 Value"],
          });
          productObj.options[1].values.push({
            name: productRaw["Option2 Value"],
          });
        } else if (
          productRaw["Option3 Value"] !== null &&
          productRaw["Option3 Value"] !== "" &&
          productObj.options[2].name !== null &&
          productObj.options[2].name !== ""
        ) {
          variantObj.optionValues.push({
            optionName: productObj.options[2].name,
            name: productRaw["Option3 Value"],
          });
          productObj.options[2].values.push({
            name: productRaw["Option3 Value"],
          });
        }
        productObj.variants.push(variantObj);
      }
    }
    return productObj;
  };

  const getSelectedProducts = async () => {
    if (selectedRowIds.length === 0) return [];
    const selectedIDs = new Set(selectedRowIds);
    const handles = new Set();
    for (let i = 0; i < products.length; i++) {
      if (selectedIDs.has(products[i].id)) {
        handles.add(products[i].Handle);
      }
    }
    console.log(handles);

    handles.forEach(async (handle) => {
      // Read and extract product from handle
      const productObj = extractProductFromHandleArray(handle, products);
      console.log(productObj);

      // Create product => options => variants
      var res = await createProduct(productObj);
      const productId = res.data?.productCreate?.product?.id;
      if (productId) {
        console.log(`Product created with ID: ${productId}`);

        // Create product options
        res = await createProductOptions(productId, productObj);
        const productOptions = res.data?.productOptionsCreate?.product?.options;
        console.log(`Product options created: ${productOptions}`);

        // Create product variants
        res = await createProductVariants(productId, productObj);
        const productVariants =
          res.data?.productVariantsBulkCreate?.product?.options;
        console.log(`Product variants created: ${productVariants}`);

        enqueueSnackbar(`Product created with ID: ${productId}`);
      } else {
        console.log(`Product creation failed: ${res.text}`);

        enqueueSnackbar(`Product creation failed: ${res.text}`, { variant: "error" });
      }
    });
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={getSelectedProducts}>
          Create Products
        </Button>
      </Box>
      <DataGrid
        rows={products}
        columns={columns.map((col) => ({
          ...col,
          flex: 1, // Allow flexible sizing based on content
          minWidth: 100, // Ensure a minimum width to avoid squishing
        }))}
        getRowId={(row) => row.id}
        autoHeight // Adjusts height based on content
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
    </Paper>
  );
}
