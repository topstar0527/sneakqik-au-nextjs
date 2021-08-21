import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "store/actions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    flexDirection: "column",
  },
  loadingIndicator: {
    marginBottom: "18px",
    opacity: 0.5,
  },
  loadingDescription: {
    fontSize: "18px",
    lineHeight: "21px",
    textAlign: "center",
  },
}));

const VerifyEmail: React.FunctionComponent = () => {
  const classes = useStyles();

  const authState = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const router = useRouter();
  const { token = "" }: { token?: string } = router.query;
  const { status } = authState;

  // query: Object - The query string parsed to an object.
  // It will be an empty object during prerendering if the page doesn't have data fetching requirements.
  // Defaults to {}

  React.useEffect(() => {
    if (token) {
      dispatch(authActions.emailConfirmTokenRequest(token));
    }
  }, [token]);

  if (status === "none") {
    return null;
  } else if (status === "pending") {
    return (
      <Backdrop className={classes.backdrop} open={status === "pending"}>
        <CircularProgress className={classes.loadingIndicator} thickness={8} size={89} color="inherit" />
        <Typography className={classes.loadingDescription} component="p">
          Verifying your email...
        </Typography>
      </Backdrop>
    );
  } else if (status === "error") {
    return <div>{authState.errors.detail}</div>;
  } else if (status === "success") {
    if (authState.user.userType === "customer") router.push("/profile");
    else router.push("/merchant/onboarding");
  }

  return null;
};

export default VerifyEmail;
