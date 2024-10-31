// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import InsightsView from "@/sections/insights/insights-view";

// ----------------------------------------------------------------------

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <InsightsView />
      </DashboardLayout>
    </AuthGuard>
  );
}
