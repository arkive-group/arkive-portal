// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import Payouts from "@/sections/payouts/payouts-view";

// ----------------------------------------------------------------------

export default async function PayoutPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <Payouts />
      </DashboardLayout>
    </AuthGuard>
  );
}
