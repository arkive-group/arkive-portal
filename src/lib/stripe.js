"use server";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const createAccount = async (email, country) => {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      country,
      email,
    });

    return account?.id;
  } catch (error) {
    console.log(error);
  }
};

const createLink = async (account) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account, // The connected account's ID
      refresh_url: "http://localhost:3000/payouts/",
      return_url: "http://localhost:3000/payouts/",
      type: "account_onboarding",
    });

    return accountLink.url;
  } catch (error) {
    console.log(error);
  }
};

const initiatePayment = async (amount, currency, connectedAccountId) => {
  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in smallest currency unit (e.g., for $10, send 1000)
      currency, // Example: 'usd'
      payment_method_types: ["card"], // Specify the payment method type
      transfer_data: {
        destination: connectedAccountId, // Connected account that will receive the funds
      },
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.log(error);
  }
};

export { initiatePayment, createAccount, createLink };
