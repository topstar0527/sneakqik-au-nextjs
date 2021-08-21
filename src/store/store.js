import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducer";
import rootSaga from "./saga";

const bindMiddleware = (middleware) => {
  if (process.env.NEXT_PUBLIC_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (_context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducer.js", () => {
      const nextRootReducer = require("./reducer");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
