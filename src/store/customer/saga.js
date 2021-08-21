import { fork, all } from "redux-saga/effects";

import homeSaga from "./home/saga";
import profileSaga from "./profile/saga";

export default function* customerSaga() {
  yield all([fork(profileSaga), fork(homeSaga)]);
}
