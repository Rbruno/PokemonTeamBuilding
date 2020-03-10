import React, { Component } from "react";

import "./minipoke.css";
export default class minipoke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: []
    };
  }

  componentDidMount() {
    let currentComponent = this;
    var Pokedex = require("pokedex-promise-v2");
    var P = new Pokedex();
    P.getPokemonByName(this.props.pokemon)
      .then(function(response) {
        var pkm = response;
        currentComponent.setState({
          pokemon: pkm
        });
        //console.log(pkm);
      })
      .catch(function(error) {
        console.log("There was an ERROR: ", error);
      });
  }
  render() {
    if (this.state.pokemon.length == 0) {
      return (
        <div>
          <ol className="olpok">
            <li onClick={this.props.onClick} className="lipok normal1">
              <img src={"./img/pokemons/132.png"} alt="ditto" />
            </li>
          </ol>
        </div>
      );
    }
    return (
      <div>
        <ol className="olpok">
          <li
            onClick={this.props.onClick}
            className={
              //si existen mas de un tipo coloca ambos en clases sino coloca solo uno
              this.state.pokemon.types.length > 1
                ? "lipok " +
                  this.state.pokemon.types[1].type.name +
                  "1 " +
                  this.state.pokemon.types[0].type.name +
                  "2 "
                : "lipok " + this.state.pokemon.types[0].type.name + "1 "
            }
          >
            <img
              src={this.state.pokemon.sprites.front_default}
              alt={this.state.pokemon.name}
            />
          </li>
        </ol>
      </div>
    );
  }
}
