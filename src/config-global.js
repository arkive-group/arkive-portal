// routes
import { paths } from "src/routes/paths";

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.home;
export const ARKIVE_STORE = "https://arkivegroup.com/";

export const FIREBASE_API = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

export const ARKIVE_API = {
  BASE_URL: process.env.NEXT_PUBLIC_ARIVE_API_URL,
};

export const SHOPIFY_API = {
  apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
  apiSecretKey: process.env.NEXT_PUBLIC_SHOPIFY_API_SECRET_KEY,
  accessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
  shop: process.env.NEXT_PUBLIC_SHOPIFY_SHOP,
};
