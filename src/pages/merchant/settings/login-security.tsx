import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";

import { GradientButton } from "components/Buttons";
import CustomInputLabel from "components/core/CustomInputLabel";
import StaticTextField from "components/core/StaticTextField";
import ChangePasswordDialog from "features/ChangePasswordDialog";
import SettingsLayout from "layouts/SettingsLayout";
import { authActions } from "store/auth/actions";
// import DeactivateAccount from "components/settings/DeactivateAccount";

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
  updateBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    width: 117,
  },
}));

const validationSchema = object({
  email: string().required("Email is required"),
}).required();

export default function LoginSecurity() {
  const classes = useStyles();

  const user = useSelector((state: any) => state.auth.user);

  const authState = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    validationSchema: validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: (values) => {
      dispatch(authActions.updateUserRequest(values));
    },
  });

  React.useEffect(() => {
    dispatch(authActions.initValues(["status", "errors"]));
  }, []);

  React.useEffect(() => {
    if (user) {
      formik.resetForm({ values: { email: user.email, username: user.username } });
    }
  }, [user]);

  React.useEffect(() => {
    formik.setErrors(authState.errors || {});
  }, [authState.errors]);

  const handleChangePassword = () => {
    setOpen(true);
  };

  return (
    <SettingsLayout>
      <Head>
        <title>Settings - Login & Security</title>
      </Head>
      <form className={classes.root} noValidate onSubmit={formik.handleSubmit} autoComplete="off">
        <Typography className={classes.pageTitle}>Login & Security</Typography>
        <Grid container spacing={1}>
          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel>Registered email</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <StaticTextField
                required
                disabled
                id="email"
                name="email"
                placeholder=""
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item xs={12} sm={4} className={classes.label}>
              <CustomInputLabel required>Password</CustomInputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Button color="primary" onClick={handleChangePassword}>
                Change Password
              </Button>
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item container sm={12} className={classes.label} justify="flex-end">
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
        </Grid>
        {/* <DeactivateAccount /> */}
      </form>

      <ChangePasswordDialog open={open} onClose={() => setOpen(false)} />
    </SettingsLayout>
  );
}
