'use client'

import * as Yup from 'yup'
import { useCallback, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
// utils
import { fData } from 'src/utils/format-number'
// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
// assets
import { countries } from 'src/assets/data'
// components
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import { useSnackbar } from 'src/components/snackbar'
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form'
import { useAuthContext } from '@/auth/hooks/use-auth-context'

// ----------------------------------------------------------------------

export default function RegisterView() {
  // const { user: currentUser } = useAuthContext()
  const currentUser = true
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    zipCode: Yup.string().required('Zip code is required'),
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      city: currentUser?.city || '',
      role: currentUser?.role || '',
      email: currentUser?.email || '',
      state: currentUser?.state || '',
      status: currentUser?.status || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      zipCode: currentUser?.zipCode || '',
      company: currentUser?.company || '',
      avatarUrl: currentUser?.avatarUrl || null,
      phoneNumber: currentUser?.phoneNumber || '',
      isVerified: currentUser?.isVerified || true,
    }),
    [currentUser],
  )

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  const onSubmit = handleSubmit(async data => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      reset()
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!')
      router.push(paths.dashboard.user.list)
      console.log('DATA', data)
    } catch (error) {
      console.error(error)
    }
  })

  const handleDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0]

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true })
      }
    },
    [setValue],
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Box sx={{ mb: 5 }}>
          <RHFUploadAvatar
            name="avatarUrl"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.disabled',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          />
        </Box>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField name="name" label="Full Name" />
          <RHFTextField name="email" label="Email Address" />
          <RHFTextField name="phoneNumber" label="Phone Number" />
          <RHFTextField name="company" label="Company" />
          <RHFTextField name="role" label="Role" />
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loading={isSubmitting}
          >
            Sign Up
          </LoadingButton>
        </Box>
      </Card>
    </FormProvider>
  )
}
