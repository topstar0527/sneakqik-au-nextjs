import React from "react";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";

import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import { authActions } from "store/actions";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  formTitle: {
    lineHeight: "31px",
    fontSize: 25,
    marginBottom: "39px",
    fontWeight: "bold",
  },
  text1: {
    marginBottom: "4px",
  },
  text2: {
    fontWeight: "bold",
    marginBottom: "27px",
  },
  text3: {
    lineHeight: "20px",
    marginBottom: "20px",
  },
  text4: {
    marginBottom: "25px",
    fontWeight: "bold",
  },
  resendBtn: {
    marginBottom: "8px",
  },
  enterBtn: {
    marginBottom: "40px",
  },
  divider: {
    width: "100%",
    marginBottom: "20px",
  },
  contactText: {
    fontSize: "12px",
    lineHeight: "18px",
    color: "#000000",
  },
}));

const PleaseVerifyYourEmails: React.FunctionComponent = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);

  const handleResendEmail = () => {
    // actions.sendVerificationEmail();
    dispatch(authActions.emailConfirmRequest(authState.token));
  };

  // const handleEnterEmail = () => {
  //   authDispatch({ type: "USER_SHOW_SIGN_UP_FORM" });
  // };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.formTitle} align="center">
        Please verify your email
      </Typography>

      <Typography className={classes.text1} variant="body1" component="p" align="center">
        You’re almost there! We sent an email to
      </Typography>

      <Typography className={classes.text2} variant="body1" component="p" align="center">
        {authState.registerUserData && authState.registerUserData.email}
      </Typography>

      <Typography variant="body1" component="p" align="center">
        Just click on the link in that email to complete your sign up.
      </Typography>

      <Typography className={classes.text3} variant="body1" component="p" align="center">
        If you don’t see it, you may need to check <strong>your spam folder.</strong>
      </Typography>

      <Divider className={classes.divider} />

      <Typography className={classes.text4} variant="body1" component="p" align="center">
        {"Still can't find the email?"}
      </Typography>

      <GradientButton
        fullWidth
        variant="contained"
        disableElevation
        color="primary"
        className={classes.resendBtn}
        disabled={authState.status === "pending"}
        onClick={handleResendEmail}
      >
        RESEND EMAIL
      </GradientButton>

      {/* hide "ENTER EMAIL AGAIN" button temporarily*/}
      {/* <Button
        fullWidth
        variant="text"
        disableElevation
        color="primary"
        className={classes.enterBtn}
        onClick={handleEnterEmail}
      >
        ENTER EMAIL AGAIN
      </Button> */}

      <Typography className={classes.contactText} variant="body2" component="p" align="center">
        Need help?{" "}
        <Link color="initial" href="#">
          Contact us
        </Link>
      </Typography>
    </div>
  );
};

export default PleaseVerifyYourEmails;
