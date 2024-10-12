import { Resend } from "resend";
import PayoutEmail from "@/components/emails/payout-email";

export async function POST(request) {
  try {
    const { name, email, amount, clientEmail, accountId } =
      await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Arkive <noreply@arkivegroup.com>",
      to: [email],
      subject: "Monthly Payout Request",
      react: PayoutEmail(name, amount, clientEmail, accountId),
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
