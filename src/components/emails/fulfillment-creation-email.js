import {
    Button,
    Container,
    Section,
    Text,
    Img,
    Link,
    Row,
    Column,
  } from "@react-email/components";
  
  export default function FulfillmentCreationEmail({vendor, order_id, name, line_items, tracking_company, tracking_numbers, tracking_url, tracking_urls, destination, email}) {
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
          <Text style={paragraph}>Hi {vendor},</Text>
          <Text style={paragraph}>
            We have successfully created a fulfillment for order {order_id} with the following details:
          </Text>
          <Text style={paragraph}>
            <br />
            <strong>Recipient:</strong> {name}
            <br />
            <strong>Destination:</strong>
            <Section>
                <Row>
                    <strong>Address:</strong> {destination.address1}
                </Row>
                <Row>
                    <strong>City:</strong> {destination.city}
                </Row>
                <Row>
                    <strong>Province:</strong> {destination.province}
                </Row>
                <Row>
                    <strong>Country:</strong> {destination.country}
                </Row>
                <Row>
                    <strong>Zip Code:</strong> {destination.zip}
                </Row>
                <Row>
                    <strong>Name:</strong> {destination.name}
                </Row>
                <Row>
                    <strong>Phone:</strong> {destination.phone}
                </Row>
                <Row>
                    <strong>Email:</strong> {email}
                </Row>
            </Section>


            <br />
            <strong>Tracking Company:</strong> {tracking_company}
            <br />
            <strong>Tracking Numbers:</strong> {tracking_numbers}
            <br />
            <strong>Tracking URL:</strong> {tracking_url}
            <br />
            <strong>Tracking URLs:</strong> {tracking_urls}
            <br />
            <strong>Line Items:</strong>
            <Section>
                {line_items.map((item) => (
                    <Row>
                        <Column><strong>Product:</strong> {item.title}</Column>
                        <Column><strong>Quantity:</strong> {item.quantity}</Column>
                    </Row>
                ))}
            </Section>
            <br />

          </Text>

          
          {/* <Section style={btnContainer}>
            <Button style={button} href="https://arkivegroup.com">
              Get started
            </Button>
          </Section> */}
          <Text style={paragraph}>
            With circular kisses, <br />
            Team Arkive
          </Text>
        </Container>
      </div>
    );
  }
  