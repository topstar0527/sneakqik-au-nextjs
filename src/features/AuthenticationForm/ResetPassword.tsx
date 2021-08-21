import React from "react";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

import { GradientButton } from "components/Buttons";
import { authActions } from "store/actions";

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 19,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  formTitle: {
    lineHeight: "31px",
    fontSize: 25,
    marginBottom: 17,
    fontWeight: "bold",
  },
  sendBtn: {
    padding: "10px",
    fontSize: "14px",
  },
}));

export default function ResetPassword() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);

  const handleEnterEmail = () => {
    dispatch(authActions.showUserForgotPassForm());
  };

  const handleResend = () => {
    dispatch(authActions.forgotPasswordRequest({ email: authState.forgotPasswordEmail }));
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.formTitle}>
        Reset your password
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" component="p" align="center">
            We have sent a reset password email to <strong>{authState.forgotPasswordEmail}.</strong>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" component="p" align="center">
            Please click the reset password link to set your new password.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="p" align="center">
            {"Didn't receive the email yet?"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" component="p" align="center">
            Please check your spam folder or click on the resend button to resend the email
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <GradientButton
            className={classes.sendBtn}
            fullWidth
            variant="contained"
            disableElevation
            size="large"
            color="primary"
            disabled={authState.forgotStatus === "pending"}
            onClick={handleResend}
          >
            RESEND THE RESET PASSWORD LINK
          </GradientButton>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="text" disableElevation size="large" color="primary" onClick={handleEnterEmail}>
            ENTER EMAIL AGAIN
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
