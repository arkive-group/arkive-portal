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
        <Text style={paragraph}>Welcome to Our Circular Beauty Family!</Text>
        <Text style={paragraph}>
          Our platform goes live at the end of September, brought to you by
          Jérôme & Thomas. As one of the first 50 members, you get 6 months of
          our EcoBoost Plan free (we also offer EcoStart Plan and EcoMaster
          Plan).
        </Text>
        <Text style={paragraph}>
          Follow our growth journey through our newsletters or on{' '}
          <Link href="https://www.linkedin.com/company/shoparkive/?viewAsMember=true">
            LinkedIn
          </Link>
          . And if you care about a circular economy, help us grow faster by
          donating via: <strong>Arkive B.V. / NL71INGB0006355736.</strong>
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://arkivegroup.com">
            Get started
          </Button>
        </Section>
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
