import { Resend } from "resend";
import ProductCreationEmail from "@/components/emails/admin/product-creation-email";
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

    const { vendor, id, title, handle, product_type } = await request.json();

    const productUrl = `https://admin.shopify.com/store/shoparkive/products/${id}`
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log(vendor, id);

    // Query for user's account ID
    const usersCollection = collection(DB, "users");
    const q = query(usersCollection, where("company", "==", vendor));
    const querySnapshot = await getDocs(q);
    let emails = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        emails.push(doc.data().email);
    });
    

    const { data, error } = await resend.emails.send({
      from: "Arkive-Admin <noreply@arkivegroup.com>",
      to: [process.env.NEXT_PUBLIC_VERCEL_ADMIN_EMAIL],
      cc: emails,
      subject: `New Product Added to Draft By ${vendor} - ${title}`,
      react: ProductCreationEmail({vendor, title, handle, product_type, url: productUrl}),
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
