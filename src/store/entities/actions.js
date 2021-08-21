import { createAction } from "redux-actions";

export const mergeEntities = createAction("MERGE_ENTITIES");

export const toggleLike = createAction("TOGGLE_LIKE");

export const toggleSave = createAction("TOGGLE_SAVE");

export const shareOffer = createAction("SHARE_OFFER");

export const toggleFollow = createAction("TOGGLE_FOLLOW");

export const LIKE_OFFER = "LIKE_OFFER";

export const SAVE_OFFER = "SAVE_OFFER";

export const REPORT_OFFER = "REPORT_OFFER";

export const FOLLOW_BRAND = "FOLLOW_BRAND";

export const likeOffer = createAction(LIKE_OFFER);

export const saveOffer = createAction(SAVE_OFFER);

export const reportOffer = createAction(REPORT_OFFER);

export const followBrand = createAction(FOLLOW_BRAND);

// comment actions

export const readCommentsRequest = createAction("READ_COMMENTS_REQUEST");
export const readCommentsSuccess = createAction("READ_COMMENTS_SUCCESS");
export const readCommentsFailure = createAction("READ_COMMENTS_FAILURE");

export const createCommentRequest = createAction("CREATE_COMMENT_REQUEST");
export const createCommentSuccess = createAction("CREATE_COMMENT_SUCCESS");
export const createCommentFailure = createAction("CREATE_COMMENT_FAILURE");

export const deleteCommentRequest = createAction("DELETE_COMMENT_REQUEST");
export const deleteCommentSuccess = createAction("DELETE_COMMENT_SUCCESS");
export const deleteCommentFailure = createAction("DELETE_COMMENT_FAILURE");

export const updateCommentRequest = createAction("UPDATE_COMMENT_REQUEST");
export const updateCommentSuccess = createAction("UPDATE_COMMENT_SUCCESS");
export const updateCommentFailure = createAction("UPDATE_COMMENT_FAILURE");
