import produce from "immer";

import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  EMAIL_CONFIRM_REQUEST,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILURE,
  RESEND_CONFIRM_REQUEST,
  RESEND_CONFIRM_SUCCESS,
  RESEND_CONFIRM_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CANCEL_RESET_PASSWORD_REQUEST,
  CANCEL_RESET_PASSWORD_SUCCESS,
  CANCEL_RESET_PASSWORD_FAILURE,
  EMAIL_CONFIRM_TOKEN_REQUEST,
  EMAIL_CONFIRM_TOKEN_SUCCESS,
  EMAIL_CONFIRM_TOKEN_FAILURE,
  CHECK_SUCCESS,
  SHOW_USER_LOGIN_FORM,
  SHOW_USER_REGISTER_FORM,
  SHOW_USER_FORGOT_PASS_FORM,
  SHOW_USER_RESET_PASS_FORM,
  SHOW_UER_VERIFICATION_EMAIL_FORM,
  CLOSE_DIALOG,
  CLEAR_ERROR,
  LOGIN_USER_BY_SOCIAL_REQUEST,
  LOGIN_USER_BY_SOCIAL_SUCCESS,
  LOGIN_USER_BY_SOCIAL_FAILURE,
  SET_USER_INFO,
  UPDATE_BRAND,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  MARK_NOTIFICATION_READ_REQUEST,
  MARK_NOTIFICATION_READ_SUCCESS,
  MARK_NOTIFICATION_READ_FAILURE,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_CHARGEBEE_PLAN,
  INIT_VALUES,
  ADD_BRAND,
  SHOW_INTENT_MODAL,
} from "./actions";

const initialState = {
  open: false,
  currentForm: "signIn",
  registerUserData: null,
  registerStatus: "none",
  errors: null,
  loginStatus: "none",
  status: "none",
  forgotPasswordEmail: "",
  token: "",
  checking: true,
  user: null,
  notifications: [],
  forgotStatus: "none",
  resetPwdStatus: "none",
  resetPwdErrors: null,
  title: "Shopper Sign Up",
};

const enhanceUserInfo = (data) => {
  data.brands = data.brands ?? [];

  const notificationSettings = data.notificationSettings;
  const notificationSettingsByType = {};
  notificationSettings.forEach((s) => (notificationSettingsByType[s.type] = s));

  data.notificationSettingsByType = notificationSettingsByType;

  data.avatar =
    data.avatar || `https://www.tinygraphs.com/squares/${data.id}?theme=bythepool&numcolors=4&size=220&fmt=svg`;

  return data;
};

