"use client";
import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import AuthGuard from "@/auth/auth-guard";
import axios from "axios";
import { useRouter } from "@/routes/hooks";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { initiatePayment, createAccount, createLink } from "@/lib/stripe";

const stripePromise = loadStripe(
  "pk_test_51Q5oAG00VZv2gWeyZlHjxx88JCRQEV80F0MliimfIcqt5aPv20y7onQZBlvdhmgSwFe9lju1ae2HFQL73TGTaoxn00RfDeFDOm"
);

const Page = () => {
  const router = useRouter();

  const onCreate = async () => {
    const account = await createAccount("ashrajpoot6562@gmail.com", "US");

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

        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </DashboardLayout>
    </AuthGuard>
  );
};

export default Page;

function CheckoutForm({ connectedAccountId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    // Step 1: Create payment intent (customer pays platform)

    const paymentResponse = await initiatePayment(
      1000,
      "usd",
      "acct_1Q835y06yWQysZHe"
    );
    // const paymentResponse = await fetch("/api/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     amount: 1000, // Example amount ($10 in smallest unit)
    //     currency: "usd",
    //   }),
    // });

    console.log(paymentResponse, "paymentResponse");
    const clientSecret = paymentResponse;

    // // Step 2: Confirm payment with Stripe
    // const { error, paymentIntent } = await stripe.confirmCardPayment(
    //   clientSecret,
    //   {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   }
    // );

    // if (error) {
    //   console.error(error.message);
    // } else if (paymentIntent.status === "succeeded") {
    //   // Payment successful, now transfer funds to the connected account
    //   await fetch("/api/transfer-funds", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       amount: 1000, // Example transfer amount ($10)
    //       connectedAccountId, // The connected account receiving the funds
    //     }),
    //   });

    //   // Redirect to a success page
    //   router.push("/payment-success");
    // }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
