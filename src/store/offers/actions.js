import { createAction } from "redux-actions";

export const OPEN_NEW_OFFER_DIALOG = "OPEN NEW OFFER DIALOG";
export const CLOSE_NEW_OFFER_DIALOG = "CLOSE NEW OFFER DIALOG";
export const OPEN_EDIT_OFFER_DIALOG = "OPEN EDIT OFFER DIALOG";
export const CLOSE_EDIT_OFFER_DIALOG = "CLOSE EDIT OFFER DIALOG";
export const OPEN_VIEW_OFFER_DIALOG = "OPEN VIEW OFFER DIALOG";
export const CLOSE_VIEW_OFFER_DIALOG = "CLOSE VIEW OFFER DIALOG";

export const MERCHANT_OPEN_VIEW_OFFER_DIALOG = "@merchant/OPEN_VIEW_OFFER_DIALOG";
export const MERCHANT_CLOSE_VIEW_OFFER_DIALOG = "@merchant/CLOSE_VIEW_OFFER_DIALOG";

export const openNewOfferDialog = createAction(OPEN_NEW_OFFER_DIALOG);
export const closeNewOfferDialog = createAction(CLOSE_NEW_OFFER_DIALOG);
export const openEditOfferDialog = createAction(OPEN_EDIT_OFFER_DIALOG);
export const closeEditOfferDialog = createAction(CLOSE_EDIT_OFFER_DIALOG);
export const openViewOfferDialog = createAction(OPEN_VIEW_OFFER_DIALOG);
export const closeViewOfferDialog = createAction(CLOSE_VIEW_OFFER_DIALOG);

export const merchantOpenViewOfferDialog = createAction(MERCHANT_OPEN_VIEW_OFFER_DIALOG);
export const merchantCloseViewOfferDialog = createAction(MERCHANT_CLOSE_VIEW_OFFER_DIALOG);

export const openUpgradeDialog = createAction("OPEN UPGRADE DIALOG");
export const closeUpgradeDialog = createAction("CLOSE UPGRADE DIALOG");
