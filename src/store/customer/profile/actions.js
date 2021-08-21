import { createAction } from "redux-actions";

export default {
  GET_OFFERS_LIKED_REQUEST: "@customer/profile/GET_OFFERS_LIKED_REQUEST",
  GET_OFFERS_LIKED_SUCCESS: "@customer/profile/GET_OFFERS_LIKED_SUCCESS",
  GET_OFFERS_LIKED_FAILURE: "@customer/profile/GET_OFFERS_LIKED_FAILURE",
  GET_OFFERS_SAVED_REQUEST: "@customer/profile/GET_OFFERS_SAVED_REQUEST",
  GET_OFFERS_SAVED_SUCCESS: "@customer/profile/GET_OFFERS_SAVED_SUCCESS",
  GET_OFFERS_SAVED_FAILURE: "@customer/profile/GET_OFFERS_SAVED_FAILURE",
  GET_BRANDS_FOLLOWING_REQUEST: "@customer/profile/GET_BRANDS_FOLLOWING_REQUEST",
  GET_BRANDS_FOLLOWING_SUCCESS: "@customer/profile/GET_BRANDS_FOLLOWING_SUCCESS",
  GET_BRANDS_FOLLOWING_FAILURE: "@customer/profile/GET_BRANDS_FOLLOWING_FAILURE",
  getOffersLiked: createAction("@customer/profile/GET_OFFERS_LIKED_REQUEST"),
  getOffersSaved: createAction("@customer/profile/GET_OFFERS_SAVED_REQUEST"),
  getBrandsFollowing: createAction("@customer/profile/GET_BRANDS_FOLLOWING_REQUEST"),
};
