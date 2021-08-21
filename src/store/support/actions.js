import { createAction } from "redux-actions";

export const SHOW_CONTACT_US_DIALOG = "SHOW_CONTACT_US_DIALOG";
export const CLOSE_CONTACT_US_DIALOG = "CLOSE_CONTACT_US_DIALOG";

export const closeContactUsDialog = createAction(CLOSE_CONTACT_US_DIALOG);

export default {
  showContactUsDialog: createAction(SHOW_CONTACT_US_DIALOG),
  closeContactUsDialog: createAction(CLOSE_CONTACT_US_DIALOG),
};
