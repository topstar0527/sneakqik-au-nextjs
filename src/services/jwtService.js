/* eslint-disable @typescript-eslint/member-ordering */
import { EventEmitter } from "events";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import base from "api/base";

// just used access token for simplicity but it is not a good approach and needs to enhance in the future
class JWTService extends EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    base.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        // !todo need to handle 401 error
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
          // if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          //   // if you ever get an unauthorized response, logout the user
          //   this.emit("onAutoLogout", "Invalid accessToken");
          //   this.setSession(null);
          // }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(accessToken)) {
      this.setSession(accessToken);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "accessToken expired");
    }
  };

  registerUser = (data) => {
    return base({
      url: "/auth/registration/",
      method: "post",
      data: { ...data, userType: "customer" },
    });
  };

  sendVerificationEmail = (token) => {
    return base({
      url: "/users/me/send-email-confirmation/",
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  forgotPassword = ({ email }) =>
    base({
      url: "/auth/password/reset/",
      method: "post",
      data: {
        email,
      },
    });

  resetPassword = (data) => {
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

  signInWithEmailAndPassword = (data) => {
    return new Promise((resolve, reject) => {
      base
        .post("/auth/token/", data)
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access, data.keepMeSignIn);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      base
        .get("/users/me")
        .then((response) => {
          if (response.data) {
            // this.setSession(response.data.accessToken);
            resolve(response.data);
          } else {
            this.logout();
            reject("Failed to login with token.");
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          this.logout();
          reject("Failed to login with token.");
        });
    });
  };

  signInWithSocial = (provider, data) => {
    return new Promise((resolve, reject) => {
      base
        .post(`/auth/${provider}/`, data)
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access);
            resolve(response.data.user);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  verifyEmail = (token) => {
    return new Promise((resolve, reject) => {
      base
        .post(`/auth/account-confirm-email/${token}/`)
        .then((response) => {
          if (response.data) {
            this.setSession(response.data.access);
            resolve(response.data.user);
          } else {
            this.logout();
            reject("Failed to verify the token.");
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          this.logout();
          reject(error);
        });
    });
  };

  updateUser = (data) => {
    return base({
      url: "/users/me/",
      method: "patch",
      data: data,
    });
  };

  setSession = (accessToken, keep = false) => {
    const options = keep ? { expires: 365 } : {};

    if (accessToken) {
      Cookies.set("jwt_accessToken", accessToken, options);
      base.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    } else {
      Cookies.remove("jwt_accessToken");
      delete base.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (accessToken) => {
    if (!accessToken) {
      return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return Cookies.get("jwt_accessToken");
  };
}

const instance = new JWTService();

export default instance;
