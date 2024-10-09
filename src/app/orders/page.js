// sections
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import AuthGuard from "@/auth/auth-guard";
import DefaultView from "../../sections/default/default-view";
import { Table } from "@mui/material";
import { getOrders } from "@/lib/shopify";

export default async function Page() {
  const orders = await getOrders();
  return (
    <AuthGuard>
      <DashboardLayout>
        <DefaultView />
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.orders?.edges?.map((order) => (
              <tr key={order?.node?.id}>
                <td>{order?.node?.id}</td>
                <td>{order?.node?.email}</td>
                <td>{order?.node?.createdAt}</td>
                <td>{order?.node?.totalPriceSet?.shopMoney?.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DashboardLayout>
    </AuthGuard>
  );
}
