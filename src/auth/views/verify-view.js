'use client'

// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// routes
import { paths } from 'src/routes/paths'
import { useSearchParams } from 'src/routes/hooks'
import { RouterLink } from 'src/routes/components'
// assets
import { EmailInboxIcon } from 'src/assets/icons'
// components
import Iconify from 'src/components/iconify'

// ----------------------------------------------------------------------

export default function VerifyView() {
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const renderHead = (
    <Stack direction="column" alignItems="center">
      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" sx={{ mb: 1 }}>
        Please check your email!
      </Typography>

      <Stack
        spacing={1}
        sx={{ color: 'text.secondary', typography: 'body2', mb: 5 }}
      >
        <Box component="span"> We have sent a confirmation link to</Box>
        <Box component="strong" sx={{ color: 'text.primary' }}>
          {email}
        </Box>
      </Stack>
    </Stack>
  )

  return (
    <>
      {renderHead}

      <Button
        component={RouterLink}
        href={paths.auth.login}
        size="large"
        color="primary"
        variant="contained"
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        sx={{ alignSelf: 'center' }}
      >
        Return to sign in
      </Button>
    </>
  )
}
