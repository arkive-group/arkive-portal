// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import DefaultView from "../../sections/default/default-view";
import OrdersView from "@/sections/orders/orders-view";

export default async function Page() {
  return (
    <AuthGuard>
      <DashboardLayout>
        {/* <DefaultView /> */}
        <OrdersView />
      </DashboardLayout>
    </AuthGuard>
  );
}
