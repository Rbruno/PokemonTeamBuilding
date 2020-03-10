import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

import "./typeinfo.css";
class typeinfo extends Component {
  render() {
    if (this.props.tipo === "") {
      return <span>Loading... </span>;
    } else {
      return (
        <Col>
          <div className={"info_tipo " + this.props.type + "1 "}>
            <img
              src={"./img/tipos/" + this.props.type + ".png"}
              className="tipos"
              alt="tipo"
            ></img>
            <span className="weak">x{this.props.valor}</span>
          </div>
        </Col>
      );
    }
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(typeinfo);
