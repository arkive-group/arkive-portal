"use client";

import PropTypes from "prop-types";
import { useEffect, useReducer, useCallback, useMemo, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { createVendor } from "@/lib/firebase-db";

// config
import { AUTH, DB, STORAGE } from "@/utils/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { AuthContext } from "./auth-context";

// routes
import { useRouter } from "@/routes/hooks";
import { useSnackbar } from "@/components/snackbar";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [foundUser, setFoundUser] = useState(null);
  const findUserByEmail = async (email) => {
    try {
      const usersCollection = collection(DB, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userData = foundUser || (await findUserByEmail(user.email));
          if (userData) {
            dispatch({
              type: "INITIAL",
              payload: {
                user: userData,
              },
            });

            // create vendor if user is a vendor
            if (userData.company !== null && userData.company !== "") {
              await createVendor({ name: userData.company });
            }
            return;
          }
        } else {
          dispatch({
            type: "INITIAL",
            payload: {
              user: null,
            },
          });
          router.push("/");
        }
      });
    } catch (error) {
      dispatch({
        type: "INITIAL",
        payload: {
          user: null,
        },
      });
      router.push("/");
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN WITH EMAIL AND PASSWORD

  const actionCodeSettings = {
    url: `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    }/auth/finish-login`,
    handleCodeInApp: true,
  };

  const actionCodeSettings2 = {
    url: `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    }`,
    handleCodeInApp: true,
  };

  const login = useCallback(async (email, password) => {
    try {
      await signInWithEmailAndPassword(AUTH, email, password);

      const userData = await findUserByEmail(email);

      dispatch({
        type: "INITIAL",
        payload: {
          user: userData,
        },
      });

      console.log(userData, "userData");

      if (userData) {
        setFoundUser(userData);

        dispatch({
          type: "INITIAL",
          payload: {
            user: userData,
          },
        });
        router.push(paths.home);
      } else {
        router.push(paths.auth.register + `?email=${email}`);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }, []);

  const signup = useCallback(async (data) => {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      enqueueSnackbar(
        "User with this email already exists. Please login or use a different email."
      );
      return null;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        AUTH,
        data.email,
        data.password
      );
      console.log("userCredential", userCredential);
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }

    const usersCollection = collection(DB, "users");
    try {
      var avatarUrl = "";
      if (data.avatar) {
        const avatarRef = ref(
          STORAGE,
          `avatars/${data.avatar.name}_${data.email}`
        );
        await uploadBytes(avatarRef, data.avatar);
        avatarUrl = await getDownloadURL(avatarRef);
      }
      const user = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        company: data.company,
        phoneNumber: data.phoneNumber ?? "",
        avatar: avatarUrl,
      };
      await setDoc(doc(usersCollection), user);

      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.first_name, email: data.email }),
      });

      await sendSignInLinkToEmail(AUTH, user.email, actionCodeSettings2);

      // [ADMIN] Send email to admin about new user
      await fetch("/api/admin/user/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
        }),
      });

      router.push(paths.auth.verify + `?email=${user.email}`);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }, []);

  const updateUser = useCallback(async (data) => {
    // Update the local context
    dispatch({
      type: "INITIAL",
      payload: {
        user: {
          ...state.user,
          ...data,
        },
      },
    });
  }, []);

  const loginWithLink = useCallback(async (email) => {
    try {
      const userData = await findUserByEmail(email);
      if (userData) {
        setFoundUser(userData);
        await sendSignInLinkToEmail(AUTH, email, actionCodeSettings);
        router.push(paths.auth.verify + `?email=${email}`);
      } else {
        router.push(paths.auth.register + `?email=${email}`);
      }
    } catch (error) {
      console.error("Error sending email link:", error);
    }
  }, []);

  const checkLoginLink = useCallback(async (email, password) => {
    try {
      const credentials = await signInWithEmailLink(AUTH, email);
      if (credentials.user.emailVerified) {
        const foundUser = await findUserByEmail(email);
        dispatch({
          type: "INITIAL",
          payload: {
            user: foundUser,
          },
        });
        setFoundUser(foundUser);
      }
      return credentials;
    } catch (error) {
      console.error("Error signing in:", error);
      return null;
    }
  }, []);

  const resetPasswordWithLink = useCallback(async (email) => {
    try {
      const userData = await findUserByEmail(email);
      if (userData) {
        await sendPasswordResetEmail(AUTH, email, {
          url: `${
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
          }/auth/login`, // Redirect to login after reset
          handleCodeInApp: true,
        });

        enqueueSnackbar("Password reset link sent! Check your email.", {
          variant: "success",
        });

        router.push(paths.auth.verify + `?email=${email}&reset=true`);
      } else {
        enqueueSnackbar(
          "No account found with this email. Please register instead.",
          {
            variant: "warning",
          }
        );

        router.push(paths.auth.register + `?email=${email}`);
      }
    } catch (error) {
      console.error("Error sending password reset link:", error);
      enqueueSnackbar("Failed to send password reset email. Try again.", {
        variant: "error",
      });
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
    setFoundUser(null);
    state.user = null;
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "firebase",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      //
      login,
      logout,
      signup,
      loginWithLink,
      checkLoginLink,
      updateUser,
      resetPasswordWithLink,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      signup,
      loginWithLink,
      checkLoginLink,
      updateUser,
      resetPasswordWithLink,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
