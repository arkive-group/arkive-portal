"use server";
import Stripe from "stripe";
import { DB } from "@/utils/firebase-config";
import { collection, doc, setDoc } from "firebase/firestore";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const createAccount = async (email, country, userId) => {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      country,
      email,
    });

    const usersCollection = collection(DB, "users");
    // Get reference to the user's document and update it
    const userDocRef = doc(usersCollection, userId);

    await setDoc(
      userDocRef,
      {
        accountId: account?.id, // Assuming `account.id` is the account ID
      },
      { merge: true }
    );

    return account?.id;
  } catch (error) {
    console.log(error);
  }
};

const createLink = async (account) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account, // The connected account's ID
      refresh_url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/settings/payouts/`,
      return_url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/settings/payouts/`,
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
      on_behalf_of: connectedAccountId,
      transfer_data: {
        destination: connectedAccountId, // Connected account that will receive the funds
      },
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.log(error);
  }
};

const accountStatus = async (connectedAccountId) => {
  try {
    // Retrieve the connected account information
    const account = await stripe.accounts.retrieve(connectedAccountId);
    // Check if the account is enabled for charges and payouts
    if (account.charges_enabled && account.payouts_enabled) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while checking the connected account status.",
    };
  }
};

export { initiatePayment, createAccount, createLink, accountStatus };
