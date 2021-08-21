import { SHOW_MESSAGE, HIDE_MESSAGE, MessageActionTypes, MessageOptions } from "./types";

export function hideMessage(): MessageActionTypes {
  return {
    type: HIDE_MESSAGE,
  };
}

export function showMessage(options: MessageOptions): MessageActionTypes {
  return {
    type: SHOW_MESSAGE,
    options,
  };
}
