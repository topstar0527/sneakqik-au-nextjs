import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import TextField from "components/core/TextField";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    margin: "24px",

    [theme.breakpoints.up("sm")]: {
      maxWidth: "280px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  submit: {
    height: "45px",
  },

  checkboxLabel: {
    fontWeight: "normal",
    lineHeight: "14px",
    fontSize: "12px",
  },
}));

export const MobileBusinessDetailSchema = Yup.object({
  email: Yup.string().email("Please enter a valid business email.").required("Business Email Address is required."),
  password: Yup.string().min(8, "Too short. Use at least 8 characters").required("Password is required."),
  terms: Yup.bool().oneOf([true, false], "Please accept the SneakQIK Terms of Service before continuing."),
}).required();

export type MobileBusinessDetailType = Yup.InferType<typeof MobileBusinessDetailSchema>;

const MobileBusinessDetailInitValues: MobileBusinessDetailType = {
  email: "",
  password: "",
  terms: false,
};

type MobileBusinessDetailFormProps = {
  actions: any;
  state: any;
};

const MobileBusinessDetailForm: React.FC<MobileBusinessDetailFormProps> = (props) => {
  const classes = useStyles();

  const handleSubmit = (values: MobileBusinessDetailType) => {
    props.actions.registerBusiness(values);
  };

  const formik = useFormik({
    initialValues: MobileBusinessDetailInitValues,
    validationSchema: MobileBusinessDetailSchema,
    onSubmit: handleSubmit,
  });

  React.useEffect(() => {
    if (props.state.status === "success") {
      props.actions.goNext();
    } else if (props.state.errors) {
      formik.setErrors(props.state.errors);
    }
  }, [props.state]);

  return (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="email"
            variant="standard"
            required
            fullWidth
            id="businessEmail"
            label="Business Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            showHelper
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            variant="standard"
            required
            fullWidth
            name="password"
            label="New Password"
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
                  I agree with{" "}
                  <Link target="_blank" href="/privacy-terms" prefetch={false}>
                    Terms of User Agreement
                  </Link>
                  .
                </span>
              }
            />
            <FormHelperText>{formik.touched.terms && formik.errors.terms}</FormHelperText>
          </FormControl>
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
          >
            NEXT
          </GradientButton>
        </Grid>

        <Grid item xs={12}>
          <Typography align="center">
            Already have an account?{" "}
            <Link href="/merchant/login" variant="body2">
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default MobileBusinessDetailForm;
