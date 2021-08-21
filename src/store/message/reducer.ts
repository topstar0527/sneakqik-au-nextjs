import { MessageState, MessageActionTypes, SHOW_MESSAGE, HIDE_MESSAGE } from "./types";

const initialState: MessageState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    autoHideDuration: 5000,
    message: "Hi",
    variant: "info",
  },
};

const message = function (state = initialState, action: MessageActionTypes): MessageState {
  switch (action.type) {
    case SHOW_MESSAGE: {
      return {
        state: true,
        options: {
          ...initialState.options,
          ...action.options,
        },
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        state: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default message;
