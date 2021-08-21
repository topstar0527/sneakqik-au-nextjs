import React from "react";

import Head from "next/head";
import Router from "next/router";

export default () => {
  React.useEffect(() => {
    Router.replace("/merchant/settings/general");
  });

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};
