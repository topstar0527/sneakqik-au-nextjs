import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";

import API from "api";
import { GradientButton } from "components/Buttons";
import StaticTextField from "components/core/StaticTextField";
import { showMessage } from "store/message/actions";
import actions from "store/support/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 33px 26px",
    maxWidth: 418,
  },
  dialogLayout: {
    "& .MuiDialog-paper": {
      overflowY: "hidden",
      maxWidth: "fit-content",
    },
  },
  dialogButton: {
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  body: {
    display: "flex",
  },
  rightSidebar: {
    width: 278,
  },
  submitBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    letterSpacing: "1px",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 22,
    textAlign: "center",
  },
  addFileBtn: {
    color: "#6F34D4",
    borderColor: "#6F34D4",
    textTransform: "inherit",
  },
  hint: {
    fontSize: 12,
  },
}));

const initialValues: {
  attach?: File;
  email: string;
  message: string;
} = {
  email: "",
  message: "",
};

const ContactUsDialog = () => {
  const classes = useStyles();

  const handleClose = () => {
    dispatch(actions.closeContactUsDialog());
    formik.resetForm();
  };

  const dispatch = useDispatch();

  const open = useSelector((state: any) => state.support.contactUsDialogOpen);

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
      handleClose();
    },
  });
  return (
    <Dialog scroll="body" open={open} className={classes.dialogLayout}>
      <DialogContent classes={{ root: classes.root }} dividers={false}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        <form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
          <Typography component="h1" className={classes.title}>
            Contact Us
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <StaticTextField
                name="message" //
                placeholder="Message"
                fullWidth
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
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
                className={classes.submitBtn}
              >
                Submit
              </GradientButton>
            </Grid>

            <Grid item xs={12}>
              <Typography className={classes.hint}>We will get back to you within 1 - 2 days</Typography>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsDialog;
