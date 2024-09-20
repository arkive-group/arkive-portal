import {
  Button,
  Container,
  Section,
  Text,
  Img,
  Link,
} from '@react-email/components'

export default function WelcomeEmail({ name }) {
  const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  }

  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
  }

  const logo = {
    margin: '0 auto',
    objectFit: 'contain',
  }

  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
  }

  const btnContainer = {
    textAlign: 'center',
  }

  const button = {
    backgroundColor: '#032eee',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    padding: '12px',
  }

  return (
    <div style={main}>
      <Container style={container}>
        <div
          style={{
            textAlign: 'center',
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
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>Welcome to our circular beauty family! You now belong to our community of impact pioneers who care about their looks and our planet. Together, we’re building a circular beauty industry.</Text>
        <Text style={paragraph}>
          Early members can get 3 months of our EcoBoost Plan free, 
          and another 3 months if you recommend a new beauty business that assigns to a paid plan [<Link href="https://www.canva.com/design/DAGO9Xhnr_E/o1wuyTbwHAtT-nBaJt7BGg/edit?utm_content=DAGO9Xhnr_E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">read more + pricing plans</Link>].
        </Text>
        <Text style={paragraph}>
          Would you like to support us? Follow our growth journey through our <Link href="https://www.instagram.com/arkiveshop/">Instagram</Link> or on <Link href="https://www.linkedin.com/company/shoparkive/?viewAsMember=true">LinkedIn</Link>. 
          Want to help us accelerate our journey? 
          Donate 50,- to accelerate circularity in the beauty industry where we will invest the budget in PR + marketing [<Link href="https://www.ing.nl/de-ing/payreq?trxid=5ZELTTcabJMfxy4qtgVAoXntpsEiRbPL&flow-step=payment-request">donate here</Link>]. 
        </Text>
        {/*<Section style={btnContainer}>
          <Button style={button} href="https://arkivegroup.com">
            Get started
          </Button>
        </Section> */}
        <Text style={paragraph}>
          Talk soon!
          <br />
          With circular kisses,
          <br />
          <br />
          Team Arkive
        </Text>
      </Container>
    </div>
  )
}
