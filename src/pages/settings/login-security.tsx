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
import DeactivateAccount from "components/settings/DeactivateAccount";
import ChangePasswordDialog from "features/ChangePasswordDialog";
import SettingsLayout from "layouts/SettingsLayout";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
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
  username: string().required("Username is required"),
}).required();

export default function LoginSecurity() {
  const classes = useStyles();

  const user = useSelector((state: any) => state.auth.user);

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

  const handleChangePassword = () => {
    setOpen(true);
  };

  return (
    <SettingsLayout>
      <Head>
        <title>Settings - Login & Security</title>
      </Head>
      <form className={classes.root} noValidate onSubmit={formik.handleSubmit} autoComplete="off">
        <Typography className="mb-8 text-base font-bold">Login & Security</Typography>
        <Grid container spacing={1}>
          <Grid container item>
            <Grid item sm={4} className={classes.label}>
              <CustomInputLabel>Registered email</CustomInputLabel>
            </Grid>
            <Grid item sm={8}>
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
            <Grid item sm={4} className={classes.label}>
              <CustomInputLabel required>Password</CustomInputLabel>
            </Grid>
            <Grid item sm={8}>
              <Button color="primary" onClick={handleChangePassword}>
                Change Password
              </Button>
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item sm={4} className={classes.label}>
              <CustomInputLabel required>Username</CustomInputLabel>
            </Grid>
            <Grid item sm={8}>
              <StaticTextField
                required
                id="username"
                name="username"
                placeholder=""
                fullWidth
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
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
        <DeactivateAccount />
      </form>

      <ChangePasswordDialog open={open} onClose={() => setOpen(false)} />
    </SettingsLayout>
  );
}
