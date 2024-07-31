'use client'

// @mui
import { alpha, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

// hooks
import { useResponsive } from 'src/hooks/use-responsive'
// theme
import { bgGradient } from 'src/theme/css'
// components
import Logo from 'src/components/logo'
import { Link, Typography } from '@mui/material'
import Image from '@/components/image/image'
import { paths } from '@/routes/paths'

// ----------------------------------------------------------------------

export default function AuthLayout({ children, image, title }) {
  const theme = useTheme()

  const mdUp = useResponsive('up', 'md')

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  )

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  )

  const renderSection = (
    <Image
      alt="auth"
      src="/assets/images/auth-illustration.png"
      sx={{
        objectFit: 'cover',
        width: '50%',
      }}
    />
  )

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {renderLogo}

      {renderContent}

      {mdUp && renderSection}
    </Stack>
  )
}
