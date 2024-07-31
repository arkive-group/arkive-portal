// sections
import DashboardLayout from '@/layouts/dashboard/dashboard-layout'

import AuthGuard from '@/auth/auth-guard'
import SyncView from '@/sections/sync/sync-view'

// ----------------------------------------------------------------------

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <SyncView />
      </DashboardLayout>
    </AuthGuard>
  )
}
