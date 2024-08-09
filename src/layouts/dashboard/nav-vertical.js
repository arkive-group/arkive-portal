'use client'

import PropTypes from 'prop-types'
import { useEffect } from 'react'
// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
// hooks
import { useResponsive } from 'src/hooks/use-responsive'
// components
import Logo from 'src/components/logo'
import Scrollbar from 'src/components/scrollbar'
import { usePathname, useRouter } from 'src/routes/hooks'
import { NavSectionVertical } from 'src/components/nav-section'
//
import { NAV } from '../config-layout'
import { useNavData } from './config-navigation'
import { NavToggleButton } from '../_common'
import { Button } from '@mui/material'
import { ARKIVE_STORE } from '@/config-global'

// ----------------------------------------------------------------------

export default function NavVertical({ openNav, onCloseNav }) {
  const pathname = usePathname()
  const router = useRouter()
  const lgUp = useResponsive('up', 'lg')

  const navData = useNavData()

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

      <NavSectionVertical data={navData} />

      <Box sx={{ flexGrow: 1 }} />

      <Stack
        sx={{
          px: 2,
          py: 5,
          textAlign: 'center',
        }}
      >
        <Stack alignItems="center">
          <Button
            variant="outlined"
            color="error"
            onClick={() => router.push(ARKIVE_STORE)}
            sx={{
              fontSize: 16,
            }}
          >
            Exit Arkive Portal
          </Button>
        </Stack>
      </Stack>
    </Scrollbar>
  )

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: theme => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}

NavVertical.propTypes = {
  onCloseNav: PropTypes.func,
  openNav: PropTypes.bool,
}
