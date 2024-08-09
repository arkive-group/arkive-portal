'use client'

import * as Yup from 'yup'
import { useCallback, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// utils
import { fData } from 'src/utils/format-number'
// routes

import { useRouter, useSearchParams } from 'src/routes/hooks'

import { useSnackbar } from 'src/components/snackbar'
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form'
import { CardHeader } from '@mui/material'

// Firebase
import { useAuthContext } from '@/auth/hooks/use-auth-context'

// ----------------------------------------------------------------------

export default function RegisterView() {
  const { signup } = useAuthContext()

  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    company: Yup.string().required('Company is required'),
    role: Yup.string().required('Role is required'),
    avatar: Yup.mixed().nullable().required('Avatar is required'),
  })

  const defaultValues = useMemo(
    () => ({
      first_name: '',
      last_name: '',
      role: '',
      email: email || '',
      company: '',
      avatar: null,
      phoneNumber: '',
    }),
    [],
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
      const user = await signup(data)
      reset()
      enqueueSnackbar(
        user ? 'Signup successful! - Please verify email' : 'Signup Error...!',
      )
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
        setValue('avatar', newFile, { shouldValidate: true })
      }
    },
    [setValue],
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <CardHeader
          title="Join The Arkive Portal"
          subheader="Take part in our anti-waste mission"
          sx={{ mb: 3, p: 0 }}
        />
        <Box sx={{ mb: 5 }}>
          <RHFUploadAvatar
            name="avatar"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  // mt: 3,
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
          <RHFTextField name="first_name" label="First Name" />
          <RHFTextField name="last_name" label="Last Name" />
          <RHFTextField name="email" label="Email Address" />
          <RHFTextField name="phoneNumber" label="Phone Number" />
          <RHFTextField name="company" label="Company" />
          <RHFTextField name="role" label="Role" />
        </Box>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          loading={isSubmitting}
          sx={{ width: '100%', mt: 3 }}
        >
          Sign Up
        </LoadingButton>
      </Card>
    </FormProvider>
  )
}
