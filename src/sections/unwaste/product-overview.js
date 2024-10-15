'use client'
import { useState, useEffect } from "react";

import { Button, Paper } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { getProducts } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";


export default function ProductOverview() {
    const { user } = useAuthContext()
    const [selectedRowIds, setSelectedRowIds] = useState([])
    const [products, setProducts] = useState([]);
    
    
    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts(user?.email);
            console.log(productList);
            setProducts(productList);
        };
        fetchProducts();
    }, [user]);

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "title", headerName: "Title", width: 200 },
        { field: "handle", headerName: "Handle", width: 150 },
        { field: "status", headerName: "Status", width: 100 },
        { field: "seoDescription", headerName: "SEO Description", width: 100 },
    ]

    return (
        <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row["id"]}
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
        </Paper>
    )

}