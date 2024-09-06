'use client'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
import { RouterLink } from 'src/routes/components'
// auth
import { useAuthContext } from 'src/auth/hooks'
// assets
import { PasswordIcon } from 'src/assets/icons'
// components
import Iconify from 'src/components/iconify'
import FormProvider, { RHFTextField } from 'src/components/hook-form'

// ----------------------------------------------------------------------

export default function FinishLogiView() {
  const { checkLoginLink } = useAuthContext()

  const router = useRouter()

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
  })

  const defaultValues = {
    email: '',
  }

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async data => {
    try {
      await checkLoginLink(data.email)

      router.push(paths.home)
    } catch (error) {
      console.error(error)
    }
  })

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting}
      >
        LOG IN
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="primary"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  )

  const renderHead = (
    <Stack direction="column" alignItems="center" mt={3}>
      <PasswordIcon sx={{ height: 80 }} />

      <Stack
        spacing={1}
        sx={{ my: 5, textAlign: 'center' }}
        direction="column"
        alignItems="center"
      >
        <Typography variant="h4">There you are! Let’s get started</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Type in your email to access your account and drive sustainability
          forward!
        </Typography>
      </Stack>
    </Stack>
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  )
}
