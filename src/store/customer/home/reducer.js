import {
  getOfferBySlugRequest,
  getOfferBySlugSuccess,
  getOfferBySlugFailure,
  getBrandBySlugRequest,
  getBrandBySlugSuccess,
  getBrandBySlugFailure,
  GET_OFFERS_BY_SLUG_REQUEST,
  GET_OFFERS_BY_SLUG_SUCCESS,
  GET_OFFERS_BY_SLUG_FAILURE,
  GET_OFFERS_REQUEST,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_FAILURE,
  GET_TODAY_QIK_OFFERS_REQUEST,
  GET_TODAY_QIK_OFFERS_SUCCESS,
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAILURE,
} from "./actions";

const initialState = {
  isFetching: false,
  offers: [],
  todayOffers: [],
  brands: [],
  isOffersFetching: false,
  isFetchingOfferBySlug: false,
  isFetchingBrandBySlug: false,
  allOffersCount: 0,
  query: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getOfferBySlugRequest.toString(): {
      return { ...state, isFetchingOfferBySlug: true };
    }

    case getOfferBySlugSuccess.toString(): {
      return { ...state, isFetchingOfferBySlug: false };
    }

    case getOfferBySlugFailure.toString(): {
      return { ...state, isFetchingOfferBySlug: false };
    }

    case getBrandBySlugRequest.toString(): {
      return { ...state, isFetchingBrandBySlug: true };
    }

    case getBrandBySlugSuccess.toString(): {
      return { ...state, isFetchingBrandBySlug: false };
    }

    case getBrandBySlugFailure.toString(): {
      return { ...state, isFetchingBrandBySlug: false };
    }

    case GET_OFFERS_BY_SLUG_REQUEST: {
      return { ...state, isOffersFetching: true };
    }

    case GET_OFFERS_BY_SLUG_SUCCESS: {
      return { ...state, isOffersFetching: false };
    }

    case GET_OFFERS_BY_SLUG_FAILURE: {
      return { ...state, isOffersFetching: false };
    }

    case GET_OFFERS_REQUEST: {
      if (action.payload.pagination.offset === 0) {
        return {
          ...state,
          isFetching: true,
          offers: [],
          query: action.payload.query,
        };
      }
      return {
        ...state,
        isFetching: true,
        query: action.payload.query,
      };
    }

    case GET_OFFERS_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        isFetching: false,
        offers: state.offers.concat(data.result),
        allOffersCount: action.payload.count,
      };
    }

    case GET_OFFERS_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }

    case GET_TODAY_QIK_OFFERS_REQUEST: {
      return {
        ...state,
      };
    }

    case GET_TODAY_QIK_OFFERS_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        todayOffers: data.result,
      };
    }

    case GET_BRANDS_REQUEST: {
      return state;
    }

    case GET_BRANDS_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        brands: data.result,
      };
    }

    case GET_BRANDS_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default reducer;

export const getFeedOffers = (state) => {
  return state.customer.home.offers;
};

export const getFeedAllOffersCount = (state) => {
  return state.customer.home.allOffersCount;
};

export const getFeedFetchingStatus = (state) => {
  return state.customer.home.isFetching;
};

export const getQuery = (state) => {
  return state.customer.home.query;
};
