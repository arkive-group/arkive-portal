"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  List,
  ListItem,
  Typography,
  Checkbox,
} from "@mui/material";
import PropTypes from "prop-types";
import { getCheckoutUrl, getPortalUrl } from "@/auth/utils/stripe";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import { useAuthContext, usePremiumStatus } from "@/auth/hooks";

const PricingCard = ({ plan }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthContext();
  const { isPremium } = usePremiumStatus(user);

  const router = useRouter();

  const { title, description, price, features, variant, isFree } = plan;

  const onCheckoutSession = async () => {
    setIsSubmitting(true);

    try {
      const checkoutUrl = await getCheckoutUrl();
      if (checkoutUrl) {
        setIsSubmitting(false);
        router.push(checkoutUrl);
      }
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
    }
  };

  const onCancleSubscription = async () => {
    setIsSubmitting(true);

    try {
      const porttalUrl = await getPortalUrl();
      if (porttalUrl) {
        setIsSubmitting(false);
        router.push(porttalUrl);
      }
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      variant={variant}
      sx={{
        padding: 3,
        paddingTop: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: variant === "contained" ? "primary.main" : "white",
        color: variant === "contained" ? "white" : "black",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 1 }}>
        {description}
      </Typography>
      <Typography variant="h1" align="center" sx={{ mb: 2 }}>
        {price}
      </Typography>
      <Divider />
      <List sx={{ paddingY: 2 }}>
        {features.map((feature, index) => (
          <ListItem
            key={index}
            sx={{ py: "0px", display: "flex", alignItems: "center" }}
          >
            <Checkbox
              size="small"
              sx={{
                color: variant === "contained" ? "white" : "primary.main",
                "&.Mui-checked": {
                  color: variant === "contained" ? "white" : "primary.main",
                },
                "& .MuiSvgIcon-root": {
                  borderRadius: "50%",
                  backgroundColor:
                    variant === "contained" ? "primary.main" : "transparent",
                },
                "&:hover": {
                  backgroundColor:
                    variant === "contained"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(3, 46, 238, 0.08)",
                },
              }}
              checked
            />
            <Typography sx={{ ml: 0.5 }}>{feature}</Typography>{" "}
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <LoadingButton
          sx={{
            bgcolor: variant === "contained" ? "white" : "transparent",
            color: "primary.main",
            borderRadius: "20px",
            minHeight: "48px",
            "&:hover": {
              bgcolor:
                variant === "contained"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(3, 46, 238, 0.2)",
              boxShadow: 3,
            },
          }}
          onClick={isPremium ? onCancleSubscription : onCheckoutSession}
          fullWidth
          variant={variant === "contained" ? "contained" : "outlined"}
          size="large"
          type="submit"
          color="primary"
          loading={isSubmitting}
          disabled={isFree}
        >
          {isFree ? "Free Tier" : isPremium ? "Manage Plan" : "Buy Now"}
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

PricingCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  links: PropTypes.array,
  price: PropTypes.number,
  variant: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  isFree: PropTypes.bool,
};

export default PricingCard;
