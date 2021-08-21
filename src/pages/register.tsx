import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";
import { useDispatch } from "react-redux";

import AuthenticationForm from "features/AuthenticationForm";
import GradientLayout from "layouts/GradientLayout";
import { authActions } from "store/auth/actions";

const useStyles = makeStyles(() => ({
  root: {
    background: "#FFFFFF",
    maxWidth: 500,
    padding: 24,
    margin: "0 auto",
  },
}));

const Register: React.FunctionComponent = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(authActions.showUserRegisterForm());
  }, []);

  return (
    <GradientLayout>
      <Head>
        <title>Register</title>
      </Head>
      <div className={classes.root}>
        <AuthenticationForm />
      </div>
    </GradientLayout>
  );
};

export default Register;
