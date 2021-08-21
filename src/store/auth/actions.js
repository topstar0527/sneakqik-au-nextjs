import { createAction } from "redux-actions";

export const INIT_VALUES = "@auth/INIT_VALUES";

export const CREATE_USER_REQUEST = "@auth/CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "@auth/CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "@auth/CREATE_USER_FAILURE";

export const UPDATE_USER_REQUEST = "@auth/UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "@auth/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "@auth/UPDATE_USER_FAILURE";

export const LOGIN_USER_REQUEST = "@auth/LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "@auth/LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "@auth/LOGIN_USER_FAILURE";

export const LOGIN_USER_WITH_TOKEN = "@auth/LOGIN_USER_WITH_TOKEN";

export const LOGIN_USER_BY_SOCIAL_REQUEST = "@auth/LOGIN_USER_BY_SOCIAL_REQUEST";
export const LOGIN_USER_BY_SOCIAL_SUCCESS = "@auth/LOGIN_USER_BY_SOCIAL_SUCCESS";
export const LOGIN_USER_BY_SOCIAL_FAILURE = "@auth/LOGIN_USER_BY_SOCIAL_FAILURE";

export const USER_PROFILE_REQUEST = "@auth/USER_PROFILE_REQUEST";
export const USER_PROFILE_SUCCESS = "@auth/USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILURE = "@auth/USER_PROFILE_FAILURE";

export const LOGOUT_REQUEST = "@auth/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "@auth/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "@auth/LOGOUT_FAILURE";

export const FORGOT_PASSWORD_REQUEST = "@auth/FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "@auth/FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "@auth/FORGOT_PASSWORD_FAILURE";

export const EMAIL_CONFIRM_REQUEST = "@auth/EMAIL_CONFIRM_REQUEST";
export const EMAIL_CONFIRM_SUCCESS = "@auth/EMAIL_CONFIRM_SUCCESS";
export const EMAIL_CONFIRM_FAILURE = "@auth/EMAIL_CONFIRM_FAILURE";

export const RESEND_CONFIRM_REQUEST = "@auth/RESEND_CONFIRM_REQUEST";
export const RESEND_CONFIRM_SUCCESS = "@auth/RESEND_CONFIRM_SUCCESS";
export const RESEND_CONFIRM_FAILURE = "@auth/RESEND_CONFIRM_FAILURE";

export const RESET_PASSWORD_REQUEST = "@auth/RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "@auth/RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "@auth/RESET_PASSWORD_FAILURE";

export const EMAIL_CONFIRM_TOKEN_REQUEST = "@auth/EMAIL_CONFIRM_TOKEN_REQUEST";
export const EMAIL_CONFIRM_TOKEN_SUCCESS = "@auth/EMAIL_CONFIRM_TOKEN_SUCCESS";
export const EMAIL_CONFIRM_TOKEN_FAILURE = "@auth/EMAIL_CONFIRM_TOKEN_FAILURE";

export const CANCEL_RESET_PASSWORD_REQUEST = "@auth/CANCEL_RESET_PASSWORD_REQUEST";
export const CANCEL_RESET_PASSWORD_SUCCESS = "@auth/CANCEL_RESET_PASSWORD_SUCCESS";
export const CANCEL_RESET_PASSWORD_FAILURE = "@auth/CANCEL_RESET_PASSWORD_FAILURE";

export const CHECK_SUCCESS = "@auth/CHECK_SUCCESS";

export const SHOW_USER_LOGIN_FORM = "@auth/SHOW_USER_LOGIN_FORM";
export const SHOW_USER_REGISTER_FORM = "@auth/SHOW_USER_REGISTER_FORM";
export const SHOW_USER_FORGOT_PASS_FORM = "@auth/SHOW_USER_FORGOT_PASS_FORM";
export const SHOW_USER_RESET_PASS_FORM = "@auth/SHOW_USER_RESET_PASS_FORM";
export const SHOW_UER_VERIFICATION_EMAIL_FORM = "@auth/SHOW_UER_VERIFICATION_EMAIL_FORM";
export const CLOSE_DIALOG = "@auth/CLOSE_DIALOG";

export const CLEAR_ERROR = "@auth/CLEAR_ERROR";

export const SET_USER_INFO = "@auth/SET_USER_INFO";

export const UPDATE_BRAND = "@auth/UPDATE_BRAND";

export const GET_NOTIFICATIONS_REQUEST = "@auth/GET_NOTIFICATIONS_REQUEST";
export const GET_NOTIFICATIONS_SUCCESS = "@auth/GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILURE = "@auth/GET_NOTIFICATIONS_FAILURE";
export const MARK_NOTIFICATION_READ_REQUEST = "@auth/MARK_NOTIFICATION_READ_REQUEST";
export const MARK_NOTIFICATION_READ_SUCCESS = "@auth/MARK_NOTIFICATION_READ_SUCCESS";
export const MARK_NOTIFICATION_READ_FAILURE = "@auth/MARK_NOTIFICATION_READ_FAILURE";

export const UPDATE_NOTIFICATION_REQUEST = "@auth/UPDATE_NOTIFICATION_REQUEST";
export const UPDATE_NOTIFICATION_SUCCESS = "@auth/UPDATE_NOTIFICATION_SUCCESS";
export const UPDATE_NOTIFICATION_FAILURE = "@auth/UPDATE_NOTIFICATION_FAILURE";

export const SELECT_BRAND = "@auth/SELECT_BRAND";

export const UPDATE_CHARGEBEE_PLAN = "auth/UPDATE_CHARGEBEE_PLAN";

