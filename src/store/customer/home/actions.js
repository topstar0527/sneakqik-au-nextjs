import { createAction } from "redux-actions";

export const GET_OFFERS_BY_SLUG_REQUEST = "GET_OFFERS_BY_SLUG_REQUEST";
export const GET_OFFERS_BY_SLUG_SUCCESS = "GET_OFFERS_BY_SLUG_SUCCESS";
export const GET_OFFERS_BY_SLUG_FAILURE = "GET_OFFERS_BY_SLUG_FAILURE";

export const GET_OFFERS_REQUEST = "GET_OFFERS_REQUEST";
export const GET_OFFERS_SUCCESS = "GET_OFFERS_SUCCESS";
export const GET_OFFERS_FAILURE = "GET_OFFERS_FAILURE";

export const GET_BRANDS_REQUEST = "GET_BRANDS_REQUEST";
export const GET_BRANDS_SUCCESS = "GET_BRANDS_SUCCESS";
export const GET_BRANDS_FAILURE = "GET_BRANDS_FAILURE";

export const GET_TODAY_QIK_OFFERS_REQUEST = "GET_TODAY_QIK_OFFERS_REQUEST";
export const GET_TODAY_QIK_OFFERS_SUCCESS = "GET_TODAY_QIK_OFFERS_SUCCESS";
export const GET_TODAY_QIK_OFFERS_FAILURE = "GET_TODAY_QIK_OFFERS_FAILURE";

export const loadBrandBySlug = createAction("LOAD_BRAND_BY_SLUG");
export const getBrandBySlugRequest = createAction("GET_BRAND_BY_SLUG_REQUEST");
export const getBrandBySlugSuccess = createAction("GET_BRAND_BY_SLUG_SUCCESS");
export const getBrandBySlugFailure = createAction("GET_BRAND_BY_SLUG_FAILURE");

export const loadOfferBySlug = createAction("LOAD_OFFER_BY_SLUG");
export const getOfferBySlugRequest = createAction("GET_OFFER_BY_SLUG_REQUEST");
export const getOfferBySlugSuccess = createAction("GET_OFFER_BY_SLUG_SUCCESS");
export const getOfferBySlugFailure = createAction("GET_OFFER_BY_SLUG_FAILURE");

export const loadOffersByBrandSlug = createAction("LOAD_OFFERS_BY_BRAND_SLUG");
export const getOffersByBrandSlugRequest = createAction(GET_OFFERS_BY_SLUG_REQUEST);
export const getOffersByBrandSlugSuccess = createAction(GET_OFFERS_BY_SLUG_SUCCESS);
export const getOffersByBrandSlugFailure = createAction(GET_OFFERS_BY_SLUG_FAILURE);

export const getOffersRequest = createAction(GET_OFFERS_REQUEST);
export const getOffersSuccess = createAction(GET_OFFERS_SUCCESS);
export const getOffersFailure = createAction(GET_OFFERS_FAILURE);

export const getBrandsRequest = createAction(GET_BRANDS_REQUEST);
export const getBrandsSuccess = createAction(GET_BRANDS_SUCCESS);
export const getBrandsFailure = createAction(GET_BRANDS_FAILURE);

export const getTodayQIKOffersRequest = createAction(GET_TODAY_QIK_OFFERS_REQUEST);
export const getTodayQIKOffersSuccess = createAction(GET_TODAY_QIK_OFFERS_SUCCESS);
export const getTodayQIKOffersFailure = createAction(GET_TODAY_QIK_OFFERS_FAILURE);

export const loadMoreOffers = createAction("LOAD_MORE_OFFERS");

export const loadFeed = createAction("LOAD_FEED");
