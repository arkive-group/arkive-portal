"use client";
import { useState, useEffect } from 'react';
import { loginWithCredentials, getOAuthToken, getTradeDoublerDashboard } from '@/lib/tradedoubler';


export function InsightsTD({}) {
    const [dashboard, setDashboard] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {
        loginWithCredentials().then((data) => {
            console.log(data)
            setRefreshToken(data.refresh_token);
            getOAuthToken({ refreshToken: data.refresh_token }).then((data) => {
                console.log(data)
                setAccessToken(data.access_token);
            });
        })
    }, []);

    useEffect(() => {
        if (accessToken) {
            getTradeDoublerDashboard({ accessToken, intervalType: 'TODAY' }).then((data) => {
                console.log(data)
                setDashboard(data);
            })
        }
    }, [accessToken]);

    return (
        <div>
            {dashboard && (
                <div>
                    <h1>TradeDoubler Dashboard</h1>
                    <pre>{JSON.stringify(dashboard, null, 2)}</pre>
                </div>
            )}
        </div>
    )

}