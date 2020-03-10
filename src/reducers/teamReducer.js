const initialState = {
  Team: {
    allpokemon: [],
    numteam: 0,
    team: [],
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
  }
};
export default function teamReducer(state = initialState.Team, action) {
  switch (action.type) {
    case "all_pkm": {
      return Object.assign({}, state, {
        allpokemon: action.data
      });
    }
    /* agrego pokemon al team */

    case "ADD_pkm": {
      return Object.assign({}, state, {
        numteam: action.numteam,
        team: action.newTeam
      });
    }

    /* quito pokemon al team */
    case "REM_pkm": {
      return Object.assign({}, state, {
        numteam: action.numteam,
        team: action.newTeam
      });
    }

    case "MOD_types": {
      return Object.assign({}, state, {
        team_types: action.newtypes
      });
    }

    case "MOD_Weak": {
      return Object.assign({}, state, {
        teamAgainst: action.newWeakAgainst
      });
    }

    case "MOD_resist": {
      return Object.assign({}, state, {
        teamAgainst: action.newResistsAgainst
      });
    }

    case "MOD_immune": {
      return Object.assign({}, state, {
        teamAgainst: action.newImmuneAgainst
      });
    }

    default:
      return state;
  }
}
