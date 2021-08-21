import base from "./base";

// const getToken = (email, password) =>
//   base({
//     url: "/auth/token/",
//     method: "post",
//     data: {
//       email,
//       password,
//     },
//   });

// const refreshToken = (refresh) =>
//   base({
//     url: "/auth/token/refresh/",
//     method: "post",
//     data: {
//       refresh,
//     },
//   });

// const sendInvite = ({ role, solar_company, email, first_name, last_name }) =>
//   base({
//     url: "/auth/send-invite/",
//     method: "post",
//     data: {
//       role,
//       solar_company,
//       email,
//       first_name,
//       last_name,
//     },
//   });

// const acceptInvite = (key) =>
//   base({
//     url: `/auth/accept-invite/${key}/`,
//     method: "get",
//   });

// need to check data type
const registerUser = (data: any) => {
  return base({
    url: "/auth/registration/",
    method: "post",
    data: { ...data, userType: "customer" },
  });
};

const loginUser = (data: any) => {
  return base({
    url: "/auth/token/",
    method: "post",
    data: data,
  });
};

const verifyEmail = (token: string) => {
  return base({
    url: `/auth/account-confirm-email/${token}/`,
    method: "post",
  });
};

const forgotPassword = (email: string) =>
  base({
    url: "/auth/password/reset/",
    method: "post",
    data: {
      email,
    },
  });

const resetPassword = (data: any) => {
  return base({
    url: "/auth/password/reset/confirm/",
    method: "post",
    data: {
      ...data,
      newPassword1: data.password,
      newPassword2: data.password,
    },
  });
};

const updateUserProfile = (data: any) => {
  return base({
    url: "/users/me/",
    method: "patch",
    data: data,
  });
};

const sendVerificationEmail = (token: string) => {
  return base({
    url: "/users/me/send-email-confirmation/",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const registerBusiness = (data: any) => {
  return base({
    url: "/auth/registration/",
    method: "post",
    data: { ...data, userType: "merchant" },
  });
};

const setupBusiness = (data: any, token?: string) => {
  if (token)
    return base({
      url: "/users/me/setup-business/",
      method: "post",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  else
    return base({
      url: "/users/me/setup-business/",
      method: "post",
      data: data,
    });
};

const setupPayment = (data: any, token: string) => {
  return base({
    url: "/users/me/setup-payment/",
    method: "post",
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateNotificationSettings = (data) => {
  return base({
    url: "/users/me/notification-setting/",
    method: "post",
    data: data,
  });
};

const deleteAccount = () => {
  return base({
    url: "/users/me/delete-account/",
    method: "delete",
  });
};
export default {
  // getToken,
  // refreshToken,
  // sendInvite,
  // acceptInvite,
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  sendVerificationEmail,
  registerBusiness,
  setupBusiness,
  setupPayment,
  updateNotificationSettings,
  deleteAccount,
};
