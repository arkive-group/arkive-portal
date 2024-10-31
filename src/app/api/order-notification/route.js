import { Resend } from "resend";
import OrderNotificationEmail from "@/components/emails/order-notification-email";
import { getProductBySku } from "@/lib/shopify-serverside";

export async function POST(request) {
  try {

    const { admin_graphql_api_id, customer, line_items } = await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const skuList = line_items.map((item) => item.sku);
    const products = await getProductBySku({ skuList });

    console.log(products);

    if (products.length === 0) {
      return NextResponse.json(
        { error: "No products found" },
        { status: 404 }
      );
    }

    const vendor = products[0].vendor;

    const name = vendor;
    const orderName = customer.first_name + " " + customer.last_name;
    const orderId = admin_graphql_api_id;
    

    const { data, error } = await resend.emails.send({
      from: "Arkive <noreply@arkivegroup.com>",
      to: ["eden@arkive.nl"],
      subject: "Incoming Arkive Order",
      react: OrderNotificationEmail({name, orderId, orderName}),
    });

    if (error) {
      console.log("Email error:", error);
      return NextResponse.json(
        { error: "Email sending failed" },
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
