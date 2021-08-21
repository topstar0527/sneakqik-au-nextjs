import Router from "next/router";
import nookies from "nookies";
import { normalize } from "normalizr";
import { all, put, call, takeLatest, select } from "redux-saga/effects";

import auth from "api/auth";
import base, { setHeaders } from "api/base";
import notification from "api/notification";
import { brandList as BrandListSchema } from "schema";
import jwtService from "services/jwtService";
import { getSelectedBrand } from "store/auth/reducer";
import { mergeEntities } from "store/entities/actions";
import { showMessage } from "store/message/actions";

import {
  CREATE_USER_REQUEST,
  UPDATE_USER_REQUEST,
  LOGIN_USER_REQUEST,
  // USER_PROFILE_REQUEST,
  LOGOUT_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  EMAIL_CONFIRM_REQUEST,
  // RESEND_CONFIRM_REQUEST,
  RESET_PASSWORD_REQUEST,
  EMAIL_CONFIRM_TOKEN_REQUEST,
  authActions,
  LOGIN_USER_BY_SOCIAL_REQUEST,
  UPDATE_NOTIFICATION_REQUEST,
  SELECT_BRAND,
  LOGIN_USER_WITH_TOKEN,
  GET_NOTIFICATIONS_REQUEST,
  MARK_NOTIFICATION_READ_REQUEST,
} from "./actions";

export function* resetPassword({ payload }) {
  try {
    yield call(jwtService.resetPassword, payload);

    yield put(authActions.resetPwdSuccess());

    yield call(Router.push, "/");

    yield put(authActions.showUserLoginForm());
  } catch (e) {
    yield put(authActions.resetPwdFailure(e));
  }
}

// export function* resendConfirmEmail({ payload }) {
//   try {
//     // yield call(api.resendConfirmEmail, payload);

//     yield put(authActions.resendConfirmSuccess());
//   } catch (err) {
//     yield put(authActions.resendConfirmFailure());
//   }
// }

export function* confirmEmail({ payload }) {
  try {
    yield call(jwtService.sendVerificationEmail, payload);
    yield put(authActions.emailConfirmSuccess());
  } catch (err) {
    yield put(authActions.emailConfirmFailure());
  }
}

export function* createUser({ payload }) {
  try {
    const { data } = yield call(jwtService.registerUser, payload);

    yield call(jwtService.sendVerificationEmail, data.access);

    yield put(authActions.createUserSuccess({ values: payload, data: data }));

    yield put(authActions.showUserVerificationEmailForm());
  } catch (e) {
    yield put(authActions.createUserFailure(e));
  }
}

export function* updateUser({ payload }) {
  try {
    const { data } = yield call(jwtService.updateUser, payload);

    const normalizedData = normalize(data.brands || [], BrandListSchema);

    yield put(mergeEntities(normalizedData));

    yield put(authActions.updateUserSuccess({ ...data, brands: normalizedData.result }));

    yield put(showMessage({ message: "Update Settings Successfully.", variant: "success" }));
  } catch (e) {
    yield put(authActions.updateUserFailure(e));
  }
}

export function* flowAfterLogin() {
  const user = yield select((state) => state.auth.user);

  if (user.userType === "merchant") {
    const { brands } = user;
    if (brands.length === 0) {
      if (localStorage.getItem("isOnboarding") === "no") {
        yield call(Router.push, "/merchant/brands/draft");
      } else {
        yield call(Router.push, "/merchant/onboarding");
      }
    } else {
      const selectedBrand = yield select(getSelectedBrand);
      yield call(Router.push, `/merchant/brands/[brandSlug]`, `/merchant/brands/${selectedBrand.slug}`);
    }
  } else yield call(Router.reload);
}

export function* normalizeUser(data) {
  const normalizedData = normalize(data.brands || [], BrandListSchema);
  yield put(mergeEntities(normalizedData));

  return { ...data, brands: normalizedData.result };
}

export function* loginUser({ payload }) {
  try {
    const data = yield call(jwtService.signInWithEmailAndPassword, payload);

    const normalizedUser = yield call(normalizeUser, data);

    yield put(authActions.loginUserSuccess(normalizedUser));

    yield call(flowAfterLogin);
  } catch (e) {
    yield put(authActions.loginUserFailure(e));
  }
}

export function* loginUserWithSocial({ payload }) {
  const params = {
    accessToken: payload.accessToken,
    code: payload.code,
  };

  try {
    const data = yield call(jwtService.signInWithSocial, payload.provider, params);

    const normalizedUser = yield call(normalizeUser, data);

    yield put(authActions.loginUserBySocialSuccess(normalizedUser));

    yield call(flowAfterLogin);
  } catch (e) {
    yield put(authActions.loginUserBySocialFailure(e));
  }
}

