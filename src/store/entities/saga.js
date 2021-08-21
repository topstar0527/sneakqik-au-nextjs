import { normalize } from "normalizr";
import { all, put, call, takeLatest, select } from "redux-saga/effects";

import API from "api";
import base from "api/base";
import { commentList as CommentListSchema, comment as CommentSchema } from "schema";
import { authActions } from "store/auth/actions";
import * as Actions from "store/entities/actions";
import { getOfferBySlug } from "store/entities/reducer";
import { showMessage } from "store/message/actions";

export function* followBrand({ payload }) {
  const user = yield select((state) => state.auth.user);

  const brand = payload;

  if (!user) {
    yield put(authActions.showUserLoginForm());
  } else {
    try {
      yield put(Actions.toggleFollow(brand));
      if (brand.isFollowed) {
        yield call(API.user.unfollowBrand, brand);
      } else {
        yield call(API.user.followBrand, brand);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function* likeOffer({ payload }) {
  const user = yield select((state) => state.auth.user);

  const offer = payload;

  if (!user) {
    yield put(authActions.showUserLoginForm());
  } else {
    try {
      yield put(Actions.toggleLike(offer));

      if (offer.isLiked) {
        yield call(API.user.unlike, offer.id);
      } else {
        yield call(API.user.like, offer.id);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function* saveOffer({ payload }) {
  const user = yield select((state) => state.auth.user);

  const offer = payload;

  if (!user) {
    yield put(authActions.showUserLoginForm());
  } else {
    try {
      yield put(Actions.toggleSave(offer));

      if (offer.isSaved) {
        yield call(API.user.remove, offer.id);
      } else {
        yield call(API.user.save, offer.id);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function* reportOffer({ payload }) {
  const user = yield select((state) => state.auth.user);

  const offer = payload;

  if (!user) {
    yield put(authActions.showUserLoginForm());
  } else {
    try {
      yield call(API.user.report, offer.id);
      yield put(showMessage({ message: "Reported", variant: "success" }));
    } catch (e) {
      yield put(showMessage({ message: e.message, variant: "error" }));
      console.error(e);
    }
  }
}

export function* shareOffer({ payload }) {
  const offerSlug = payload.slug;

  const offer = yield select(getOfferBySlug(offerSlug));

  try {
    yield call(API.user.share, offer.id);
  } catch (e) {
    yield put(showMessage({ message: e.message, variant: "error" }));
    console.error(e);
  }
}

export function* readComments({ payload }) {
  try {
    const offer = payload;

    const { data } = yield call(base.get, `/offers/${offer.id}/comments/`);

    const normalizedData = normalize(data, CommentListSchema);

    yield put(Actions.readCommentsSuccess({ offer: offer, ...normalizedData }));
  } catch (e) {
    console.error(e);
    yield put(Actions.readCommentsFailure());
  }
}

export function* createComment({ payload }) {
  try {
    const user = yield select((state) => state.auth.user);

    if (!user) {
      yield put(authActions.showUserLoginForm());
      return;
    }

    const offer = payload.offer;
    const comment = payload.comment;

    const { data } = yield call(base.post, `/offers/${offer.id}/comments/`, comment);

    const normalizedData = normalize(data, CommentSchema);

    yield put(Actions.createCommentSuccess({ offer: offer, ...normalizedData }));
  } catch (e) {
    console.error(e);
    yield put(Actions.createCommentFailure());
  }
}

export function* deleteComment({ payload }) {
  try {
    const offer = payload.offer;

    const comment = payload.comment;

    yield call(base.delete, `/offers/${comment.offerId}/comments/${comment.id}`);

    yield put(Actions.deleteCommentSuccess({ offer: offer, data: comment }));
  } catch (e) {
    console.error(e);
    yield put(Actions.deleteCommentFailure());
  }
}

export function* updateComment({ payload }) {
  try {
    const comment = payload.comment;

    const { data } = yield call(base.patch, `/offers/${comment.offerId}/comments/${comment.id}/`, comment);

    const normalizedData = normalize(data, CommentSchema);

    yield put(Actions.updateCommentSuccess(normalizedData));
  } catch (e) {
    console.error(e);
    yield put(Actions.updateCommentFailure());
  }
}

export default function* saga() {
  yield all([
    takeLatest(Actions.FOLLOW_BRAND, followBrand),
    takeLatest(Actions.LIKE_OFFER, likeOffer),
    takeLatest(Actions.SAVE_OFFER, saveOffer),
    takeLatest(Actions.REPORT_OFFER, reportOffer),
    takeLatest(Actions.shareOffer.toString(), shareOffer),
    takeLatest(Actions.readCommentsRequest.toString(), readComments),
    takeLatest(Actions.createCommentRequest.toString(), createComment),
    takeLatest(Actions.deleteCommentRequest.toString(), deleteComment),
    takeLatest(Actions.updateCommentRequest.toString(), updateComment),
  ]);
}
