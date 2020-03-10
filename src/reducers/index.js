import { combineReducers } from "redux";

import teamReducer from "./teamReducer";

const rootReducer = combineReducers({
  teams: teamReducer
});

export default rootReducer;
