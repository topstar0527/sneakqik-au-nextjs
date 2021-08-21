import { createAction } from "redux-actions";

export default {
  initDraftEditor: createAction("@merchant/INIT_DRAFT_EDITOR"),

  // create brand
  createBrandRequest: createAction("@merchant/CREATE_BRAND_REQUEST"),
  createBrandSuccess: createAction("@merchant/CREATE_BRAND_SUCCESS"),
  createBrandFailure: createAction("@merchant/CREATE_BRAND_FAILURE"),
  // update brand
  updateBrandRequest: createAction("@merchant/UPDATE_BRAND_REQUEST"),
  updateBrandSuccess: createAction("@merchant/UPDATE_BRAND_SUCCESS"),
  updateBrandFailure: createAction("@merchant/UPDATE_BRAND_FAILURE"),

  goNextStep: createAction("@merchant/GO_NEXT_STEP"),

  //offer
  getOffersRequest: createAction("@merchant/GET_OFFERS_REQUEST"),
  getOffersSuccess: createAction("@merchant/GET_OFFERS_SUCCESS"),
  getOffersFailure: createAction("@merchant/GET_OFFERS_FAILURE"),

  createOffer: createAction("@merchant/CREATE_OFFER"),
  createOfferRequest: createAction("@merchant/CREATE_OFFER_REQUEST"),
  createOfferSuccess: createAction("@merchant/CREATE_OFFER_SUCCESS"),
  createOfferFailure: createAction("@merchant/CREATE_OFFER_FAILURE"),

  updateOfferRequest: createAction("@merchant/UPDATE_OFFER_REQUEST"),
  updateOfferSuccess: createAction("@merchant/UPDATE_OFFER_SUCCESS"),
  updateOfferFailure: createAction("@merchant/UPDATE_OFFER_FAILURE"),

  deleteOfferRequest: createAction("@merchant/DELETE_OFFER_REQUEST"),
  deleteOfferSuccess: createAction("@merchant/DELETE_OFFER_SUCCESS"),
  deleteOfferFailure: createAction("@merchant/DELETE_OFFER_FAILURE"),

  featureOfferRequest: createAction("@merchant/FEATURE_OFFER_REQUEST"),
  featureOfferSuccess: createAction("@merchant/FEATURE_OFFER_SUCCESS"),
  featureOfferFailure: createAction("@merchant/FEATURE_OFFER_FAILURE"),
};
