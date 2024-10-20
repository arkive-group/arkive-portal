'use client'
import { useState, useEffect } from "react";

import { Button, Paper } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { getOrders, getProducts } from "@/lib/shopify";
import { useAuthContext } from "@/auth/hooks";


export default function OrdersOverview() {
    const { user } = useAuthContext()
    const [selectedRowIds, setSelectedRowIds] = useState([])
    const [orders, setOrders] = useState([]);
    
    
    useEffect(() => {
        const uploader = user?.email;
        const fetchOrders = async () => {
            const productList = await getProducts(uploader);
            const skuList = productList.map((product) => product.variants.map((variant) => variant.sku)).flat();
            
            const orderList = await getOrders(uploader, skuList)
            console.log(orderList);
            setOrders(orderList);
        };
        fetchOrders();
    }, [user]);

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Name", width: 100 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "totalPrice", headerName: "Total Price", width: 100 },
        { field: "currencyCode", headerName: "Currency Code", width: 100 },
    ]

    return (
        <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={orders}
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