export function* loginUserWithToken({ payload }) {
  const ctx = payload || {};

  const cookies = nookies.get(ctx);

  const { jwt_accessToken: accessToken } = cookies;

  if (accessToken && jwtService.isAuthTokenValid(accessToken)) {
    try {
      setHeaders("Authorization", "Bearer " + accessToken);

      const { data } = yield call(base.get, `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`);

      const normalizedUser = yield call(normalizeUser, data);

      yield put(authActions.loginUserSuccess(normalizedUser));
    } catch (e) {
      // if token is unauthorized, logout
      setHeaders("Authorization", "");

      nookies.destroy(ctx, "jwt_accessToken");
    }
  } else {
    setHeaders("Authorization", "");
    nookies.destroy(ctx, "jwt_accessToken");
  }
}

// export function* userProfile() {
//   try {
//     const response = yield call(api.userProfile, {});
//     const user = response.data.data;
//     yield put(authActions.userProfileSuccess({ user }));
//   } catch (err) {
//     yield put(authActions.userProfileFailure());
//   }
// }

export function* logout() {
  try {
    yield call(jwtService.logout);

    yield put(authActions.logoutSuccess());

    yield call(Router.reload);
  } catch (err) {
    yield put(authActions.logoutFailure());
  }
}

export function* forgotPassword({ payload }) {
  try {
    yield call(jwtService.forgotPassword, payload);
    yield put(authActions.forgotPasswordSuccess());
    yield put(authActions.showUserResetPassForm());
  } catch (err) {
    yield put(authActions.forgotPasswordFailure());
    yield put(authActions.closeDialog());
  }
}

export function* confirmToken({ payload }) {
  try {
    const user = yield call(jwtService.verifyEmail, payload);

    yield put(authActions.emailConfirmTokenSuccess(user));
  } catch (e) {
    yield put(authActions.emailConfirmTokenFailure(e));
  }
}

export function* getNotifications() {
  try {
    const { data } = yield call(notification.getNotificationsUnread);

    yield put(authActions.getNotificationsSuccess(data));
  } catch (e) {
    yield put(authActions.getNotificationsFailure(e));
  }
}

export function* markNotificationRead({ payload }) {
  try {
    yield call(notification.markNotificationRead, payload);
    yield put(authActions.markNotificationReadSuccess(payload.id));
  } catch (e) {
    yield put(authActions.markNotificationReadFailure(e));
  }
}

export function* updateNotification({ payload }) {
  try {
    yield call(auth.updateNotificationSettings, payload);

    yield put(authActions.updateNotificationSuccess(payload));
  } catch (e) {
    yield put(authActions.updateNotificationFailure(e));
  }
}

export function* selectBrand({ payload }) {
  try {
    const { data } = yield call(jwtService.updateUser, payload);

    const normalizedData = normalize(data.brands || [], BrandListSchema);

    yield put(mergeEntities(normalizedData));

    yield put(authActions.updateUserSuccess({ ...data, brands: normalizedData.result }));
  } catch (e) {
    yield put(authActions.updateUserFailure(e));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(CREATE_USER_REQUEST, createUser),
    takeLatest(UPDATE_USER_REQUEST, updateUser),
    takeLatest(LOGIN_USER_REQUEST, loginUser),
    takeLatest(LOGIN_USER_BY_SOCIAL_REQUEST, loginUserWithSocial),
    takeLatest(LOGIN_USER_WITH_TOKEN, loginUserWithToken),
    // takeLatest(USER_PROFILE_REQUEST, userProfile),
    takeLatest(LOGOUT_REQUEST, logout),
    takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword),
    takeLatest(EMAIL_CONFIRM_REQUEST, confirmEmail),
    // takeLatest(RESEND_CONFIRM_REQUEST, resendConfirmEmail),
    takeLatest(RESET_PASSWORD_REQUEST, resetPassword),
    takeLatest(EMAIL_CONFIRM_TOKEN_REQUEST, confirmToken),
    takeLatest(GET_NOTIFICATIONS_REQUEST, getNotifications),
    takeLatest(MARK_NOTIFICATION_READ_REQUEST, markNotificationRead),
    takeLatest(UPDATE_NOTIFICATION_REQUEST, updateNotification),
    takeLatest(SELECT_BRAND, selectBrand),
  ]);
}
