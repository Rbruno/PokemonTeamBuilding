import React, { Component } from "react";

import { Card, Accordion, Button, Row } from "react-bootstrap";

import Typeinfo from "./typeinfo";
export default class weeknessComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: this.props.teamAgainst
    };
  }

  render() {
    if (!this.state.weeks) {
      return <span>Loading... {this.state.weeks.length}</span>;
    } else {
      return (
        <Card>
          <Card.Header as="h5">
            Tablas de Debilidades, Fortalezas e inmunidades de tu equipo
          </Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Tu equipo es debil contra...
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>
                      {this.state.weeks.map((e, i) => {
                        if (e.WeakAgainst > 0) {
                          return (
                            <Typeinfo
                              key={i}
                              type={e.tipo}
                              valor={e.WeakAgainst}
                            ></Typeinfo>
                          );
                        }
                      })}
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Tu equipo resiste a
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Row>
                      {this.state.weeks.map((e, i) => {
                        if (e.ResistsAgainst > 0) {
                          return (
                            <Typeinfo
                              key={i}
                              type={e.tipo}
                              valor={e.ResistsAgainst}
                            ></Typeinfo>
                          );
                        }
                      })}
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Tu equipo es inmune a
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <Row>
                      {this.state.weeks.map((e, i) => {
                        if (e.ImmuneAgainst > 0) {
                          return (
                            <Typeinfo
                              key={i}
                              type={e.tipo}
                              valor={e.ImmuneAgainst}
                            ></Typeinfo>
                          );
                        }
                      })}
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Card.Body>
        </Card>
      );
    }
  }
}
