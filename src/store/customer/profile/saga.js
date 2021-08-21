import { normalize } from "normalizr";
import { takeLatest, put, all, call } from "redux-saga/effects";

import base from "api/base";
import { offerList as OfferListSchema, brandList as BrandListSchema } from "schema";

import Actions from "./actions";

export function* getOffersLiked() {
  try {
    const { data } = yield call(base.get, "/users/me/offers/liked");

    const normalizedData = normalize(data, OfferListSchema);

    yield put({
      type: Actions.GET_OFFERS_LIKED_SUCCESS,
      payload: normalizedData,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: Actions.GET_OFFERS_LIKED_FAILURE,
      payload: { error },
    });
  }
}

export function* getOffersSaved() {
  try {
    const { data } = yield call(base.get, "/users/me/offers/saved");

    const normalizedData = normalize(data, OfferListSchema);

    yield put({
      type: Actions.GET_OFFERS_SAVED_SUCCESS,
      payload: normalizedData,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: Actions.GET_OFFERS_SAVED_FAILURE,
      payload: { error },
    });
  }
}

export function* getBrandsFollowing() {
  try {
    const { data } = yield call(base.get, "/users/me/brands/following");

    const normalizedData = normalize(data, BrandListSchema);

    yield put({
      type: Actions.GET_BRANDS_FOLLOWING_SUCCESS,
      payload: normalizedData,
    });
  } catch (error) {
    yield put({
      type: Actions.GET_BRANDS_FOLLOWING_FAILURE,
      payload: { error },
    });
  }
}

export default function* saga() {
  yield all([
    takeLatest(Actions.GET_OFFERS_LIKED_REQUEST, getOffersLiked),
    takeLatest(Actions.GET_OFFERS_SAVED_REQUEST, getOffersSaved),
    takeLatest(Actions.GET_BRANDS_FOLLOWING_REQUEST, getBrandsFollowing),
  ]);
}
