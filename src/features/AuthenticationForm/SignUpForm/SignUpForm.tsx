import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
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

import { SignUpFormSchema, SignUpFormType } from "./types";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formTitle: {
    lineHeight: "31px",
    fontSize: 25,
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    backgroundColor: "#E1584B",
  },
  facebookBtn: {
    backgroundColor: "#3B5998",
  },
  divider: {
    width: "100%",
    marginTop: theme.spacing(3),
    textShadow: "0 0 #333",
    textTransform: "uppercase",
  },
  checkboxLabel: {
    fontWeight: "normal",
    lineHeight: "14px",
  },
}));

const SignUpFormInitValues: SignUpFormType = {
  email: "",
  password: "",
  isSubscribed: true,
  terms: false,
};

export default function SignUpForm() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.auth);

  const formik = useFormik({
    initialValues: SignUpFormInitValues,
    validationSchema: SignUpFormSchema,
    onSubmit: (values) => {
      dispatch(authActions.createUserRequest(values));
    },
  });

  React.useEffect(() => {
    if (authState.errors) {
      formik.setErrors(authState.errors);
      dispatch(authActions.clearError());
    }
  }, [formik.setErrors, authState.errors]);

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.formTitle} align="center">
        {authState.title}
      </Typography>

      <Grid container justify="center">
        <Grid item>
          <b>BUSINESS?</b>{" "}
          <Link target="_blank" href="/business/forbusinesses.html" variant="body2">
            Sign Up Here
            <br />
            <br />
          </Link>
        </Grid>
      </Grid>

      <SocialAuth />

      <Divider className={classes.divider} text="or" />

      <form className={classes.form} noValidate onSubmit={formik.handleSubmit} autoComplete="off">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
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
          <Grid item xs={12}>
            <FormControl required error={formik.touched.terms && Boolean(formik.errors.terms)}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="terms"
                    name="terms"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value="allowExtraEmails"
                    color="primary"
                    style={{ alignSelf: "baseline", paddingTop: 6 }}
                  />
                }
                label={
                  <span className={classes.checkboxLabel}>
                    I agree to SneakQIK&apos;s{" "}
                    <Link target="_blank" href="/privacy-terms" prefetch={false}>
                      Terms & Conditions and Privacy Policy
                    </Link>
                  </span>
                }
              />
              <FormHelperText>{formik.touched.terms && formik.errors.terms}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  id="marketing"
                  name="isSubscribed"
                  checked={formik.values.isSubscribed}
                  onChange={formik.handleChange}
                  value="allowExtraEmails"
                  color="primary"
                />
              }
              label={
                <span className={classes.checkboxLabel}>I’d like to get exclusive coupons & QIK deals by email. </span>
              }
            />
          </Grid>
        </Grid>
        <GradientButton
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          size="large"
          color="primary"
          className={classes.submit}
          disabled={!formik.isValid || authState.registerStatus === "pending" || authState.loginStatus === "pending"}
        >
          QIK Sign Up
        </GradientButton>
        <Grid container justify="center">
          <Grid item>
            <b>BUSINESS?</b>{" "}
            <Link target="_blank" href="/business/forbusinesses.html" variant="body2">
              Sign Up Here
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
