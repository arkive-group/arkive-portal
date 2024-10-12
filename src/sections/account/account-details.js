"use client";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "src/components/snackbar";
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from "src/components/hook-form";
import * as Yup from "yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext, usePremiumStatus } from "@/auth/hooks";
// utils
import { fData } from "src/utils/format-number";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { collection, doc, setDoc } from "firebase/firestore";
import { DB, STORAGE } from "@/utils/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AccountGeneralSettings = () => {
  const { user, updateUser } = useAuthContext();
  const { isPremium } = usePremiumStatus(user);
  const { enqueueSnackbar } = useSnackbar();

  const userSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phoneNumber: Yup.string().required("Phone number is required"),
    company: Yup.string().required("Company is required"),
    role: Yup.string().required("Role is required"),
    avatar: Yup.mixed().nullable().required("Avatar is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State/Region is required"),
    city: Yup.string().required("City is required"),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      role: user?.role ?? "",
      email: user?.email ?? "",
      company: user?.company ?? "",
      avatar: user?.avatar ?? null,
      phoneNumber: user?.phoneNumber ?? "",
      country: user?.country ?? "",
      state: user?.state ?? "",
      city: user?.city ?? "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const user = await signup(data);
  //     reset();
  //     enqueueSnackbar(
  //       user ? "Signup successful! - Please verify email" : "Signup Error...!"
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userId = user?.id; // Assuming you have the user's ID stored in `user`

      if (!userId) {
        enqueueSnackbar("User ID is missing.", { variant: "error" });
        return;
      }

      // Check if avatar is a file and needs to be uploaded
      if (data.avatar instanceof File) {
        const avatarRef = ref(
          STORAGE,
          `avatars/${data.avatar.name}_${data.email}`
        );

        // Upload the avatar file to Firebase Storage
        await uploadBytes(avatarRef, data.avatar);

        // Get the avatar URL after uploading
        const avatarUrl = await getDownloadURL(avatarRef);
        data.avatar = avatarUrl;
      }
      // If avatar is already a string (URL), just keep it as is
      // No changes needed in this case

      // Define user data to update in Firestore
      const userData = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        company: data.company,
        phoneNumber: data.phoneNumber,
        avatar: data.avatar, // Can be URL or newly uploaded file URL
        country: data.country,
        state: data.state,
        city: data.city,
      };

      const usersCollection = collection(DB, "users");
      // Get reference to the user's document and update it
      const userDocRef = doc(usersCollection, userId);
      await setDoc(userDocRef, userData, { merge: true }); // Merge to avoid overwriting
      await updateUser({ ...userData, id: user?.id });
      enqueueSnackbar("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      enqueueSnackbar("Error updating user data.", { variant: "error" });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} mt={1}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <RHFUploadAvatar
                  name="avatar"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        // mt: 3,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.disabled",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Typography
                color="textSecondary"
                variant="body2"
                textAlign="center"
              >
                Your plan:
                <Link
                  href={isPremium ? "/settings/payouts" : "/settings/billing"}
                >
                  {isPremium ? "Eco Master Plan" : "Eco Starter Plan"}
                </Link>
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item lg={8} md={6} xl={9} xs={12}>
          <Card>
            <CardHeader title="Basic Details" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="first_name" label="First Name" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="last_name" label="Last Name" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="email" label="Email Address" disabled />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="phoneNumber" label="Phone Number" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="company" label="Company" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="role" label="Role" disabled />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="country" label="Country" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <RHFTextField name="state" label="State/Region" />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name="city" label="City" />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default AccountGeneralSettings;
