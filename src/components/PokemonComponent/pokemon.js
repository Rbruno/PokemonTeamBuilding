import React, { Component } from "react";

import { Col, Row, Container } from "react-bootstrap";

import { IconContext } from "react-icons";
import { MdNotInterested } from "react-icons/md";

import "./pokemon.css";

export default class pokemon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col className="circle" onClick={this.props.onClick}>
        <IconContext.Provider
          value={{
            color: "red",
            size: "6em",
            className: "cruz"
          }}
        >
          <div>
            <MdNotInterested />
          </div>
        </IconContext.Provider>
        <div
          className={
            "figure " + this.props.type1 + "1 " + this.props.type2 + "2 "
          }
        >
          <img src={this.props.pokemon} className="pokefigure"></img>
        </div>
        <div
          className={
            "info " + this.props.type1 + "1 " + this.props.type2 + "2 "
          }
        >
          <img
            src={"./img/tipos/" + this.props.type1 + ".png"}
            className="tipos"
          ></img>
          {this.props.type2.length > 0 && (
            <img
              src={"./img/tipos/" + this.props.type2 + ".png"}
              className="tipos"
            ></img>
          )}
        </div>
      </Col>
    );
  }
}
