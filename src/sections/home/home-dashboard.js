'use client'

import { useAuthContext } from '@/auth/hooks'
import { Card } from '@mui/material'
import EmptyContent from '@/components/empty-content'

export default function HomeDashboard() {
  const { user } = useAuthContext()

  return (
    <Card sx={{ p: 3 }}>
      {user?.dashboard ? (
        <iframe
          width="100%"
          height="450"
          src={user?.dashboard}
          frameborder="0"
          allowfullscreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      ) : (
        <EmptyContent title="Dashboard under construction" />
      )}
    </Card>
  )
}
