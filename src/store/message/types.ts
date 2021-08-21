import { SnackbarOrigin } from "@material-ui/core/Snackbar";

export type MessageOptions = {
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  message: string;
  variant: "success" | "error" | "info" | "warning";
};

export type MessageState = {
  options: MessageOptions;
  state: boolean | null;
};

export const SHOW_MESSAGE = "[MESSAGE] SHOW";

export const HIDE_MESSAGE = "[MESSAGE] CLOSE";

export interface ShowMessageAction {
  options: MessageOptions;
  type: typeof SHOW_MESSAGE;
}

export interface HideMessageAction {
  type: typeof HIDE_MESSAGE;
}

export type MessageActionTypes = ShowMessageAction | HideMessageAction;
