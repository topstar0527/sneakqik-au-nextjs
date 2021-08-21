import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";

import AuthenticationForm from "features/AuthenticationForm";
import GradientLayout from "layouts/GradientLayout";

const useStyles = makeStyles(() => ({
  root: {
    background: "#FFFFFF",
    maxWidth: 500,
    padding: 24,
    margin: "0 auto",
  },
}));

const Login: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <GradientLayout>
      <Head>
        <title>Login</title>
      </Head>
      <div className={classes.root}>
        <AuthenticationForm />
      </div>
    </GradientLayout>
  );
};

export default Login;
