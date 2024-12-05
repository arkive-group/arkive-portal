"use client";
import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';


export function InvoicePlot({ invoices }) {
    return (
        <LineChart
            height={300}
            series={[
                { data: invoices.map((invoice) => invoice.clicks), type: 'line', label: 'Clicks', showMark: false, yAxisId: 'clicks' },
                { data: invoices.map((invoice) => invoice.orderValue), type: 'line', label: 'Total sales', showMark: false, yAxisId: 'sales' },
                // { data: invoices.map((invoice) => invoice.sales), type: 'line', label: 'Sales', showMark: false },
            ]}
            xAxis={[{ scaleType: 'point', data: invoices.map((invoice) => invoice.sourceName) }]}
            yAxis={[
                { id: 'clicks' },
                { id: 'sales', min: 0, max: 100 },
            ]}
            rightAxis='sales'
            // xAxis={[{
            //     scaleType: 'time',
            //     data: invoices.map((invoice) => new Date(invoice.date)),
            //     valueFormatter: (value) => value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate(),
            // }]}
        />
    );
}