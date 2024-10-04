// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import PricingView from "@/sections/pricing/pricing-view";

// ----------------------------------------------------------------------

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <PricingView />
      </DashboardLayout>
    </AuthGuard>
  );
}
