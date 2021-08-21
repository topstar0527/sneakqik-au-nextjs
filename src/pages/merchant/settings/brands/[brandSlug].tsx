import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";

import BrandForm from "components/merchant/settings/BrandForm";
import SettingsLayout from "layouts/SettingsLayout";

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
}));

export default function Brand() {
  const classes = useStyles();

  return (
    <SettingsLayout>
      <Head>
        <title>Settings - Edit Brand</title>
      </Head>
      <div className={classes.root}>
        <BrandForm />
      </div>
    </SettingsLayout>
  );
}
