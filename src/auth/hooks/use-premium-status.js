"use client";

import { useState, useEffect } from "react";
import { getPremiumStatus } from "@/auth/utils/stripe";
import { firebaseApp } from "@/utils/firebase-config";

const usePremiumStatus = (user) => {
  const [premium, setIsPremium] = useState({
    isPremium: false,
    commission: 0.3,
    repurposingChannel: false,
    CharityChannel: false,
  });

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = user
        ? await getPremiumStatus(firebaseApp)
        : false;

      if (newPremiumStatus) {
        setIsPremium({
          isPremium: true,
          commission: 0.25,
          repurposingChannel: true,
          CharityChannel: true,
        });
      } else {
        setIsPremium({
          isPremium: false,
          commission: 0.3,
          repurposingChannel: false,
          CharityChannel: false,
        });
      }
    };
    checkPremium();
  }, [user]);

  return { premium };
};

export default usePremiumStatus;
