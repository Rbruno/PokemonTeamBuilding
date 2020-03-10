import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

import TeamComponent from "./components/TeamComponent";

function App() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Pokemon Team Building</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <TeamComponent></TeamComponent>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
