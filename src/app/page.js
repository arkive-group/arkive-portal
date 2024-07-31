// sections
import DashboardLayout from '@/layouts/dashboard/dashboard-layout'
import HomeView from '@/sections/home/home-view'
import AuthGuard from '@/auth/auth-guard'

// ----------------------------------------------------------------------

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <HomeView />
      </DashboardLayout>
    </AuthGuard>
  )
}
