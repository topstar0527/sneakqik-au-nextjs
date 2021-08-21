import {
  MERCHANT_OPEN_VIEW_OFFER_DIALOG,
  MERCHANT_CLOSE_VIEW_OFFER_DIALOG,
  OPEN_VIEW_OFFER_DIALOG,
  CLOSE_VIEW_OFFER_DIALOG,
  OPEN_NEW_OFFER_DIALOG,
  CLOSE_NEW_OFFER_DIALOG,
  OPEN_EDIT_OFFER_DIALOG,
  CLOSE_EDIT_OFFER_DIALOG,
  openUpgradeDialog,
  closeUpgradeDialog,
} from "./actions";

const initialState = {
  offerDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },

  viewDialog: {
    props: {
      open: false,
    },
    data: null,
  },

  merchantViewDialog: {
    props: {
      open: false,
    },
    data: null,
  },

  upgradeDialog: {
    open: false,
  },
};

const offersReducer = function (state = initialState, action) {
  switch (action.type) {
    case MERCHANT_OPEN_VIEW_OFFER_DIALOG: {
      return {
        ...state,
        merchantViewDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }

    case MERCHANT_CLOSE_VIEW_OFFER_DIALOG: {
      return {
        ...state,
        merchantViewDialog: {
          props: {
            open: false,
          },
          data: null,
        },
      };
    }

    case OPEN_VIEW_OFFER_DIALOG: {
      return {
        ...state,
        viewDialog: {
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }

    case CLOSE_VIEW_OFFER_DIALOG: {
      return {
        ...state,
        viewDialog: {
          props: {
            open: false,
          },
          data: null,
        },
      };
    }

    case OPEN_NEW_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: {
          type: "new",
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case CLOSE_NEW_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: {
          type: "new",
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case OPEN_EDIT_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: {
          type: "edit",
          props: {
            open: true,
          },
          data: action.payload,
        },
      };
    }
    case CLOSE_EDIT_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: {
          type: "edit",
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case openUpgradeDialog.toString(): {
      return {
        ...state,
        upgradeDialog: {
          open: true,
        },
      };
    }

    case closeUpgradeDialog.toString(): {
      return {
        ...state,
        upgradeDialog: {
          open: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default offersReducer;

export const getOfferDialog = (state) => state.offers.offerDialog;

export const getOfferViewerDialog = (state) => state.offers.viewDialog;
