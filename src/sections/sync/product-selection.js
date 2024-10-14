'use client'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

import { Button, Paper } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { createProduct } from '@/lib/shopify'

import shopifyTaxonomy from './shopify-taxonomy.json'

export default function ProductSelection({ products }) {
    const [selectedRowIds, setSelectedRowIds] = useState([])

    const columns = [
        { field: "Title", headerName: "Title", width: 150 },
        { field: "Cost per item", headerName: "Cost per item", width: 80 },
        { field: "Handle", headerName: "Handle", width: 110 },
        { field: "Product Category", headerName: "Product Category", width: 130 },
        { field: "Variant Barcode", headerName: "Variant Barcode", width: 100 },
    ]

    const getSelectedProducts = async () => {
        if (selectedRowIds.length === 0) return []
        const selectedIDs = new Set(selectedRowIds)
        const handles = new Set()
        for (let i = 0; i < products.length; i++) {
            if (selectedIDs.has(products[i].id)) {
                handles.add(products[i].Handle)
            }
        }
        console.log(handles)
        handles.forEach(async (handle) => {
            const productObj = {
                handle: handle,
            }
            const productsWithHandle = products.filter((row) => row.Handle === handle)
            for (let i = 0; i < productsWithHandle.length; i++) {
                if (productsWithHandle[i].Title !== null && productsWithHandle[i].Title !== "") {
                    productObj.title = productsWithHandle[i].Title
                }
                if (productsWithHandle[i]["Product Category"] !== null && productsWithHandle[i]["Product Category"] !== "") {
                    const categoryTitle = productsWithHandle[i]["Product Category"].trim()
                    for (let j = 0; j < shopifyTaxonomy.length; j++) {
                        if (shopifyTaxonomy[j].title === categoryTitle) {
                            productObj.category = shopifyTaxonomy[j].searchIdentifier
                            break
                        }
                    }
                }
                if (productsWithHandle[i].Type !== null && productsWithHandle[i].Type !== "") {
                    productObj.barcode = productsWithHandle[i].Type
                }
                if (productsWithHandle[i]["SEO Title"] !== null && productsWithHandle[i]["SEO Title"] !== "") {
                    productObj.seoTitle = productsWithHandle[i]["SEO Title"]
                }
                if (productsWithHandle[i]["SEO Description"] !== null && productsWithHandle[i]["SEO Description"] !== "") {
                    productObj.seoDescription = productsWithHandle[i]["SEO Description"]
                }
                if (productsWithHandle[i].Vendor !== null && productsWithHandle[i].Vendor !== "") {
                    productObj.vendor = productsWithHandle[i].Vendor
                }

                console.log(productObj)
                const product = await createProduct(productObj);
                console.log(product);
            }
        });
    };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } }}}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
                setSelectedRowIds(ids)
            }}
            slots={{
                toolbar: GridToolbar,
            }}
        />
        <Button onClick={getSelectedProducts}>Create Products</Button>
    </Paper>
  )
}