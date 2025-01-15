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

import MailIcon from "./icons/MailIcon";
import LinktreeIcon from "./icons/LinktreeIcon";
import ShopIcon from "./icons/ShopIcon";
import TiktokIcon from "@/assets/icons/TiktokIcon";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import GoogleMarketplaceUrl from "../../components/active-channel/icons/google-marketplace.svg";

export function ActiveSalesChannelsSidebar({ activeChannels }) {
  const activeChannelsIcons = {
    TikTok: <TiktokIcon />,
    Inbox: <MailIcon />,
    Linktree: <LinktreeIcon />,
    Shop: <ShopIcon />,
    Facebook: "",
    Instagram: "",
    Google: "",
    Youtube: "",
    "Online Store": null,
  };

  return (
    <Grid item xs={3} style={{ paddingTop: "24px" }}>
      <Card>
        <List style={{ paddingTop: 0, marginBottom: "6px" }}>
          <ListItem style={{ backgroundColor: "#FF5F1F", opacity: "85%" }}>
            <ListItemText
              primary="Active Channels"
              secondary={activeChannels?.name}
              style={{ textAlign: "center", color: "white" }}
            />
          </ListItem>
          <Divider style={{ marginBottom: "8px" }} />
          {Object.keys(activeChannels).map((channel) => {
            const name = activeChannels[channel].name;
            const icon = activeChannelsIcons[name] || "";

            if (name === "Facebook & Instagram") {
              return (
                <>
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
                        <FacebookIcon />
                      </Icon>
                    </ListItemIcon>
                    <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
                      {"Facebook"}
                    </Typography>
                  </ListItem>
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
                        <InstagramIcon />
                      </Icon>
                    </ListItemIcon>
                    <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
                      {"Instagram"}
                    </Typography>
                  </ListItem>
                </>
              );
            } else if (name === "Google & YouTube") {
              return (
                <>
                  <ListItem key={channel} style={{ textAlign: "left" }}>
                    <ListItemIcon sx={{ marginRight: 1 }}>
                      <Icon
                        sx={{
                          width: "2rem",
                          height: "2rem",
                          background: "#efefef",
                          backgroundImage: `url(${GoogleMarketplaceUrl})`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          borderRadius: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          boxShadow: 1,
                        }}
                      />
                    </ListItemIcon>
                    <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
                      {"Google Marketplace"}
                    </Typography>
                  </ListItem>
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
                        <YoutubeIcon />
                      </Icon>
                    </ListItemIcon>
                    <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
                      {"Youtube"}
                    </Typography>
                  </ListItem>
                </>
              );
            } else
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
                  <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
                    {activeChannels[channel].name}
                  </Typography>
                </ListItem>
              );
          })}
        </List>
      </Card>
    </Grid>
  );
}
