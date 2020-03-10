import React, { Component } from "react";

import { Card, Row, Container, Col } from "react-bootstrap";

import Minipoke from "../PokeSelectionComponent/MiniPokemon/minipoke";

export default class pokelist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.allPokemon) {
      return <span>Loading...</span>;
    }
    return (
      <Card>
        <Card.Header as="h5">Pokedex</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              {this.props.allPokemon.map((e, i) => (
                <Minipoke
                  onClick={() => this.props.onClick(e.name)}
                  key={i}
                  pokemon={e.name}
                />
              ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}
