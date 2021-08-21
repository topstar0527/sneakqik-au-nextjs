import React from "react";

import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import API from "api";
import { GradientButton } from "components/Buttons";
import CustomInputLabel from "components/core/CustomInputLabel";
import StaticSelect from "components/core/StaticSelect";
import StaticTextField from "components/core/StaticTextField";
import DeactivateAccount from "components/settings/DeactivateAccount";
import SettingsLayout from "layouts/SettingsLayout";
import { authActions } from "store/auth/actions";
import { showMessage } from "store/message/actions";

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
  pageTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 16,
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  divider: {
    margin: "30px 0",
    borderColor: "#000000",
    opacity: 0.1,
  },
  updateBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    width: 117,
  },
}));

// !todo need to refactor with ContactDetailForm schema
const BusinessGeneralSchema = Yup.object({
  businessName: Yup.string().required("Business Name is required."),
  numberOfVisitorsPerMonth: Yup.string(),
  primaryWebsite: Yup.string().url("Enter a valid url. Starts with https://").required("Primary Website is required."),
  contactPersonName: Yup.string().required("Full Name is required."),
  position: Yup.string().required("Position is required."),
  contactNumber: Yup.string().required("Contact Number is required."),
}).required();

export type BusinessGeneralType = Yup.InferType<typeof BusinessGeneralSchema>;

export const BusinessGeneralInitValues: BusinessGeneralType = {
  businessName: "",
  numberOfVisitorsPerMonth: "",
  primaryWebsite: "",
  contactPersonName: "",
  position: "",
  contactNumber: "",
};

export default function General() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.auth.user);

  const formik = useFormik({
    initialValues: BusinessGeneralInitValues,
    validationSchema: BusinessGeneralSchema,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: async (values) => {
      try {
        const { data } = await API.auth.setupBusiness(values);

        dispatch(
          authActions.setUserInfo({
            ...user,
            business: data,
          })
        );

        dispatch(showMessage({ message: "Update Business Info Successfully.", variant: "success" }));
      } catch (e) {
        if (e.response && e.response.data) {
          formik.setErrors(e.response.data);
        }
        console.error(e);
      }
    },
  });

  const business = useSelector((state: any) => state.auth.user?.business);

  React.useEffect(() => {
    if (business) {
      formik.resetForm({ values: business });
    }
  }, [business]);

  return (
    <SettingsLayout>
      <Head>
        <title>Settings - General</title>
      </Head>

      <form className={classes.root} noValidate onSubmit={formik.handleSubmit} autoComplete="off">
        <Typography className={classes.pageTitle}>General Account Settings (not shown to users)</Typography>
        <Grid container spacing={1}>
          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel required>Business Name</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StaticTextField
                required
                id="businessName"
                name="businessName"
                placeholder="E.g. Kmart"
                fullWidth
                value={formik.values.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                helperText={formik.touched.businessName && formik.errors.businessName}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel required>Business Website</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StaticTextField
                required
                id="primaryWebsite"
                name="primaryWebsite"
                placeholder="E.g. https://www.kmart.com"
                fullWidth
                value={formik.values.primaryWebsite}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.primaryWebsite && Boolean(formik.errors.primaryWebsite)}
                helperText={formik.touched.primaryWebsite && formik.errors.primaryWebsite}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel>No. of visitors per month</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StaticSelect
                id="numberOfVisitorsPerMonth"
                name="numberOfVisitorsPerMonth"
                fullWidth
                value={formik.values.numberOfVisitorsPerMonth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.numberOfVisitorsPerMonth && Boolean(formik.errors.numberOfVisitorsPerMonth)}
                helperText={formik.touched.numberOfVisitorsPerMonth && formik.errors.numberOfVisitorsPerMonth}
                displayEmpty
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1 - 5000">1 - 5000</MenuItem>
                <MenuItem value="5000 - 25,000">5000 - 25,000</MenuItem>
                <MenuItem value="25,000 - 75000">25,000 - 75000</MenuItem>
                <MenuItem value="75,000-250,000">75,000-250,000</MenuItem>
                <MenuItem value="250,000 - 500,000">250,000 - 500,000</MenuItem>
                <MenuItem value="500,000 - 1 million">500,000 - 1 million</MenuItem>
                <MenuItem value="1 million and above">1 million and above</MenuItem>
              </StaticSelect>
            </Grid>
          </Grid>
        </Grid>

        <hr className={classes.divider} />
        <Typography className={classes.pageTitle}>Primary Business Contact (not shown to users)</Typography>

        <Grid container spacing={1}>
          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel required>Contact Person’s Full Name</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StaticTextField
                required
                id="contactPersonName"
                name="contactPersonName"
                placeholder=""
                fullWidth
                value={formik.values.contactPersonName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel required>Position</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StaticTextField
                required
                id="position"
                name="position"
                placeholder=""
                fullWidth
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.position && Boolean(formik.errors.position)}
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel required>Contact number</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StaticTextField
                required
                id="contactNumber"
                name="contactNumber"
                placeholder=""
                fullWidth
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                helperText={formik.touched.contactNumber && formik.errors.contactNumber}
              />
            </Grid>
          </Grid>

          <Grid container item justify="flex-end">
            <GradientButton
              type="submit" //
              variant="contained"
              disableElevation
              color="primary"
              className={classes.updateBtn}
            >
              Update
            </GradientButton>
          </Grid>
        </Grid>
        <DeactivateAccount />
      </form>
    </SettingsLayout>
  );
}
