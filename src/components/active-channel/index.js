"use client";

import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import { useAuthContext, usePremiumStatus } from "@/auth/hooks";
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
    isPremium: true,
  },
  charity: {
    name: "Charity",
    alias: "Charity",
    icon: undefined,
    isPremium: true,
  },
};

export default function ActiveChannel({ channel, onChannleChange }) {
  const { user } = useAuthContext();
  const { premium } = usePremiumStatus(user);
  return (
    <>
      <Card
        sx={{
          mb: 3,
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Active Channel"
              secondary={Channels[channel].name}
            />
          </ListItem>
          <Divider />
          {Object.keys(Channels).map((key) => {
            const isDisabled = Channels[key].isPremium && !premium.isPremium;
            return (
              <ListItem key={key}>
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
                    {Channels[key].name?.slice(0, 1)}
                  </Icon>
                </ListItemIcon>
                <Button
                  onClick={() => onChannleChange(key)}
                  disabled={isDisabled}
                >
                  {Channels[key].name}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </>
  );
}
