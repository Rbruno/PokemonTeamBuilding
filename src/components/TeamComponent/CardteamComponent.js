import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Container } from "react-bootstrap";

import Pokemon from "../PokemonComponent/pokemon";
class CardteamComponent extends Component {
  render() {
    return (
      <Card className="text-center">
        <Card.Header>My Team</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              {this.props.team.map((e, i) => (
                <Pokemon
                  onClick={() => this.props.onClick(e.key)}
                  key={e.key}
                  pokemon={e.pokemon}
                  type1={e.type1}
                  type2={e.type2}
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
export default connect(mapStateToProps)(CardteamComponent);
