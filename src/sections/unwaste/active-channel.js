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

import { useAuthContext } from "@/auth/hooks";



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
                    <ListItemText primary="Active Channel" secondary={channel} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <Icon>sync</Icon>
                    </ListItemIcon>
                    <Button onClick={() => setChannel("shopify")}>Shopify</Button>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Icon>sync</Icon>
                    </ListItemIcon>
                    <Button onClick={() => setChannel("woocommerce")}>WooCommerce</Button>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Icon>sync</Icon>
                    </ListItemIcon>
                    <Button onClick={() => setChannel("bigcommerce")}>BigCommerce</Button>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Icon>sync</Icon>
                    </ListItemIcon>
                    <Button onClick={() => setChannel("magento")}>Magento</Button>
                </ListItem>
            </List>

        </Card>
    </>
    )
}