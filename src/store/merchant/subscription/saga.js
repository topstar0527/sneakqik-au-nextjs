import { all, put, call, takeLatest } from "redux-saga/effects";

import API from "api";

import subscriptionActions, {
  GET_PLANS_REQUEST,
  GET_PLANS_SUCCESS,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FETCHING,
  CANCEL_SUBSCRIPTION_REQUEST,
  CANCEL_SUBSCRIPTION_FAILURE,
  CANCEL_SUBSCRIPTION_SUCCESS,
  REACTIVATE_SUBSCRIPTION_REQUEST,
  REACTIVATE_SUBSCRIPTION_FAILURE,
  REACTIVATE_SUBSCRIPTION_SUCCESS,
} from "./actions";

export function* getPlans() {
  try {
    const { data } = yield call(API.merchant.getSubscriptionPlans);
    yield put({
      type: GET_PLANS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put(subscriptionActions.getPlansFailure(e));
  }
}

function* updateSubscription({ payload }) {
  try {
    const { data } = yield call(API.merchant.updateSubscription, payload);
    yield put({
      type: UPDATE_SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: UPDATE_SUBSCRIPTION_FAILURE,
      payload: { error },
    });
  }
}

export function* getInvoices() {
  yield put({
    type: GET_INVOICES_FETCHING,
  });
  try {
    const { data } = yield call(API.merchant.getChargebeeInvoices);
    yield put({
      type: GET_INVOICES_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put(subscriptionActions.getInvoicesFailure(e));
  }
}

export function* cancelSubscription() {
  try {
    const { data } = yield call(API.merchant.cancelSubscription);
    yield put({
      type: CANCEL_SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: CANCEL_SUBSCRIPTION_FAILURE,
      payload: { error },
    });
  }
}

export function* reactivateSubscription() {
  try {
    const { data } = yield call(API.merchant.reactivateSubscription);
    yield put({
      type: REACTIVATE_SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: REACTIVATE_SUBSCRIPTION_FAILURE,
      payload: { error },
    });
  }
}

export default function* subscriptionSaga() {
  yield all([
    takeLatest(GET_PLANS_REQUEST, getPlans),
    takeLatest(UPDATE_SUBSCRIPTION_REQUEST, updateSubscription),
    takeLatest(GET_INVOICES_REQUEST, getInvoices),
    takeLatest(CANCEL_SUBSCRIPTION_REQUEST, cancelSubscription),
    takeLatest(REACTIVATE_SUBSCRIPTION_REQUEST, reactivateSubscription),
  ]);
}
