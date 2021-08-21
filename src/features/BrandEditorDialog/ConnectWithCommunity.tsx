import React from "react";

import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";

import { GradientButton } from "components/Buttons";
import StaticTextField from "components/core/StaticTextField";
import actions from "store/actions";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    marginBottom: "18px",
  },

  footer: {
    marginBottom: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      alignItems: "stretch",
      marginTop: "-8px",
    },
  },

  stepper: {
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
      marginTop: "8px",
      marginBottom: "8px",
    },
  },

  comment: {
    paddingLeft: "18px",
    paddingRight: "18px",
    fontSize: 11,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginTop: "8px",
      marginBottom: "8px",
      paddingLeft: "inherit",
      paddingRight: "inherit",
    },
  },

  nextButton: {
    paddingLeft: 26,
    paddingRight: 26,
    marginTop: "8px",
    marginBottom: "8px",
  },
}));

const ConnectWithCommunityInitValues = {
  publicPhoneNumber: "",
  publicEmail: "",
  facebookUrl: "",
  twitterUrl: "",
  instagramUrl: "",
};

const ConnectWithCommunitySchema = object({
  publicPhoneNumber: string(),
  publicEmail: string().email("Please input valid email address"),
  facebookUrl: string().url("Please enter a valid facebook url."),
  twitterUrl: string().url("Please enter a valid twitter url."),
  instagramUrl: string().url("Please enter a valid instagram url."),
}).required();

export default function ConnectWithCommunity() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const brandDraft = useSelector((state: any) => state.merchant.brands.draft.data);

  const formik = useFormik({
    initialValues: ConnectWithCommunityInitValues,
    validationSchema: ConnectWithCommunitySchema,
    onSubmit: (values) => {
      dispatch(actions.merchant.brands.updateBrandRequest({ form: values, id: brandDraft.id }));
    },
  });

  return (
    <React.Fragment>
      <Typography className={classes.title} variant="h5" gutterBottom>
        Connect with the community
      </Typography>

      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <StaticTextField
              id="publicPhoneNumber"
              name="publicPhoneNumber"
              label="Phone number (publicly shown)"
              variant="standard"
              placeholder=""
              fullWidth
              value={formik.values.publicPhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.publicPhoneNumber && Boolean(formik.errors.publicPhoneNumber)}
              helperText={formik.touched.publicPhoneNumber && formik.errors.publicPhoneNumber}
            />
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              variant="standard"
              fullWidth
              label="Email Address"
              name="publicEmail"
              value={formik.values.publicEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.publicEmail && Boolean(formik.errors.publicEmail)}
              helperText={formik.touched.publicEmail && formik.errors.publicEmail}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Social media info
            </Typography>
            <Typography>Your social media network links</Typography>
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              variant="standard"
              fullWidth
              id="facebookUrl"
              label="Connect with Facebook"
              name="facebookUrl"
              value={formik.values.facebookUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.facebookUrl && Boolean(formik.errors.facebookUrl)}
              helperText={formik.touched.facebookUrl && formik.errors.facebookUrl}
            />
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              variant="standard"
              fullWidth
              id="twitterUrl"
              label="Connect with Twitter"
              name="twitterUrl"
              value={formik.values.twitterUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.twitterUrl && Boolean(formik.errors.twitterUrl)}
              helperText={formik.touched.twitterUrl && formik.errors.twitterUrl}
            />
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              variant="standard"
              fullWidth
              id="instagramUrl"
              label="Connect with Instagram"
              name="instagramUrl"
              value={formik.values.instagramUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.instagramUrl && Boolean(formik.errors.instagramUrl)}
              helperText={formik.touched.instagramUrl && formik.errors.instagramUrl}
            />
          </Grid>
        </Grid>

        <hr style={{ margin: "14.5px -24px" }}></hr>

        <div className={classes.footer}>
          <MobileStepper
            className={classes.stepper}
            variant="dots"
            steps={4}
            position="static"
            activeStep={1}
            backButton={null}
            nextButton={null}
          />

          <Typography className={classes.comment} variant="body2" color="textSecondary">
            {`You can always edit this information in your Settings`}
          </Typography>

          <GradientButton
            className={classes.nextButton}
            type="submit"
            variant="contained"
            disableElevation
            color="primary"
          >
            Next
          </GradientButton>
        </div>
      </form>
    </React.Fragment>
  );
}
