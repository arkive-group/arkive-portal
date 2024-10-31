import {
    Button,
    Container,
    Section,
    Text,
    Img,
    Link,
  } from "@react-email/components";
  
  export default function OrderNotificationEmail({name, orderId, orderName, order_status_url}) {
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
                Order ID: {orderId}
            </Text>
            <Text style={paragraph}>
                Order Name: {orderName}
            </Text>
            <Text style={paragraph}>
            <Link href={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/orders/`}>Check orders</Link>
            </Text>
            <br />
            <Text style={paragraph}>
            <Link href={order_status_url}>Check order status</Link>
            </Text>
          <Text style={paragraph}>
            With circular kisses, <br />
            Team Arkive
          </Text>
        </Container>
      </div>
    );
  }
  