import {
  SHOW_CONTACT_US_DIALOG, //
  CLOSE_CONTACT_US_DIALOG,
} from "./actions";

const initialState = {
  contactUsDialogOpen: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_CONTACT_US_DIALOG: {
      return {
        ...state,
        contactUsDialogOpen: true,
      };
    }

    case CLOSE_CONTACT_US_DIALOG: {
      return {
        ...state,
        contactUsDialogOpen: false,
      };
    }

    default:
      return state;
  }
}
