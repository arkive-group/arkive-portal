'use client'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

// @mui
import LoadingButton from '@mui/lab/LoadingButton'
// import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'

// auth
import { useAuthContext } from '@/auth/hooks/use-auth-context'
// components
import Iconify from 'src/components/iconify'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import { useBoolean } from '@/hooks/use-boolean'
import { InputAdornment, Link } from '@mui/material'
import { RouterLink } from '@/routes/components'

// ----------------------------------------------------------------------

export default function LoginView() {
  const { loginWithLink } = useAuthContext()

  const router = useRouter()

  const [errorMsg, setErrorMsg] = useState('')
  const password = useBoolean()

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    // password: Yup.string().required('Password is required'),
  })

  const defaultValues = {
    email: '',
    // password: '',
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async data => {
    try {
      await loginWithLink?.(data.email)
    } catch (error) {
      console.error(error)
      reset()
      setErrorMsg(typeof error === 'string' ? error : error.message)
    }
  })

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h4">Welcome, you beautiful</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">First time here?</Typography>

        <Link
          component={RouterLink}
          href={paths.auth.register}
          // href="#"
          variant="subtitle2"
        >
          Sign Up
        </Link>
      </Stack>
    </Stack>
  )

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      {/* <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      /> */}

      {/* <Link
        component={RouterLink}
        href="#"
        // href={paths.auth.resetPassword}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link> */}

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        LOG IN
      </LoadingButton>
    </Stack>
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  )
}
