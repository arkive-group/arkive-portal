"use client";

import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";

// routes
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

// Auth
import { useAuthContext } from "@/auth/hooks";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const router = useRouter();

  const { authenticated, method } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      router.push(paths.auth.login);
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
