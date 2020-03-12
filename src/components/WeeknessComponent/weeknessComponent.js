import React, { Component } from "react";

import { connect } from "react-redux";

import { Card, Accordion, Button, Row } from "react-bootstrap";

import Typeinfo from "./typeinfo";
class weeknessComponent extends Component {
  render() {
    if (!this.props.teamAgainst) {
      return <span>Loading... {this.props.teamAgainst.length}</span>;
    } else {
      return (
        <Card className="card_shadow">
          <Card.Header as="h5" className="pokeletra">
            Tablas de Debilidades, Fortalezas e inmunidades de tu equipo
          </Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="h5"
                    eventKey="0"
                    className="pokeletra"
                  >
                    Tu equipo es debil contra...
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>
                      {this.props.teamAgainst.map((e, i) => {
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
                  <Accordion.Toggle
                    as={Button}
                    variant="h5"
                    eventKey="1"
                    className="pokeletra"
                  >
                    Tu equipo resiste a
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Row>
                      {this.props.teamAgainst.map((e, i) => {
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
                  <Accordion.Toggle
                    as={Button}
                    variant="h5"
                    eventKey="2"
                    className="pokeletra"
                  >
                    Tu equipo es inmune a
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <Row>
                      {this.props.teamAgainst.map((e, i) => {
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
const mapStateToProps = state => {
  return {
    posts: state
  };
};
export default connect(mapStateToProps)(weeknessComponent);
