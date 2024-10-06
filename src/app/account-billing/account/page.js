// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import Account from "@/sections/account/account";
import AccountBillingLayout from "@/layouts/accounts-billings/account-billing";

// ----------------------------------------------------------------------

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <AccountBillingLayout>
          <Account />
        </AccountBillingLayout>
      </DashboardLayout>
    </AuthGuard>
  );
}
