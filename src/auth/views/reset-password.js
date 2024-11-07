"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { InputAdornment, Link, Box, Button } from "@mui/material";

// auth
import { useAuthContext } from "@/auth/hooks/use-auth-context";

// components
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { enqueueSnackbar } from "notistack";
import Iconify from "src/components/iconify";
import { paths } from "src/routes/paths";
import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

export default function PasswordResetView() {
  const { resetPasswordWithLink } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const ResetSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(ResetSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPasswordWithLink?.(data.email);
      setSuccessMsg("Password reset link has been sent to your email.");
      setErrorMsg("");
      reset();
    } catch (error) {
      console.error(error);
      setSuccessMsg("");
      setErrorMsg(error.message || "Failed to send reset email.");
    }
  });

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h4">Reset Your Password</Typography>
      <Typography variant="body2">
        Enter your email to receive a password reset link.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Send Reset Link
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.login}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: "flex-end" }}
      >
        Back to Login
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
