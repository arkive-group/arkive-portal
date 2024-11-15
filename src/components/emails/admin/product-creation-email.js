import {
    Button,
    Container,
    Section,
    Text,
    Img,
    Link,
  } from "@react-email/components";
  
  export default function ProductCreationEmail({vendor, title, handle, product_type, url}) {
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
          <Text style={paragraph}>Hi Admin,</Text>
          <Text style={paragraph}>
            A new product has been created by a vendor. Please review the product details below:
          </Text>
          <Text style={paragraph}>
            <strong>Vendor:</strong> {vendor}
            <br />
            <strong>Title:</strong> {title}
            <br />
            <strong>Handle:</strong> {handle}
            <br />
            <strong>Product Type:</strong> {product_type}
            <br />
            <strong>Product URL:</strong> <Link href={url}>Click here</Link>

          </Text>

          
          {/*<Section style={btnContainer}>
            <Button style={button} href="https://arkivegroup.com">
              Get started
            </Button>
          </Section> */}
          <Text style={paragraph}>Please assist the user with any queries they may have.</Text>
          <Text style={paragraph}>
            With circular kisses, <br />
            Team Arkive
          </Text>
        </Container>
      </div>
    );
  }
  