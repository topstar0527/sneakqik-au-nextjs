import {
  GET_PLANS_REQUEST,
  GET_PLANS_SUCCESS,
  GET_PLANS_FAILURE,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_FAILURE,
  GET_INVOICES_REQUEST,
  GET_INVOICES_FETCHING,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAILURE,
  REACTIVATE_SUBSCRIPTION_REQUEST,
  REACTIVATE_SUBSCRIPTION_SUCCESS,
  REACTIVATE_SUBSCRIPTION_FAILURE,
} from "./actions";

const initialState = {
  plans: null,
  isUpdating: false,
  chargebee: null,
  invoices: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_PLANS_REQUEST:
      return state;
    case GET_PLANS_SUCCESS:
      return {
        ...state,
        plans: payload,
      };
    case GET_PLANS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        chargebee: null,
        isUpdating: true,
      };
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        chargebee: payload.chargebee,
        isUpdating: false,
      };
    case UPDATE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        chargebee: null,
        isUpdating: false,
        error: payload.error,
      };
    case GET_INVOICES_REQUEST:
      return {
        ...state,
        invoices: [],
      };
    case GET_INVOICES_FETCHING:
      return {
        ...state,
        invoices: [],
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: payload,
      };
    case GET_INVOICES_FAILURE:
      return {
        ...state,
        invoices: [],
      };
    case CANCEL_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        chargebee: null,
        isUpdating: true,
      };
    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        chargebee: payload.chargebee,
        isUpdating: false,
      };
    case CANCEL_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        chargebee: null,
        isUpdating: false,
        error: payload.error,
      };
    case REACTIVATE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        chargebee: null,
        isUpdating: true,
      };
    case REACTIVATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        chargebee: payload.chargebee,
        isUpdating: false,
      };
    case REACTIVATE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        chargebee: null,
        isUpdating: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
