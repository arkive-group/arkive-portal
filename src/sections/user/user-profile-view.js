'use client'

import { useState, useCallback } from 'react'
// @mui
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'

import { useSettingsContext } from 'src/components/settings'

//
import ProfileCover from './profile-cover'
import { useAuthContext } from '@/auth/hooks'

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const settings = useSettingsContext()
  const { user } = useAuthContext()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Card
        sx={{
          mb: 3,
          height: 200,
        }}
      >
        <ProfileCover
          role={user?.role || 'Anti-Waste Trooper'}
          name={user?.first_name + ' ' + user?.last_name}
          avatarUrl={user?.avatar}
          // coverUrl={'/assets/images/temporary-logo.png'}
        />
      </Card>
    </Container>
  )
}
