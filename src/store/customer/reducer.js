import { combineReducers } from "redux";

import homeReducer from "./home/reducer";
import profileReducer from "./profile/reducer";

const customerReducer = combineReducers({
  profile: profileReducer,
  home: homeReducer,
});

export default customerReducer;
