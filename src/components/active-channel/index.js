'use client'
import { useState, useEffect } from "react";

import { Button, Paper } from "@mui/material"
import Card from '@mui/material/Card'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import SvgIcon from "@mui/material";

import { useAuthContext } from "@/auth/hooks";

export const Channels = {
    shopify: {
        name: "Shopify",
        alias: "Online Store",
        icon: undefined,
    },
    bol: {
        name: "Bol.com",
        alias: "Bol.com",
        icon: undefined,
    },
    
    google: {
        name: "Google Marketplace",
        alias: "Google & YouTube",
        icon: undefined,
    },
    facebook: {
        name: "Facebook & Instagram",
        alias: "Facebook & Instagram",
        icon: undefined,
    },
    tiktok: {
        name: "TikTok",
        alias: "TikTok",
        icon: undefined,
    },
    repurposing: {
        name: "Repurposing",
        alias: "Repurposing",
        icon: undefined,
    },
    charity: {
        name: "Charity",
        alias: "Charity",
        icon: undefined,
    },
}

export default function ActiveChannel({
    channel, setChannel
}) {
    return (
    <>
        <Card
            sx={{
            mb: 3,
            }}
        >
            <List>
                <ListItem>
                    <ListItemText primary="Active Channel" secondary={Channels[channel].name} />
                </ListItem>
                <Divider />
                {Object.keys(Channels).map((key) => (
                    <ListItem>
                        <ListItemIcon>
                            <Icon>
                                temp
                            </Icon>
                        </ListItemIcon>
                        <Button onClick={() => setChannel(key)}>{Channels[key].name}</Button>
                    </ListItem>
                ))}
            </List>

        </Card>
    </>
    )
}