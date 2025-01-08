"use client";
import {
  Grid,
  Typography,
  Card,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
} from "@mui/material";

import TiktokIcon from "./icons/TiktokIcon";
import MailIcon from "./icons/MailIcon";
import LinktreeIcon from "./icons/LinktreeIcon";
import ShopIcon from "./icons/ShopIcon";

export function ActiveSalesChannelsSidebar({ activeChannels }) {
  const activeChannelsIcons = {
    TikTok: <TiktokIcon />,
    Inbox: <MailIcon />,
    Linktree: <LinktreeIcon />,
    Shop: <ShopIcon />,
    "Online Store": null,
    "Facebook & Instagram": null,
  };

  return (
    <Grid item xs={3} style={{ paddingTop: "24px" }}>
      <Card>
        <List style={{ paddingTop: 0, marginBottom: '6px' }}>
          <ListItem style={{ backgroundColor: "#FF5F1F", opacity: "85%" }}>
            <ListItemText
              primary="Active Channels"
              secondary={activeChannels?.name}
              style={{ textAlign: "center", color: "white" }}
            />
          </ListItem>
          <Divider style={{marginBottom: '8px'}} />
          {Object.keys(activeChannels).map((channel) => {
            const name = activeChannels[channel].name;
            const icon = activeChannelsIcons[name] || "";
            return (
              <ListItem key={channel} style={{ textAlign: "left" }}>
                <ListItemIcon sx={{ marginRight: 1 }}>
                  <Icon
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      background: "#efefef",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    {icon}
                  </Icon>
                </ListItemIcon>
                <Typography style={{opacity: 0.75}} fontSize={'0.875rem'}>{activeChannels[channel].name}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Grid>
  );
}
