import React from "react";

import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { object, string } from "yup";

import API from "api";
import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import StaticSelect from "components/core/StaticSelect";
import StaticTextField from "components/core/StaticTextField";
import actions from "store/actions";
import { generateBrandUrl, slugify } from "utils";

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

const WelcomeFormInitValues = {
  name: "",
  primaryWebsite: "",
  category: "",
  tagline: "",
  description: "",
};

const WelcomeFormSchema = object({
  name: string().required("Brand name is required"),
  primaryWebsite: string()
    .url("Enter a valid url starting from https:// or https://www.")
    .required("Brand's website is required."),
  category: string().required("Select a category"),
  tagline: string().max(50, "Maximum 50 characters"),
  description: string(),
}).required();

const fetcher = (url: string) => API.instance.get(url).then((res) => res.data);

export default function WelcomeForm() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const draftState = useSelector((state: any) => state.merchant.brands.draft);

  const user = useSelector((state: any) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      ...WelcomeFormInitValues,
      name: user.business.businessName,
      primaryWebsite: user.business.primaryWebsite,
    },
    validationSchema: WelcomeFormSchema,
    onSubmit: (values) => {
      dispatch(actions.merchant.brands.createBrandRequest({ form: values }));
    },
  });

  const { data: categories = [] } = useSWR("/categories/", fetcher);

  React.useEffect(() => {
    formik.setErrors(draftState.error || {});
  }, [draftState.error]);

  return (
    <React.Fragment>
      <Typography className={classes.title} variant="h5" gutterBottom>
        Welcome! Set up your brand page
      </Typography>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StaticTextField
              required
              id="brandName"
              name="name"
              label="Brand/Store name"
              placeholder="E.g. Kmart"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <StaticTextField
              id="brandUrl"
              name="brandUrl"
              label="Page Link on SneakQIK"
              fullWidth
              value={generateBrandUrl(slugify(formik.values.name))}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="label"
            />
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              required
              id="primaryWebsite"
              name="primaryWebsite"
              label="Website (for which you are adding offers)"
              variant="standard"
              placeholder="E.g. https://www.kmart.com"
              fullWidth
              value={formik.values.primaryWebsite}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.primaryWebsite && Boolean(formik.errors.primaryWebsite)}
              helperText={formik.touched.primaryWebsite && formik.errors.primaryWebsite}
            />
          </Grid>

          <Grid item xs={12}>
            <StaticSelect
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              <MenuItem value="">
                <em>Select a Category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </StaticSelect>
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              id="tagline"
              name="tagline"
              variant="standard"
              fullWidth
              label="Tagline (Eg, Australia’s leading furniture store)"
              placeholder="Enter tagline"
              value={formik.values.tagline}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //error={formik.touched.tagline && Boolean(formik.errors.tagline)}
              //helperText={formik.touched.tagline && formik.errors.tagline}
            />

            {!formik.values.tagline && (
              <FormHelperText error={formik.touched.tagline && Boolean(formik.errors.tagline)}>
                {formik.touched.tagline && formik.errors.tagline}
              </FormHelperText>
            )}

            {formik.values.tagline && (
              <FormHelperText error={Boolean(formik.errors.tagline)}>
                {50 - formik.values.tagline.length >= 0
                  ? `Maximum 50 characters: ${50 - formik.values.tagline.length} remaining`
                  : `Maximum 50 characters: ${formik.values.tagline.length - 50} too many`}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12}>
            <StaticTextField
              id="description"
              name="description"
              label="Brand description"
              placeholder="Enter brand description"
              fullWidth
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
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
            activeStep={0}
            backButton={null}
            nextButton={null}
          />

          <Typography className={classes.comment} variant="body2" color="textSecondary">
            Continue if you agree to our <Link href="/privacy-terms">terms and privacy policy</Link>.
            <br />
            You can always edit this information in your Settings.
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
