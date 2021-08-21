import actions from "./actions";

const initialState = {
  offers: {
    liked: [],
    saved: [],
  },
  brands: [],
  error: null,
  action: null,
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actions.GET_OFFERS_LIKED_REQUEST:
    case actions.GET_OFFERS_SAVED_REQUEST:
    case actions.GET_BRANDS_FOLLOWING_REQUEST:
      return state;

    case actions.GET_OFFERS_LIKED_FAILURE:
    case actions.GET_OFFERS_SAVED_FAILURE:
    case actions.GET_BRANDS_FOLLOWING_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    case actions.GET_OFFERS_LIKED_SUCCESS:
      return {
        ...state,
        offers: {
          ...state.offers,
          liked: payload.result,
        },
      };

    case actions.GET_OFFERS_SAVED_SUCCESS:
      return {
        ...state,
        offers: {
          ...state.offers,
          saved: payload.result,
        },
      };

    case actions.GET_BRANDS_FOLLOWING_SUCCESS:
      return {
        ...state,
        brands: payload.result,
      };
    default:
      return state;
  }
};

export default reducer;
