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
          role={'Anti-Waste Trooper'}
          name={user?.email}
          avatarUrl={user?.photoURL}
          coverUrl={user?.coverUrl}
        />
      </Card>
    </Container>
  )
}
