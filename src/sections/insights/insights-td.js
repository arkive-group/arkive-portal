"use client";
import { useState, useEffect, useMemo } from 'react';
import {
    loginWithCredentials,
    getOAuthToken,
    getTradeDoublerDashboard,
    getTradeDoublerEvents,
    getTradeDoublerPrograms,
    getConnectedSources,
    getStatisticsBySource,
} from '@/lib/tradedoubler';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper, Box } from '@mui/material';
import { Card, CardHeader, CardContent } from '@mui/material';
import { InvoicePlot } from '@/components/tradedoubler/invoice-barplot';


export function InsightsTD({ }) {
    const [dashboard, setDashboard] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isexpired, setIsExpired] = useState(false);
    const [sources, setSources] = useState([]);
    const [statistics, setStatistics] = useState([]);


    useEffect(() => {
        loginWithCredentials().then((data) => {
            console.log(data)
            setRefreshToken(data.refresh_token);
            setAccessToken(data.access_token);
        })
    }, []);

    useMemo(() => {
        if (isexpired) {
            getOAuthToken({ refreshToken }).then((data) => {
                console.log(data)
                setAccessToken(data.access_token);
                setRefreshToken(data.refresh_token);
                setIsExpired(false);
            });
        }
    }, [isexpired]);

    useMemo(() => {
        const fetchPrograms = async () => {
            const data = await getTradeDoublerPrograms({ accessToken });
            console.log(data);
            const programs = [];
            if (data.error && data.error === 'invalid_token') {
                console.error(data.error);
                setIsExpired(true);
            } else {
                if (data.items && data.items.length > 0) {
                    data.items.forEach((item) => {
                        programs.push(item.id);
                    });
                }
                return programs;
            }
        };

        const fetchStatistics = async (programs) => {
            let stats = [];
            for (const programId of programs) {
                const data = await getStatisticsBySource({ accessToken, programId });
                console.log(data);
                if (data.error && data.error === 'invalid_token') {
                    console.error(data.error);
                    setIsExpired(true);
                    return;
                } else {
                    if (data.items && data.items.length > 0) {
                        for (const item of data.items) {
                            stats.push({
                                date: item.date,
                                sourceId: item.sourceId,
                                sourceName: item.sourceName,
                                clicks: item.clicks,
                                sales: item.sales,
                                conversionRate: item.cr,
                                clickThroughRate: item.ctr,
                                leadRate: item.lr,
                                earningsPer100Clicks: item.epc,
                                orderValue: item.orderValue,
                            })
                        }
                    }
                }
            }
            console.log(stats);
            stats.sort((a, b) => b.clicks - a.clicks);
            setStatistics(stats);
        };

        if (accessToken) {
            const fetchData = async () => {
                if (accessToken) {
                    const programs = await fetchPrograms();
                    if (programs) {
                        await fetchStatistics(programs);
                    }
                }
            };
            fetchData();
        }
    }, [accessToken]);



    const fetchConnectedSources = async (programs) => {
        let sources = [];
        for (const programId of programs) {
            const data = await getConnectedSources({ accessToken, programId });
            console.log(data);
            if (data.error && data.error === 'invalid_token') {
                console.error(data.error);
                setIsExpired(true);
                return;
            } else {
                if (data.items && data.items.length > 0) {
                    sources = sources.concat(data.items);
                }
            }
        }
        setSources(sources);
    }


    const columns = [
        { field: "sourceName", headerName: "Source Name", width: 150 },
        { field: "clicks", headerName: "Clicks", width: 150 },
        { field: "sales", headerName: "Sales", width: 150 },
        { field: "conversionRate", headerName: "Conversion Rate", width: 150 },
        { field: "clickThroughRate", headerName: "Click Through Rate", width: 150 },
        { field: "leadRate", headerName: "Lead Rate", width: 150 },
        { field: "earningsPer100Clicks", headerName: "Earnings Per 100 Clicks", width: 150 },
    ]

    return (
        <Card>
        <CardHeader title="Invoices Insight" />
        <CardContent>
            {sources && (
                <Paper sx={{ width: "100%", height: 320 }}>
                    <InvoicePlot invoices={statistics} />
                </Paper>
            )}
            {statistics && (
                <Paper sx={{ height: 600 }}>
                    <Box sx={{ height: "580px", width: "100%" }}>
                        <DataGrid
                            rowHeight={110}
                            rows={statistics.map((item, index) => ({ id: index + 1, ...item }))}
                            columns={columns.map((col) => ({
                                ...col,
                                flex: 1, // Allow flexible sizing based on content
                                minWidth: 100, // Ensure a minimum width to avoid squishing
                            }))}
                            getRowId={(row) => row["id"]}
                            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            slots={{
                                toolbar: GridToolbar,
                            }}
                        />
                    </Box>
                </Paper>
            )}
        </CardContent>
        </Card>
    )

}