import _ from "lodash";
import { normalize } from "normalizr";
import { all, put, call, takeLatest, select } from "redux-saga/effects";

import API from "api";
import {
  offerList as OfferListSchema,
  brandList as BrandListSchema,
  offer as OfferSchema,
  brand as BrandSchema,
} from "schema";
import { authActions } from "store/auth/actions";
import { getUser } from "store/auth/reducer";
import * as Actions from "store/customer/home/actions";
import { getQuery } from "store/customer/home/reducer";
import {
  getOffersByBrandSlug as getOffersByBrandSlugSelector,
  getBrandBySlug as getBrandBySlugSelector,
  getOfferBySlug as getOfferBySlugSelector,
} from "store/entities/reducer";

import { getFeedAllOffersCount, getFeedFetchingStatus, getFeedOffers } from "./reducer";

export function* getOffers({ payload }) {
  try {
    const { data } = yield call(API.user.getOffers, payload);

    const result = normalize(data.results, OfferListSchema);

    yield put(Actions.getOffersSuccess({ ...result, count: data.count }));
  } catch (e) {
    console.error(e);
    yield put(Actions.getOffersFailure());
  }
}

export function* getTodayOffers() {
  try {
    const { data } = yield call(API.user.getTodayOffers);

    const result = normalize(data.results, OfferListSchema);

    yield put(Actions.getTodayQIKOffersSuccess(result));
  } catch (e) {
    console.error(e);
    yield put(Actions.getTodayQIKOffersFailure());
  }
}

export function* getSuggestedBrands() {
  try {
    const { data } = yield call(API.user.getSuggestedBrands);

    const result = normalize(data, BrandListSchema);

    yield put(Actions.getBrandsSuccess(result));
  } catch (e) {
    console.error(e);
    yield put(Actions.getBrandsFailure());
  }
}

export function* getOfferBySlug({ payload }) {
  try {
    const { data } = yield call(API.user.getOfferBySlug, payload);

    const result = normalize(data, OfferSchema);

    yield put(Actions.getOfferBySlugSuccess(result));
  } catch (e) {
    console.error(e);
    yield put(Actions.getOfferBySlugFailure());
  }
}

export function* loadOfferBySlug({ payload }) {
  const offerSlug = payload;

  const offer = yield select(getOfferBySlugSelector(offerSlug));

  if (!offer) {
    yield put(Actions.getOfferBySlugRequest(offerSlug));
  }
}

export function* getBrandBySlug({ payload }) {
  try {
    const { data } = yield call(API.user.getBrandBySlug, payload);

    const normalizedData = normalize(data, BrandSchema);

    yield put(Actions.getBrandBySlugSuccess(normalizedData));
  } catch (e) {
    console.error(e);
    yield put(Actions.getBrandBySlugFailure());
  }
}

export function* loadBrandBySlug({ payload }) {
  const brandSlug = payload;

  const brand = yield select(getBrandBySlugSelector(brandSlug));

  if (!brand) {
    yield put(Actions.getBrandBySlugRequest(brandSlug));
  }
}

export function* getOffersByBrandSlug({ payload }) {
  try {
    const { data } = yield call(API.user.getOffersByBrandSlug, payload);

    const result = normalize(data, OfferListSchema);

    yield put(Actions.getOffersByBrandSlugSuccess(result));
  } catch (e) {
    console.error(e);
    yield put(Actions.getOffersByBrandSlugFailure());
  }
}

export function* loadOffersByBrandSlug({ payload }) {
  const brandSlug = payload;

  const brand = yield select(getBrandBySlugSelector(brandSlug));

  const offers = yield select(getOffersByBrandSlugSelector(brandSlug));

  if (!brand || offers.length < brand.totalOffers) {
    yield put(Actions.getOffersByBrandSlugRequest(brandSlug));
  }
}

export function* loadMoreOffers({ payload }) {
  const offers = yield select(getFeedOffers);

  const isFetching = yield select(getFeedFetchingStatus);

  const allOffersCount = yield select(getFeedAllOffersCount);

  const user = yield select(getUser);

  const { index: i, query } = payload;

  if (i === offers.length - 3 && !isFetching) {
    yield put(Actions.getOffersRequest({ query: query, pagination: { offset: offers.length } }));
  }

  if (!user && i === allOffersCount - 1) {
    yield put(authActions.showUserRegisterForm("Sign up to follow brands and keep track of deals"));
  }
}

export function* loadFeed({ payload }) {
  const query = payload;

  const savedQuery = yield select(getQuery);

  if (!_.isEqual(query, savedQuery)) {
    yield put(Actions.getOffersRequest({ query: query, pagination: { offset: 0 } }));
  }
}

export default function* saga() {
  yield all([
    takeLatest(Actions.GET_OFFERS_REQUEST, getOffers), //
    takeLatest(Actions.GET_TODAY_QIK_OFFERS_REQUEST, getTodayOffers),
    takeLatest(Actions.GET_BRANDS_REQUEST, getSuggestedBrands),
    takeLatest(Actions.getOfferBySlugRequest.toString(), getOfferBySlug),
    takeLatest(Actions.loadOfferBySlug.toString(), loadOfferBySlug),
    takeLatest(Actions.getOffersByBrandSlugRequest.toString(), getOffersByBrandSlug),
    takeLatest(Actions.loadOffersByBrandSlug.toString(), loadOffersByBrandSlug),
    takeLatest(Actions.getBrandBySlugRequest.toString(), getBrandBySlug),
    takeLatest(Actions.loadBrandBySlug.toString(), loadBrandBySlug),
    takeLatest(Actions.loadMoreOffers.toString(), loadMoreOffers),
    takeLatest(Actions.loadFeed.toString(), loadFeed),
  ]);
}
