// sections
import DashboardLayout from '@/layouts/dashboard/dashboard-layout'

import AuthGuard from '@/auth/auth-guard'
import DefaultView from '../../sections/default/default-view'

// ----------------------------------------------------------------------

export default async function Page() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <DefaultView />
      </DashboardLayout>
    </AuthGuard>
  )
}
