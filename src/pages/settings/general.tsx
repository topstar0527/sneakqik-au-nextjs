import React from "react";

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
import AvatarUpload from "components/shared/AvatarUpload";
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
  avatar: {
    width: 200,
    height: 200,
    display: "inline-block",
    overflow: "hidden",
    lineHeight: 1,
    verticalAlign: "middle",
    boxShadow: "0 0 0 1px #000",
    borderRadius: "50% !important",
  },
}));

const validationSchema = object({
  email: string().required("Email is required"),
  username: string().required("Username is required"),
}).required();

export default function General() {
  const classes = useStyles();

  const user = useSelector((state: any) => state.auth.user);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: user.email,
      username: user.username,
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

  const handleUpload = (imageFile) => {
    const form = new FormData();

    form.append("avatar", imageFile);

    dispatch(authActions.updateUserRequest(form));
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
            <Grid item sm={4} className={classes.label}>
              <CustomInputLabel>Profile picture</CustomInputLabel>
            </Grid>

            <Grid item xs={8}>
              <AvatarUpload image={user.avatar} onUpload={handleUpload} />
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
