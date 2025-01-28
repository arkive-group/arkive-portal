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
import ArkiveUrl from "../../components/active-channel/icons/arkive_transparent.svg";
import OnlineShopurl from "./icons/shopping-cart-02-svgrepo-com.svg"
import KauflandImage from "@/components/active-channel/icons/kaufland-image";
import KauflandIcon from "./icons/KauflandIcon";
import RondoUrl from "../../components/active-channel/icons/rondo.svg";
import ArmoedefondsUrl from "../../components/active-channel/icons/armoedefonds.svg";
import ServeTheCityUrl from "../../components/active-channel/icons/servethecityamsterdam.svg";


export function ActiveSalesChannelsSidebar({ activeChannels }) {
  const activeChannelsIcons = {
    TikTok: <TiktokIcon />,
    Inbox: <MailIcon />,
    Linktree: <LinktreeIcon />,
    Shop: <ShopIcon />,
    "Kaufland": <KauflandImage />,
  };

  return (
    <Grid item xs={3} style={{ paddingTop: "24px" }}>
      <Card>
        <List style={{ paddingTop: 0, marginBottom: "6px" }}>
          <ListItem style={{ backgroundColor: "#FF5F1F", opacity: "85%" }}>
            <ListItemText
              primary="Active Channels"
              style={{ textAlign: "center", color: "white" }}
              secondary={activeChannels?.name}
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
                    <ListItemIcon sx={{ marginRight: 2 }}>
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
                      {"Google Shopping"}
                    </Typography>
                  </ListItem>
                  <ListItem key={channel} style={{ textAlign: "left" }}>
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
            } else if (name === "Online Store") {
              return (
                <ListItem key={channel} style={{ textAlign: "left" }}>
                  <ListItemIcon sx={{ marginRight: 2 }}>
                    <Icon
                      sx={{
                        width: "2rem",
                        height: "2rem",
                        background: "#efefef",
                        backgroundImage: `url(${ArkiveUrl})`,
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
                    {"Arkive"}
                  </Typography>
                </ListItem>
              );
            } else if (name === "Shop") {
              return (
                <ListItem key={channel} style={{ textAlign: "left" }}>
                  <ListItemIcon sx={{ marginRight: 2 }}>
                    <Icon
                      sx={{
                        width: "2rem",
                        height: "2rem",
                        background: "#efefef",
                        backgroundImage: `url(${OnlineShopurl})`,
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
                    {"Shop"}
                  </Typography>
                </ListItem>
              );
            } else if (name === "Linktree" || "Inbox") {
              return <></>;
            } else
              return (
                <>
                  <ListItem key={channel} style={{ textAlign: "left" }}>
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
                        }}
                      >
                        {icon}
                      </Icon>
                    </ListItemIcon>
                    <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
                      {activeChannels[channel].name}
                    </Typography>
                  </ListItem>
                </>
              );
          })}
          <ListItem key={"TikTok"} style={{ textAlign: "left" }}>
            <ListItemIcon sx={{ marginRight: 2 }}>
              <Icon
                sx={{
                  width: "2rem",
                  height: "2rem",
                  background: "#efefef",
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
              >
                <TiktokIcon />
              </Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
              {"TikTok"}
            </Typography>
          </ListItem>
          <ListItem key={"Rondo"} style={{ textAlign: "left" }}>
            <ListItemIcon sx={{ marginRight: 2 }}>
              <Icon
                sx={{
                    width: "2rem",
                    height: "2rem",
                    background: "#efefef",
                    backgroundImage: `url(${RondoUrl})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    boxShadow: 1,
                }}>
                </Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
              {"Rondo"}
            </Typography>
          </ListItem>
          <ListItem key={"Armoedefonds"} style={{ textAlign: "left" }}>
            <ListItemIcon sx={{ marginRight: 2 }}>
              <Icon
                sx={{
                  width: "2rem",
                  height: "2rem",
                  background: "#efefef",
                  backgroundImage: `url(${ArmoedefondsUrl})`,
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
              ></Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
              {"Armoedefonds"}
            </Typography>
          </ListItem>
          <ListItem key={"ServeTheCityUrl"} style={{ textAlign: "left" }}>
            <ListItemIcon sx={{ marginRight: 2 }}>
              <Icon
                sx={{
                  width: "2rem",
                  height: "2rem",
                  background: "#efefef",
                  backgroundImage: `url(${ServeTheCityUrl})`,
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
              ></Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
              {"Serve The City"}
            </Typography>
          </ListItem>
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
                }}
              >
                <KauflandIcon />
              </Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
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
                }}
              >
                <Typography sx={{ color: "#2B73FF" }}>TD</Typography>
              </Icon>
            </ListItemIcon>
            <Typography style={{ opacity: 0.75 }} fontSize={"0.875rem"}>
              {"Tradedoubler"}
            </Typography>
          </ListItem>

          
        </List>
      </Card>
    </Grid>
  );
}
