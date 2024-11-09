'use client'

import * as Yup from 'yup'
import { useCallback, useMemo, useState } from 'react'
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

import { useSearchParams } from 'src/routes/hooks'

import { useSnackbar } from 'src/components/snackbar'
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form'
import { CardHeader, InputAdornment, IconButton, Iconify } from '@mui/material'

// Firebase
import { useAuthContext } from '@/auth/hooks/use-auth-context'

// ----------------------------------------------------------------------

export default function RegisterView() {
  const { signup } = useAuthContext()

  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const { enqueueSnackbar } = useSnackbar()
  const phoneRegExp = `/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/`
  const emailRegExp = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    phoneNumber: Yup.string().nullable().notRequired().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
    company: Yup.string().required('Company is required'),
    role: Yup.string().required('Role is required'),
    avatar: Yup.mixed().nullable().required('Avatar is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
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
          title="Beauty mastered, now sustainability!"
          subheader="Sign up—join the eco-hero squad."
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
        <Box rowGap={3} mt={3} display="grid">
          <RHFTextField
            name="password"
            label="Password"
            type="password"
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        </Box>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          loading={isSubmitting}
          sx={{ width: '100%', mt: 3 }}
        >
          SIGN UP
        </LoadingButton>
      </Card>
    </FormProvider>
  )
}
