import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";

import "./typeinfo.css";
export default class typeinfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.tipo == "") {
      return <span>Loading... </span>;
    } else {
      return (
        <Col>
          <div className={"info_tipo " + this.props.type + "1 "}>
            <img
              src={"./img/tipos/" + this.props.type + ".png"}
              className="tipos"
            ></img>
            <span className="weak">x{this.props.valor}</span>
          </div>
        </Col>
      );
    }
  }
}
