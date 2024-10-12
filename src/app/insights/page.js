// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import Insights from "@/sections/insights/insights";

// ----------------------------------------------------------------------

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        {/* <SyncView /> */}
        <Insights />
      </DashboardLayout>
    </AuthGuard>
  );
}
