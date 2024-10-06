import Billing from "@/sections/billing/billing";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import AuthGuard from "@/auth/auth-guard";

export default async function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <Billing />
      </DashboardLayout>
    </AuthGuard>
  );
}
