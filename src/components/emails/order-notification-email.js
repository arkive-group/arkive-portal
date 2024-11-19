import {
    Button,
    Container,
    Section,
    Text,
    Img,
    Link,
    Row,
  } from "@react-email/components";
  
  export default function OrderNotificationEmail({name, orderId, orderName, order_status_url, shipping_address}) {
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
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            New order has been placed with the following details:
          </Text>
            <Text style={paragraph}>
              <strong>Order ID:</strong> {orderId}
            </Text>
            <Text style={paragraph}>
              <strong>Order Name:</strong> {orderName}
            </Text>
            <Text style={paragraph}><strong>Shipping Address:</strong></Text>
            <Section>
                <Row>
                    <strong>First Name:</strong> {shipping_address.first_name}
                </Row>
                <Row>
                    <strong>Last Name:</strong> {shipping_address.last_name}
                </Row>
                <Row>
                    <strong>Address:</strong> {shipping_address.address1}
                </Row>
                <Row>
                    <strong>Address 2:</strong> {shipping_address.address2}
                </Row>
                <Row>
                    <strong>City:</strong> {shipping_address.city}
                </Row>
                <Row>
                    <strong>Country:</strong> {shipping_address.country}
                </Row>
                <Row>
                    <strong>Country Code:</strong> {shipping_address.country_code}
                </Row>
                <Row>
                    <strong>Zip:</strong> {shipping_address.zip}
                </Row>
                <Row>
                    <strong>Phone Number:</strong> {shipping_address.phone}
                </Row>
            </Section>
            
            <Text style={paragraph}>
            <Link href={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/orders/`}>Check orders with Arkive Portal</Link>
            </Text>
            <Section style={btnContainer}>
              <Button style={button} href={order_status_url}>
                Check order status
              </Button>
            </Section>
          <Text style={paragraph}>
            With circular kisses, <br />
            Team Arkive
          </Text>
        </Container>
      </div>
    );
  }
  