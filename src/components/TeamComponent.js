import React, { Component } from "react";

import { v4 as uuidv4 } from "uuid";

import WeeknessComponent from "../components/WeeknessComponent/weeknessComponent";

import Pokelist from "./PokeSelectionComponent/pokelist";
import CardteamComponent from "./TeamComponent/CardteamComponent";
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();
var team = [];
export default class teamComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numteam: 0,
      team: team,
      team_types: [],
      teamAgainst: [
        {
          tipo: "bug",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "poison",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "grass",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "dark",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "dragon",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "electric",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "fairy",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "fighting",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "fire",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "flying",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "ghost",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "ground",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "ice",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "normal",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "psychic",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "rock",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "steel",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        },
        {
          tipo: "water",
          WeakAgainst: 0,
          ResistsAgainst: 0,
          ImmuneAgainst: 0
        }
      ]
    };
  }

  //cuando carga la pagina llena el listado de pokemons
  async componentDidMount() {
    let currentComponent = this;

    var interval = {
      limit: 801,
      offset: 0
    };
    await P.getPokemonsList(interval).then(function(response) {
      var pokemon = response;
      currentComponent.setState({
        allPokemon: pokemon.results
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
    this.setState({ team_types: newtypes });
    //calaculamos debilidades
    this.calcWeakAgainst(newtypes);
    //calaculamos fortalezas
    this.calcResistsAgainst(newtypes);
    //calaculamos inmunidades
    this.calcImmuneAgainst(newtypes);
  }

  //calcula y llena el listado de debilidades (WeakAgainst) de los tipos actuales en el equipo
  async calcWeakAgainst(newtypes) {
    var newWeakAgainst = this.state.teamAgainst;
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
    this.setState({ teamAgainst: newWeakAgainst });
  }

  //calcula y llena el listado de Resistencias (ResistsAgainst) de los tipos actuales en el equipo
  async calcResistsAgainst(newtypes) {
    var newResistsAgainst = this.state.teamAgainst;
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
    this.setState({ teamAgainst: newResistsAgainst });
  }

  //calcula y llena el listado de inmunidades (ImmuneAgainst) de los tipos actuales en el equipo
  async calcImmuneAgainst(newtypes) {
    var newImmuneAgainst = this.state.teamAgainst;
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
    this.setState({
      teamAgainst: newImmuneAgainst
    });
  }

  //elimina el pokemon clickeado en el equipo
  erasePokemon(key) {
    let currentComponent = this;
    var newTeam = [];
    newTeam = this.state.team.filter(function(team) {
      return team.key !== key;
    });

    var newNumteam = this.state.numteam - 1;
    currentComponent.setState({
      team: newTeam,
      numteam: newNumteam
    });
    //calculamos tipos
    this.calcType(newTeam);
  }

  //agrega al pokemon clickeado al equipo
  async addPokemon(name) {
    let numteam = this.state.numteam;
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
          var newTeam = currentComponent.state.team;
          numteam++;
          newTeam.push({
            key: uuidv4(),
            pokemon: "./img/pokemons/" + pkm.id + ".png",
            type1: tipo1,
            type2: tipo2,
            nombre: name
          });
          currentComponent.setState({
            team: newTeam,
            numteam: numteam
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
          team={this.state.team}
          onClick={this.erasePokemon.bind(this)}
        ></CardteamComponent>
        <WeeknessComponent
          teamAgainst={this.state.teamAgainst}
        ></WeeknessComponent>
        <Pokelist
          allPokemon={this.state.allPokemon}
          onClick={this.addPokemon.bind(this)}
        ></Pokelist>
      </div>
    );
  }
}
