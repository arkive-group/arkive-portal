"use client";

import { Button, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import { useAuthContext, usePremiumStatus } from "@/auth/hooks";
import RondoUrl from "./icons/rondo.svg";
import ArkiveUrl from "./icons/arkive_transparent.svg";
import GoogleMarketplaceUrl from "./icons/google-marketplace.svg";
import FacebookUrl from "./icons/fb.svg"
import InstagramUrl from "./icons/IG.svg";
import TiktokUrl from "./icons/tiktok-icon.svg";
import ArmoedefondsUrl from "./icons/armoedefonds.svg";
import ServeTheCityUrl from "./icons/servethecityamsterdam.svg";
import YoutubeUrl from "./icons/youtube.svg";
import KauflandIcon from "@/sections/home/icons/KauflandIcon";
import OnlineShopurl from "./icons/shopping-cart-02-svgrepo-com.svg"

// @TODO: This component and ActiveSalesChannelsSidebar need to be rewritten
// and combined. There has to be one approach to icons and this component should have 
// a conditional button render option
// Getting data in ActiveSalesChannelsSidebar was a requirement however I don't see how that is necessary
// since it is all mostly hard-coded, so it would simplify things to keep it as a list in the code or to 
// solely rely on the API data (which is incomplete from the endpoint fetching active sales channels)
// Don't know what needs to happen to Kaufland and TD buttons, I assume to be able to filter on it if they are active

export const Channels = {
  shopify: {
    name: "Arkive",
    alias: "Online Store",
    icon: ArkiveUrl,
    url: "https://admin.shopify.com/store/shoparkive",
  },
  facebook: {
    name: "Facebook",
    alias: "Facebook",
    icon: FacebookUrl,
    url: "https://www.facebook.com/Arkiveshop/",
  },
  instagram: {
    name: "Instagram",
    alias: "Instagram",
    icon: InstagramUrl,
    url: "https://www.instagram.com/arkiveshop/",
  },
  google: {
    name: "Google Shopping",
    alias: "Google & YouTube",
    icon: GoogleMarketplaceUrl,
  },
  youtube: {
    name: "Youtube",
    alias: "YouTube",
    icon: YoutubeUrl,
    url: "https://www.youtube.com/@arkiveshop",
  },
  shop: {
    name: "Shop",
    alias: "Shop",
    icon: OnlineShopurl,
  },
  tiktok: {
    name: "TikTok",
    alias: "TikTok",
    icon: TiktokUrl,
    url: "https://www.tiktok.com/@arkiveshop",
  },
  repurposing: {
    name: "Rondo",
    alias: "Rondo",
    icon: RondoUrl,
    isPremium: true,
  },
  armoedefonds: {
    name: "Armoedefonds",
    alias: "Armoedefonds",
    icon: ArmoedefondsUrl,
    url: "https://www.armoedefonds.nl/",
  },
  serveTheCity: {
    name: "Serve The City",
    alias: "serveTheCity",
    icon: ServeTheCityUrl,
    url: "https://www.stcamsterdam.nl/",
  },
};

export default function ActiveChannel({ channel, onChannleChange }) {
  // @ts-ignore
  const { user } = useAuthContext();
  const { premium } = usePremiumStatus(user);

  return (
    <Grid item xs={12} style={{ paddingTop: "24px", marginLeft: '16px' }}>
      <Card>
        <List style={{ paddingTop: 0, marginBottom: "6px" }}>
          <ListItem style={{ backgroundColor: "#FF5F1F", opacity: "85%" }}>
            <ListItemText
              primary="Active Channels"
              style={{ textAlign: "center", color: "white" }}
              secondary={Channels[channel]?.name}
            />
          </ListItem>
          <Divider style={{ marginBottom: "8px" }} />
          {Object.keys(Channels).map((key) => {
            const isDisabled = Channels[key].isPremium && !premium.isPremium;

            return (
              <ListItem key={key} style={{ textAlign: "left" }}>
                <ListItemIcon sx={{ marginRight: 1 }}>
                  <Icon
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      background: "#efefef",
                      backgroundImage: `url(${Channels[key].icon})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  />
                </ListItemIcon>
                <Button
                  onClick={() => onChannleChange(key)}
                  disabled={isDisabled}
                  fullWidth
                  variant={key === channel ? "contained" : "text"}
                  sx={{
                    pl: -4,
                    display: "flex",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
                    {Channels[key].name}
                  </Typography>
                </Button>
              </ListItem>
            );
          })}
          <>
          <ListItem key={"HerculesApps Kaufland"} style={{ textAlign: "left" }}>
            <ListItemIcon sx={{ marginRight: 2 }}>
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
                }}>

                  <KauflandIcon />
                </Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.2, color: "black" }} fontSize={"0.875rem"}>
              {"Kaufland"}
            </Typography>
          </ListItem>
          <ListItem key={"Tradedoubler"} style={{ textAlign: "left" }}>
            <ListItemIcon sx={{ marginRight: 2 }}>
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
                }}>

                  <Typography sx={{ color: "#2B73FF"}}>TD</Typography>
                </Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.2, color: "black" }} fontSize={"0.875rem"}>
              {"Tradedoubler"}
            </Typography>
          </ListItem>
          </>
        </List>
      </Card>
    </Grid>
  );
}
