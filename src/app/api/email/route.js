import { Resend } from 'resend'
import WelcomeEmail from '@/components/emails/welcome-email'

export async function POST(request) {
  try {
    const { name, email } = await request.json()
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: 'Arkive <noreply@arkivegroup.com>',
      to: [email],
      subject: 'Welcome, you beautiful change-maker!',
      react: WelcomeEmail(name),
    })

    if (error) {
      console.log('Email error:', error)
      return NextResponse.json(
        { error: 'Email sending failed' },
        { status: 500 },
      )
    }

    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}
