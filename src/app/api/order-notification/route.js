import { Resend } from "resend";
import OrderNotificationEmail from "@/components/emails/order-notification-email";
import { getProductBySku } from "@/lib/shopify-serverside";
import { DB } from "@/utils/firebase-config";
import {
    doc,
    setDoc,
    getDocs,
    collection,
    query,
    where,
} from "firebase/firestore";

export async function POST(request) {
  try {

    const { admin_graphql_api_id, customer, line_items, order_status_url } = await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const skuList = line_items.map((item) => item.sku);
    const products = await getProductBySku({ skuList });

    console.log(admin_graphql_api_id, customer, line_items);
    console.log(products);

    if (products.length === 0) {
      return new Response(JSON.stringify({ error: "Product not found" }));
    }

    const vendor = products[0].vendor;

    // Query for user's account ID
    const usersCollection = collection(DB, "users");
    const q = query(usersCollection, where("company", "==", vendor));
    const querySnapshot = await getDocs(q);
    let emails = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        emails.push(doc.data().email);
    });

    const name = vendor;
    const orderName = customer.first_name + " " + customer.last_name;
    const orderId = admin_graphql_api_id;
    

    const { data, error } = await resend.emails.send({
      from: "Arkive <noreply@arkivegroup.com>",
      to: emails,
      subject: "Incoming Arkive Order",
      react: OrderNotificationEmail({name, orderId, orderName, order_status_url}),
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
