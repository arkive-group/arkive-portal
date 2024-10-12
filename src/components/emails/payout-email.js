import { Button, Container, Section, Text, Img } from "@react-email/components";

export default function PayoutRequestEmail(
  name,
  amount,
  clientEmail,
  accountId
) {
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };

  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };

  const logo = {
    margin: "0 auto",
    objectFit: "contain",
  };

  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };

  const btnContainer = {
    textAlign: "center",
  };

  const button = {
    backgroundColor: "#032eee",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
  };

  return (
    <div style={main}>
      <Container style={container}>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Img
            src="https://firebasestorage.googleapis.com/v0/b/arkive-portal.appspot.com/o/images%2Farkive_logo.png?alt=media&token=243bc786-f8f0-4010-84f2-5df3d273b0bb"
            width="200"
            height="70"
            alt="arkive logo"
            style={logo}
          />
        </div>
        <Text style={paragraph}>Dear Team Arkive,</Text>
        <Text style={paragraph}>
          I hope this message finds you well. I would like to request my monthly
          payout of <strong>${amount}</strong> for the current billing cycle.
        </Text>
        <Text style={paragraph}>Please find my account details below:</Text>
        <Text style={paragraph}>
          <strong>Client Name:</strong> {name}
          <br />
          <strong>Client Email:</strong> {clientEmail}
          <br />
          <strong>Stripe Account ID:</strong> {accountId}
        </Text>
        <Text style={paragraph}>
          Please confirm once the payment has been processed and let me know if
          you require any additional information from my side to complete the
          transaction.
        </Text>
        <Text style={paragraph}>
          If possible, please share the estimated timeline for when I can expect
          the payout to reflect in my account.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="mailto:finance@example.com">
            Contact Finance Team
          </Button>
        </Section>
        <Text style={paragraph}>Looking forward to your response.</Text>
        <Text style={paragraph}>Best regards,</Text>
        <Text style={paragraph}>{name}</Text>
      </Container>
    </div>
  );
}
