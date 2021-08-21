import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import base from "api/base";
import { GradientButton } from "components/Buttons";
import Link from "components/core/Link";
import TextField from "components/core/TextField";
import { showMessage } from "store/message/actions";

const useStyles = makeStyles(() => ({
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  paper: {
    width: "calc(100% - 24px)",
    maxWidth: "435px",
    marginLeft: "12px",
    marginRight: "12px",
    background: "#FFFFFF",

    border: "1px solid #F1F1F1",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "3px",
  },

  form: {
    // margin: "35px",
  },

  formTitle: {
    lineHeight: "31px",
    fontSize: 25,
    fontWeight: "bold",
  },

  formDescription: {
    color: "#000000",
    lineHeight: "17px",
  },

  checkboxLabel: {
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
  },

  dialogPaper: {
    marginLeft: "15px",
    marginRight: "15px",
    maxWidth: "418px",
  },
  dialogContent: {
    padding: 24,
  },
  dialogTitle: { padding: 0 },
  closeButton: { position: "absolute", right: 0 },
}));

const CreateNewPasswordSchema = Yup.object({
  newPassword: Yup.string().min(8, "Too short. Use at least 8 characters").required("Password is required"),
  terms: Yup.bool().oneOf([true], "Please accept the SneakQIK Terms of Service before continuing"),
});

export type CreateNewPasswordType = Yup.InferType<typeof CreateNewPasswordSchema>;

const CreateNewPassword = (props) => {
  const classes = useStyles();

  const authState = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { newPassword: "", terms: false },
    validationSchema: CreateNewPasswordSchema,
    onSubmit: async (values) => {
      try {
        await base({
          url: `/users/me/change-password`,
          method: "put",
          data: {
            newPassword: values.newPassword,
          },
        });
        dispatch(showMessage({ message: "Update Password Successfully.", variant: "success" }));
        handleClose();
      } catch (e) {
        if (e.response && e.response.data) {
          formik.setErrors(e.response.data);
        }
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    if (props.onClose) props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      maxWidth="xs"
      disableBackdropClick
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        className: classes.dialogPaper,
      }}
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <IconButton
          disabled={authState.registerStatus === "pending"}
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.formTitle} component="h1" variant="h5" align="center">
                Change password
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography className={classes.formDescription} component="p" variant="body1" align="center">
                Type and confirm a secure new password for the account.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                name="newPassword"
                label="Password"
                type="password"
                id="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
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
                      {"By selecting Agree and continue below, I agree to SneakQIK’s "}
                      <Link href="/privacy-terms" prefetch={false}>
                        Terms and Privacy Policy.
                      </Link>
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
                disabled={!formik.isValid || authState.resetPwdStatus === "pending"}
              >
                CHANGE PASSWORD
              </GradientButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPassword;
