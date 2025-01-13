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
import RondoUrl from "./icons/rondo.svg";
import ArkiveUrl from "./icons/arkive_transparent.svg";
import BolUrl from "./icons/bol.svg";
import GMUrl from "./icons/google-marketplace.svg";
import FacebookUrl from "./icons/fb.svg"
import InstagramUrl from "./icons/IG.svg";
import TiktokIcon from "./icons/TiktokIcon";
import ArmoedefondsUrl from "./icons/armoedefonds.svg";
import ServeUrl from "./icons/servethecityamsterdam.svg";

export const Channels = {
  shopify: {
    name: "Arkive",
    alias: "Online Store",
    icon: ArkiveUrl,
    url: "https://admin.shopify.com/store/shoparkive",
  },
  bol: {
    name: "Bol.com",
    alias: "Bol.com",
    icon: BolUrl,
    url: "https://www.bol.com/nl/nl/p/arkive-upcycles-natural-handmade-soaps-natural-olive-oil/9300000169592003/",
  },

  google: {
    name: "Google Marketplace",
    alias: "Google & YouTube",
    icon: GMUrl,
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
  tiktok: {
    name: "TikTok",
    alias: "TikTok",
    icon: <TiktokIcon />,
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
    icon: ServeUrl,
    url: "https://www.stcamsterdam.nl/",
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
          {/* Centered "Active Channel" Title */}
          <ListItem sx={{ justifyContent: "center" }}>
            <ListItemText
              primary="Active Channel"
              sx={{ textAlign: "center" }}  // Center align the text
              secondary={Channels[channel]?.name}
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
                      width: "3rem",
                      height: "3rem",
                      background: "#efefef",

                      backgroundImage: `url(${Channels[key].icon})`, // Set the icon as background image
                      backgroundSize: "contain", // Make sure the SVG is contained and scales correctly
                      backgroundPosition: "center", // Center the background image
                      backgroundRepeat: "no-repeat",
                      
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      boxShadow: 1,
                    }}
                  >
                    {/* Commented out duplicate part */}
                    {/* {Channels[key].icon ? (
                      <img
                        src={Channels[key].icon}
                        alt={Channels[key].name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "50%"
                        }}
                      />
                    ) : (
                      Channels[key].name?.slice(0, 1)
                    )} */}
                  </Icon>
                </ListItemIcon>
                
                {/* Left-indented channel names with text aligned to the left */}
                <Button
                  onClick={() => onChannleChange(key)}
                  disabled={isDisabled}
                  fullWidth
                  variant={key === channel ? "contained" : "text"}
                  sx={{
                    pl: 3, 
                    display : 'flex',
                    justifyContent : 'flex-start',
                    textAlign: "left" }}  // Add padding on the left side for indentation
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
