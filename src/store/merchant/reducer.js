import { combineReducers } from "redux";

import brandsReducer from "./brands/reducer";
import subscription from "./subscription/reducer";

const merchantReducer = combineReducers({
  brands: brandsReducer,
  subscription,
});

export default merchantReducer;