export default function reducer(state = initialState, action = {}) {
  // console.log("auth", state);

  switch (action.type) {
    case ADD_BRAND: {
      const brand = action.payload;

      const nextState = produce(state, (draftState) => {
        draftState.user.brands.push(brand.slug);
      });

      return nextState;
    }

    case GET_NOTIFICATIONS_REQUEST: {
      return state;
    }

    case GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }

    case GET_NOTIFICATIONS_FAILURE: {
      return state;
    }

    case MARK_NOTIFICATION_READ_REQUEST: {
      return state;
    }

    case MARK_NOTIFICATION_READ_SUCCESS: {
      const updated = state.notifications.filter((item) => item.id !== action.payload);
      return { ...state, notifications: updated };
    }

    case MARK_NOTIFICATION_READ_FAILURE: {
      return state;
    }

    case UPDATE_NOTIFICATION_REQUEST: {
      const item = action.payload;
      const updated = { ...state.user.notificationSettingsByType };
      updated[item.type] = { ...updated[item.type], ...item };

      return {
        ...state,
        user: {
          ...state.user,
          notificationSettingsByType: updated,
          notificationSettings: Object.values(updated),
        },
      };
    }

    case UPDATE_NOTIFICATION_FAILURE: {
      return state;
    }

    case UPDATE_NOTIFICATION_SUCCESS: {
      return state;
    }

    case SET_USER_INFO: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case UPDATE_BRAND: {
      return state;
    }

    case INIT_VALUES:
      if (action.payload && Array.isArray(action.payload)) {
        action.payload.forEach((stateName) => {
          if (initialState[stateName] !== undefined) {
            state[stateName] = initialState[stateName];
          }
        });
      }
      return {
        ...state,
      };

    case CHECK_SUCCESS: {
      return {
        ...state,
        checking: false,
      };
    }

    // Register
    case CREATE_USER_REQUEST:
      return {
        ...state,
        registerStatus: "pending",
      };

    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        registerStatus: "success",
        token: action.payload.data.access,
        registerUserData: action.payload.data.user,
      };
    }

    case CREATE_USER_FAILURE:
      return {
        ...state,
        registerStatus: "error",
        errors: action.payload.response?.data,
      };

    // Update User Info
    case UPDATE_USER_REQUEST: {
      return { ...state, status: "pending" };
    }

    case UPDATE_USER_SUCCESS: {
      return { ...state, status: "success", user: enhanceUserInfo(action.payload) };
    }

    case UPDATE_USER_FAILURE: {
      return { ...state, status: "failure", errors: action.payload?.response?.data };
    }

    // Login
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginStatus: "pending",
        errors: null,
      };

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginStatus: "success",
        user: enhanceUserInfo(action.payload),
        open: false,
      };
    }

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginStatus: "error",
        errors: action.payload.response?.data,
      };
    // Profile
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loginStatus: "running",
        profileStatus: "running",
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loginStatus: "success",
        profileStatus: "success",
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        loginStatus: "failure",
        profileStatus: "failure",
        user: null,
      };
    // Logout
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutStatus: "running",
      };
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }
    case LOGOUT_FAILURE:
      return {
        ...state,
        user: null,
      };
    // Forgot
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotStatus: "pending",
        forgotPasswordEmail: action.payload.email,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotStatus: "success",
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
      };
    // Confirm Email
    case EMAIL_CONFIRM_REQUEST:
      return {
        ...state,
        status: "pending",
      };
    case EMAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        status: "success",
      };
    case EMAIL_CONFIRM_FAILURE:
      return {
        ...state,
        status: "error",
        // errors: action.payload.response.data,
      };
    // Resend Confirm Email
    case RESEND_CONFIRM_REQUEST:
      return {
        ...state,
        resendConfirmStatus: "running",
      };
    case RESEND_CONFIRM_SUCCESS:
      return {
        ...state,
        resendConfirmStatus: "success",
      };
    case RESEND_CONFIRM_FAILURE:
      return {
        ...state,
        resendConfirmStatus: "failure",
        resendConfirmErrors: action.payload.errors,
      };
    // Reset Password
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPwdStatus: "pending",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPwdStatus: "success",
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPwdStatus: "error",
        resetPwdErrors: action.payload?.response?.data,
      };
    // Cancel Reset Password
    case CANCEL_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        cancelResetPwdStatus: "running",
      };
    case CANCEL_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        cancelResetPwdStatus: "success",
      };
    case CANCEL_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        cancelResetPwdStatus: "failure",
        cancelResetPwdErrors: action.payload.errors,
      };
    //
    case EMAIL_CONFIRM_TOKEN_REQUEST: {
      return {
        ...state,
        status: "pending",
      };
    }
    case EMAIL_CONFIRM_TOKEN_SUCCESS: {
      return {
        ...state,
        status: "success",
        user: enhanceUserInfo(action.payload),
      };
    }
    case EMAIL_CONFIRM_TOKEN_FAILURE: {
      return {
        ...state,
        status: "error",
        errors: action.payload.response?.data,
      };
    }
    case SHOW_USER_LOGIN_FORM:
      return {
        ...state,
        open: true,
        currentForm: "signIn",
      };

    case "USER_REGISTER": {
      if (state.registerUserData && state.registerUserData) {
        return {
          ...state,
          open: true,
          registerStatus: "none",
          currentForm: "verifyEmail",
        };
      } else {
        return {
          ...state,
          open: true,
          registerStatus: "none",
          currentForm: "signUp",
        };
      }
    }

    case SHOW_USER_REGISTER_FORM: {
      return {
        ...state,
        open: true,
        currentForm: "signUp",
        title: action.payload || "Shopper Sign Up",
      };
    }

    case SHOW_USER_FORGOT_PASS_FORM:
      return {
        ...state,
        forgotStatus: "none",
        currentForm: "forgotPass",
        errors: null,
      };

    case SHOW_USER_RESET_PASS_FORM:
      return {
        ...state,
        forgotStatus: "none",
        currentForm: "resetPass",
      };

    case SHOW_UER_VERIFICATION_EMAIL_FORM:
      return {
        ...state,
        currentForm: "verifyEmail",
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        open: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errors: null,
      };

    case LOGIN_USER_BY_SOCIAL_REQUEST: {
      return {
        ...state,
        loginStatus: "pending",
      };
    }
    case LOGIN_USER_BY_SOCIAL_SUCCESS: {
      return {
        ...state,
        loginStatus: "success",
        user: enhanceUserInfo(action.payload),
        open: false,
      };
    }
    case LOGIN_USER_BY_SOCIAL_FAILURE: {
      return {
        ...state,
        loginStatus: "error",
      };
    }
    case UPDATE_CHARGEBEE_PLAN: {
      return {
        ...state,
        user: { ...state.user, chargebee: action.payload },
      };
    }
    case SHOW_INTENT_MODAL: {
      return {
        ...state,
        open: true,
        currentForm: "intentModal",
        title: action.payload || "Become a Sneaker",
      };
    }
    default:
      return state;
  }
}

export const getSelectedBrand = (state) => {
  if (!state.auth.user) return;

  const { selectedBrand } = state.auth.user;

  const brands = state.entities.brands;

  return Object.values(brands).find((b) => b.id === selectedBrand);
};

export const getUser = (state) => {
  return state.auth.user;
};
