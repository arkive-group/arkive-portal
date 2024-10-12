"use client";
import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import AuthGuard from "@/auth/auth-guard";
import axios from "axios";
import { useRouter } from "@/routes/hooks";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createAccount, createLink } from "@/lib/stripe";
import { useAuthContext } from "@/auth/hooks";
import { useSnackbar } from "src/components/snackbar";

const Page = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const onCreate = async () => {
    const account = await createAccount(
      "ashrajpoot6562@gmail.com",
      "US",
      user?.id
    );
    if (account) {
      const link = await createLink(account);

      router.push(link);
    }
  };

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <AuthGuard>
      <DashboardLayout>
        <div>
          <button onClick={onCreate}>Create Connected Account</button>
        </div>

        <CheckoutForm />
      </DashboardLayout>
    </AuthGuard>
  );
};

export default Page;

function CheckoutForm({ connectedAccountId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) return;

  //   setIsProcessing(true);

  //   // Step 1: Create payment intent (customer pays platform)

  //   const paymentResponse = await initiatePayment(
  //     1000,
  //     "usd",
  //     "acct_1Q90joP7c6SSdEIr"
  //   );

  //   console.log(paymentResponse, "paymentResponse");
  //   const clientSecret = paymentResponse;

  //   // Step 2: Confirm payment with Stripe
  //   const { error, paymentIntent } = await stripe.confirmCardPayment(
  //     clientSecret,
  //     {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     }
  //   );

  //   if (error) {
  //     console.error(error.message);
  //   } else if (paymentIntent.status === "succeeded") {
  //     const transfer = await stripe.transfers.create({
  //       amount: 1000, // Amount to transfer (in smallest currency unit, e.g., cents for USD)
  //       currency: "usd", // Adjust to your supported currency
  //       destination: "acct_1Q90joP7c6SSdEIr", // Connected account to receive the funds
  //     });

  //     console.log(transfer);

  //     // Payment successful, now transfer funds to the connected account
  //     // await fetch("/api/transfer-funds", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify({
  //     //     amount: 1000, // Example transfer amount ($10)
  //     //     connectedAccountId, // The connected account receiving the funds
  //     //   }),
  //     // });
  //     // Redirect to a success page
  //     // router.push("/payment-success");
  //     console.log("hello");
  //   }

  //   setIsProcessing(false);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    await axios.post("/api/payout-email", {
      name: `${user?.first_name} ${user?.last_name}`,
      email: "ahsanmansoor7572@gmail.com",
      amount: 1000,
      clientEmail: "test@test.com",
      accountId: user?.accountId,
    });

    enqueueSnackbar("Requested Generated Succussfully");

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
