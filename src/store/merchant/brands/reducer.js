import Actions from "./actions";

const initialState = {
  draft: {
    closable: false,
    open: false,
    activeStep: 0,
    data: {},
    error: null,
  },
  brands: [],
  selectedBrand: {},
  offers: [],
  offersById: {},
  errors: null,
  isOfferSaving: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Actions.deleteOfferSuccess.toString(): {
      const updatedOffers = state.offers.filter((slug) => slug !== action.payload);
      return {
        ...state,
        offers: updatedOffers,
      };
    }

    case Actions.updateOfferRequest.toString(): {
      return {
        ...state,
        isOfferSaving: true,
      };
    }

    case Actions.updateOfferFailure.toString(): {
      return {
        ...state,
        errors: action.payload?.response?.data,
        isOfferSaving: false,
      };
    }

    case Actions.updateOfferSuccess.toString(): {
      return {
        ...state,
        isOfferSaving: false,
      };
    }

    case Actions.createOfferRequest.toString(): {
      return {
        ...state,
        isOfferSaving: true,
      };
    }

    case Actions.createOfferSuccess.toString(): {
      return {
        ...state,
        offers: [...state.offers, action.payload.result],
        isOfferSaving: false,
      };
    }

    case Actions.createOfferFailure.toString(): {
      return {
        ...state,
        errors: action.payload?.response?.data,
        isOfferSaving: false,
      };
    }

    case Actions.getOffersRequest.toString(): {
      return state;
    }

    case Actions.getOffersSuccess.toString(): {
      return { ...state, offers: action.payload.result };
    }

    case Actions.getOffersFailure.toString(): {
      return state;
    }

    case Actions.initDraftEditor.toString(): {
      return {
        ...state,
        draft: { ...initialState.draft, ...action.payload },
      };
    }

    case Actions.createBrandSuccess.toString(): {
      return {
        ...state,
        draft: {
          ...state.draft,
          data: {
            ...state.draft.data,
            ...action.payload,
          },
        },
      };
    }

    case Actions.createBrandFailure.toString(): {
      return {
        ...state,
        draft: {
          ...state.draft,
          error: action.payload?.response?.data,
        },
      };
    }

    case Actions.updateBrandSuccess.toString(): {
      return {
        ...state,
        draft: {
          ...state.draft,
          data: {
            ...state.draft.data,
            ...action.payload,
          },
        },
      };
    }

    case Actions.updateBrandFailure.toString(): {
      return {
        ...state,
        draft: {
          ...state.draft,
          error: action.payload?.response?.data,
        },
      };
    }

    case Actions.goNextStep.toString(): {
      return {
        ...state,
        draft: {
          ...state.draft,
          activeStep: state.draft.activeStep + 1,
        },
      };
    }

    default:
      return state;
  }
}
