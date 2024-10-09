import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseApp } from "@/utils/firebase-config";

export const getCheckoutUrl = async () => {
  const auth = getAuth(firebaseApp);
  const userId = auth.currentUser?.uid;

  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(firebaseApp);
  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async () => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  let dataWithUrl;
  try {
    const functions = getFunctions(firebaseApp, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await functionRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });

    dataWithUrl = data;
  } catch (error) {
    console.error(error);
  }

  return new Promise((resolve, reject) => {
    if (dataWithUrl.url) {
      resolve(dataWithUrl.url);
    } else {
      reject(new Error("No url returned"));
    }
  });
};

export const getPremiumStatus = async () => {
  const auth = getAuth(firebaseApp);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(firebaseApp);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");

  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"]),
    where("cancel_at_period_end", "==", false)
  );

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // In this implementation we only expect one active or trialing subscription to exist.
        if (snapshot.docs.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
};
