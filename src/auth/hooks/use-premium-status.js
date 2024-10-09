"use client";

import { useState, useEffect } from "react";
import { getPremiumStatus } from "@/auth/utils/stripe";
import { firebaseApp } from "@/utils/firebase-config";

const usePremiumStatus = (user) => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = user
        ? await getPremiumStatus(firebaseApp)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [user]);

  return { isPremium };
};

export default usePremiumStatus;
