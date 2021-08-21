import _ from "lodash";
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import customerReducer from "./customer/reducer";
import entitiesReducer from "./entities/reducer";
import merchantReducer from "./merchant/reducer";
import messageReducer from "./message/reducer";
import offersReducer from "./offers/reducer";
import supportReducer from "./support/reducer";

const reducer = combineReducers({
  auth: authReducer,
  merchant: merchantReducer,
  customer: customerReducer,
  support: supportReducer,
  message: messageReducer,
  offers: offersReducer,
  entities: entitiesReducer,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: {
      const nextState = {
        ...state,
        ...action.payload,
      };
      //preserve state
      nextState.merchant.brands.draft = state.merchant.brands.draft;
      nextState.customer.home = {
        ...nextState.customer.home,
        // offers: state.customer.home.offers,
      };
      nextState.entities = _.merge({}, state.entities, nextState.entities);
      return nextState;
    }

    default: {
      return reducer(state, action);
    }
  }
};

export default rootReducer;
