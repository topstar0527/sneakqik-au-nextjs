import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { GradientButton } from "components/Buttons";
import Divider from "components/core/Divider";
import Link from "components/core/Link";
import TextField from "components/core/TextField";
import SocialAuth from "features/AuthenticationForm/SocialAuth";
import { authActions } from "store/actions";

import { SignInFormSchema, SignInFormType } from "./types";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    marginTop: theme.spacing(3),
    textShadow: "0 0 #333",
    padding: 5,
  },

  formTitle: {
    lineHeight: "31px",
    fontSize: 25,
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
  },
}));

const SignInFormInitValues: SignInFormType = {
  email: "",
  password: "",
  keepMeSignIn: false,
};

export default function SignInForm() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);

  const toggleSignUpForm = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(authActions.showUserRegisterForm());
  };

  const toggleForgotPassForm = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(authActions.showUserForgotPassForm());
  };

  const formik = useFormik({
    initialValues: SignInFormInitValues,
    validationSchema: SignInFormSchema,
    onSubmit: (values) => {
      dispatch(authActions.loginUserRequest(values));
    },
  });

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.formTitle}>
        Log In
      </Typography>

      <form className="w-full" noValidate onSubmit={formik.handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              type="email"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          <Grid item xs={12} container>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="keepMeSignIn"
                    value="allowExtraEmails"
                    color="primary"
                    style={{ alignSelf: "baseline", paddingTop: 6 }}
                    name="keepMeSignIn"
                    checked={formik.values.keepMeSignIn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
                label={<span>Keep me signed in</span>}
              />
            </Grid>

            <Grid item xs={6} container alignItems="center" justify="flex-end">
              <Link href="#" variant="body2" onClick={toggleForgotPassForm} align="right">
                Forgot your password?
              </Link>
            </Grid>
          </Grid>

          {authState.errors && authState.errors.detail && (
            <Grid item xs={12}>
              <Typography color="error" variant="body1" component="p">
                {authState.errors.detail}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              size="large"
              color="primary"
              disabled={!formik.isValid || authState.loginStatus === "pending"}
            >
              SNEAK IN
            </GradientButton>
          </Grid>
        </Grid>
      </form>

      <Divider className={classes.divider} text="or log in with " />

      <SocialAuth className="mb-6" />

      <Grid className="mt-5" container justify="center">
        <Grid item>
          {"Don't have an account? "}
          <Link href="#" variant="body2" onClick={toggleSignUpForm}>
            Shopper Sign Up
          </Link>{" "}
          |{" "}
          <Link target="_blank" href="/business/forbusinesses.html" variant="body2">
            Business Sign Up
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
