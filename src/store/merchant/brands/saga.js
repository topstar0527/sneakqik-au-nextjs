import Router from "next/router";
import { normalize } from "normalizr";
import { all, put, call, takeLatest, select } from "redux-saga/effects";

import API from "api";
import { offerList as OfferListSchema, offer as OfferSchema, brand as BrandSchema } from "schema";
import { authActions } from "store/auth/actions";
import { getSelectedBrand } from "store/auth/reducer";
import { mergeEntities } from "store/entities/actions";
import { getOfferById, getOfferById as getOfferByIdSelector } from "store/entities/reducer";
import { showMessage } from "store/message/actions";
import { closeNewOfferDialog, closeEditOfferDialog, openNewOfferDialog, openUpgradeDialog } from "store/offers/actions";

import merchantActions from "./actions";

export function* createBrand({ payload }) {
  try {
    const state = yield select();

    const { data } = yield call(API.merchant.createBrand, {
      ...payload.form,
      business: state.auth.user.business.id,
    });

    yield put(merchantActions.createBrandSuccess(data));

    yield put(merchantActions.goNextStep());
  } catch (e) {
    yield put(merchantActions.createBrandFailure(e));
  }
}

export function* updateBrand({ payload }) {
  try {
    const { data } = yield call(API.merchant.updateBrand, {
      ...payload.form,
      id: payload.id,
    });

    const activeStep = yield select((state) => state.merchant.brands.draft.activeStep);

    if (activeStep === 2) {
      const normalizedData = normalize(data, BrandSchema);
      yield put(mergeEntities(normalizedData));
      yield put(authActions.addBrand(normalizedData));
    }

    yield put(merchantActions.updateBrandSuccess(data));

    yield put(merchantActions.goNextStep());
  } catch (e) {
    yield put(merchantActions.updateBrandFailure(e));
  }
}

export function* getBrandById({ payload }) {
  try {
    const { data } = yield call(API.merchant.getBrandById, payload.brandId);

    yield put(merchantActions.getBrandByIdSuccess(data));
  } catch (e) {
    yield put(merchantActions.getBrandByIdFailure(e));
  }
}

export function* getOffers({ payload }) {
  try {
    const { data } = yield call(API.merchant.getOffers, payload.brandId);

    const normalizedData = normalize(data, OfferListSchema);

    yield put(merchantActions.getOffersSuccess(normalizedData));
  } catch (e) {
    yield put(merchantActions.getOffersFailure(e));
  }
}

export function* createOffer({ payload }) {
  try {
    const { data } = yield call(API.merchant.createOffer, payload);

    yield put(closeNewOfferDialog());

    const normalizedData = normalize(data, OfferSchema);

    yield put(merchantActions.createOfferSuccess(normalizedData));

    if (data.status === "draft") {
      yield put(showMessage({ message: "Your offer has been saved to drafts successfully.", variant: "success" }));
    }

    if (data.status === "published") {
      yield call(Router.push, "/?view=latest&type=all");
      yield put(showMessage({ message: "Your offer was posted successfully.", variant: "success" }));
    }
  } catch (e) {
    yield put(showMessage({ message: e.message, variant: "error" }));
    yield put(merchantActions.createOfferFailure(e));
  }
}

export function* createNewOffer() {
  const selectedBrandData = yield select(getSelectedBrand);
  if (!selectedBrandData) return;

  if (selectedBrandData && selectedBrandData.plan === "basic" && selectedBrandData.offersCountThisMonth >= 3)
    yield put(openUpgradeDialog());
  else yield put(openNewOfferDialog());
}

export function* updateOffer({ payload }) {
  try {
    const offer = yield select(getOfferById(payload.id));

    const { data } = yield call(API.merchant.updateOffer, payload);

    yield put(closeEditOfferDialog());

    const normalizedData = normalize(data, OfferSchema);

    yield put(merchantActions.updateOfferSuccess(normalizedData));

    if (data.status === "draft") {
      yield put(showMessage({ message: "Your offer has been saved to drafts successfully.", variant: "success" }));
    }

    if (data.status === "published") {
      if (offer.status === "draft") {
        yield call(Router.push, "/?view=latest&type=all");
        yield put(showMessage({ message: "Your offer was posted successfully.", variant: "success" }));
      } else {
        yield put(showMessage({ message: "Your offer was edited successfully.", variant: "success" }));
      }
    }
  } catch (e) {
    yield put(merchantActions.updateOfferFailure(e));
  }
}

export function* deleteOffer({ payload }) {
  try {
    yield call(API.merchant.deleteOffer, payload);

    const offer = yield select(getOfferByIdSelector(payload));

    yield put(merchantActions.deleteOfferSuccess(offer.slug));

    yield put(showMessage({ message: "Removed Offer Successfully.", variant: "success" }));
  } catch (e) {
    yield put(showMessage({ message: e.message, variant: "error" }));
    yield put(merchantActions.deleteOfferFailure(e));
  }
}

export function* featureOffer({ payload }) {
  try {
    const offer = payload;

    if (offer.isFeatured) {
      yield call(API.merchant.unFeatureOffer, offer.id);
      yield put(showMessage({ message: "Your offer was unfeatured successfully.", variant: "success" }));
    } else {
      yield call(API.merchant.featureOffer, offer.id);
      yield put(showMessage({ message: "Your offer was featured successfully.", variant: "success" }));
    }

    yield put(merchantActions.featureOfferSuccess(normalize({ ...offer, isFeatured: !offer.isFeatured }, OfferSchema)));
  } catch (e) {
    const message = e.response.data.detail || e.message;
    yield put(showMessage({ message: message, variant: "error" }));
    yield put(merchantActions.featureOfferFailure(e));
  }
}

export default function* brandsSaga() {
  yield all([
    takeLatest(merchantActions.createBrandRequest.toString(), createBrand), //
    takeLatest(merchantActions.updateBrandRequest.toString(), updateBrand),
    //offer
    takeLatest(merchantActions.getOffersRequest.toString(), getOffers),
    takeLatest(merchantActions.createOffer.toString(), createNewOffer),
    takeLatest(merchantActions.createOfferRequest.toString(), createOffer),
    takeLatest(merchantActions.updateOfferRequest.toString(), updateOffer),
    takeLatest(merchantActions.deleteOfferRequest.toString(), deleteOffer),
    takeLatest(merchantActions.featureOfferRequest.toString(), featureOffer),
  ]);
}
