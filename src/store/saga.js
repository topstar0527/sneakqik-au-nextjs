import { fork, all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import customerSaga from "./customer/saga";
import entitiesSaga from "./entities/saga";
import merchantSaga from "./merchant/saga";

export default function* rootSaga() {
  yield all([
    fork(authSaga), //
    fork(merchantSaga),
    fork(customerSaga),
    fork(entitiesSaga),
  ]);
}
