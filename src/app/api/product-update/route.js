import { Resend } from "resend";
import ProductUpdateEmail from "@/components/emails/product-update-email";
import { getProducts, updateProduct } from "@/lib/firebase-db";
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

    const { vendor, id, title, handle, product_type, status } = await request.json();

    const shopfrontUrl = `https://arkivegroup.com/products/${handle}`

    if (status !== "active") {
        return new Response(JSON.stringify({ message: "Product is not in active" }));
    }

    const products = await getProducts({ vendorName: vendor });
    const product = products.find((product) => product.id === String(id));
    if (!product) {
        return new Response(JSON.stringify({ message: "Product not found" }));
    }
    if (product.status === status) {
        return new Response(JSON.stringify({ message: "Product status is already active" }));
    }

    await updateProduct({ vendorName: vendor, productId: product.id, product: { status } });


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
      from: "Arkive <noreply@arkivegroup.com>",
      to: emails,
      subject: `Product Activated - ${title}`,
      react: ProductUpdateEmail({vendor, title, handle, status, product_type, url: shopfrontUrl}),
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
