import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { object, string } from "yup";

import API from "api";
import { GradientButton } from "components/Buttons";
import StaticTextField from "components/core/StaticTextField";
import CMSFooter from "components/header/CMSFooter";
import CMSHeader from "components/header/CMSHeader";
import { showMessage } from "store/message/actions";

const useStyles = makeStyles({
  root: {
    backgroundImage: 'url("/images/shape.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    backgroundSize: "45%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  body: {
    textAlign: "center",
    marginTop: 64,
    height: "100%",
  },
  logo: {
    color: "#6E33D4",
    fontSize: "35px",
    fontWeight: "bold",
    fontFamily: "Roboto Slab",
    marginBottom: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },

  textSection: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  submitBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    letterSpacing: "1px",
  },

  hint: {
    fontSize: 12,
  },

  gridItem: {
    margin: "0 auto",
  },
});

const initialValues: {
  attach?: File;
  email: string;
  message: string;
} = {
  email: "",
  message: "",
};

export default function ContactUs() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object({
      email: string().email("Please input valid email address").required("Email is required"),
      message: string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      try {
        await API.support.contactUs(values);
        dispatch(showMessage({ message: "Thank you for contacting us.", variant: "success" }));
      } catch (e) {
        dispatch(showMessage({ message: "Failed to send your message", variant: "error" }));
        console.error(e);
      }
      formik.resetForm();
    },
  });

  return (
    <div className={classes.root}>
      <CMSHeader />
      <Container maxWidth="md" className={classes.body}>
        <div className={classes.textSection}>
          <Typography className={classes.logo} variant="h4">
            Contact Us
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={9} style={{ margin: "0 auto" }}>
                <StaticTextField
                  name="email" //
                  placeholder="Email address"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={9} className={classes.gridItem}>
                <StaticTextField
                  name="message" //
                  placeholder="Message"
                  fullWidth
                  multiline
                  rows={12}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
                />
              </Grid>

              <Grid item xs={9} className={classes.gridItem}>
                <GradientButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableElevation
                  size="large"
                  color="primary"
                  className={classes.submitBtn}
                >
                  Submit
                </GradientButton>
              </Grid>

              <Grid item xs={9} className={classes.gridItem}>
                <Typography className={classes.hint}>We will get back to you within 1 - 2 days</Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <CMSFooter />
    </div>
  );
}
