import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import WeeknessComponent from "../components/WeeknessComponent/weeknessComponent";

import Pokelist from "./PokeSelectionComponent/pokelist";
import CardteamComponent from "./TeamComponent/CardteamComponent";
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();
var team = [];

class teamComponent extends Component {
  //cuando carga la pagina llena el listado de pokemons
  async componentDidMount() {
    let currentComponent = this;

    var interval = {
      limit: 15, //801,
      offset: 0
    };
    await P.getPokemonsList(interval).then(function(response) {
      var pokemon = response;
      /*currentComponent.setState({
        allPokemon: pokemon.results
      });*/
      currentComponent.props.dispatch({
        type: "all_pkm",
        data: pokemon.results
      });
    });
  }

  //Calcula y llena el listado de tipos que contiene el equipo actual
  //ademas actualiza los listados de debilidades fortalezas e inmunidades
  calcType(currentTeam) {
    var newtypes = [];
    var team = currentTeam;
    for (const [index, value] of team.entries()) {
      newtypes.push(team[index].type1);
      if (team[index].type2 !== "") {
        newtypes.push(team[index].type2);
      }
    }
    this.props.dispatch({
      type: "MOD_types",
      newtypes
    });
    //calaculamos debilidades
    this.calcWeakAgainst(newtypes);
    //calaculamos fortalezas
    this.calcResistsAgainst(newtypes);
    //calaculamos inmunidades
    this.calcImmuneAgainst(newtypes);
  }

  //calcula y llena el listado de debilidades (WeakAgainst) de los tipos actuales en el equipo
  async calcWeakAgainst(newtypes) {
    var newWeakAgainst = this.props.teamAgainst;
    //lo limpio
    for (const [index, value] of newWeakAgainst.entries()) {
      newWeakAgainst[index].WeakAgainst = 0;
    }
    var types = newtypes;
    for (const [index, value] of types.entries()) {
      await P.getTypeByName(types[index])
        .then(function(response) {
          var res = response.damage_relations.double_damage_from;
          for (const [index, value] of res.entries()) {
            var currentindex = index;
            for (const [index, value] of newWeakAgainst.entries()) {
              if (newWeakAgainst[index].tipo === res[currentindex].name) {
                newWeakAgainst[index].WeakAgainst += 1;
              }
            }
          }
        })

        .catch(function(error) {
          console.log("There was an ERROR: ", error);
        });
    }
    //this.setState({ teamAgainst: newWeakAgainst });
    this.props.dispatch({
      type: "MOD_Weak",
      newWeakAgainst
    });
  }

  //calcula y llena el listado de Resistencias (ResistsAgainst) de los tipos actuales en el equipo
  async calcResistsAgainst(newtypes) {
    var newResistsAgainst = this.props.teamAgainst;
    //lo limpio
    for (const [index, value] of newResistsAgainst.entries()) {
      newResistsAgainst[index].ResistsAgainst = 0;
    }
    var types = newtypes;
    for (const [index, value] of types.entries()) {
      await P.getTypeByName(types[index])
        .then(function(response) {
          var res = response.damage_relations.half_damage_from;
          for (const [index, value] of res.entries()) {
            var currentindex = index;
            for (const [index, value] of newResistsAgainst.entries()) {
              if (newResistsAgainst[index].tipo === res[currentindex].name) {
                newResistsAgainst[index].ResistsAgainst += 1;
              }
            }
          }
        })

        .catch(function(error) {
          console.log("There was an ERROR: ", error);
        });
    }

    this.props.dispatch({
      type: "MOD_resist",
      newResistsAgainst
    });
  }

  //calcula y llena el listado de inmunidades (ImmuneAgainst) de los tipos actuales en el equipo
  async calcImmuneAgainst(newtypes) {
    var newImmuneAgainst = this.props.teamAgainst;
    //lo limpio
    for (const [index, value] of newImmuneAgainst.entries()) {
      newImmuneAgainst[index].ImmuneAgainst = 0;
    }
    var types = newtypes;
    for (const [index, value] of types.entries()) {
      await P.getTypeByName(types[index])
        .then(function(response) {
          var res = response.damage_relations.no_damage_from;
          for (const [index, value] of res.entries()) {
            var currentindex = index;
            for (const [index, value] of newImmuneAgainst.entries()) {
              if (newImmuneAgainst[index].tipo === res[currentindex].name) {
                newImmuneAgainst[index].ImmuneAgainst += 1;
              }
            }
          }
        })

        .catch(function(error) {
          console.log("There was an ERROR: ", error);
        });
    }

    this.props.dispatch({
      type: "MOD_immune",
      newImmuneAgainst
    });
  }

  //elimina el pokemon clickeado en el equipo
  erasePokemon(key) {
    let currentComponent = this;
    var newTeam = [];
    newTeam = this.props.team.filter(function(team) {
      return team.key !== key;
    });

    var newNumteam = this.props.numteam - 1;

    currentComponent.props.dispatch({
      type: "REM_pkm",
      newTeam: newTeam,
      numteam: newNumteam
    });
    //calculamos tipos
    this.calcType(newTeam);
  }

  async addPokemon(name) {
    let numteam = this.props.numteam;
    var pkm = [];
    var tipo1 = "";
    var tipo2 = "";
    let currentComponent = this;

    //buscamos pokemon
    await P.getPokemonByName(name)
      .then(function(response) {
        pkm = response;
        //definimos tipos
        tipo1 =
          pkm.types.length > 1
            ? pkm.types[1].type.name
            : pkm.types[0].type.name;
        tipo2 = pkm.types.length > 1 ? pkm.types[0].type.name : "";

        if (numteam < 6) {
          var newTeam = currentComponent.props.team;
          numteam++;
          newTeam.push({
            key: uuidv4(),
            pokemon: "./img/pokemons/" + pkm.id + ".png",
            type1: tipo1,
            type2: tipo2,
            nombre: name
          });
          currentComponent.props.dispatch({
            type: "ADD_pkm",
            newTeam,
            numteam
          });

          //guardamos tipos
          currentComponent.calcType(newTeam);
        }
      })
      .catch(function(error) {
        console.log("There was an ERROR: ", error);
      });
  }

  render() {
    return (
      <div>
        <CardteamComponent
          team={this.props.team}
          onClick={this.erasePokemon.bind(this)}
        ></CardteamComponent>
        <WeeknessComponent
          teamAgainst={this.props.teamAgainst}
        ></WeeknessComponent>
        <Pokelist onClick={this.addPokemon.bind(this)}></Pokelist>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(teamComponent);
