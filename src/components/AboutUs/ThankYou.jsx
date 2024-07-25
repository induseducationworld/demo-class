import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";

const ThankYou = () => {
  return (
    <section className="about-us-section home-secound">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h3 className="font-weight-bold mb-3">Thank You!</h3>
            <p className="mb-4">
              <FaCheckCircle color="green" size="2em" /> You have successfully
              registered for the Indus NEET Dropper's batch demo class.
            </p>
            <p className="mb-4">
              We will inform you about the upcoming demo class schedule via
              email.
            </p>
            <Button href="/" variant="primary" className="text-uppercase">
              Go to Homepage
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
