import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { object, string } from "yup";

import { GradientButton } from "components/Buttons";
import { authActions } from "store/actions";

const useStyles = makeStyles((theme) => ({
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "14px",
    padding: "10px",
  },
}));

export default function ForgotPasswordForm() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: object({
      email: string().email("Please input valid email address").required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(authActions.forgotPasswordRequest(values));
    },
  });

  const handleBack = () => {
    dispatch(authActions.showUserLoginForm());
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.formTitle}>
        Forgot your password?
      </Typography>

      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" align="center">
              Don’t worry. Resetting your password is easy, just tell us is the email address you registered with
              SneakQik and we’ll send you a reset password link.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              size="large"
              color="primary"
              className={classes.submit}
              disabled={!formik.isValid || authState.forgotStatus === "pending"}
            >
              SEND ME A RESET PASSWORD LINK
            </GradientButton>

            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              size="large"
              color="primary"
              // className={classes.submit}
              disabled={authState.forgotStatus === "pending"}
              onClick={handleBack}
            >
              BACK TO LOGIN
            </GradientButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
