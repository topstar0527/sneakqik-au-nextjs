import { fork, all } from "redux-saga/effects";

import brandsSaga from "./brands/saga";
import subscriptionSaga from "./subscription/saga";

export default function* merchantSaga() {
  yield all([fork(brandsSaga), fork(subscriptionSaga)]);
}
