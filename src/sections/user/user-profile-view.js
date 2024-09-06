'use client'

// @mui
import Card from '@mui/material/Card'

//
import ProfileCover from './profile-cover'
import { useAuthContext } from '@/auth/hooks'

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const { user } = useAuthContext()

  return (
    <>
      <Card
        sx={{
          height: { xs: 220, md: 180 },
          mb: 3,
        }}
      >
        <ProfileCover
          role={user?.role || 'Anti-Waste Trooper'}
          name={user?.first_name + ' ' + user?.last_name}
          avatarUrl={user?.avatar}
        />
      </Card>

      {/* <Typography variant="h6" ml={3} py={3}>
        Welcome back, you beautiful anti-waste trooper !!
      </Typography> */}
    </>
  )
}
