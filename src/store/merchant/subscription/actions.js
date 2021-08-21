import { createAction } from "redux-actions";

export const GET_PLANS_REQUEST = "@merchant/subscription/GET_PLANS_REQUEST";
export const GET_PLANS_SUCCESS = "@merchant/subscription/GET_PLANS_SUCCESS";
export const GET_PLANS_FAILURE = "@merchant/subscription/GET_PLANS_FAILURE";
export const UPDATE_SUBSCRIPTION_REQUEST = "@merchant/subscription/UPDATE_SUBSCRIPTION";
export const UPDATE_SUBSCRIPTION_SUCCESS = "@merchant/subscription/UPDATE_SUCCESS";
export const UPDATE_SUBSCRIPTION_FAILURE = "@merchant/subscription/UPDATE_FAILURE";
export const GET_INVOICES_REQUEST = "@merchant/subscription/GET_INVOICES_REQUEST";
export const GET_INVOICES_FETCHING = "@merchant/subscription/GET_INVOICES_FETCHING";
export const GET_INVOICES_SUCCESS = "@merchant/subscription/GET_INVOICES_SUCCESS";
export const GET_INVOICES_FAILURE = "@merchant/subscription/GET_INVOICES_FAILURE";
export const CANCEL_SUBSCRIPTION_REQUEST = "@merchant/subscription/CANCEL_SUBSCRIPTION_REQUEST";
export const CANCEL_SUBSCRIPTION_SUCCESS = "@merchant/subscription/CANCEL_SUBSCRIPTION_SUCCESS";
export const CANCEL_SUBSCRIPTION_FAILURE = "@merchant/subscription/CANCEL_SUBSCRIPTION_FAILURE";
export const REACTIVATE_SUBSCRIPTION_REQUEST = "@merchant/subscription/REACTIVATE_SUBSCRIPTION_REQUEST";
export const REACTIVATE_SUBSCRIPTION_SUCCESS = "@merchant/subscription/REACTIVATE_SUBSCRIPTION_SUCCESS";
export const REACTIVATE_SUBSCRIPTION_FAILURE = "@merchant/subscription/REACTIVATE_SUBSCRIPTION_FAILURE";
export default {
  getPlansRequest: createAction(GET_PLANS_REQUEST),
  getPlansSuccess: createAction(GET_PLANS_SUCCESS),
  getPlansFailure: createAction(GET_PLANS_FAILURE),
  updateSubscriptionRequest: createAction(UPDATE_SUBSCRIPTION_REQUEST),
  updateSubscriptionSuccess: createAction(UPDATE_SUBSCRIPTION_SUCCESS),
  updateSubscriptionFailure: createAction(UPDATE_SUBSCRIPTION_FAILURE),
  getInvoicesRequest: createAction(GET_INVOICES_REQUEST),
  getInvoicesFetching: createAction(GET_INVOICES_FETCHING),
  getInvoicesSuccess: createAction(GET_INVOICES_SUCCESS),
  getInvoicesFailure: createAction(GET_INVOICES_FAILURE),
  cancelSubscriptionRequest: createAction(CANCEL_SUBSCRIPTION_REQUEST),
  cancelSubscriptionSuccess: createAction(CANCEL_SUBSCRIPTION_SUCCESS),
  cancelSubscriptionFailure: createAction(CANCEL_SUBSCRIPTION_FAILURE),
  reactivateSubscriptionRequest: createAction(REACTIVATE_SUBSCRIPTION_REQUEST),
  reactivateSubscriptionSuccess: createAction(REACTIVATE_SUBSCRIPTION_SUCCESS),
  reactivateSubscriptionFailure: createAction(REACTIVATE_SUBSCRIPTION_FAILURE),
};
