import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";

import FacebookIcon from "assets/icons/facebook.svg";
import GooglePlusIcon from "assets/icons/google-plus.svg";
import { GoogleButton, FacebookButton } from "components/Buttons";
import { authActions } from "store/actions";

const facebookId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
const googleId = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;

const useStyles = makeStyles(() => ({
  googleBtn: {
    backgroundColor: "#E1584B",
  },
  facebookBtn: {
    backgroundColor: "#3B5998",
  },
}));

type SocialAuthProps = {
  className?: string;
};

const SocialAuth: React.FunctionComponent<SocialAuthProps> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);

  return (
    <Grid className={props.className} container spacing={2}>
      <Grid item xs={6}>
        <FacebookLogin
          appId={facebookId}
          fields="name,email,picture"
          callback={(res: any) => {
            if (res.status !== "unknown") {
              dispatch(
                authActions.loginUserBySocialRequest({
                  provider: "facebook",
                  accessToken: res.accessToken,
                })
              );
            }
          }}
          isMobile={false}
          render={(renderProps: any) => (
            <FacebookButton
              type="submit"
              fullWidth
              variant="contained"
              className={classes.facebookBtn}
              onClick={renderProps.onClick}
              size="large"
              disabled={authState.loginStatus === "pending"}
              startIcon={<SvgIcon fontSize="small" component={FacebookIcon} viewBox="0 0 600 476.6" />}
            >
              Facebook
            </FacebookButton>
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <GoogleLogin
          clientId={googleId as string}
          buttonText="Login"
          onSuccess={(res: any) => {
            dispatch(
              authActions.loginUserBySocialRequest({
                provider: "google",
                accessToken: res.accessToken,
              })
            );
          }}
          render={(renderProps) => (
            <GoogleButton
              onClick={renderProps.onClick}
              variant="contained"
              disableElevation
              size="large"
              className={classes.googleBtn}
              fullWidth
              disabled={authState.loginStatus === "pending"}
              startIcon={<SvgIcon fontSize="small" component={GooglePlusIcon} viewBox="0 0 600 476.6" />}
            >
              Google
            </GoogleButton>
          )}
          onFailure={(error) => console.error(error)}
          cookiePolicy={"single_host_origin"}
        />
      </Grid>
    </Grid>
  );
};

export default SocialAuth;