export const ADD_BRAND = "@auth/ADD_BRAND";

export const SHOW_INTENT_MODAL = "@auth/SHOW_INTENT_MODAL";

export const authActions = {
  // Init State
  initValues: createAction(INIT_VALUES),
  // Register
  createUserRequest: createAction(CREATE_USER_REQUEST),
  createUserSuccess: createAction(CREATE_USER_SUCCESS),
  createUserFailure: createAction(CREATE_USER_FAILURE),
  // Update User Info
  updateUserRequest: createAction(UPDATE_USER_REQUEST),
  updateUserSuccess: createAction(UPDATE_USER_SUCCESS),
  updateUserFailure: createAction(UPDATE_USER_FAILURE),
  // Login
  loginUserRequest: createAction(LOGIN_USER_REQUEST),
  loginUserSuccess: createAction(LOGIN_USER_SUCCESS),
  loginUserFailure: createAction(LOGIN_USER_FAILURE),
  // Login
  loginUserBySocialRequest: createAction(LOGIN_USER_BY_SOCIAL_REQUEST),
  loginUserBySocialSuccess: createAction(LOGIN_USER_BY_SOCIAL_SUCCESS),
  loginUserBySocialFailure: createAction(LOGIN_USER_BY_SOCIAL_FAILURE),
  // Login with token
  loginUserWithToken: createAction(LOGIN_USER_WITH_TOKEN),
  // Profile
  userProfileRequest: createAction(USER_PROFILE_REQUEST),
  userProfileSuccess: createAction(USER_PROFILE_SUCCESS),
  userProfileFailure: createAction(USER_PROFILE_FAILURE),
  // Logout
  logoutRequest: createAction(LOGOUT_REQUEST),
  logoutSuccess: createAction(LOGOUT_SUCCESS),
  logoutFailure: createAction(LOGOUT_FAILURE),
  // Forgot password
  forgotPasswordRequest: createAction(FORGOT_PASSWORD_REQUEST),
  forgotPasswordSuccess: createAction(FORGOT_PASSWORD_SUCCESS),
  forgotPasswordFailure: createAction(FORGOT_PASSWORD_FAILURE),
  // Email Confirm
  emailConfirmRequest: createAction(EMAIL_CONFIRM_REQUEST),
  emailConfirmSuccess: createAction(EMAIL_CONFIRM_SUCCESS),
  emailConfirmFailure: createAction(EMAIL_CONFIRM_FAILURE),
  // Resend Email Confirm
  resendConfirmRequest: createAction(RESEND_CONFIRM_REQUEST),
  resendConfirmSuccess: createAction(RESEND_CONFIRM_SUCCESS),
  resendConfirmFailure: createAction(RESEND_CONFIRM_FAILURE),
  // Reset Password
  resetPwdRequest: createAction(RESET_PASSWORD_REQUEST),
  resetPwdSuccess: createAction(RESET_PASSWORD_SUCCESS),
  resetPwdFailure: createAction(RESET_PASSWORD_FAILURE),
  // Cancel Reset Password
  cancelResetPwdRequest: createAction(CANCEL_RESET_PASSWORD_REQUEST),
  cancelResetPwdSuccess: createAction(CANCEL_RESET_PASSWORD_SUCCESS),
  cancelResetPwdFailure: createAction(CANCEL_RESET_PASSWORD_FAILURE),
  //
  emailConfirmTokenRequest: createAction(EMAIL_CONFIRM_TOKEN_REQUEST),
  emailConfirmTokenSuccess: createAction(EMAIL_CONFIRM_TOKEN_SUCCESS),
  emailConfirmTokenFailure: createAction(EMAIL_CONFIRM_TOKEN_FAILURE),
  // Check authentication
  checkSuccess: createAction(CHECK_SUCCESS),
  // Authentication UI
  showUserLoginForm: createAction(SHOW_USER_LOGIN_FORM),
  showUserRegisterForm: createAction(SHOW_USER_REGISTER_FORM),
  showUserForgotPassForm: createAction(SHOW_USER_FORGOT_PASS_FORM),
  showUserResetPassForm: createAction(SHOW_USER_RESET_PASS_FORM),
  showUserVerificationEmailForm: createAction(SHOW_UER_VERIFICATION_EMAIL_FORM),
  closeDialog: createAction(CLOSE_DIALOG),

  clearError: createAction(CLEAR_ERROR),

  setUserInfo: createAction(SET_USER_INFO),

  updateBrand: createAction(UPDATE_BRAND),

  // Notifications
  getNotificationsRequest: createAction(GET_NOTIFICATIONS_REQUEST),
  getNotificationsSuccess: createAction(GET_NOTIFICATIONS_SUCCESS),
  getNotificationsFailure: createAction(GET_NOTIFICATIONS_FAILURE),
  markNotificationReadRequest: createAction(MARK_NOTIFICATION_READ_REQUEST),
  markNotificationReadSuccess: createAction(MARK_NOTIFICATION_READ_SUCCESS),
  markNotificationReadFailure: createAction(MARK_NOTIFICATION_READ_FAILURE),
  updateNotificationRequest: createAction(UPDATE_NOTIFICATION_REQUEST),
  updateNotificationSuccess: createAction(UPDATE_NOTIFICATION_SUCCESS),
  updateNotificationFailure: createAction(UPDATE_NOTIFICATION_FAILURE),

  selectBrand: createAction(SELECT_BRAND),

  updateChargebeePlan: createAction(UPDATE_CHARGEBEE_PLAN),

  addBrand: createAction(ADD_BRAND),

  showIntentModal: createAction(SHOW_INTENT_MODAL),
};
