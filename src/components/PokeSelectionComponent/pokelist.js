import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Container, Col } from "react-bootstrap";

import Minipoke from "../PokeSelectionComponent/MiniPokemon/minipoke";

class pokelist extends Component {
  render() {
    if (!this.props.allpokemon) {
      return <span>Loading...</span>;
    }
    return (
      <Card>
        <Card.Header as="h5">Pokedex</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              {this.props.allpokemon.map((e, i) => (
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
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(pokelist);
