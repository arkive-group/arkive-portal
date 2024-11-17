import { Resend } from "resend";
import UserOnboardEmail from "@/components/emails/admin/user-onboard-email";

export async function POST(request) {
  try {
    const { user } = await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Arkive-Admin <admin@arkivegroup.com>",
      to: process.env.NEXT_PUBLIC_VERCEL_ADMIN_EMAIL.split(',').map(item=>item.trim()).filter(i => i),
      subject: "A New User Has Been Onboarded",
      react: UserOnboardEmail({user}),
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
