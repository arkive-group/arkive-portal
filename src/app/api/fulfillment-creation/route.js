import { Resend } from "resend";
import FulfillmentCreationEmail from "@/components/emails/fulfillment-creation-email";
import { getOrders, updateOrders } from "@/lib/firebase-db";
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

    const { order_id, name, line_items, tracking_company, tracking_numbers, tracking_url, tracking_urls, destination, email } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const vendors = [];
    line_items.forEach(async (item) => {
        const vendor = item.vendor;
        if (vendor && !vendors.includes(vendor)) {
            vendors.push(vendor);
        }
    });

    if (vendors.length === 0) {
        return new Response(JSON.stringify({ message: "No vendors found" }));
    }

    for (let i = 0; i < vendors.length; i++) {
        const vendor = vendors[i];
        const orders = await getOrders({ vendorName: vendor });
        const order = orders.find((order) => order.orderId === String(order_id));
        if (order) {
            // Query for user's account ID
            const usersCollection = collection(DB, "users");
            const q = query(usersCollection, where("company", "==", vendor));
            const querySnapshot = await getDocs(q);
            let emails = [];
            querySnapshot.forEach((doc) => {
                emails.push(doc.data().email);
            });

            const { data, error } = await resend.emails.send({
                from: "Arkive <noreply@arkivegroup.com>",
                to: emails,
                subject: `Fulfillment Created - ${order_id}`,
                react: FulfillmentCreationEmail({vendor, order_id, name, line_items, tracking_company, tracking_numbers, tracking_url, tracking_urls, destination, email}),
            });

            if (error) {
                console.log("Email error:", error);
            }
        }
    }
    

    return new Response(JSON.stringify({ message: "Emails sent" }));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
