// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import Billing from "@/sections/billing/billing";
import AccountBillingLayout from "@/layouts/accounts-billings/account-billing";

// ----------------------------------------------------------------------

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <AccountBillingLayout>
          <Billing />
        </AccountBillingLayout>
      </DashboardLayout>
    </AuthGuard>
  );
}
